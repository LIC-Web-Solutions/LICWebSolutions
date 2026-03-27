import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

export function WebDesignUxPage() {
  return (
    <SitePage
      kicker="Services"
      title="Web design & UX"
      lead="Interfaces that feel intentional, load fast, and guide visitors toward the actions you care about."
    >
      <SiteSection title="What you get">
        <ul className="site-list">
          <li>User flows and sitemap aligned to your business goals.</li>
          <li>Responsive layouts tested across breakpoints and devices.</li>
          <li>Design systems with reusable components for future pages.</li>
          <li>Accessibility baked in from the first frame—not patched later.</li>
        </ul>
      </SiteSection>
      <SiteSection eyebrow="Deliverables" title="From wireframes to polished UI">
        <div className="site-split">
          <div className="site-prose">
            <p>
              We start with low-fidelity wireframes to validate structure, then
              layer visual design, motion, and content. You get annotated specs
              for engineering handoff.
            </p>
          </div>
          <div className="site-prose">
            <p>
              Prototypes and usability reviews help catch friction before
              development, saving time and rework.
            </p>
          </div>
        </div>
      </SiteSection>
      <SiteCta
        title="See how we build it"
        body="Pair design with development for a seamless path from concept to production."
        primaryHref="/services/web-development"
        primaryLabel="Web development"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Book a call"
      />
    </SitePage>
  );
}

export function WebDevelopmentPage() {
  return (
    <SitePage
      kicker="Services"
      title="Web development"
      lead="Clean, performant front ends built with modern tooling and deployment practices you can trust."
    >
      <SiteSection title="Capabilities">
        <div className="site-grid site-grid--2">
          <article className="site-card">
            <h3 className="site-card__title">Next.js & React</h3>
            <p className="site-card__text">
              App Router, server components where appropriate, and optimized
              assets for fast first paint.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">CMS integration</h3>
            <p className="site-card__text">
              Structured content models so editors can publish without
              developer bottlenecks.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Quality</h3>
            <p className="site-card__text">
              Type-safe code, linting, and staging previews before anything
              reaches production.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Analytics & events</h3>
            <p className="site-card__text">
              Instrumentation hooks for conversion tracking and continuous
              improvement.
            </p>
          </article>
        </div>
      </SiteSection>
      <SiteCta
        title="Keep it running smoothly"
        body="Ongoing maintenance keeps dependencies, security, and performance in check."
        primaryHref="/services/website-maintenance"
        primaryLabel="Website maintenance"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Book a call"
      />
    </SitePage>
  );
}

export function WebsiteMaintenancePage() {
  return (
    <SitePage
      kicker="Services"
      title="Website maintenance"
      lead="Proactive care so your site stays secure, fast, and aligned with your latest content."
    >
      <SiteSection title="What maintenance covers">
        <ul className="site-list">
          <li>Dependency and security updates on a predictable cadence.</li>
          <li>Performance monitoring and fixes for regressions.</li>
          <li>Content tweaks, landing pages, and small feature additions.</li>
          <li>Backups and recovery planning for peace of mind.</li>
        </ul>
      </SiteSection>
      <SiteSection title="How we work with your team">
        <div className="site-prose">
          <p>
            You get a clear channel for requests, SLAs that match your risk
            profile, and monthly reporting on what shipped and what is queued.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Need something more?"
        body="Mobile apps and complex integrations are in scope too."
        primaryHref="/services/mobile-app-development"
        primaryLabel="Mobile app development"
        secondaryHref="/contact/support"
        secondaryLabel="Support"
      />
    </SitePage>
  );
}

export function MobileAppDevelopmentPage() {
  return (
    <SitePage
      kicker="Services"
      title="Mobile app development"
      lead="Companion apps for iOS and Android that extend your brand and connect with your web stack."
    >
      <SiteSection title="What we build">
        <div className="site-grid site-grid--2">
          <article className="site-card">
            <h3 className="site-card__title">Cross-platform</h3>
            <p className="site-card__text">
              Shared React Native or Flutter codebases where it makes sense
              for speed and cost.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Native when it matters</h3>
            <p className="site-card__text">
              Platform-specific features and polish when UX demands it.
            </p>
          </article>
        </div>
      </SiteSection>
      <SiteSection title="From idea to store">
        <div className="site-prose">
          <p>
            We help define MVP scope, design screens, integrate APIs, and
            navigate release and review processes with Apple and Google.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Start with strategy"
        body="We can align your web and mobile roadmap in one conversation."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/services/web-development"
        secondaryLabel="Web development"
      />
    </SitePage>
  );
}
