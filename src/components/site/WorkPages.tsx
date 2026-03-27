import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

export function IndustriesPage() {
  return (
    <SitePage
      kicker="Work"
      title="Industries we serve"
      lead="We adapt tone, compliance, and UX patterns to the sectors you operate in—without losing a cohesive brand."
    >
      <div className="site-grid site-grid--3">
        {[
          {
            title: "Professional services",
            text: "Trust-building layouts, attorney bios, and lead capture tuned for referrals.",
          },
          {
            title: "Healthcare & wellness",
            text: "Clear patient pathways, HIPAA-aware content practices, and accessible forms.",
          },
          {
            title: "Technology & SaaS",
            text: "Product storytelling, pricing tables, and integration pages that convert trials.",
          },
          {
            title: "Education & nonprofits",
            text: "Donation flows, program directories, and event calendars that stay easy to update.",
          },
          {
            title: "Hospitality & retail",
            text: "Location pages, menus, and reservation CTAs that work on mobile first.",
          },
          {
            title: "Industrial & logistics",
            text: "Spec sheets, service areas, and recruitment funnels for distributed teams.",
          },
        ].map((item) => (
          <article key={item.title} className="site-card">
            <h3 className="site-card__title">{item.title}</h3>
            <p className="site-card__text">{item.text}</p>
          </article>
        ))}
      </div>
      <SiteSection title="How we onboard new industry work">
        <div className="site-prose">
          <p>
            We interview stakeholders, review competitors, and audit existing
            content so the first design sprint reflects real constraints—not
            generic templates.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="See outcomes"
        body="Browse case-style highlights from recent projects."
        primaryHref="/work/featured-projects"
        primaryLabel="Featured projects"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Book a call"
      />
    </SitePage>
  );
}

export function FeaturedProjectsPage() {
  return (
    <SitePage
      kicker="Work"
      title="Featured projects"
      lead="Selected engagements that show how we combine strategy, design, and engineering."
    >
      <div className="site-grid site-grid--2">
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Corporate rebrand</p>
          <h3 className="site-card__title">Global site relaunch</h3>
          <p className="site-card__text">
            Unified navigation across regions, localized content, and a
            component library that marketing owns day to day.
          </p>
        </article>
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Growth</p>
          <h3 className="site-card__title">Conversion-focused landing system</h3>
          <p className="site-card__text">
            Modular templates for campaigns, A/B-ready hero slots, and
            analytics events tied to funnel stages.
          </p>
        </article>
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Product</p>
          <h3 className="site-card__title">Marketing site + docs</h3>
          <p className="site-card__text">
            Single design language across marketing pages and developer docs,
            with search and versioning baked in.
          </p>
        </article>
        <article className="site-card site-card--tall">
          <p className="site-card__eyebrow">Support</p>
          <h3 className="site-card__title">Ongoing optimization</h3>
          <p className="site-card__text">
            Quarterly performance reviews, Core Web Vitals improvements, and
            iterative content updates.
          </p>
        </article>
      </div>
      <SiteCta
        title="Tell us about your project"
        body="We will recommend a team shape and timeline based on your goals."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/about/team"
        secondaryLabel="Meet the team"
      />
    </SitePage>
  );
}
