// ==========================================
// BELLAJ GLOBAL AGENCY - SCRIPT.JS
// ==========================================


// ==========================================
// MOBILE MENU
// ==========================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");


// Open / close mobile navigation
if (menuToggle && navLinks) {

    menuToggle.addEventListener("click", () => {

        navLinks.classList.toggle("active");

    });


    // Close mobile menu after clicking a navigation link
    document.querySelectorAll(".nav-links a").forEach(link => {

        link.addEventListener("click", () => {

            navLinks.classList.remove("active");

        });

    });

}


// ==========================================
// CONTACT FORM - FORMSPREE
// ==========================================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");


if (contactForm && formMessage) {

    contactForm.addEventListener("submit", async function (e) {

        // Stop the browser from leaving the page
        e.preventDefault();


        // Get the submit button
        const submitBtn =
            contactForm.querySelector('button[type="submit"]');


        // Store original button text
        const originalText = submitBtn.textContent;


        // Disable button while sending
        submitBtn.disabled = true;

        submitBtn.textContent = "Sending...";


        // Clear previous message
        formMessage.textContent = "";

        formMessage.style.color = "";


        try {

            // Send form data to Formspree
            const response = await fetch(
                contactForm.action,
                {
                    method: "POST",

                    body: new FormData(contactForm),

                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            // ==========================================
            // SUCCESS
            // ==========================================

            if (response.ok) {

                formMessage.textContent =
                    "Thank you! Your message has been sent successfully. We will get back to you soon.";

                formMessage.style.color = "#38a169";

                formMessage.style.fontWeight = "600";


                // Clear the form
                contactForm.reset();

            }


            // ==========================================
            // FORM ERROR
            // ==========================================

            else {

                let data = {};

                try {

                    data = await response.json();

                } catch (error) {

                    data = {};

                }


                if (data.errors) {

                    formMessage.textContent =
                        data.errors
                            .map(error => error.message)
                            .join(", ");

                } else {

                    formMessage.textContent =
                        "Oops! There was a problem sending your message.";

                }


                formMessage.style.color = "#e53e3e";

            }

        }


        // ==========================================
        // NETWORK ERROR
        // ==========================================

        catch (error) {

            formMessage.textContent =
                "Network error. Please try again or email us directly at ondusob@gmail.com";

            formMessage.style.color = "#e53e3e";

        }


        // ==========================================
        // RESTORE BUTTON
        // ==========================================

        finally {

            submitBtn.disabled = false;

            submitBtn.textContent = originalText;


            // Remove message after 8 seconds
            setTimeout(() => {

                formMessage.textContent = "";

            }, 8000);

        }

    });

}


// ==========================================
// POSTER
// ==========================================
//
// poster.jpeg is handled directly by HTML/CSS.
// No JavaScript is required for the poster.
//
// HTML:
// <img src="images/poster.jpeg"
//      class="advert-poster"
//      alt="Bellaj Global Agency Recruitment Services">
//
// ==========================================