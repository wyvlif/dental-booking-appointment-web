/* ==========================================
   DENTALCARE AI CHATBOT
========================================== */

const chatButton = document.getElementById("chatButton");
const chatWindow = document.getElementById("chatWindow");
const closeChat = document.getElementById("closeChat");

const sendButton = document.getElementById("sendMessage");
const userInput = document.getElementById("userMessage");
const chatBody = document.getElementById("chatBody");

/* Open Chat */

chatButton.addEventListener("click", () => {

    chatWindow.style.display = "flex";

});

/* Close Chat */

closeChat.addEventListener("click", () => {

    chatWindow.style.display = "none";

});

/* Send Message */

sendButton.addEventListener("click", sendMessage);

userInput.addEventListener("keypress", function(e){

    if(e.key==="Enter"){

        sendMessage();

    }

});

function sendMessage(){

    let message = userInput.value.trim();

    if(message==="") return;

    addUserMessage(message);

    userInput.value="";

    setTimeout(function(){

        botReply(message.toLowerCase());

    },500);

}

/* Add User Message */

function addUserMessage(text){

    let div=document.createElement("div");

    div.className="user-message";

    div.innerHTML=text;

    chatBody.appendChild(div);

    scrollBottom();

}

/* Add Bot Message */

function addBotMessage(text){

    let div=document.createElement("div");

    div.className="bot-message";

    div.innerHTML=text;

    chatBody.appendChild(div);

    scrollBottom();

}

/* Auto Scroll */

function scrollBottom(){

    chatBody.scrollTop=chatBody.scrollHeight;

}

/* Dental Knowledge */

function botReply(message){

    let reply="";


    if(message.includes("hello") || message.includes("hi")){


        reply="Welcome to DentalCare Pro. How may I help you today?";

    }

    else if(message.includes("tooth pain") || message.includes("pain")){

        reply="🦷 Tooth pain may be caused by decay, infection, gum disease, or trauma. Please book an appointment so the dentist can examine you.";

    }

    else if(message.includes("cleaning") || message.includes("scaling")){

        reply="✨ Professional dental cleaning removes plaque and tartar to help prevent gum disease and keep your smile healthy.";

    }

    else if(message.includes("braces")){

        reply="😁 Braces are used to straighten teeth and improve your bite. Adults and children can both benefit from orthodontic treatment.";

    }

    else if(message.includes("whitening")){

        reply="🤍 Professional teeth whitening safely brightens your smile. A dental examination is recommended before treatment.";

    }

    else if(message.includes("root canal")){

        reply="🦷 Root canal treatment removes infection from inside the tooth and helps preserve the natural tooth.";

    }

    else if(message.includes("denture") || message.includes("bridge")){

        reply="🦷 Dentures and bridges replace missing teeth, improving appearance, speech, and chewing function.";

    }

    else if(message.includes("appointment") || message.includes("book")){

        reply='📅 You can book an appointment online by clicking <br><br><a href="appointment.html" style="color:#0d6efd;font-weight:bold;">Book Appointment</a>';

    }

    else if(message.includes("hours") || message.includes("open")){

        reply="🕒 Our clinic is open Monday–Friday: 8:00 AM–8:00 PM and Saturday and sunday: 8:00 AM–5:00 PM.";

    }

    else if(message.includes("location") || message.includes("where")){

        reply='📍 We are located in Gahanga, Kigali, Rwanda. Visit the Contact page for directions.';

    }

    else if(message.includes("thank")){

        reply="😊 You're welcome! If you have more dental questions, I'm always here to help.";

    }

    else{

        reply="🤖 I'm still learning. Please for more and clearer information you can book appointments with our dentists.";

    }

    addBotMessage(reply);

}

const quickButtons=document.querySelectorAll(".quick-btn");

quickButtons.forEach(button=>{

button.addEventListener("click",()=>{

userInput.value=button.dataset.question;

sendMessage();

});

});