let mobileQuery = window.matchMedia("(max-width: 1023px)");

document.addEventListener(
  "scroll",
  function () {
    const header = document.querySelector("#main-navbar");
    const hero = document.querySelector(".header__hero");
    if (!header) return;
    if (!mobileQuery.matches && window.scrollY >= 64) {
      header.classList.add("scrolled");
      hero.classList.add("hero-scrolled");
    } else {
      header.classList.remove("scrolled");
      hero.classList.remove("hero-scrolled");
    }
  },
  { passive: true },
);

document.addEventListener("DOMContentLoaded", function () {
  const footerYear = document.querySelector("#footer-year");
  if (footerYear) {
    footerYear.textContent = String(new Date().getFullYear());
  }

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

  const mobileMenu = document.querySelector(".nav__mobile");
  const mobileToggle = document.querySelector(".nav__toggle");
  const mobileLinks = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll("a"))
    : [];
  const mobileItems = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll(".mobile-menu__item"))
    : [];
  const mobileToggles = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll(".mobile-menu__toggle"))
    : [];
  const mobileSegments = mobileMenu
    ? Array.from(mobileMenu.querySelectorAll(".mobile-menu__segment-btn"))
    : [];
  let openMobileMenu = function () {};
  let closeMobileMenu = function () {};

  if (mobileMenu && mobileToggle) {
    openMobileMenu = function () {
      mobileMenu.classList.add("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileToggle.classList.add("burger-open");
      mobileToggle.setAttribute("aria-expanded", "true");
      mobileToggle.setAttribute("aria-label", "Close menu");
      //   document.body.classList.add("mobile-nav-open");
    };

    closeMobileMenu = function () {
      mobileMenu.classList.remove("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      mobileToggle.classList.remove("burger-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.setAttribute("aria-label", "Open menu");
      //   document.body.classList.remove("mobile-nav-open");
      mobileItems.forEach(function (item) {
        item.classList.remove("mobile-open");
      });
    };

    mobileToggle.addEventListener("click", function () {
      const isOpen = mobileMenu.classList.contains("mobile-open");
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = function (event) {
      if (event.matches) {
        closeMobileMenu();
      }
    };
    if (desktopQuery.matches) {
      closeMobileMenu();
    }
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopChange);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleDesktopChange);
    }
  }

  mobileToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const item = toggle.closest(".mobile-menu__item");
      if (!item) return;

      const isOpen = item.classList.contains("is-open");
      // is-open is a flag
      // close others
      mobileItems.forEach((other) => {
        if (other !== item) {
          other.classList.remove("is-open");
          const otherToggle = other.querySelector(".mobile-menu__toggle");
          if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
        }
      });

      // toggle this one
      item.classList.toggle("is-open", !isOpen);
      toggle.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  mobileSegments.forEach(function (button) {
    button.addEventListener("click", function () {
      mobileSegments.forEach(function (otherButton) {
        otherButton.classList.remove("is-active");
      });
      button.classList.add("is-active");
    });
  });

  mobileLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      closeMobileMenu();
    });
  });

  //   COnTACT MODAL BELow

  const contactModal = document.querySelector("#contact-modal");
  const contactTriggers = Array.from(
    document.querySelectorAll(".banner__contact, .js-contact-trigger"),
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
