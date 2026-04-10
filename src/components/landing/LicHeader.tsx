import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";

import { SITE_NAV } from "@/lib/siteNav";

import { LicHeroInteractive } from "./LicHeroInteractive";

type LicHeaderProps = {
  showHero?: boolean;
};

export function LicHeader({ showHero = true }: LicHeaderProps) {
  return (
    <header>
      <div className="header__banner">
        <div className="header__banner--container">
          <div className="banner__right">
            <a href="#" className="banner__login">
              CLIENT LOGIN
            </a>
            <a href="#" className="banner__contact">
              Contact
            </a>
            <a href="#" className="banner__search" aria-label="Search">
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </a>
          </div>
        </div>
      </div>

      <nav id="main-navbar">
        <div className="nav__container">
          <Link href="/" className="nav__logo--wrapper" aria-label="Home">
            <img
              className="nav__logo--img"
              src="/assets/LICLogo2025FullWhite.png"
              alt="LIC Web Solutions Logo"
            />
          </Link>

          <button
            type="button"
            className="nav__toggle"
            aria-expanded="false"
            aria-controls="mobile-menu"
            aria-label="Open navigation"
          >
            <span />
            <span />
            <span />
          </button>

          <ul className="nav__list">
            {SITE_NAV.map((section) => (
              <li key={section.id} className="nav__list--item">
                <span className="list-item__title">
                  {section.label}{" "}
                  <FontAwesomeIcon
                    icon={faChevronDown}
                    className="fa-chevron-down"
                  />
                </span>
                <ul className="nav__dropdown">
                  {section.items.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>

          <div
            className="nav__mobile"
            id="mobile-menu"
            aria-hidden="true"
            inert
          >
            <div className="mobile-menu__panel">
              <form className="mobile-menu__search">
                <input type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" aria-label="Search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>

              <ul className="mobile-menu__list">
                {SITE_NAV.map((section) => (
                  <li key={section.id} className="mobile-menu__item">
                    <button className="mobile-menu__toggle" type="button">
                      {section.label}
                      <span className="mobile-menu__chevron">
                        <FontAwesomeIcon
                          icon={faChevronDown}
                          className="fa-chevron-down"
                        />
                      </span>
                    </button>
                    <ul className="mobile-menu__submenu">
                      {section.items.map((item) => (
                        <li key={item.href}>
                          <Link href={item.href}>{item.label}</Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>

              <div className="mobile-menu__actions">
                <a className="mobile-menu__action js-contact-trigger" href="#">
                  Contact
                </a>
                <a className="mobile-menu__action" href="#">
                  Client Login
                </a>
                <Link
                  className="mobile-menu__action"
                  href="/contact/book-a-call"
                >
                  Book a Call
                </Link>
                <Link className="mobile-menu__action" href="/contact/support">
                  Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {showHero ? (
        <div className="header__hero">
          <video
            className="videom"
            autoPlay
            muted
            playsInline
            loop
            src="/assets/Licskylinefootage.mp4"
          />

          <LicHeroInteractive />
        </div>
      ) : null}
    </header>
  );
}
