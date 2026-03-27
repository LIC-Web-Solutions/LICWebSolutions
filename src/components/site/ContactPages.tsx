import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

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
    >
      <SiteSection title="Headquarters">
        <div className="site-split">
          <div className="site-prose">
            <p>
              <strong>Studio</strong>
              <br />
              Replace with your address, hours, and parking instructions.
            </p>
          </div>
          <div className="site-prose">
            <p>
              <strong>Map</strong>
              <br />
              Embed Google Maps or Mapbox here when you are ready.
            </p>
          </div>
        </div>
      </SiteSection>
      <SiteSection title="Regional coverage">
        <ul className="site-list">
          <li>East Coast business hours for live collaboration.</li>
          <li>Flexible scheduling for West Coast and international partners.</li>
        </ul>
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
