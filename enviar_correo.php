<?php
declare(strict_types=1);

session_start();

function redirect_with_status(string $page, string $status): void
{
    $allowed = ['contactos.html', 'index.html'];
    if (!in_array($page, $allowed, true)) {
        $page = 'contactos.html';
    }
    header('Location: ' . $page . '?estado=' . rawurlencode($status) . '#formulario-contacto');
    exit;
}

function has_header_injection(string $value): bool
{
    return (bool) preg_match("/[\r\n]/", $value);
}

function clean_text(string $value, int $maxLength): string
{
    $value = trim(str_replace(["\0"], '', $value));
    $value = strip_tags($value);
    if (function_exists('mb_substr')) {
        $value = mb_substr($value, 0, $maxLength);
    } else {
        $value = substr($value, 0, $maxLength);
    }
    return $value;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: contactos.html');
    exit;
}

$returnPage = isset($_POST['origen']) ? basename((string) $_POST['origen']) : 'contactos.html';

// Honeypot: treat as success without sending.
$honeypot = isset($_POST['empresa']) ? trim((string) $_POST['empresa']) : '';
if ($honeypot !== '') {
    redirect_with_status($returnPage, 'ok');
}

if (!empty($_SESSION['contact_last_submit']) && (time() - (int) $_SESSION['contact_last_submit']) < 20) {
    redirect_with_status($returnPage, 'duplicado');
}

$nombre = isset($_POST['first-name']) ? clean_text((string) $_POST['first-name'], 80) : '';
$apellido = isset($_POST['last-name']) ? clean_text((string) $_POST['last-name'], 80) : '';
$email = isset($_POST['email']) ? trim((string) $_POST['email']) : '';
$mensaje = isset($_POST['message']) ? clean_text((string) $_POST['message'], 4000) : '';

$email = filter_var($email, FILTER_SANITIZE_EMAIL);

if ($nombre === '' || $apellido === '' || $email === '' || $mensaje === '') {
    redirect_with_status($returnPage, 'error-campos');
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    redirect_with_status($returnPage, 'error-email');
}

if (has_header_injection($nombre) || has_header_injection($apellido) || has_header_injection($email)) {
    redirect_with_status($returnPage, 'error');
}

$destinatario = 'emisorahistoria@emisorahistoriadeunlegado.org';
$remitenteControlado = 'emisorahistoria@emisorahistoriadeunlegado.org';
$asunto = 'Nuevo mensaje de contacto desde la pagina web';

$contenido = "Has recibido un nuevo mensaje de contacto desde el formulario de la página web.\n\n";
$contenido .= "Nombre completo: " . $nombre . " " . $apellido . "\n";
$contenido .= "Email: " . $email . "\n\n";
$contenido .= "Mensaje:\n" . $mensaje . "\n";

$headers = [];
$headers[] = 'From: Emisora Historia de un Legado <' . $remitenteControlado . '>';
$headers[] = 'Reply-To: ' . $email;
$headers[] = 'MIME-Version: 1.0';
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'X-Mailer: PHP/' . PHP_VERSION;

$enviado = @mail($destinatario, $asunto, $contenido, implode("\r\n", $headers));

if ($enviado) {
    $_SESSION['contact_last_submit'] = time();
    redirect_with_status($returnPage, 'ok');
}

redirect_with_status($returnPage, 'error-envio');
