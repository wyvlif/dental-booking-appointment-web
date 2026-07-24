<?php include "backend/admin_check.php"; ?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Admin Dashboard | DentalCare Pro</title>

    <link rel="stylesheet" href="css/style.css">
</head>

<body>

<header>
    <nav class="navbar">
        <div class="logo">DentalCare Pro Admin</div>

        <ul>
            <li><a href="index.html">Home</a></li>
            <li><a href="patient-dashboard.html">Patient View</a></li>
            <li><a href="admin-dashboard.html" class="active">Admin</a></li>
            <li><a href="backend/logout.php">Logout</a></li>
        </ul>
    </nav>
</header>

<section class="dashboard-section">

    <div class="dashboard-container">

        <h1>Admin Dashboard</h1>
        <p>Manage all patient appointments</p>

        <!-- SEARCH BAR -->
        <input type="text" id="searchInput" placeholder="Search patient..." class="search-box">

        <table id="adminTable">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Action</th>
                </tr>
            </thead>

            <tbody>
                <!-- Dynamic Data -->
            </tbody>
        </table>

    </div>
    <div class="stats-container">

    <div class="stat-box">
        <h3 id="total"></h3>
        <p>Total Appointments</p>
    </div>

    <div class="stat-box">
        <h3 id="pending"></h3>
        <p>Pending</p>
    </div>

    <div class="stat-box">
        <h3 id="completed"></h3>
        <p>Completed</p>
    </div>

</div>

</section>

<footer>
    <p>© 2026 DentalCare Pro | Admin Panel</p>
</footer>

<script src="js/admin.js"></script>

</body>
</html>