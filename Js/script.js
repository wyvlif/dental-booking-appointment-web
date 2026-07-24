/* =========================================
   DentalCare Pro - Main JavaScript
   Part 3: Interactions & UI behavior
========================================= */

/* ================================
   1. MOBILE NAV TOGGLE
================================ */
const navbar = document.querySelector(".navbar");
const navLinks = document.querySelector(".navbar ul");

/* Create hamburger button dynamically */
const menuBtn = document.createElement("div");
menuBtn.classList.add("menu-btn");
menuBtn.innerHTML = "☰";
navbar.prepend(menuBtn);

/* Toggle menu */
menuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


/* ================================
   2. STICKY NAV EFFECT
================================ */
window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
        navbar.classList.add("sticky");
    } else {
        navbar.classList.remove("sticky");
    }
});


/* ================================
   3. SMOOTH SCROLL (internal links)
================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute("href"));

        if (target) {
            target.scrollIntoView({
                behavior: "smooth"
            });
        }
    });
});


/* ================================
   4. ACTIVE LINK HIGHLIGHT
================================ */
const sections = document.querySelectorAll("section");
const navItems = document.querySelectorAll(".navbar ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navItems.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});


/* ================================
   5. REVEAL ON SCROLL ANIMATION
================================ */
const revealElements = document.querySelectorAll(
    ".card, .about-text, .why-container div, .testimonial-box"
);

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;

        if (elementTop < windowHeight - 100) {
            el.classList.add("show");
        }
    });
};

window.addEventListener("scroll", revealOnScroll);


/* ================================
   6. ADD CSS CLASS FOR ANIMATION
================================ */

/* Inject dynamic styles */
const style = document.createElement("style");
style.innerHTML = `
.show {
    opacity: 1 !important;
    transform: translateY(0px) !important;
    transition: all 0.6s ease;
}

.menu-btn {
    display: none;
    font-size: 28px;
    cursor: pointer;
    color: #0D6EFD;
}

.navbar ul.active {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 20px;
    background: white;
    width: 200px;
    padding: 15px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.1);
}

.navbar.sticky {
    position: fixed;
    top: 0;
    width: 100%;
    background: white;
    z-index: 999;
    box-shadow: 0 5px 15px rgba(0,0,0,0.1);
}
`;
document.head.appendChild(style);


/* ================================
   7. INITIALIZE ON LOAD
================================ */
window.addEventListener("load", () => {
    revealOnScroll();
});


/* =========================================
   PART 5: APPOINTMENT FORM LOGIC
========================================= */

const appointmentForm = document.querySelector("#appointmentForm");

if (appointmentForm) {
    appointmentForm.addEventListener("submit", function (e) {
        e.preventDefault();

        // Collect form data
        const formData = {
            name: appointmentForm.querySelector("input[type='text']").value.trim(),
            phone: appointmentForm.querySelector("input[type='tel']").value.trim(),
            email: appointmentForm.querySelector("input[type='email']").value.trim(),
            service: appointmentForm.querySelector("select").value,
            date: appointmentForm.querySelector("input[type='date']").value,
            time: appointmentForm.querySelectorAll("select")[1].value,
            message: appointmentForm.querySelector("textarea").value.trim(),
            status: "Pending"
        };

        // Basic validation
        if (!formData.name || !formData.phone || !formData.service || !formData.date || !formData.time) {
            showAlert("Please fill in all required fields.", "error");
            return;
        }

        // Save to localStorage (temporary database simulation)
        let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
        appointments.push(formData);
        localStorage.fetch("backend/create_appointment.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        })
        .then(res => res.json())
        .then(data => {
            if (data.status === "success") {
                showAlert("Appointment saved successfully!", "success");
                appointmentForm.reset();
            } else {
                showAlert("Error saving appointment", "error");
            }
        });

        // Success message
        showAlert("Appointment booked successfully!", "success");

        // Reset form
        appointmentForm.reset();

        console.log("New Appointment:", formData);
    });
}


/* =========================================
   ALERT SYSTEM (POPUP NOTIFICATION)
========================================= */

function showAlert(message, type) {

    const alertBox = document.createElement("div");

    alertBox.classList.add("alert-box");
    alertBox.classList.add(type);

    alertBox.innerText = message;

    document.body.appendChild(alertBox);

    setTimeout(() => {
        alertBox.classList.add("show");
    }, 100);

    setTimeout(() => {
        alertBox.classList.remove("show");

        setTimeout(() => {
            alertBox.remove();
        }, 300);
    }, 3000);
}

// Update appointment status to "Completed"

function markCompleted(id) {

    fetch("backend/update_status.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
            id: id,
            status: "Completed"
        })
    })
    .then(res => res.json())
    .then(() => loadData());
}
// Delete appointment

function deleteAppointment(id) {

    fetch("backend/delete_appointment.php", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({ id: id })
    })
    .then(res => res.json())
    .then(() => loadData());
}



// ================================
// Homepage Statistics Counter
// ================================


const counters = document.querySelectorAll(".counter");


counters.forEach(counter => {


    const updateCounter = () => {


        const target = +counter.getAttribute("data-target");


        const current = +counter.innerText;


        const increment = target / 100;



        if(current < target){


            counter.innerText =
            Math.ceil(current + increment);


            setTimeout(updateCounter,20);


        }else{


            counter.innerText = target + "+";


        }


    };


    updateCounter();


});

// =================================
// Mobile Navigation Menu updated
// =================================


const menuToggle =
document.getElementById("menu-toggle");


const navMenu =
document.querySelector(".navbar ul");



if(menuToggle){


menuToggle.addEventListener("click",()=>{


navMenu.classList.toggle("active");



});



}