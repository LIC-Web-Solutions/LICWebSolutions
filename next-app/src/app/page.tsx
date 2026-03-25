"use client";

import Script from "next/script";
import { useEffect } from "react";

export default function Home() {
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

    const panels = Array.from(document.querySelectorAll<HTMLElement>(".hero__panels .panel"));
    const heroTitle = document.querySelector<HTMLElement>(".hero__title");
    const titles = ["Disciplined Design", "Long-term conviction", "Exceptional service", "Value"];
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

    const mobileMenu = document.querySelector<HTMLElement>(".nav__mobile");
    const mobileToggle = document.querySelector<HTMLElement>(".nav__toggle");
    const mobileLinks = mobileMenu ? Array.from(mobileMenu.querySelectorAll<HTMLAnchorElement>("a")) : [];
    const mobileItems = mobileMenu ? Array.from(mobileMenu.querySelectorAll<HTMLElement>(".mobile-menu__item")) : [];
    const mobileToggles = mobileMenu
      ? Array.from(mobileMenu.querySelectorAll<HTMLElement>(".mobile-menu__toggle"))
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
      mobileItems.forEach((item) => item.classList.remove("mobile-open"));
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
            const otherToggle = other.querySelector<HTMLElement>(".mobile-menu__toggle");
            if (otherToggle) otherToggle.setAttribute("aria-expanded", "false");
          }
        });
        item.classList.toggle("is-open", !isOpen);
        toggle.setAttribute("aria-expanded", String(!isOpen));
      });
    });

    mobileLinks.forEach((link) => link.addEventListener("click", closeMobileMenu));

    const contactModal = document.querySelector<HTMLElement>("#contact-modal");
    const contactTriggers = Array.from(
      document.querySelectorAll<HTMLElement>(".banner__contact, .js-contact-trigger"),
    );

    if (contactModal && contactTriggers.length) {
      const closeButton = contactModal.querySelector<HTMLElement>(".contact-modal__close");
      const modalForm = contactModal.querySelector<HTMLFormElement>(".contact-modal__form");
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

    const serviceBoxes = Array.from(document.querySelectorAll<HTMLElement>(".main__right--box"));
    const closeAllBoxes = () => {
      serviceBoxes.forEach((box) => box.classList.remove("is-open"));
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
      serviceBoxes.forEach((box) => box.addEventListener("click", handleBoxClick));
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
      if (contactModal?.classList.contains("is-open") && typeof closeModalFn === "function") {
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
      <Script src="https://kit.fontawesome.com/fd67135b48.js" crossOrigin="anonymous" strategy="afterInteractive" />
      <header>
        <div className="header__banner">
          <div className="header__banner--container">
            <div className="banner__right">
              <a href="#" className="banner__login">CLIENT LOGIN</a>
              <a href="#" className="banner__contact">Contact</a>
              <a href="#" className="banner__search">
                <i className="fa-solid fa-magnifying-glass" />
              </a>
            </div>
          </div>
        </div>
        <nav id="main-navbar">
          <div className="nav__container">
            <a href="/" className="nav__logo--wrapper" aria-label="Home">
              <img className="nav__logo--img" src="/assets/LICLogo2025FullWhite.png" alt="LIC Web Solutions Logo" />
            </a>
            <button className="nav__toggle" aria-expanded="false" aria-controls="mobile-menu" aria-label="Open navigation">
              <span />
              <span />
              <span />
            </button>
            <ul className="nav__list">
              <li className="nav__list--item"><span className="list-item__title">About <i className="fa-solid fa-chevron-down" /></span><ul className="nav__dropdown"><li><a href="#">About Us</a></li><li><a href="#">Core Values</a></li><li><a href="#">Problem Solving Approach</a></li><li><a href="#">Team</a></li></ul></li>
              <li className="nav__list--item"><span className="list-item__title">Services <i className="fa-solid fa-chevron-down" /></span><ul className="nav__dropdown"><li><a href="#">Web Design & UX</a></li><li><a href="#">Web Development</a></li><li><a href="#">Website Maintenance</a></li><li><a href="#">Mobile App Development</a></li></ul></li>
              <li className="nav__list--item"><span className="list-item__title">Work <i className="fa-solid fa-chevron-down" /></span><ul className="nav__dropdown"><li><a href="#">Industries We Serve</a></li><li><a href="#">Featured Projects</a></li></ul></li>
              <li className="nav__list--item"><span className="list-item__title">Insights <i className="fa-solid fa-chevron-down" /></span><ul className="nav__dropdown"><li><a href="#">Blog</a></li><li><a href="#">Industry Insights</a></li><li><a href="#">Guides & Tutorials</a></li></ul></li>
              <li className="nav__list--item"><span className="list-item__title">Contact <i className="fa-solid fa-chevron-down" /></span><ul className="nav__dropdown"><li><a href="#">Book a Call</a></li><li><a href="#">Support</a></li><li><a href="#">Locations</a></li></ul></li>
            </ul>
            <div className="nav__mobile" id="mobile-menu" aria-hidden="true">
              <div className="mobile-menu__panel">
                <form className="mobile-menu__search" role="search">
                  <input type="search" placeholder="Search" aria-label="Search" />
                  <button type="submit" aria-label="Search"><i className="fa-solid fa-magnifying-glass" /></button>
                </form>
                <ul className="mobile-menu__list">
                  <li className="mobile-menu__item"><button className="mobile-menu__toggle" type="button">About <span className="mobile-menu__chevron"><i className="fa-solid fa-chevron-down" /></span></button><ul className="mobile-menu__submenu"><li><a href="#">About Us</a></li><li><a href="#">Core Values</a></li><li><a href="#">Problem Solving Approach</a></li><li><a href="#">Team</a></li></ul></li>
                  <li className="mobile-menu__item"><button className="mobile-menu__toggle" type="button">Services <span className="mobile-menu__chevron"><i className="fa-solid fa-chevron-down" /></span></button><ul className="mobile-menu__submenu"><li><a href="#">Web Design & UX</a></li><li><a href="#">Web Development</a></li><li><a href="#">Website Maintenance</a></li><li><a href="#">Mobile App Development</a></li></ul></li>
                  <li className="mobile-menu__item"><button className="mobile-menu__toggle" type="button">Work <span className="mobile-menu__chevron"><i className="fa-solid fa-chevron-down" /></span></button><ul className="mobile-menu__submenu"><li><a href="#">Industries We Serve</a></li><li><a href="#">Featured Projects</a></li></ul></li>
                  <li className="mobile-menu__item"><button className="mobile-menu__toggle" type="button">Insights <span className="mobile-menu__chevron"><i className="fa-solid fa-chevron-down" /></span></button><ul className="mobile-menu__submenu"><li><a href="#">Blog</a></li><li><a href="#">Industry Insights</a></li><li><a href="#">Guides & Tutorials</a></li></ul></li>
                  <li className="mobile-menu__item"><button className="mobile-menu__toggle" type="button">Contact <span className="mobile-menu__chevron"><i className="fa-solid fa-chevron-down" /></span></button><ul className="mobile-menu__submenu"><li><a href="#">Book a Call</a></li><li><a href="#">Support</a></li><li><a href="#">Locations</a></li></ul></li>
                </ul>
                <div className="mobile-menu__actions">
                  <a className="mobile-menu__action" href="#">Contact</a>
                  <a className="mobile-menu__action" href="#">Client Login</a>
                  <a className="mobile-menu__action" href="#">Book a Call</a>
                  <a className="mobile-menu__action" href="#">Support</a>
                </div>
              </div>
            </div>
          </div>
        </nav>
        <div className="header__hero">
          <video className="videom" autoPlay muted playsInline loop src="/assets/Licskylinefootage.mp4" />
          <div className="hero">
            <div className="hero__panels"><div className="panel active" /><div className="panel" /><div className="panel" /><div className="panel" /></div>
            <div className="hero__container">
              <h1 className="hero__title">Disciplined design<br />for your website.</h1>
              <div className="hero__booking"><a href="#"> Start with a website template</a></div>
            </div>
          </div>
        </div>
      </header>
      <main>
        <div className="main__container">
          <div className="main__header">
            <div className="main__left"><div className="main__left--container"><h1 className="main__left--h1">Are you ready to elevate your brand? We are.</h1><p className="main__left--p">Take control of your digital future in a way that reflects your vision with innovative, user-centered design and development solutions. Since 2022, our agency has been a local leader in creating exceptional digital experiences for Long Island City businesses, including profitable websites and applications across industries.</p><div className="main__booking"><a href="#"> Find out what makes LICWS special</a></div></div></div>
            <div className="main__right">
              <div className="main__right--box"><div className="box__wrapper"><h3 className="box-h3">Web Design</h3><img className="box-img" src="/assets/webimg.png" alt="" /></div><div className="box__overlay" aria-hidden="true"><h4 className="box__overlay-title">Web Design</h4><p className="box__overlay-text">Clean, conversion-first interfaces that feel effortless on every screen size. We craft layouts that guide attention and turn browsing into action.</p><ul className="box__overlay-links"><li><a href="#">UX audits</a></li><li><a href="#">Design systems</a></li><li><a href="#">Rapid prototypes</a></li></ul></div></div>
              <div className="main__right--box"><div className="box__wrapper"><h3 className="box-h3">Development</h3><img className="box-img" src="/assets/devimg.png" alt="" /></div><div className="box__overlay" aria-hidden="true"><h4 className="box__overlay-title">Development</h4><p className="box__overlay-text">Fast, stable builds with performance baked in. From landing pages to custom apps, we ship clean code that scales.</p><ul className="box__overlay-links"><li><a href="#">Frontend engineering</a></li><li><a href="#">API integrations</a></li><li><a href="#">Performance tuning</a></li></ul></div></div>
              <div className="main__right--box"><div className="box__wrapper"><h3 className="box-h3">Mobile Apps</h3><img className="box-img" src="/assets/mobileimg.png" alt="" /></div><div className="box__overlay" aria-hidden="true"><h4 className="box__overlay-title">Mobile Apps</h4><p className="box__overlay-text">Thoughtful app experiences that keep users moving. We design flows that feel intuitive and perform like native.</p><ul className="box__overlay-links"><li><a href="#">iOS and Android</a></li><li><a href="#">Launch strategy</a></li><li><a href="#">Ongoing support</a></li></ul></div></div>
              <div className="main__right--box"><div className="box__wrapper"><h3 className="box-h3">Digital Strategy</h3><img className="box-img" src="/assets/digitalimg.png" alt="" /></div><div className="box__overlay" aria-hidden="true"><h4 className="box__overlay-title">Digital Strategy</h4><p className="box__overlay-text">A clear roadmap for growth across channels. We align your brand, content, and tech stack into a measurable plan.</p><ul className="box__overlay-links"><li><a href="#">Positioning</a></li><li><a href="#">Content planning</a></li><li><a href="#">Analytics setup</a></li></ul></div></div>
            </div>
          </div>
          <div className="main__approach">
            <div className="approach__left"><div className="approach__left--container"><h1 className="approach__left--h1">A strategic approach guides us</h1><p className="approach__left--p">Our strategies and services strive to deliver results and build long-term, successful partnerships with innovative digital solutions.</p><div className="hero__booking"><a href="#"> Learn more about our unique approach</a></div></div></div>
            <div className="approach__right" />
          </div>
        </div>
      </main>
      <div className="contact-modal" id="contact-modal" role="dialog" aria-modal="true" aria-labelledby="contact-modal-title" aria-hidden="true">
        <div className="contact-modal__dialog">
          <button type="button" className="contact-modal__close" aria-label="Close contact form">&times;</button>
          <h2 className="contact-modal__title" id="contact-modal-title">Let's talk about your project</h2>
          <p className="contact-modal__subtitle">Share a few details and we&apos;ll reach out shortly.</p>
          <form className="contact-modal__form">
            <label className="contact-modal__label">Full Name<input type="text" name="name" className="contact-modal__input" placeholder="Jane Doe" required /></label>
            <label className="contact-modal__label">Email<input type="email" name="email" className="contact-modal__input" placeholder="you@example.com" required /></label>
            <label className="contact-modal__label">How can we help?<textarea name="message" rows={4} className="contact-modal__textarea" placeholder="Tell us about your goals, timeline, and budget." required /></label>
            <div className="contact-modal__actions"><button type="submit" className="contact-modal__submit">Send message</button></div>
          </form>
        </div>
      </div>
      <footer className="footer" aria-label="Site footer">
        <div className="footer__container">
          <div className="footer__top">
            <div className="footer__brand">
              <a className="footer__logo" href="#" aria-label="LIC Web Solutions home"><img className="footer__logo-img" src="/assets/LICLogo2025FullWhite.png" alt="LIC Web Solutions" /></a>
              <p className="footer__tagline">Strategic design and development for modern, high-performing websites.</p>
              <div className="footer__social" aria-label="Social links">
                <a className="footer__social-link" href="#" aria-label="LinkedIn"><i className="fa-brands fa-linkedin-in" aria-hidden="true" /></a>
                <a className="footer__social-link" href="#" aria-label="Instagram"><i className="fa-brands fa-instagram" aria-hidden="true" /></a>
                <a className="footer__social-link" href="#" aria-label="Facebook"><i className="fa-brands fa-facebook-f" aria-hidden="true" /></a>
              </div>
            </div>
            <nav className="footer__nav" aria-label="Footer navigation">
              <div className="footer__col"><h3 className="footer__heading">Company</h3><ul className="footer__list"><li><a className="footer__link" href="#">About</a></li><li><a className="footer__link" href="#">Team</a></li><li><a className="footer__link" href="#">Careers</a></li><li><a className="footer__link" href="#">Contact</a></li></ul></div>
              <div className="footer__col"><h3 className="footer__heading">Services</h3><ul className="footer__list"><li><a className="footer__link" href="#">Web Design & UX</a></li><li><a className="footer__link" href="#">Web Development</a></li><li><a className="footer__link" href="#">Maintenance</a></li><li><a className="footer__link" href="#">Mobile Apps</a></li></ul></div>
              <div className="footer__col"><h3 className="footer__heading">Resources</h3><ul className="footer__list"><li><a className="footer__link" href="#">Insights</a></li><li><a className="footer__link" href="#">Guides</a></li><li><a className="footer__link" href="#">Case Studies</a></li><li><a className="footer__link" href="#">Support</a></li></ul></div>
            </nav>
            <div className="footer__contact">
              <h3 className="footer__heading">Get in touch</h3>
              <ul className="footer__list footer__list--contact">
                <li><a className="footer__link" href="mailto:hello@licwebsolutions.com"><i className="fa-solid fa-envelope" aria-hidden="true" />hello@licwebsolutions.com</a></li>
                <li><a className="footer__link" href="tel:+19297089096"><i className="fa-solid fa-phone" aria-hidden="true" />(929) 708-9096</a></li>
                <li><a className="footer__link" href="#"><i className="fa-solid fa-location-dot" aria-hidden="true" />Long Island City, NY</a></li>
              </ul>
              <a className="footer__button js-contact-trigger" href="#">Start with template</a>
            </div>
          </div>
          <div className="footer__bottom">
            <p className="footer__copyright">&copy; <span id="footer-year">{new Date().getFullYear()}</span> LIC Web Solutions. All rights reserved.</p>
            <ul className="footer__legal"><li><a className="footer__link" href="#">Privacy</a></li><li><a className="footer__link" href="#">Terms</a></li><li><a className="footer__link" href="#">Sitemap</a></li></ul>
          </div>
        </div>
      </footer>
    </>
  );
}
