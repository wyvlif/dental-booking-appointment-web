<?php
session_start();
include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$email = $data['email'];
$password = $data['password'];

$sql = "SELECT * FROM users WHERE email=?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();

$result = $stmt->get_result();
$user = $result->fetch_assoc();

if ($user && password_verify($password, $user['password'])) {

    $_SESSION['user_id'] = $user['id'];
    $_SESSION['role'] = $user['role'];
    $_SESSION['name'] = $user['name'];

    echo json_encode([
        "status" => "success",
        "role" => $user['role'],
        "name" => $user['name']
    ]);

} else {
    echo json_encode(["status" => "error"]);
}
?>