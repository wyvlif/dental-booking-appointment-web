<?php
include "config.php";

$result = $conn->query("SELECT date, COUNT(*) as total FROM appointments GROUP BY date");

$calendar = [];

while ($row = $result->fetch_assoc()) {
    $calendar[] = $row;
}

echo json_encode($calendar);
?>