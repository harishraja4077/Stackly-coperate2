// Force scroll to top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 1500); // 1.5 seconds for a faster loading experience
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
const ctaForm = document.getElementById("cta-form");
const ctaEmail = document.getElementById("cta-email");
const ctaError = document.getElementById("cta-error");

if (ctaForm && ctaEmail && ctaError) {
    ctaForm.addEventListener("submit", (e) => {
        e.preventDefault();

        const emailValue = ctaEmail.value.trim();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (emailValue === "") {
            ctaError.textContent = "Please enter your email address";
            showError();
        } else if (!emailPattern.test(emailValue)) {
            ctaError.textContent = "Please enter a valid email address";
            showError();
        } else {
            // Success - Redirect or show success message
            window.location.href = "404page.html";
        }
    });

    function showError() {
        ctaEmail.classList.add("error");
        ctaError.classList.add("show");

        // Vibration effect for error
        ctaForm.classList.add("shake");
        setTimeout(() => ctaForm.classList.remove("shake"), 500);

        // Reset error state after 3 seconds
        setTimeout(() => {
            ctaEmail.classList.remove("error");
            ctaError.classList.remove("show");
        }, 3000);
    }
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

// HERO PARALLAX
const hero = document.querySelector('.hero');
const heroGlow = document.querySelector('.hero-glow');

if (hero && heroGlow) {
    hero.addEventListener('mousemove', (e) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;

        const moveX = (clientX - innerWidth / 2) / 30;
        const moveY = (clientY - innerHeight / 2) / 30;

        heroGlow.style.transform = `translate(${moveX}px, ${moveY}px)`;
    });
}

// GLASS CARD MOUSE FOLLOW GLOW
const glassCards = document.querySelectorAll('.glass-card');
glassCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const { left, top } = card.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        card.style.setProperty('--x', `${x}px`);
        card.style.setProperty('--y', `${y}px`);
    });
});