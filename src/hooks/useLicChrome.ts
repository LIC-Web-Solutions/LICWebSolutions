"use client";

import { useEffect } from "react";

/** Fresh nodes on every call so client navigations never leave listeners on detached DOM. */
function getMobileChrome() {
  const mobileMenu = document.querySelector<HTMLElement>(".nav__mobile");
  const mobileToggle = document.querySelector<HTMLElement>(".nav__toggle");
  return { mobileMenu, mobileToggle };
}

function getContactModal() {
  return document.querySelector<HTMLElement>("#contact-modal");
}

/** Mobile menu, contact modal, footer year, Escape — shared by landing and inner shell. */
export function useLicChrome() {
  useEffect(() => {
    const footerYear = document.querySelector<HTMLElement>("#footer-year");
    if (footerYear) footerYear.textContent = String(new Date().getFullYear());

    const mobileQuery = window.matchMedia("(max-width: 1023px)");
    const getHero = () =>
      document.querySelector<HTMLElement>(".header__hero") ??
      document.querySelector<HTMLElement>(".site-page__hero");

    const syncNavScroll = () => {
      const header = document.querySelector<HTMLElement>("#main-navbar");
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

    let closeModalFn: (() => void) | undefined;
    let lastFocusedElement: Element | null = null;

    /** Single close path: never leave focus inside a subtree we mark aria-hidden + inert. */
    const closeMobileMenu = () => {
      const { mobileMenu, mobileToggle } = getMobileChrome();
      if (!mobileMenu || !mobileToggle) return;
      const active = document.activeElement;
      if (active instanceof Node && mobileMenu.contains(active)) {
        mobileToggle.focus();
      }
      mobileMenu.classList.remove("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      mobileMenu.inert = true;
      mobileToggle.classList.remove("burger-open");
      mobileToggle.setAttribute("aria-expanded", "false");
      mobileToggle.setAttribute("aria-label", "Open navigation");
      for (const item of mobileMenu.querySelectorAll<HTMLElement>(
        ".mobile-menu__item",
      )) {
        item.classList.remove("mobile-open");
      }
    };

    const openMobileMenu = () => {
      const { mobileMenu, mobileToggle } = getMobileChrome();
      if (!mobileMenu || !mobileToggle) return;
      mobileMenu.inert = false;
      mobileMenu.classList.add("mobile-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      mobileToggle.classList.add("burger-open");
      mobileToggle.setAttribute("aria-expanded", "true");
      mobileToggle.setAttribute("aria-label", "Close menu");
    };

    const openModal = () => {
      const contactModal = getContactModal();
      const closeButton = contactModal?.querySelector<HTMLElement>(
        ".contact-modal__close",
      );
      if (!contactModal) return;
      lastFocusedElement = document.activeElement;
      contactModal.inert = false;
      contactModal.classList.add("is-open");
      contactModal.setAttribute("aria-hidden", "false");
      document.body.classList.add("modal-open");
      closeButton?.focus();
    };

    const closeModal = () => {
      const contactModal = getContactModal();
      const { mobileToggle } = getMobileChrome();
      if (!contactModal) return;
      if (lastFocusedElement && "focus" in lastFocusedElement) {
        (lastFocusedElement as HTMLElement).focus();
      } else {
        mobileToggle?.focus();
      }
      contactModal.classList.remove("is-open");
      contactModal.setAttribute("aria-hidden", "true");
      contactModal.inert = true;
      document.body.classList.remove("modal-open");
    };

    closeModalFn = closeModal;

    /** One delegated click: always resolves live DOM (fixes dead handlers after Next.js navigations). */
    const onDocumentClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) return;

      const contactModal = getContactModal();

      if (contactModal?.classList.contains("is-open")) {
        if (target === contactModal) {
          closeModal();
          return;
        }
        const closeBtn = target.closest(".contact-modal__close");
        if (closeBtn) {
          closeModal();
          return;
        }
      }

      const navToggle = target.closest(".nav__toggle");
      if (navToggle instanceof HTMLElement) {
        if (!navToggle.closest("#main-navbar")) return;
        const { mobileMenu, mobileToggle } = getMobileChrome();
        if (!mobileMenu || mobileToggle !== navToggle) return;
        const isOpen = mobileMenu.classList.contains("mobile-open");
        if (isOpen) closeMobileMenu();
        else openMobileMenu();
        return;
      }

      const subToggle = target.closest<HTMLElement>(".mobile-menu__toggle");
      if (subToggle) {
        const { mobileMenu } = getMobileChrome();
        if (!mobileMenu?.contains(subToggle)) return;
        const item = subToggle.closest<HTMLElement>(".mobile-menu__item");
        if (!item) return;

        const items = Array.from(
          mobileMenu.querySelectorAll<HTMLElement>(".mobile-menu__item"),
        );
        const sectionOpen = item.classList.contains("is-open");

        for (const other of items) {
          if (other !== item) {
            other.classList.remove("is-open");
            const otherToggle = other.querySelector<HTMLElement>(
              ".mobile-menu__toggle",
            );
            otherToggle?.setAttribute("aria-expanded", "false");
          }
        }

        item.classList.toggle("is-open", !sectionOpen);
        subToggle.setAttribute("aria-expanded", String(!sectionOpen));
        return;
      }

      const contactTrigger = target.closest<HTMLElement>(
        ".banner__contact, .js-contact-trigger",
      );
      if (contactTrigger) {
        event.preventDefault();
        closeMobileMenu();
        openModal();
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a");
      if (link) {
        const { mobileMenu } = getMobileChrome();
        if (mobileMenu?.contains(link)) {
          closeMobileMenu();
        }
      }
    };

    document.addEventListener("click", onDocumentClick);

    const onDocumentSubmit = (event: Event) => {
      const form = event.target;
      if (
        form instanceof HTMLFormElement &&
        form.classList.contains("contact-modal__form")
      ) {
        event.preventDefault();
        closeModal();
      }
    };

    document.addEventListener("submit", onDocumentSubmit);

    const desktopQuery = window.matchMedia("(min-width: 1024px)");
    const handleDesktopChange = (event: MediaQueryListEvent) => {
      if (event.matches) closeMobileMenu();
    };

    if (desktopQuery.matches) closeMobileMenu();
    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopChange);
    }

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;

      const { mobileMenu } = getMobileChrome();
      if (mobileMenu?.classList.contains("mobile-open")) {
        closeMobileMenu();
        return;
      }

      const contactModal = getContactModal();
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
      document.removeEventListener("click", onDocumentClick);
      document.removeEventListener("submit", onDocumentSubmit);
      document.removeEventListener("keydown", handleEscape);
      if (typeof desktopQuery.removeEventListener === "function") {
        desktopQuery.removeEventListener("change", handleDesktopChange);
      }
    };
  }, []);
}
