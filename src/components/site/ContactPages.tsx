import WorldMap from "@/components/ui/world-map";

import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

/** Hub: Long Island City studio — arcs show remote collaboration reach */
const LOCATIONS_WORLD_DOTS = [
  {
    start: { lat: 40.7518, lng: -73.9291 },
    end: { lat: 34.0522, lng: -118.2437 },
  },
  {
    start: { lat: 40.7518, lng: -73.9291 },
    end: { lat: 51.5074, lng: -0.1278 },
  },
  {
    start: { lat: 40.7518, lng: -73.9291 },
    end: { lat: 28.6139, lng: 77.209 },
  },
  {
    start: { lat: 40.7518, lng: -73.9291 },
    end: { lat: -23.5505, lng: -46.6333 },
  },
  {
    start: { lat: 40.7518, lng: -73.9291 },
    end: { lat: 35.6762, lng: 139.6503 },
  },
];

export function BookACallPage() {
  return (
    <SitePage
      kicker="Contact"
      title="Book a call"
      lead="Schedule a 30-minute conversation to align on goals, scope, and timeline."
    >
      <SiteSection title="What to expect">
        <ul className="site-list">
          <li>We review your current site and primary pain points.</li>
          <li>We outline recommended phases and ballpark ranges.</li>
          <li>We answer questions about process, tooling, and support.</li>
        </ul>
      </SiteSection>
      <SiteSection eyebrow="Calendar" title="Scheduling">
        <div className="site-prose">
          <p>
            Connect your calendar provider (Calendly, HubSpot, or similar) here.
            Until then, use the{" "}
            <a href="#" className="js-contact-trigger site-link">
              contact form
            </a>{" "}
            and we will reach out with times that work.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Not ready to meet?"
        body="Send a quick note and we will follow up with options."
        primaryHref="/contact/support"
        primaryLabel="Support"
        secondaryHref="/"
        secondaryLabel="Back home"
      />
    </SitePage>
  );
}

export function SupportPage() {
  return (
    <SitePage
      kicker="Contact"
      title="Support"
      lead="Existing clients can reach the team for break-fix requests, content updates, and guidance."
    >
      <SiteSection title="Channels">
        <div className="site-grid site-grid--2">
          <article className="site-card">
            <h3 className="site-card__title">Email</h3>
            <p className="site-card__text">
              Prefer a dedicated inbox for your account? We will wire it during
              onboarding.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Priority queue</h3>
            <p className="site-card__text">
              Maintenance plans include SLA tiers and after-hours options for
              critical issues.
            </p>
          </article>
        </div>
      </SiteSection>
      <SiteSection title="Before you write">
        <div className="site-prose">
          <p>
            Include the page URL, browser, and a short description of expected
            vs. actual behavior. Screenshots or screen recordings help us
            resolve faster.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="New project?"
        body="Start with a call so we can scope the right engagement."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/services/website-maintenance"
        secondaryLabel="Maintenance"
      />
    </SitePage>
  );
}

export function LocationsPage() {
  return (
    <SitePage
      kicker="Contact"
      title="Locations"
      lead="We work with clients across the country—remote-first with optional on-site workshops."
      heroImageSrc="/assets/locations-hero.png"
    >
      <SiteSection title="Headquarters">
        <div className="site-split site-split--locations">
          <article className="site-address-card">
            <p className="site-address-card__eyebrow">Visit</p>
            <h3 className="site-address-card__title">
              Long Island City studio
            </h3>
            <address className="site-address-card__address">
              34-18 Northern Blvd
              <br />
              Long Island City, NY 11101
            </address>
            <p className="site-address-card__hint">
              East Coast hours · On-site workshops by appointment
            </p>
            <a
              className="site-address-card__directions"
              href="https://www.google.com/maps/dir/?api=1&destination=34-18+Northern+Blvd,+Long+Island+City,+NY+11101"
              target="_blank"
              rel="noopener noreferrer"
            >
              Get directions
            </a>
          </article>
          <div className="site-world-map">
            <WorldMap dots={LOCATIONS_WORLD_DOTS} lineColor="#8dd2e2" />
          </div>
        </div>
      </SiteSection>
      <SiteSection title="Regional coverage">
        <div className="site-grid site-grid--2">
          <article className="site-card site-card--locations">
            <p className="site-card__eyebrow">Collaboration</p>
            <h3 className="site-card__title">East Coast</h3>
            <p className="site-card__text">
              Business hours aligned for live collaboration with teams in
              Eastern time.
            </p>
          </article>
          <article className="site-card site-card--locations">
            <p className="site-card__eyebrow">Flexibility</p>
            <h3 className="site-card__title">Global</h3>
            <p className="site-card__text">
              Flexible scheduling for West Coast and international partners when
              projects need it.
            </p>
          </article>
        </div>
      </SiteSection>
      <SiteCta
        title="Meet remotely"
        body="Most projects kick off with video sessions and shared Figma files."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/about/team"
        secondaryLabel="Meet the team"
      />
    </SitePage>
  );
}
