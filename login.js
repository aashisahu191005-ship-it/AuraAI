// FORM

const loginForm =
document.getElementById(
"loginForm"
);

// INPUTS

const emailInput =
document.getElementById(
"email"
);

const passwordInput =
document.getElementById(
"password"
);

// ERRORS

const emailError =
document.getElementById(
"emailError"
);

const passwordError =
document.getElementById(
"passwordError"
);

// ======================================
// LOGIN SUBMIT
// ======================================

loginForm.addEventListener(
"submit",
function(event){

    // STOP DEFAULT
    event.preventDefault();

    // RESET
    resetErrors();

    let isValid = true;

    // EMAIL
    if(emailInput.value.trim() === ""){

        emailError.style.display =
        "block";

        emailInput.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // PASSWORD
    if(passwordInput.value.trim() === ""){

        passwordError.style.display =
        "block";

        passwordInput.classList.add(
        "input-error"
        );

        isValid = false;

    }

    // SUCCESS
    if(isValid){

        // REDIRECT
        window.location.href =
        "upload.html";

    }

});

// ======================================
// RESET ERRORS
// ======================================

function resetErrors(){

    emailError.style.display =
    "none";

    passwordError.style.display =
    "none";

    emailInput.classList.remove(
    "input-error"
    );

    passwordInput.classList.remove(
    "input-error"
    );

}

// ======================================
// REAL TIME INPUT
// ======================================

emailInput.addEventListener(
"input",
() => {

    emailError.style.display =
    "none";

    emailInput.classList.remove(
    "input-error"
    );

});

passwordInput.addEventListener(
"input",
() => {

    passwordError.style.display =
    "none";

    passwordInput.classList.remove(
    "input-error"
    );

});