/* ---------- REUSABLE VALIDATION FUNCTIONS ---------- */

function validateName(name) {
    return name.length >= 3;
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validateFeedback(text) {
    return text.length >= 5;
}


/* ---------- KEYPRESS VALIDATION ---------- */

document.getElementById("name").addEventListener("keyup", function () {
    if (!validateName(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});

document.getElementById("email").addEventListener("keyup", function () {
    if (!validateEmail(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});

document.getElementById("feedback").addEventListener("keyup", function () {
    if (!validateFeedback(this.value)) {
        this.style.borderColor = "red";
    } else {
        this.style.borderColor = "green";
    }
});


/* ---------- DOUBLE CLICK SUBMIT EVENT ---------- */

document.getElementById("submitBtn")
.addEventListener("dblclick", submitForm);


/* ---------- SUBMIT FUNCTION ---------- */

function submitForm() {

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const feedback = document.getElementById("feedback").value;
    const message = document.getElementById("message");

    if (
        validateName(name) &&
        validateEmail(email) &&
        validateFeedback(feedback)
    ) {
        message.style.color = "green";
        message.innerText = "✅ Feedback submitted successfully!";
    } else {
        message.style.color = "red";
        message.innerText = "❌ Please fill all fields correctly.";
    }
}