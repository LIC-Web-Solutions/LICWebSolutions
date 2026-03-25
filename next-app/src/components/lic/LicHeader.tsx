import {
  faChevronDown,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LicHeader() {
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
          <a href="/" className="nav__logo--wrapper" aria-label="Home">
            <img
              className="nav__logo--img"
              src="/assets/LICLogo2025FullWhite.png"
              alt="LIC Web Solutions Logo"
            />
          </a>

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
            <li className="nav__list--item">
              <span className="list-item__title">
                About{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-chevron-down"
                />
              </span>
              <ul className="nav__dropdown">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Core Values</a>
                </li>
                <li>
                  <a href="#">Problem Solving Approach</a>
                </li>
                <li>
                  <a href="#">Team</a>
                </li>
              </ul>
            </li>

            <li className="nav__list--item">
              <span className="list-item__title">
                Services{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-chevron-down"
                />
              </span>
              <ul className="nav__dropdown">
                <li>
                  <a href="#">Web Design & UX</a>
                </li>
                <li>
                  <a href="#">Web Development</a>
                </li>
                <li>
                  <a href="#">Website Maintenance</a>
                </li>
                <li>
                  <a href="#">Mobile App Development</a>
                </li>
              </ul>
            </li>

            <li className="nav__list--item">
              <span className="list-item__title">
                Work{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-chevron-down"
                />
              </span>
              <ul className="nav__dropdown">
                <li>
                  <a href="#">Industries We Serve</a>
                </li>
                <li>
                  <a href="#">Featured Projects</a>
                </li>
              </ul>
            </li>

            <li className="nav__list--item">
              <span className="list-item__title">
                Insights{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-chevron-down"
                />
              </span>
              <ul className="nav__dropdown">
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Industry Insights</a>
                </li>
                <li>
                  <a href="#">Guides & Tutorials</a>
                </li>
              </ul>
            </li>

            <li className="nav__list--item">
              <span className="list-item__title">
                Contact{" "}
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className="fa-chevron-down"
                />
              </span>
              <ul className="nav__dropdown">
                <li>
                  <a href="#">Book a Call</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
                <li>
                  <a href="#">Locations</a>
                </li>
              </ul>
            </li>
          </ul>

          <div className="nav__mobile" id="mobile-menu" aria-hidden="true">
            <div className="mobile-menu__panel">
              <form className="mobile-menu__search">
                <input type="search" placeholder="Search" aria-label="Search" />
                <button type="submit" aria-label="Search">
                  <FontAwesomeIcon icon={faMagnifyingGlass} />
                </button>
              </form>

              <ul className="mobile-menu__list">
                <li className="mobile-menu__item">
                  <button className="mobile-menu__toggle" type="button">
                    About
                    <span className="mobile-menu__chevron">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="fa-chevron-down"
                      />
                    </span>
                  </button>
                  <ul className="mobile-menu__submenu">
                    <li>
                      <a href="#">About Us</a>
                    </li>
                    <li>
                      <a href="#">Core Values</a>
                    </li>
                    <li>
                      <a href="#">Problem Solving Approach</a>
                    </li>
                    <li>
                      <a href="#">Team</a>
                    </li>
                  </ul>
                </li>

                <li className="mobile-menu__item">
                  <button className="mobile-menu__toggle" type="button">
                    Services
                    <span className="mobile-menu__chevron">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="fa-chevron-down"
                      />
                    </span>
                  </button>
                  <ul className="mobile-menu__submenu">
                    <li>
                      <a href="#">Web Design & UX</a>
                    </li>
                    <li>
                      <a href="#">Web Development</a>
                    </li>
                    <li>
                      <a href="#">Website Maintenance</a>
                    </li>
                    <li>
                      <a href="#">Mobile App Development</a>
                    </li>
                  </ul>
                </li>

                <li className="mobile-menu__item">
                  <button className="mobile-menu__toggle" type="button">
                    Work
                    <span className="mobile-menu__chevron">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="fa-chevron-down"
                      />
                    </span>
                  </button>
                  <ul className="mobile-menu__submenu">
                    <li>
                      <a href="#">Industries We Serve</a>
                    </li>
                    <li>
                      <a href="#">Featured Projects</a>
                    </li>
                  </ul>
                </li>

                <li className="mobile-menu__item">
                  <button className="mobile-menu__toggle" type="button">
                    Insights
                    <span className="mobile-menu__chevron">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="fa-chevron-down"
                      />
                    </span>
                  </button>
                  <ul className="mobile-menu__submenu">
                    <li>
                      <a href="#">Blog</a>
                    </li>
                    <li>
                      <a href="#">Industry Insights</a>
                    </li>
                    <li>
                      <a href="#">Guides & Tutorials</a>
                    </li>
                  </ul>
                </li>

                <li className="mobile-menu__item">
                  <button className="mobile-menu__toggle" type="button">
                    Contact
                    <span className="mobile-menu__chevron">
                      <FontAwesomeIcon
                        icon={faChevronDown}
                        className="fa-chevron-down"
                      />
                    </span>
                  </button>
                  <ul className="mobile-menu__submenu">
                    <li>
                      <a href="#">Book a Call</a>
                    </li>
                    <li>
                      <a href="#">Support</a>
                    </li>
                    <li>
                      <a href="#">Locations</a>
                    </li>
                  </ul>
                </li>
              </ul>

              <div className="mobile-menu__actions">
                <a className="mobile-menu__action" href="#">
                  Contact
                </a>
                <a className="mobile-menu__action" href="#">
                  Client Login
                </a>
                <a className="mobile-menu__action" href="#">
                  Book a Call
                </a>
                <a className="mobile-menu__action" href="#">
                  Support
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="header__hero">
        <video
          className="videom"
          autoPlay
          muted
          playsInline
          loop
          src="/assets/Licskylinefootage.mp4"
        />

        <div className="hero">
          <div className="hero__panels">
            <div className="panel active" />
            <div className="panel" />
            <div className="panel" />
            <div className="panel" />
          </div>

          <div className="hero__container">
            <h1 className="hero__title">
              Disciplined design
              <br />
              for your website.
            </h1>
            <div className="hero__booking">
              <a href="#"> Start with a website template</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
