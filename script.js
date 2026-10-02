document.addEventListener("DOMContentLoaded", () => {
  // -----------------------------
  // Dark / Light theme
  // -----------------------------
  const body = document.body;
  const themeToggle = document.getElementById("themeToggle");
  const themeIcon = themeToggle.querySelector("i");

  if (localStorage.getItem("portfolio-theme") === "dark") {
    body.classList.add("dark");
    themeIcon.className = "bi bi-sun";
  }

  themeToggle.addEventListener("click", () => {
    body.classList.toggle("dark");

    const isDark = body.classList.contains("dark");
    localStorage.setItem("portfolio-theme", isDark ? "dark" : "light");
    themeIcon.className = isDark ? "bi bi-sun" : "bi bi-moon";
  });

  // -----------------------------
  // Project filtering
  // -----------------------------
  const filterButtons = document.querySelectorAll(".project-filter");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");

      const filter = button.dataset.filter;

      projectItems.forEach(item => {
        const category = item.dataset.category;
        item.style.display =
          filter === "all" || category === filter ? "" : "none";
      });
    });
  });

  // -----------------------------
  // Contact form validation
  // -----------------------------
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("formMessage");

  form.addEventListener("submit", event => {
    event.preventDefault();

    const fields = form.querySelectorAll("input, textarea");
    let valid = true;

    fields.forEach(field => {
      if (!field.checkValidity()) {
        field.classList.add("is-invalid");
        valid = false;
      } else {
        field.classList.remove("is-invalid");
      }
    });

    if (!valid) {
      formMessage.textContent = "Please fill in all required fields correctly.";
      formMessage.style.color = "#ff7f98";
      return;
    }

    formMessage.textContent = "Your message has been validated successfully.";
    formMessage.style.color = "#73dfa7";
    form.reset();
  });

  // Remove validation error while typing
  form.querySelectorAll("input, textarea").forEach(field => {
    field.addEventListener("input", () => {
      if (field.checkValidity()) {
        field.classList.remove("is-invalid");
      }
    });
  });

  // -----------------------------
  // Active navigation
  // -----------------------------
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });

  sections.forEach(section => observer.observe(section));

  // Current year
  document.getElementById("year").textContent = new Date().getFullYear();
});
