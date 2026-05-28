// signup.js

// FORM

const signupForm =
document.getElementById("signupForm");

// INPUTS

const fullName =
document.getElementById("fullName");

const email =
document.getElementById("email");

const passwordInput =
document.getElementById("password");

const confirmPasswordInput =
document.getElementById("confirmPassword");

const termsCheckbox =
document.getElementById("termsCheckbox");

// ERRORS

const passwordError =
document.getElementById("passwordError");

const nameError =
document.getElementById("nameError");

const emailError =
document.getElementById("emailError");

const passwordFieldError =
document.getElementById("passwordFieldError");

const termsError =
document.getElementById("termsError");

// ======================================
// REAL TIME PASSWORD VALIDATION
// ======================================

confirmPasswordInput.addEventListener(
"input",
validatePasswords
);

passwordInput.addEventListener(
"input",
validatePasswords
);

// ======================================
// VALIDATE PASSWORDS
// ======================================

function validatePasswords(){

    const password =
    passwordInput.value.trim();

    const confirmPassword =
    confirmPasswordInput.value.trim();

    // EMPTY
    if(confirmPassword === ""){

        passwordError.style.display = "none";

        confirmPasswordInput.classList.remove(
        "input-error",
        "input-success"
        );

        return;

    }

    // NOT MATCHING
    if(password !== confirmPassword){

        passwordError.style.display = "block";

        confirmPasswordInput.classList.add(
        "input-error"
        );

        confirmPasswordInput.classList.remove(
        "input-success"
        );

    }

    // MATCHING
    else{

        passwordError.style.display = "none";

        confirmPasswordInput.classList.remove(
        "input-error"
        );

        confirmPasswordInput.classList.add(
        "input-success"
        );

    }

}

// ======================================
// FORM SUBMIT
// ======================================

signupForm.addEventListener(
"submit",
function(event){

    // STOP DEFAULT
    event.preventDefault();

    // RESET
    resetErrors();

    let isValid = true;

    // NAME VALIDATION
    if(fullName.value.trim() === ""){

        nameError.style.display = "block";

        fullName.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // EMAIL VALIDATION
    if(email.value.trim() === ""){

        emailError.style.display = "block";

        email.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // PASSWORD VALIDATION
    if(passwordInput.value.trim() === ""){

        passwordFieldError.style.display =
        "block";

        passwordInput.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // CONFIRM PASSWORD
    if(
        passwordInput.value.trim() !==
        confirmPasswordInput.value.trim()
    ){

        passwordError.style.display =
        "block";

        confirmPasswordInput.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // TERMS
    if(!termsCheckbox.checked){

        termsError.style.display = "block";

        isValid = false;

    }

    // SUCCESS
    if(isValid){

        // FUTURE BACKEND READY

        console.log(
            "Signup validated successfully."
        );

        // REDIRECT
        window.location.href =
        "upload.html";

    }

});

// ======================================
// RESET ERRORS
// ======================================

function resetErrors(){

    // HIDE ERRORS
    nameError.style.display = "none";

    emailError.style.display = "none";

    passwordFieldError.style.display =
    "none";

    passwordError.style.display = "none";

    termsError.style.display = "none";

    // REMOVE INPUT ERROR
    fullName.classList.remove(
    "input-error"
    );

    email.classList.remove(
    "input-error"
    );

    passwordInput.classList.remove(
    "input-error"
    );

    confirmPasswordInput.classList.remove(
    "input-error"
    );

}