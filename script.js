// =====================================
// ELEMENTS
// =====================================

const title = document.getElementById("title");
const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

const buttons = document.querySelector(".buttons");

const success = document.getElementById("success");

// =====================================
// TYPEWRITER
// =====================================

const heading = "Hey Shivangi!";

title.textContent = "";

let letter = 0;

function typeWriter(){

    if(letter < heading.length){

        title.textContent += heading.charAt(letter);

        letter++;

        setTimeout(typeWriter,55);

    }else{

        title.innerHTML += '<span class="cursor">|</span>';

    }

}

window.onload=()=>{

    typeWriter();

}

// =====================================
// FLOATING SPARKLES
// =====================================

function sparkle(){

    const star=document.createElement("div");

    star.className="sparkle";

    star.innerHTML="✦";

    star.style.left=Math.random()*window.innerWidth+"px";

    star.style.top=Math.random()*window.innerHeight+"px";

    star.style.fontSize=(10+Math.random()*12)+"px";

    document.body.appendChild(star);

    setTimeout(()=>{

        star.remove();

    },2500);

}

setInterval(sparkle,300);

// =====================================
// RUNAWAY BUTTON
// =====================================

let dodges=0;

const messages=[

"Nice try 😄",

"Almost!",

"Persistent 😅",

"You've nearly got me!",

"Okay... last one!"

];

function moveNoButton(){

    if(dodges>=5){

        noBtn.innerText="Not this time";

        return;

    }

    noBtn.innerText=messages[dodges];

    dodges++;

    const padding=50;

    const maxX=window.innerWidth-noBtn.offsetWidth-padding;

    const maxY=window.innerHeight-noBtn.offsetHeight-padding;

    noBtn.style.position="fixed";

    noBtn.style.left=Math.random()*maxX+"px";

    noBtn.style.top=Math.random()*maxY+"px";

}

noBtn.addEventListener("mouseenter",moveNoButton);

// =====================================
// YES BUTTON
// =====================================

yesBtn.addEventListener("click", showSuccess);

function showSuccess() {

    buttons.style.display = "none";

    success.style.display = "block";

    success.style.opacity = "0";
    success.style.transform = "translateY(20px)";

    setTimeout(() => {

        success.style.transition = ".5s ease";
        success.style.opacity = "1";
        success.style.transform = "translateY(0)";

    }, 50);

    launchConfetti();

}

// =====================================
// CONFETTI
// =====================================

function launchConfetti() {

    const icons = ["🟨", "⭐", "✨"];

    for (let i = 0; i < 120; i++) {

        const piece = document.createElement("div");

        piece.innerHTML = icons[Math.floor(Math.random() * icons.length)];

        piece.style.position = "fixed";

        piece.style.left = Math.random() * window.innerWidth + "px";

        piece.style.top = "-30px";

        piece.style.fontSize = (12 + Math.random() * 14) + "px";

        piece.style.pointerEvents = "none";

        piece.style.transition = "transform 3s linear, opacity 3s";

        document.body.appendChild(piece);

        requestAnimationFrame(() => {

            piece.style.transform =
                `translateY(${window.innerHeight + 80}px) rotate(${Math.random() * 720}deg)`;

            piece.style.opacity = "0";

        });

        setTimeout(() => {

            piece.remove();

        }, 3000);

    }

}

// =====================================
// DATE CONFIRMATION
// =====================================

const confirmBtn = document.getElementById("confirmBtn");
const datePicker = document.getElementById("datePicker");

confirmBtn.addEventListener("click", confirmDate);

function confirmDate() {

    if (datePicker.value === "") {

        alert("Please pick a date first 😊");

        return;

    }

    const chosenDate = new Date(datePicker.value);

    const options = {

        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"

    };

    const formatted = chosenDate.toLocaleDateString("en-US", options);

    success.innerHTML = `

        <h2>Perfect! ☕</h2>

        <p>
            Looking forward to meeting you.
        </p>

        <p>
            <strong>${formatted}</strong>
            sounds like a great plan.
        </p>

        <p>
            I'll take care of the planning.
            You just focus on feeling your best.
        </p>

    `;

    sendToGoogleSheets(formatted);

}

// =====================================
// GOOGLE SHEETS
// =====================================

// Replace the URL below with your
// Google Apps Script Web App URL

const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwgPUu51A5uA4NHWD9xaiThC0Fi1L66CJgWD2GkjDvu4Ia6NhHrotUUyVlF4wHkdXOToA/exec";

function sendToGoogleSheets(date) {

    fetch(SCRIPT_URL, {

        method: "POST",

        mode: "no-cors",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            person: "Shivangi",

            date: date,

            submitted: new Date().toLocaleString()

        })

    })
    .then(() => {

        console.log("Sent successfully");

    })
    .catch((error) => {

        console.error("Error:", error);

    });

}