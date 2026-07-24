<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$id = $data['id'];

$sql = "DELETE FROM appointments WHERE id=?";

$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $id);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}

// added after
session_start();

if ($_SESSION['role'] !== "admin") {
    echo json_encode(["error" => "Access denied"]);
    exit();
}

?>