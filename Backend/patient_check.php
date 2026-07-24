<?php
session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['role'] !== "patient") {
    header("Location: ../login.html");
    exit();
}
?>