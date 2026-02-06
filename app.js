document.addEventListener(
  "scroll",
  function () {
    const header = document.querySelector("#main-navbar");
    if (!header) return;
    if (window.scrollY >= 60) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  },
  { passive: true },
);

document.addEventListener("DOMContentLoaded", function () {
  const panels = Array.from(document.querySelectorAll(".hero__panels .panel"));
  const heroTitle = document.querySelector(".hero__title");
  if (panels.length && heroTitle) {
    const titles = [
      "Disciplined Design",
      "Long-term conviction",
      "Exceptional service",
      "Value",
    ];
    let index = 0;
    let rotationTimer;

    const startRotation = function () {
      clearInterval(rotationTimer);
      rotationTimer = setInterval(function () {
        index = (index + 1) % titles.length; // no hardcoding needed, wrap index back to 0 at end
        updateHero();
      }, 10000);
    };

    const updateHero = function () {
      panels.forEach(function (panel, panelIndex) {
        panel.classList.toggle("active", panelIndex === index);
      });
      heroTitle.innerHTML = titles[index] + "<br />for your website.";
    };

    panels.forEach(function (panel, panelIndex) {
      panel.addEventListener("click", function () {
        index = panelIndex;
        updateHero();
        startRotation();
      });
    });

    updateHero();
    startRotation();
  }

  const burger = document.querySelector(".nav__toggle");
  const mobileMenu = document.querySelector(".nav__mobile");
  burger.addEventListener("click", () => {
    const open = burger.classList.toggle("burger-open");
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    mobileMenu.classList.toggle("mobile-open", open);
  });

  const contactModal = document.querySelector("#contact-modal");
  const contactTriggers = Array.from(
    document.querySelectorAll(".banner__contact"),
  );
  let closeModal;

  if (contactModal && contactTriggers.length) {
    const closeButton = contactModal.querySelector(".contact-modal__close");
    const modalForm = contactModal.querySelector(".contact-modal__form");
    let lastFocusedElement = null;

    const openModal = function () {
      lastFocusedElement = document.activeElement;
      contactModal.classList.add("is-open");
      contactModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      closeButton && closeButton.focus();
    };

    closeModal = function () {
      contactModal.classList.remove("is-open");
      contactModal.setAttribute("aria-hidden", "true");
      document.body.classList.remove("modal-open");
      if (
        lastFocusedElement &&
        typeof lastFocusedElement.focus === "function"
      ) {
        lastFocusedElement.focus();
      }
    };

    contactTriggers.forEach(function (trigger) {
      trigger.addEventListener("click", function (event) {
        event.preventDefault();
        closeMobileMenu();
        openModal();
      });
    });

    closeButton &&
      closeButton.addEventListener("click", function () {
        closeModal();
      });

    contactModal.addEventListener("click", function (event) {
      if (event.target === contactModal) {
        closeModal();
      }
    });

    modalForm &&
      modalForm.addEventListener("submit", function (event) {
        event.preventDefault();
        closeModal();
      });
  }

  const serviceBoxes = Array.from(
    document.querySelectorAll(".main__right--box"),
  );
  if (serviceBoxes.length) {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");

    const closeAllBoxes = function () {
      serviceBoxes.forEach(function (box) {
        box.classList.remove("is-open");
      });
    };

    const handleBoxClick = function (event) {
      if (!mobileQuery.matches) return; // only toggle on mobile
      if (event.target.closest("a")) return; // don't toggle if clicking a link inside the box
      const box = event.currentTarget;
      const isOpen = box.classList.contains("is-open");
      closeAllBoxes();
      if (!isOpen) {
        box.classList.add("is-open");
      }
    };

    serviceBoxes.forEach(function (box) {
      box.addEventListener("click", handleBoxClick);
    });

    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", function (event) {
        if (!event.matches) {
          closeAllBoxes();
        }
      });
    } else if (typeof mobileQuery.addListener === "function") {
      // addListener for older browsers
      mobileQuery.addListener(function (event) {
        if (!event.matches) {
          closeAllBoxes();
        }
      });
    }
  }

  document.addEventListener("keydown", function (event) {
    if (event.key !== "Escape") return;
    if (mobileMenu && mobileMenu.classList.contains("is-open")) {
      closeMobileMenu();
      return;
    }
    if (
      contactModal &&
      contactModal.classList.contains("is-open") &&
      typeof closeModal === "function"
    ) {
      closeModal();
    }
  });
});
