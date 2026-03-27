"use client";
import { useEffect } from "react";
import { ContactModal } from "../modals/ContactModal";
import { LicFooter } from "./LicFooter";
import { LicHeader } from "./LicHeader";
import { LicMain } from "./LicMain";

export function LicLanding() {
  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 1023px)");

    const header = document.querySelector<HTMLElement>("#main-navbar");
    const hero = document.querySelector<HTMLElement>(".header__hero");

    const handleScroll = () => {
      if (!header || !hero) return;
      if (!mobileQuery.matches && window.scrollY >= 64) {
        header.classList.add("scrolled");
        hero.classList.add("hero-scrolled");
      } else {
        header.classList.remove("scrolled");
        hero.classList.remove("hero-scrolled");
      }
    };

    document.addEventListener("scroll", handleScroll, { passive: true });

    // Keep parity with vanilla app.js
    const footerYear = document.querySelector<HTMLElement>("#footer-year");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    // hero panel rotation
    const panels = Array.from(
      document.querySelectorAll<HTMLElement>(".hero__panels .panel"),
    );
    const heroTitle = document.querySelector<HTMLElement>(".hero__title");
    const titles = [
      "Disciplined Design",
      "Long-term conviction",
      "Exceptional service",
      "Value",
    ];
    let index = 0;
    let rotationTimer: number | undefined;

    // hero panel rotation
    const updateHero = () => {
      panels.forEach((panel, panelIndex) => {
        panel.classList.toggle("active", panelIndex === index);
      });
      if (heroTitle) {
        heroTitle.innerHTML = `${titles[index]}<br />for your website.`;
      }
    };

    const startRotation = () => {
      window.clearInterval(rotationTimer);
      rotationTimer = window.setInterval(() => {
        index = (index + 1) % titles.length;
        updateHero();
      }, 10000);
    };
// every time the user clicks on a panel, the panel becomes active and the title changes
    if (panels.length && heroTitle) {
      panels.forEach((panel, panelIndex) => {
        panel.addEventListener("click", () => {
          index = panelIndex;
          updateHero();
          startRotation();
        });
      });
      updateHero();
      startRotation();
    }

    const mobileMenu = document.querySelector<HTMLElement>(".nav__mobile");
    const mobileToggle = document.querySelector<HTMLElement>(".nav__toggle");
    const mobileLinks = mobileMenu
      ? Array.from(mobileMenu.querySelectorAll<HTMLAnchorElement>("a"))
      : [];
    const mobileItems = mobileMenu
      ? Array.from(
          mobileMenu.querySelectorAll<HTMLElement>(".mobile-menu__item"),
        )
      : [];
    const mobileToggles = mobileMenu
      ? Array.from(
          mobileMenu.querySelectorAll<HTMLElement>(".mobile-menu__toggle"),
        )
      : [];

    let closeModalFn: (() => void) | undefined;

    const openMobileMenu = () => {
      if (!mobileMenu || !mobileToggle) return;
      mobileMenu.classList.add("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileToggle.classList.add("burger-open");
      mobileToggle.setAttribute("aria-expanded", "true");
      mobileToggle.setAttribute("aria-label", "Close menu");
    };

    const closeMobileMenu = () => {
      if (!mobileMenu || !mobileToggle) return;
      mobileMenu.classList.remove("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      mobileToggle.classList.remove("burger-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.setAttribute("aria-label", "Open menu");
      mobileItems.forEach((item) => {
        item.classList.remove("mobile-open");
      });
    };

    mobileToggle?.addEventListener("click", () => {
      if (!mobileMenu) return;
      const isOpen = mobileMenu.classList.contains("mobile-open");
      if (isOpen) closeMobileMenu();
      else openMobileMenu();
    });

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileMenu();
    };

    if (desktopQuery.matches) closeMobileMenu();
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopChange);
    }

    mobileToggles.forEach((toggle) => {
      toggle.addEventListener("click", () => {
        const item = toggle.closest<HTMLElement>(".mobile-menu__item");
        if (!item) return;

        const isOpen = item.classList.contains("is-open");

        // Close other items
        mobileItems.forEach((other) => {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherToggle = other.querySelector<HTMLElement>(
              ".mobile-menu__toggle",
            );
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
          }
        });

        item.classList.toggle("is-open", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", closeMobileMenu);
    });

    const contactModal = document.querySelector<HTMLElement>("#contact-modal");
    const contactTriggers = Array.from(
      document.querySelectorAll<HTMLElement>(
        ".banner__contact, .js-contact-trigger",
      ),
    );

    if (contactModal && contactTriggers.length) {
      const closeButton = contactModal.querySelector<HTMLElement>(
        ".contact-modal__close",
      );
      const modalForm = contactModal.querySelector<HTMLFormElement>(
        ".contact-modal__form",
      );
      let lastFocusedElement: Element | null = null;

      const openModal = () => {
        lastFocusedElement = document.activeElement;
        contactModal.classList.add("is-open");
        contactModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");
        closeButton?.focus();
      };

      const closeModal = () => {
        contactModal.classList.remove("is-open");
        contactModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
        if (lastFocusedElement && "focus" in lastFocusedElement) {
          (lastFocusedElement as HTMLElement).focus();
        }
      };

      closeModalFn = closeModal;

      contactTriggers.forEach((trigger) => {
        trigger.addEventListener("click", (event) => {
          event.preventDefault();
          closeMobileMenu();
          openModal();
        });
      });

      closeButton?.addEventListener("click", closeModal);

      contactModal.addEventListener("click", (event) => {
        if (event.target === contactModal) closeModal();
      });

      modalForm?.addEventListener("submit", (event) => {
        event.preventDefault();
        closeModal();
      });
    }

    const serviceBoxes = Array.from(
      document.querySelectorAll<HTMLElement>(".main__right--box"),
    );

    const closeAllBoxes = () => {
      serviceBoxes.forEach((box) => {
        box.classList.remove("is-open");
      });
    };

    if (serviceBoxes.length) {
      const handleBoxClick = (event: Event) => {
        if (!mobileQuery.matches) return;
        if ((event.target as HTMLElement).closest("a")) return;

        const box = event.currentTarget as HTMLElement;
        const isOpen = box.classList.contains("is-open");

        closeAllBoxes();
        if (!isOpen) box.classList.add("is-open");
      };

      serviceBoxes.forEach((box) => {
        box.addEventListener("click", handleBoxClick);
      });

      if (typeof mobileQuery.addEventListener === "function") {
        mobileQuery.addEventListener("change", (event) => {
          if (!event.matches) closeAllBoxes();
        });
      }
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      if (mobileMenu?.classList.contains("mobile-open")) {
        closeMobileMenu();
        return;
      }

      if (
        contactModal?.classList.contains("is-open") &&
        typeof closeModalFn === "function"
      ) {
        closeModalFn();
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("scroll", handleScroll);
      document.removeEventListener("keydown", handleEscape);
      window.clearInterval(rotationTimer);

      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleDesktopChange);
      }
    };
  }, []);

  return (
    <>
      <LicHeader />
      <LicMain />
      <ContactModal />
      <LicFooter />
    </>
  );
}
