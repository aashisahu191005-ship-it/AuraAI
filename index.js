// index.js

// SMOOTH FADE-IN ANIMATION

const revealElements =
document.querySelectorAll(
".hero-section, .stats-section, .features-section, .about-section, .cta-section, .footer"
);

const revealOnScroll = () => {

    const triggerBottom =
    window.innerHeight * 0.85;

    revealElements.forEach(element => {

        const elementTop =
        element.getBoundingClientRect().top;

        if(elementTop < triggerBottom){

            element.classList.add("show");

        }

    });

};

// ADD SHOW CLASS

revealElements.forEach(section => {

    section.classList.add("show");

});

// SCROLL EVENT

window.addEventListener(
"scroll",
revealOnScroll
);

// INITIAL LOAD

window.addEventListener(
"load",
revealOnScroll
);

// BUTTON GLOW EFFECT

const buttons =
document.querySelectorAll(
".primary-btn, .secondary-btn, .cta-btn, .get-started-btn"
);

buttons.forEach(button => {

    button.addEventListener(
    "mouseenter",
    () => {

        button.style.transform =
        "translateY(-2px)";

    });

    button.addEventListener(
    "mouseleave",
    () => {

        button.style.transform =
        "translateY(0px)";

    });

});