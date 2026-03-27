"use client";

import { useEffect } from "react";

/** Mobile menu, contact modal, footer year, Escape — shared by landing and inner shell. */
export function useLicChrome() {
  useEffect(() => {
    const footerYear = document.querySelector<HTMLElement>("#footer-year");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const header = document.querySelector<HTMLElement>("#main-navbar");
    const getHero = () =>
      document.querySelector<HTMLElement>(".header__hero") ??
      document.querySelector<HTMLElement>(".site-page__hero");

    const syncNavScroll = () => {
      const hero = getHero();
      if (!header || !hero) return;
      if (!mobileQuery.matches && window.scrollY >= 64) {
        header.classList.add("scrolled");
        hero.classList.add("hero-scrolled");
      } else {
        header.classList.remove("scrolled");
        hero.classList.remove("hero-scrolled");
      }
    };

    syncNavScroll();
    document.addEventListener("scroll", syncNavScroll, { passive: true });
    if (typeof mobileQuery.addEventListener === "function") {
      mobileQuery.addEventListener("change", syncNavScroll);
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

    const openMobileMenu = () => {
      if (!mobileMenu || !mobileToggle) return;
      mobileMenu.classList.add("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileToggle.classList.add("burger-open");
      mobileToggle.setAttribute("aria-expanded", "true");
      mobileToggle.setAttribute("aria-label", "Close menu");
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
      document.removeEventListener("scroll", syncNavScroll);
      if (typeof mobileQuery.removeEventListener === "function") {
        mobileQuery.removeEventListener("change", syncNavScroll);
      }
      document.removeEventListener("keydown", handleEscape);
      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleDesktopChange);
      }
    };
  }, []);
}
