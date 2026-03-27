"use client";

import { useEffect } from "react";

import { useLicChrome } from "@/hooks/useLicChrome";
import { ContactModal } from "../modals/ContactModal";
import { LicFooter } from "./LicFooter";
import { LicHeader } from "./LicHeader";
import { LicMain } from "./LicMain";

export function LicLanding() {
  useLicChrome();

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

    return () => {
      document.removeEventListener("scroll", handleScroll);
      window.clearInterval(rotationTimer);
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
