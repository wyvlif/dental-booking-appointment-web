/* =========================================
   PATIENT DASHBOARD LOGIC
========================================= */

document.addEventListener("DOMContentLoaded", loadAppointments);

function loadAppointments() {

    const tableBody = document.querySelector("#appointmentsTable tbody");

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    tableBody.innerHTML = "";

    if (appointments.length === 0) {
        tableBody.innerHTML = `
            <tr>
                <td colspan="7">No appointments found</td>
            </tr>
        `;
        return;
    }

    appointments.forEach((app, index) => {

        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${app.name}</td>
            <td>${app.phone}</td>
            <td>${app.service}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td><span class="status pending">${app.status}</span></td>
            <td>
                <button class="delete-btn" onclick="deleteAppointment(${index})">
                    Delete
                </button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}


/* DELETE APPOINTMENT */

function deleteAppointment(index) {

    let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

    appointments.splice(index, 1);

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments();
}


