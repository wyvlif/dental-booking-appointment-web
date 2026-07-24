/* =========================================
   ADMIN DASHBOARD SYSTEM
========================================= */

let allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];

const tableBody = document.querySelector("#adminTable tbody");
const searchInput = document.querySelector("#searchInput");

// Load data
function renderTable(data) {

    tableBody.innerHTML = "";

    if (data.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No appointments found</td>
            </tr>
        `;
        return;
    }

    data.forEach((app, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.phone}</td>
            <td>${app.service}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td>
                <span class="status ${app.status === "Completed" ? "completed" : "pending"}">
                    ${app.status}
                </span>
            </td>
            <td>
                <button class="complete-btn" onclick="markCompleted(${index})">
                    Complete
                </button>

                <button class="delete-btn" onclick="deleteAppointment(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

// Mark as completed
function markCompleted(index) {

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments[index].status = "Completed";

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadData();
}

// Delete appointment
function deleteAppointment(index) {

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadData();
}

// Search function
searchInput.addEventListener("input", function () {

    const keyword = this.value.toLowerCase();

    let filtered = allAppointments.filter(app =>
        app.name.toLowerCase().includes(keyword) ||
        app.phone.toLowerCase().includes(keyword) ||
        app.service.toLowerCase().includes(keyword)
    );

    renderTable(filtered);
});

// Load all data
function loadData() {
    allAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
    renderTable(allAppointments);
}

// Initialize
document.addEventListener("DOMContentLoaded", loadData);

// Fetch stats for dashboard
fetch("backend/stats.php")
.then(res => res.json())
.then(data => {
    document.getElementById("total").innerText = data.total;
    document.getElementById("pending").innerText = data.pending;
    document.getElementById("completed").innerText = data.completed;
});