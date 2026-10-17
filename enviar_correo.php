<?php
// Recibir datos por POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Escapar información para evitar inyección
    $nombre = htmlspecialchars(trim($_POST["first-name"]));
    $apellido = htmlspecialchars(trim($_POST["last-name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $mensaje = htmlspecialchars(trim($_POST["message"]));

    // Validar campos obligatorios
    if (empty($nombre) || empty($apellido) || empty($email) || empty($mensaje) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "<script>alert('Por favor completa todos los campos correctamente.'); window.history.back();</script>";
        exit;
    }

    // Configuración del correo
    $destinatario = "emisorahistoria@emisorahistoriadeunlegado.org";
    $asunto = "Nuevo mensaje de contacto desde la pagina web";

    // Construir el mensaje
    $contenido = "Has recibido un nuevo mensaje de contacto desde el formulario de la página web.\n\n";
    $contenido .= "Detalles del remitente:\n";
    $contenido .= "Nombre completo: " . $nombre . " " . $apellido . "\n";
    $contenido .= "Email: " . $email . "\n";
    $contenido .= "\nMensaje:\n" . $mensaje . "\n";

    // Cabeceras (headers)
    $headers = "From: " . $email . "\r\n";
    $headers .= "Reply-To: " . $email . "\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();

    // Intentar enviar el email
    if (mail($destinatario, $asunto, $contenido, $headers)) {
        // Mensaje de éxito
        echo "<script>alert('Tu mensaje ha sido enviado exitosamente. Nos pondremos en contacto contigo pronto.'); window.location.href = 'contactos.html';</script>";
    } else {
        // Mensaje de error
        echo "<script>alert('Hubo un error al enviar el mensaje. Por favor intenta más tarde o escríbenos directamente a $destinatario'); window.history.back();</script>";
    }
} else {
    // Si alguien accede al archivo directamente sin POST, lo redirigimos
    header("Location: contactos.html");
    exit;
}
?>
