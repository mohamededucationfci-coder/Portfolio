document.addEventListener("DOMContentLoaded", function () {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");
  const form = document.getElementById("contactForm");
  const formMessage = document.getElementById("form-message");
  const scrollTopButton = document.querySelector(".scroll-top");
  const yearElement = document.getElementById("year");
  const revealElements = document.querySelectorAll(".reveal");

  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  if (navToggle && mainNav) {
    navToggle.addEventListener("click", function () {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (mainNav) {
        mainNav.classList.remove("open");
      }

      if (navToggle) {
        navToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  function updateActiveNavLink() {
    const scrollPosition = window.scrollY + 160;

    sections.forEach(function (section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");
      const activeLink = document.querySelector('.nav-link[href="#' + sectionId + '"]');

      if (activeLink) {
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          navLinks.forEach(function (navLink) {
            navLink.classList.remove("active");
          });
          activeLink.classList.add("active");
        }
      }
    });
  }

  updateActiveNavLink();
  window.addEventListener("scroll", updateActiveNavLink);

  function setFieldState(input, valid) {
    if (input) {
      input.classList.toggle("invalid", !valid);
      input.setAttribute("aria-invalid", String(!valid));
    }
  }

  if (form) {
    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const nameInput = document.getElementById("name");
      const emailInput = document.getElementById("email");
      const messageInput = document.getElementById("message");

      const nameValue = nameInput ? nameInput.value.trim() : "";
      const emailValue = emailInput ? emailInput.value.trim() : "";
      const messageValue = messageInput ? messageInput.value.trim() : "";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      let isValid = true;

      if (!nameInput || nameValue === "") {
        isValid = false;
        setFieldState(nameInput, false);
      } else {
        setFieldState(nameInput, true);
      }

      if (!emailInput || emailValue === "" || !emailPattern.test(emailValue)) {
        isValid = false;
        setFieldState(emailInput, false);
      } else {
        setFieldState(emailInput, true);
      }

      if (!messageInput || messageValue === "") {
        isValid = false;
        setFieldState(messageInput, false);
      } else {
        setFieldState(messageInput, true);
      }

      if (!formMessage) {
        return;
      }

      if (!isValid) {
        formMessage.textContent = "Please complete all required fields with valid information.";
        formMessage.classList.remove("success");
        formMessage.classList.add("error");
        return;
      }

      formMessage.textContent = "Thanks! Your message has been received locally. A backend is required to send real messages.";
      formMessage.classList.remove("error");
      formMessage.classList.add("success");
      form.reset();

      [nameInput, emailInput, messageInput].forEach(function (field) {
        if (field) {
          setFieldState(field, true);
        }
      });
    });
  }

  if (scrollTopButton) {
    const toggleScrollButton = function () {
      if (window.scrollY > 300) {
        scrollTopButton.classList.add("visible");
      } else {
        scrollTopButton.classList.remove("visible");
      }
    };

    toggleScrollButton();
    window.addEventListener("scroll", toggleScrollButton);

    scrollTopButton.addEventListener("click", function () {
      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    });
  }

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12
    });

    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(function (element) {
      element.classList.add("visible");
    });
  }
});
