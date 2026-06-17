// Theme toggle functionality
const themeToggle = document.getElementById("themeToggle");
const htmlElement = document.documentElement;

// Load saved theme preference or default to dark mode
const savedTheme = localStorage.getItem("theme") || "dark";
if (savedTheme === "light") {
  htmlElement.classList.add("light-mode");
  themeToggle.checked = true;
}

// Toggle theme on checkbox change
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    htmlElement.classList.add("light-mode");
    localStorage.setItem("theme", "light");
  } else {
    htmlElement.classList.remove("light-mode");
    localStorage.setItem("theme", "dark");
  }
});

// Smooth scroll for all navigation links
document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", function (e) {
    e.preventDefault();
    const targetElement = document.querySelector(this.getAttribute("href"));

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});

// Update active navigation link based on scroll position
window.addEventListener(
  "scroll",
  () => {
    let currentSection = "";
    const sections = document.querySelectorAll("section");

    sections.forEach((section) => {
      if (pageYOffset >= section.offsetTop - 200) {
        currentSection = section.getAttribute("id");
      }
    });

    // Update active link styling
    document.querySelectorAll("nav a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSection}`) {
        link.classList.add("active");
      }
    });
  },
  { passive: true },
);

// Fade in project cards when they enter viewport
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -100px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Apply fade-in animation to cards
document.querySelectorAll(".card").forEach((card) => {
  card.style.opacity = "0";
  card.style.transform = "translateY(20px)";
  card.style.transition = "opacity 0.6s ease, transform 0.6s ease";
  observer.observe(card);
});
