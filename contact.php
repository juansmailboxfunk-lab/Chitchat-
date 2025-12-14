<?php
// ============================
// Chit Chat — Contact Form
// HostGator PHP (no libraries)
// ============================

// CONFIG
$to = "tuemail@ejemplo.com"; // <-- CHANGE THIS
$site_name = "Chit Chat";
$min_seconds_between_submissions = 15;

// Simple rate limiting (session-based)
session_start();
if (isset($_SESSION['last_submit']) && time() - $_SESSION['last_submit'] < $min_seconds_between_submissions) {
  http_response_code(429);
  echo "Por favor, espera un momento antes de volver a enviar el formulario.";
  exit;
}
$_SESSION['last_submit'] = time();

// Honeypot (spam trap)
if (!empty($_POST['company'])) {
  // Bot detected
  http_response_code(200);
  exit;
}

// Sanitize input
$name = trim(strip_tags($_POST['name'] ?? ''));
$email = filter_var($_POST['email'] ?? '', FILTER_VALIDATE_EMAIL);
$message = trim(strip_tags($_POST['message'] ?? ''));

// Validate
if (!$name || !$email || !$message) {
  http_response_code(400);
  echo "Por favor, completa todos los campos correctamente.";
  exit;
}

// Email content
$subject = "Nueva consulta — $site_name";
$body = "Nombre: $name\n";
$body .= "Email: $email\n\n";
$body .= "Mensaje:\n$message\n";

$headers = "From: $site_name <no-reply@" . $_SERVER['SERVER_NAME'] . ">\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8";

// Send
if (mail($to, $subject, $body, $headers)) {
  echo "Gracias. Tu mensaje se ha enviado correctamente.";
} else {
  http_response_code(500);
  echo "Error al enviar el mensaje. Inténtalo más tarde.";
}
