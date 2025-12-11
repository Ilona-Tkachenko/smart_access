// Мобільне меню
const burgerBtn = document.getElementById("burgerBtn");
const navMenu = document.getElementById("navMenu");

if (burgerBtn && navMenu) {
  burgerBtn.addEventListener("click", () => {
    navMenu.classList.toggle("open");
    burgerBtn.classList.toggle("active");
  });

  // Закривати меню при кліку по посиланню
  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      burgerBtn.classList.remove("active");
    });
  });
}

// Header scroll effect
const mainHeader = document.getElementById("mainHeader");

if (mainHeader) {
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      mainHeader.classList.add("scrolled");
    } else {
      mainHeader.classList.remove("scrolled");
    }
  });
}

// Форма зворотного зв'язку (без реальної відправки)
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    formMessage.textContent =
      "Дякуємо! Ваш запит отримано. З вами зв'яжуться після опрацювання інформації.";
    contactForm.reset();
  });
}

// Анімації при скролі
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Спостерігаємо за елементами з класами анімації
document.querySelectorAll(".fade-in, .slide-in-left, .slide-in-right").forEach((el) => {
  observer.observe(el);
});

// Анімовані лічильники
function animateCounter(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16);
  let current = start;

  const updateCounter = () => {
    current += increment;
    if (current < target) {
      element.textContent = Math.floor(current).toLocaleString("uk-UA");
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target.toLocaleString("uk-UA");
    }
  };

  updateCounter();
}

// Спостерігаємо за секцією статистики
const statsSection = document.querySelector(".stats-section");
const statNumbers = document.querySelectorAll(".stat-number");
let statsAnimated = false;

if (statsSection && statNumbers.length > 0) {
  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !statsAnimated) {
          statsAnimated = true;
          statNumbers.forEach((stat) => {
            const target = parseInt(stat.getAttribute("data-target"));
            animateCounter(stat, target);
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  statsObserver.observe(statsSection);
}

// Плавний скрол для навігаційних посилань
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    const href = this.getAttribute("href");
    if (href !== "#" && href.length > 1) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Кнопка "Наверх"
const scrollToTopBtn = document.getElementById("scrollToTop");

if (scrollToTopBtn) {
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.classList.add("visible");
    } else {
      scrollToTopBtn.classList.remove("visible");
    }
  });

  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// Таби
const tabButtons = document.querySelectorAll(".tab-btn");
const tabPanels = document.querySelectorAll(".tab-panel");

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const targetTab = button.getAttribute("data-tab");

    // Видаляємо активний клас з усіх кнопок та панелей
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    tabPanels.forEach((panel) => panel.classList.remove("active"));

    // Додаємо активний клас до вибраної кнопки та панелі
    button.classList.add("active");
    const targetPanel = document.getElementById(targetTab);
    if (targetPanel) {
      targetPanel.classList.add("active");
    }
  });
});

// FAQ акордеон
const faqQuestions = document.querySelectorAll(".faq-question");

faqQuestions.forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    const isActive = faqItem.classList.contains("active");

    // Закриваємо всі інші FAQ
    document.querySelectorAll(".faq-item").forEach((item) => {
      item.classList.remove("active");
    });

    // Відкриваємо/закриваємо поточний FAQ
    if (!isActive) {
      faqItem.classList.add("active");
    }
  });
});
