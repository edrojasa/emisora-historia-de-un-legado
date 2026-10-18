(function () {
  "use strict";

  var reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function qs(id) {
    return document.getElementById(id);
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

    var closeBtn = dialog.querySelector(".close-dialog");
    var previouslyFocused = null;

    function closeDialog() {
      dialog.classList.remove("is-open");
      dialog.setAttribute("aria-hidden", "true");
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
      if (closeBtn) {
        closeBtn.focus();
      }
    }

    dialog.addEventListener("click", function (event) {
      if (event.target === dialog) {
        closeDialog();
      }
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && dialog.classList.contains("is-open")) {
        closeDialog();
      }
    });

    if (closeBtn) {
      closeBtn.addEventListener("click", closeDialog);
    }

    var alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem("hdl-welcome-seen") === "1";
    } catch (e) {}

    if (!alreadySeen) {
      openDialog();
    }
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
  pauseCarouselIfNeeded();
})();
