// FAQ ACCORDION

const faqItems =
document.querySelectorAll(
".faq-item"
);

faqItems.forEach(item => {

    const question =
    item.querySelector(
    ".faq-question"
    );

    question.addEventListener(
    "click",
    () => {

        item.classList.toggle(
        "active"
        );

    });

});

// MODAL SYSTEM

const modalOverlay =
document.getElementById(
"modalOverlay"
);

const modalContent =
document.getElementById(
"modalContent"
);

const closeModal =
document.getElementById(
"closeModal"
);

const helpButtons =
document.querySelectorAll(
".help-btn"
);

// MODAL DATA

const modalData = {

technical: `
    <h2>Technical Support</h2>

    <ul>
        <li>Dashboard loading issues</li>
        <li>Resume upload problems</li>
        <li>Login and signup issues</li>
        <li>File upload compatibility</li>
        <li>AI analysis loading problems</li>
    </ul>
`,

account: `
    <h2>Account Help</h2>

    <ul>
        <li>Password reset assistance</li>
        <li>Account recovery help</li>
        <li>Email update guidance</li>
        <li>Profile settings support</li>
    </ul>
`,

resume: `
    <h2>Resume Analysis Help</h2>

    <ul>
        <li>Resume score explanation</li>
        <li>ATS optimization tips</li>
        <li>AI analysis guidance</li>
        <li>Resume improvement recommendations</li>
    </ul>
`,

internship: `
    <h2>Internship Guidance</h2>

    <ul>
        <li>Internship preparation tips</li>
        <li>Resume building guidance</li>
        <li>Interview preparation support</li>
        <li>Student career growth help</li>
    </ul>
`,

career: `
    <h2>AI Career Insights</h2>

    <ul>
        <li>Career growth suggestions</li>
        <li>AI-powered recommendations</li>
        <li>Industry trend insights</li>
        <li>Skill improvement guidance</li>
    </ul>
`

};

// OPEN MODAL

helpButtons.forEach(button => {

    button.addEventListener(
    "click",
    () => {

        const modalName =
        button.dataset.modal;

        modalContent.innerHTML =
        modalData[modalName];

        modalOverlay.classList.add(
        "active"
        );

    });

});

// CLOSE MODAL

function closePopup(){

    modalOverlay.classList.remove(
    "active"
    );

}

closeModal.addEventListener(
"click",
closePopup
);

// OUTSIDE CLICK

modalOverlay.addEventListener(
"click",
(event) => {

    if(event.target === modalOverlay){

        closePopup();

    }

});

// ESC KEY

document.addEventListener(
"keydown",
(event) => {

    if(event.key === "Escape"){

        closePopup();

    }

});

// SUPPORT FORM

const supportForm =
document.getElementById(
"supportForm"
);

const clearForm =
document.getElementById(
"clearForm"
);

const successMessage =
document.getElementById(
"successMessage"
);

// SEND MESSAGE

supportForm.addEventListener(
"submit",
function(event){

    event.preventDefault();

    successMessage.style.display =
    "block";

});

// CLEAR FORM

clearForm.addEventListener(
"click",
() => {

    supportForm.reset();

    successMessage.style.display =
    "none";

});