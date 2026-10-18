(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(id) {
    return document.getElementById(id);
  }

  function focusables(root) {
    return Array.prototype.slice.call(
      root.querySelectorAll('a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])')
    ).filter(function (el) {
      return !el.hasAttribute("hidden") && el.getAttribute("aria-hidden") !== "true";
    });
  }

  function trapFocus(event, root) {
    if (event.key !== "Tab") {
      return;
    }
    var items = focusables(root);
    if (!items.length) {
      return;
    }
    var first = items[0];
    var last = items[items.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  }

  function lockPage(on) {
    document.body.classList.toggle("is-dialog-open", on);
    ["header", "nav", "main", "footer", ".skip-link"].forEach(function (sel) {
      document.querySelectorAll(sel).forEach(function (el) {
        if (on) {
          el.setAttribute("inert", "");
        } else {
          el.removeAttribute("inert");
        }
      });
    });
  }

  function showFormFeedback() {
    var params = new URLSearchParams(window.location.search);
    var estado = params.get("estado");
    var box = qs("form-feedback");
    if (!box || !estado) {
      return;
    }

    var messages = {
      ok: "Tu mensaje fue enviado. Te responderemos lo antes posible.",
      duplicado: "Ya recibimos un mensaje reciente. Espera un momento antes de enviar otro.",
      "error-campos": "Completa todos los campos del formulario.",
      "error-email": "Revisa que el correo electrónico sea válido.",
      error: "No fue posible procesar el mensaje. Inténtalo de nuevo.",
      "error-envio": "No fue posible enviar el mensaje en este momento. Escríbenos a emisorahistoria@emisorahistoriadeunlegado.org o por WhatsApp."
    };

    box.hidden = false;
    box.textContent = messages[estado] || messages.error;
    box.className = "form-feedback " + (estado === "ok" ? "success" : "error");
    box.setAttribute("role", "status");
  }

  function preventDoubleSubmit() {
    var form = document.querySelector("form.contact-form");
    if (!form) {
      return;
    }
    form.addEventListener("submit", function () {
      var button = form.querySelector("button[type='submit']");
      if (button) {
        button.disabled = true;
        button.textContent = "Enviando…";
      }
    });
  }

  function initWelcomeDialog() {
    var dialog = qs("welcomePopup");
    if (!dialog) {
      return;
    }

    var panel = dialog.querySelector(".welcome-dialog-content");
    var closeBtn = dialog.querySelector(".close-dialog");
    var listenBtn = dialog.querySelector("[data-welcome-listen]");
    var previouslyFocused = null;

    function closeDialog() {
      dialog.classList.remove("is-open");
      dialog.setAttribute("aria-hidden", "true");
      lockPage(false);
      try {
        sessionStorage.setItem("hdl-welcome-seen", "1");
      } catch (e) {}
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    }

    function openDialog() {
      previouslyFocused = document.activeElement;
      dialog.classList.add("is-open");
      dialog.setAttribute("aria-hidden", "false");
      lockPage(true);
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    dialog.addEventListener("keydown", function (event) {
      if (!dialog.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeDialog();
      }
      trapFocus(event, panel || dialog);
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeDialog);
    }

    if (listenBtn) {
      listenBtn.addEventListener("click", function (event) {
        event.preventDefault();
        closeDialog();
        var player = qs("reproductor-en-linea");
        if (player && player.scrollIntoView) {
          player.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth", block: "start" });
        }
      });
    }

    var historyBtn = dialog.querySelector("[data-welcome-history]");
    if (historyBtn) {
      historyBtn.addEventListener("click", function () {
        try {
          sessionStorage.setItem("hdl-welcome-seen", "1");
        } catch (e) {}
      });
    }

    var alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("hdl-welcome-seen") === "1";
    } catch (e) {}

    if (!alreadySeen) {
      openDialog();
    }
  }

  function initRecognitionCarousel() {
    var root = document.querySelector("[data-recognition-carousel]");
    if (!root) {
      return;
    }

    var track = root.querySelector(".recognition-track");
    var slides = root.querySelectorAll(".recognition-slide");
    var prev = root.querySelector("[data-carousel-prev]");
    var next = root.querySelector("[data-carousel-next]");
    var dots = root.querySelectorAll("[data-carousel-dot]");
    var status = root.querySelector("[data-carousel-status]");
    var viewport = root.querySelector(".recognition-viewport");
    var total = slides.length;
    var index = 0;
    var userTookOver = false;
    var timer = null;

    function goTo(nextIndex, fromUser) {
      if (fromUser) {
        userTookOver = true;
        stopAuto();
      }
      index = (nextIndex + total) % total;
      if (track) {
        track.style.transform = "translateX(-" + index * 100 + "%)";
      }
      slides.forEach(function (slide, i) {
        slide.setAttribute("aria-hidden", i === index ? "false" : "true");
      });
      dots.forEach(function (dot, i) {
        dot.setAttribute("aria-selected", i === index ? "true" : "false");
      });
      if (status) {
        status.textContent = "Imagen " + (index + 1) + " de " + total;
      }
    }

    function stopAuto() {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    }

    function startAuto() {
      if (reducedMotion || userTookOver || total < 2) {
        return;
      }
      stopAuto();
      timer = setInterval(function () {
        goTo(index + 1, false);
      }, 8000);
    }

    function reveal() {
      root.classList.add("is-inview");
    }

    if (reducedMotion) {
      reveal();
    } else if ("IntersectionObserver" in window) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            reveal();
            observer.disconnect();
          }
        });
      }, { threshold: 0.28 });
      observer.observe(root);
    } else {
      reveal();
    }

    if (prev) {
      prev.addEventListener("click", function () {
        goTo(index - 1, true);
      });
    }
    if (next) {
      next.addEventListener("click", function () {
        goTo(index + 1, true);
      });
    }
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        goTo(i, true);
      });
    });

    if (viewport) {
      viewport.addEventListener("keydown", function (event) {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goTo(index - 1, true);
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goTo(index + 1, true);
        }
      });
    }

    root.addEventListener("mouseenter", stopAuto);
    root.addEventListener("mouseleave", function () {
      if (!userTookOver) {
        startAuto();
      }
    });
    root.addEventListener("focusin", stopAuto);
    root.addEventListener("focusout", function (event) {
      if (!root.contains(event.relatedTarget) && !userTookOver) {
        startAuto();
      }
    });

    goTo(0, false);
    startAuto();
  }

  function initLightbox() {
    var lightbox = qs("mediaLightbox");
    if (!lightbox) {
      return;
    }

    var panel = lightbox.querySelector(".media-lightbox-panel");
    var image = qs("lightboxImage");
    var closeBtn = lightbox.querySelector(".close-dialog");
    var backdrop = lightbox.querySelector(".media-lightbox-backdrop");
    var previouslyFocused = null;

    function closeLightbox() {
      lightbox.classList.remove("is-open");
      lightbox.setAttribute("aria-hidden", "true");
      lockPage(false);
      if (image) {
        image.removeAttribute("src");
      }
      if (previouslyFocused && previouslyFocused.focus) {
        previouslyFocused.focus();
      }
    }

    function openLightbox(src, alt) {
      previouslyFocused = document.activeElement;
      if (image) {
        image.src = src;
        image.alt = alt || "";
      }
      lightbox.classList.add("is-open");
      lightbox.setAttribute("aria-hidden", "false");
      lockPage(true);
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    document.querySelectorAll(".recognition-open").forEach(function (button) {
      button.addEventListener("click", function () {
        openLightbox(button.getAttribute("data-src"), button.getAttribute("data-alt"));
      });
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeLightbox);
    }
    if (backdrop) {
      backdrop.addEventListener("click", closeLightbox);
    }

    lightbox.addEventListener("keydown", function (event) {
      if (!lightbox.classList.contains("is-open")) {
        return;
      }
      if (event.key === "Escape") {
        closeLightbox();
      }
      trapFocus(event, panel || lightbox);
    });
  }

  function pauseCarouselIfNeeded() {
    if (!reducedMotion || typeof bootstrap === "undefined") {
      return;
    }
    var el = qs("hero-slide");
    if (!el) {
      return;
    }
    var instance = bootstrap.Carousel.getOrCreateInstance(el);
    instance.pause();
  }

  showFormFeedback();
  preventDoubleSubmit();
  initWelcomeDialog();
  initRecognitionCarousel();
  initLightbox();
  pauseCarouselIfNeeded();
})();
