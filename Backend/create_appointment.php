<?php

include "config.php";

$data = json_decode(file_get_contents("php://input"), true);

$name = $data['name'];
$phone = $data['phone'];
$email = $data['email'];
$service = $data['service'];
$date = $data['date'];
$time = $data['time'];
$message = $data['message'];

$sql = "INSERT INTO appointments (name, phone, email, service, date, time, message)
        VALUES (?, ?, ?, ?, ?, ?, ?)";

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssssss", $name, $phone, $email, $service, $date, $time, $message);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error"]);
}

include "send_email.php";

sendAppointmentEmail(
    $email,
    $name,
    $date,
    $time,
    $service
);

?>