import {
  faFacebookF,
  faInstagram,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope,
  faLocationDot,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export function LicFooter() {
  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer__container">
        <div className="footer__top">
          <div className="footer__brand">
            <a
              className="footer__logo"
              href="#"
              aria-label="LIC Web Solutions home"
            >
              <img
                className="footer__logo-img"
                src="/assets/LICLogo2025FullWhite.png"
                alt="LIC Web Solutions"
              />
            </a>

            <p className="footer__tagline">
              Strategic design and development for modern, high-performing
              websites.
            </p>

            <div className="footer__social" aria-label="Social links">
              <a className="footer__social-link" href="#" aria-label="LinkedIn">
                <FontAwesomeIcon icon={faLinkedinIn} aria-hidden />
              </a>
              <a
                className="footer__social-link"
                href="#"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} aria-hidden />
              </a>
              <a className="footer__social-link" href="#" aria-label="Facebook">
                <FontAwesomeIcon icon={faFacebookF} aria-hidden />
              </a>
            </div>
          </div>

          <nav className="footer__nav" aria-label="Footer navigation">
            <div className="footer__col">
              <h3 className="footer__heading">Company</h3>
              <ul className="footer__list">
                <li>
                  <a className="footer__link" href="#">
                    About
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Team
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Careers
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__heading">Services</h3>
              <ul className="footer__list">
                <li>
                  <a className="footer__link" href="#">
                    Web Design & UX
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Web Development
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Maintenance
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Mobile Apps
                  </a>
                </li>
              </ul>
            </div>

            <div className="footer__col">
              <h3 className="footer__heading">Resources</h3>
              <ul className="footer__list">
                <li>
                  <a className="footer__link" href="#">
                    Insights
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Guides
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Case Studies
                  </a>
                </li>
                <li>
                  <a className="footer__link" href="#">
                    Support
                  </a>
                </li>
              </ul>
            </div>
          </nav>

          <div className="footer__contact">
            <h3 className="footer__heading">Get in touch</h3>
            <ul className="footer__list footer__list--contact">
              <li>
                <a
                  className="footer__link"
                  href="mailto:hello@licwebsolutions.com"
                >
                  <FontAwesomeIcon icon={faEnvelope} aria-hidden />
                  hello@licwebsolutions.com
                </a>
              </li>
              <li>
                <a className="footer__link" href="tel:+19297089096">
                  <FontAwesomeIcon icon={faPhone} aria-hidden />
                  (929) 708-9096
                </a>
              </li>
              <li>
                <a className="footer__link" href="#">
                  <FontAwesomeIcon icon={faLocationDot} aria-hidden />
                  Long Island City, NY
                </a>
              </li>
            </ul>

            <a className="footer__button js-contact-trigger" href="#">
              Start with template
            </a>
          </div>
        </div>

        <div className="footer__bottom">
          <p className="footer__copyright">
            &copy; <span id="footer-year">2026</span> LIC Web Solutions. All
            rights reserved.
          </p>

          <ul className="footer__legal">
            <li>
              <a className="footer__link" href="#">
                Privacy
              </a>
            </li>
            <li>
              <a className="footer__link" href="#">
                Terms
              </a>
            </li>
            <li>
              <a className="footer__link" href="#">
                Sitemap
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
