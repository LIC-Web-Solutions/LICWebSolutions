import Link from "next/link";

import WorldMap from "@/components/ui/world-map";

import { CalendlyEmbed } from "./CalendlyEmbed";
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

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

export function BookACallPage() {
  return (
    <SitePage
      kicker="Get started"
      title="Book a discovery call"
      lead="This is the first step for new engagements—a short conversation to see if we are a fit, clarify goals and scope, and outline what happens next if we move forward together."
    >
      <SiteSection eyebrow="Discovery" title="Why book a call">
        <ul className="site-list">
          <li>
            Honest read on whether our process and timeline match what you need.
          </li>
          <li>
            A clear picture of recommended phases, dependencies, and ballpark
            ranges so you can plan internally.
          </li>
          <li>
            Space to ask about our stack, accessibility, maintenance, and how we
            collaborate after launch.
          </li>
        </ul>
        <div className="site-prose">
          <p>
            Calls are typically <strong>30 minutes</strong>, over video, with
            East Coast–friendly scheduling. There is no obligation—just a
            structured conversation.
          </p>
        </div>
      </SiteSection>

      <SiteSection eyebrow="Prepare" title="Before the call">
        <div className="site-grid site-grid--2">
          <article className="site-card">
            <h3 className="site-card__title">Context</h3>
            <p className="site-card__text">
              Your current site URL, product, or what you are replacing—plus any
              must-keep integrations or constraints.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Goals &amp; success</h3>
            <p className="site-card__text">
              What “done” looks like for your team: leads, credibility,
              performance, or internal workflows you need the site to support.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Who joins</h3>
            <p className="site-card__text">
              Ideally someone who can speak to priorities and budget, plus
              whoever will own content or approvals day to day.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Brand &amp; references</h3>
            <p className="site-card__text">
              Logos, style guides, or a few sites you admire—helpful, not
              required for the first conversation.
            </p>
          </article>
        </div>
      </SiteSection>

      <SiteSection eyebrow="What happens next" title="After the call">
        <ol className="site-steps">
          <li>
            <strong className="site-steps__label">Follow-up summary</strong>
            <span>
              We recap what we heard, open questions, and suggested direction so
              everyone is aligned in writing.
            </span>
          </li>
          <li>
            <strong className="site-steps__label">
              Proposal &amp; estimate
            </strong>
            <span>
              When it makes sense, we share scope options, timeline, and
              investment ranges for you to review internally.
            </span>
          </li>
          <li>
            <strong className="site-steps__label">Kickoff</strong>
            <span>
              If you move forward, we schedule onboarding, access, and the first
              working sessions—aligned with our broader delivery approach.
            </span>
          </li>
        </ol>
        <div className="site-prose">
          <p>
            Curious how we work end to end? See our{" "}
            <Link href="/about/problem-solving-approach" className="site-link">
              problem-solving approach
            </Link>
            .
          </p>
        </div>
      </SiteSection>

      <SiteSection eyebrow="Calendar" title="Scheduling">
        {calendlyUrl ? (
          <div className="site-scheduling">
            <div className="site-prose">
              <p>
                Pick a time that works for you. This is a working session, not a
                sales pitch—bring your questions. If you prefer not to use the
                calendar, reach out via the{" "}
                <a href="#" className="js-contact-trigger site-link">
                  contact form
                </a>{" "}
                and we will suggest slots.
              </p>
            </div>
            <CalendlyEmbed url={calendlyUrl} />
          </div>
        ) : (
          <div className="site-prose">
            <p>
              Add your Calendly event URL to{" "}
              <code>NEXT_PUBLIC_CALENDLY_URL</code> in <code>.env.local</code>{" "}
              (Calendly → Event type → Share). Until then, use the{" "}
              <a href="#" className="js-contact-trigger site-link">
                contact form
              </a>{" "}
              and we will reach out with times that work.
            </p>
          </div>
        )}
      </SiteSection>

      <SiteCta
        title="Explore how we work first"
        body="Read our framework from discovery to launch, or meet the people behind the work—then book when you are ready."
        primaryHref="/about/problem-solving-approach"
        primaryLabel="Problem-solving approach"
        secondaryHref="/about/team"
        secondaryLabel="Meet the team"
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
