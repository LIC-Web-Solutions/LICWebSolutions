import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

export function BlogPage() {
  return (
    <SitePage
      kicker="Insights"
      title="Blog"
      lead="Articles on design systems, performance, and running a site that stays fast as you grow."
    >
      <div className="site-grid site-grid--1">
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Design systems · 8 min read</p>
          <h3 className="site-card__title">
            How to keep components consistent without slowing your team down
          </h3>
          <p className="site-card__text">
            Tokens, naming, and review habits that keep design and engineering
            aligned as the product evolves.
          </p>
        </article>
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Performance · 6 min read</p>
          <h3 className="site-card__title">
            Core Web Vitals in the real world: what to fix first
          </h3>
          <p className="site-card__text">
            A practical order of operations for LCP, CLS, and INP when you are
            triaging a legacy site.
          </p>
        </article>
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Content · 5 min read</p>
          <h3 className="site-card__title">
            Editorial workflows that scale beyond one hero
          </h3>
          <p className="site-card__text">
            Roles, approvals, and preview environments that keep publishing safe
            without bottlenecks.
          </p>
        </article>
      </div>
      <SiteSection title="Subscribe">
        <div className="site-prose">
          <p>
            Full newsletter signup and RSS will live here when you wire your CMS
            or email provider. For now, reach out and we will add you to
            updates.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Go deeper by industry"
        body="Trends and benchmarks tailored to your sector."
        primaryHref="/insights/industry"
        primaryLabel="Industry insights"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Book a call"
      />
    </SitePage>
  );
}

export function IndustryInsightsPage() {
  return (
    <SitePage
      kicker="Insights"
      title="Industry insights"
      lead="Short briefs on what buyers expect from sites in regulated and competitive markets."
    >
      <SiteSection title="This quarter">
        <div className="site-split">
          <div className="site-prose">
            <p>
              <strong>Trust signals on professional services sites:</strong>{" "}
              Credential placement, team visibility, and contact paths that
              reduce friction for high-intent visitors.
            </p>
          </div>
          <div className="site-prose">
            <p>
              <strong>Healthcare UX:</strong> Plain language, accessibility
              checklists, and form patterns that reduce abandonment on mobile.
            </p>
          </div>
        </div>
      </SiteSection>
      <SiteSection title="Research notes">
        <ul className="site-list">
          <li>Benchmarks on page speed and conversion by vertical.</li>
          <li>Checklists for compliance and privacy disclosures.</li>
          <li>Competitive teardowns you can request for your niche.</li>
        </ul>
      </SiteSection>
      <SiteCta
        title="Want a custom teardown?"
        body="We can review your site and top competitors in a focused session."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/blog"
        secondaryLabel="Read the blog"
      />
    </SitePage>
  );
}

export function GuidesPage() {
  return (
    <SitePage
      kicker="Insights"
      title="Guides & tutorials"
      lead="Step-by-step resources for teams who want to ship better web experiences."
    >
      <ol className="site-steps">
        <li>
          <strong className="site-steps__label">Guide</strong>
          <span>
            Launching a new marketing site: stakeholder checklist and timeline
            template.
          </span>
        </li>
        <li>
          <strong className="site-steps__label">Tutorial</strong>
          <span>
            Structuring your CMS for reusable components and predictable URLs.
          </span>
        </li>
        <li>
          <strong className="site-steps__label">Workshop</strong>
          <span>
            Running a content audit with SEO and accessibility in the same pass.
          </span>
        </li>
      </ol>
      <SiteSection title="Coming next">
        <div className="site-prose">
          <p>
            We rotate topics based on client questions. If you have a topic,
            suggest it when you book a call—we often turn common requests into
            public guides.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Prefer hands-on help?"
        body="We can deliver private workshops for your team."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/insights/industry"
        secondaryLabel="Industry insights"
      />
    </SitePage>
  );
}
