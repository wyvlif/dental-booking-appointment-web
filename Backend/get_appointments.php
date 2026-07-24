<?php
session_start();
include "config.php";

if (!isset($_SESSION['user_id'])) {
    echo json_encode(["error" => "Unauthorized"]);
    exit();
}

$result = $conn->query("SELECT * FROM appointments ORDER BY id DESC");

$data = [];

while ($row = $result->fetch_assoc()) {
    $data[] = $row;
}

echo json_encode($data);
?>