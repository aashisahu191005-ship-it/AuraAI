// FORM

const forgotForm =
document.getElementById(
"forgotForm"
);

// INPUT

const emailInput =
document.getElementById(
"email"
);

// ERROR

const emailError =
document.getElementById(
"emailError"
);

// SUCCESS

const successBox =
document.getElementById(
"successBox"
);

// ======================================
// SUBMIT
// ======================================

forgotForm.addEventListener(
"submit",
function(event){

    event.preventDefault();

    // RESET
    emailError.style.display =
    "none";

    emailInput.classList.remove(
    "input-error"
    );

    // VALIDATION
    if(emailInput.value.trim() === ""){

        emailError.style.display =
        "block";

        emailInput.classList.add(
        "input-error"
        );

        return;

    }

    // SUCCESS
    forgotForm.style.display =
    "none";

    successBox.style.display =
    "block";

    // REDIRECT

    setTimeout(() => {

        window.location.href =
        "login.html";

    }, 2500);

});

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