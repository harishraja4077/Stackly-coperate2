// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 3000); // 3 seconds to match the reference site progress bar
    }
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// Stats Count Up Animation
const stats = document.querySelectorAll(".stat-number");
const statsSection = document.querySelector(".stats-section");

const countUp = (el) => {
    const target = +el.getAttribute("data-target");
    const count = +el.innerText;
    const speed = 200; // Adjust for faster/slower animation
    const inc = target / speed;

    if (count < target) {
        el.innerText = Math.ceil(count + inc);
        setTimeout(() => countUp(el), 1);
    } else {
        el.innerText = target;
    }
};

let animated = false;
const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animated) {
        stats.forEach(countUp);
        animated = true;
    }
}, { threshold: 0.5 });

if (statsSection) {
    statsObserver.observe(statsSection);
}

// CTA VALIDATION
const ctaSubmit = document.getElementById("cta-submit");
const ctaEmail = document.getElementById("cta-email");

if (ctaSubmit && ctaEmail) {
    ctaSubmit.addEventListener("click", () => {
        if (ctaEmail.value.trim() === "") {
            ctaEmail.placeholder = "Please enter your email id!";
            ctaEmail.classList.add("error");
            
            // Reset error state after 3 seconds
            setTimeout(() => {
                ctaEmail.placeholder = "Enter your email address";
                ctaEmail.classList.remove("error");
            }, 3000);
        } else {
            // Redirect to 404page.html when email is entered
            window.location.href = "404page.html";
        }
    });
}

// MOBILE SIDEBAR
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links li a");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        // Toggle between bars and times icon
        const icon = hamburger.querySelector("i");
        if (navLinks.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        }
    });

    // Close sidebar when a link is clicked
    navItems.forEach(item => {
        item.addEventListener("click", () => {
            navLinks.classList.remove("active");
            const icon = hamburger.querySelector("i");
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
        });
    });
}

// Redirect all non-existing pages to 404
document.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== "index.html" && href !== "#" && !href.startsWith("http") && !href.startsWith("#")) {
            e.preventDefault();
            window.location.href = "404page.html";
        }
    });
});