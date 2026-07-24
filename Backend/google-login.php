<?php
session_start();

// Get the POST data
$data = json_decode(file_get_contents("php://input"), true);
$id_token = $data['token'] ?? '';

if (!$id_token) {
    echo json_encode(["status" => "error", "message" => "No token provided"]);
    exit;
}

// 1. Verify the token with Google's API
$url = "https://oauth2.googleapis.com/tokeninfo?id_token=" . $id_token;
$response = file_get_contents($url);
$payload = json_decode($response, true);

if ($payload && isset($payload['sub'])) {
    // 2. Token is valid. Extract user info
    $email = $payload['email'];
    $name = $payload['name'];
    $google_id = $payload['sub'];

    // 3. Logic: Check if user exists in your database
    // If not, CREATE user. If yes, LOG THEM IN.
    
    $_SESSION['user_email'] = $email;
    $_SESSION['role'] = 'patient'; // Default role for Google logins

    echo json_encode(["status" => "success", "role" => "patient"]);
} else {
    // Invalid token
    http_response_code(401);
    echo json_encode(["status" => "error", "message" => "Invalid Google Token"]);
}
?>