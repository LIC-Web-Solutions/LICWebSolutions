import { SiteCta } from "./SiteCta";
import { SitePage } from "./SitePage";
import { SiteSection } from "./SiteSection";

export function AboutUsPage() {
  return (
    <SitePage
      kicker="About"
      title="Who we are"
      lead="LIC Web Solutions partners with organizations that need websites that look sharp, load fast, and stay easy to maintain for years—not weeks."
    >
      <SiteSection eyebrow="Our story" title="Built around clarity and craft">
        <div className="site-prose">
          <p>
            We focus on disciplined design: typography, spacing, and performance
            that reinforce your brand without noisy trends. Every engagement
            starts with understanding your audience and the outcomes you need
            from the site.
          </p>
          <p>
            Whether you are launching something new or replacing a legacy
            experience, we align stakeholders early, document decisions, and
            ship code you can build on.
          </p>
        </div>
      </SiteSection>
      <SiteSection
        eyebrow="How we work"
        title="Partnership, not a one-off handoff"
      >
        <ul className="site-list">
          <li>
            Discovery workshops that surface real priorities and constraints.
          </li>
          <li>
            Design systems and components that scale as your content grows.
          </li>
          <li>
            Launch support with analytics hooks so you can measure what matters.
          </li>
        </ul>
      </SiteSection>
      <SiteCta
        title="Meet the people behind the work"
        body="Explore our team and how roles collaborate on your project."
        primaryHref="/about/team"
        primaryLabel="View team"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Book a call"
      />
    </SitePage>
  );
}

export function CoreValuesPage() {
  return (
    <SitePage
      kicker="About"
      title="Core values"
      lead="These principles guide how we design, build, and communicate with clients."
    >
      <div className="site-grid site-grid--3">
        <article className="site-card">
          <h3 className="site-card__title">Clarity first</h3>
          <p className="site-card__text">
            We simplify navigation and messaging so visitors find what they need
            without friction.
          </p>
        </article>
        <article className="site-card">
          <h3 className="site-card__title">Long-term thinking</h3>
          <p className="site-card__text">
            We choose patterns and stacks that stay maintainable as your team
            grows.
          </p>
        </article>
        <article className="site-card">
          <h3 className="site-card__title">Accountability</h3>
          <p className="site-card__text">
            Clear timelines, visible progress, and honest trade-offs at every
            milestone.
          </p>
        </article>
      </div>
      <SiteSection title="How values show up in delivery">
        <div className="site-split">
          <div className="site-prose">
            <p>
              Values are not a poster on the wall—they are reflected in
              documentation, code review, and how we respond when requirements
              shift.
            </p>
          </div>
          <div className="site-prose">
            <p>
              You will see them in accessible markup, performance budgets, and
              training so your team can publish content confidently.
            </p>
          </div>
        </div>
      </SiteSection>
      <SiteCta
        title="See how we solve problems"
        body="Our approach section walks through discovery, design, and build in more detail."
        primaryHref="/about/problem-solving-approach"
        primaryLabel="Problem-solving approach"
        secondaryHref="/contact/book-a-call"
        secondaryLabel="Talk to us"
      />
    </SitePage>
  );
}

export function ProblemSolvingApproachPage() {
  return (
    <SitePage
      kicker="About"
      title="Problem solving approach"
      lead="A repeatable framework from first conversation to launch—and beyond."
    >
      <ol className="site-steps">
        <li>
          <strong className="site-steps__label">Align</strong>
          <span>
            Goals, audiences, success metrics, and technical constraints
            captured in a shared brief.
          </span>
        </li>
        <li>
          <strong className="site-steps__label">Design</strong>
          <span>
            Wireframes and high-fidelity UI with component thinking, not one-off
            pages.
          </span>
        </li>
        <li>
          <strong className="site-steps__label">Build</strong>
          <span>
            Accessible front ends, clean content models, and staging
            environments for review.
          </span>
        </li>
        <li>
          <strong className="site-steps__label">Launch & learn</strong>
          <span>
            Deployment, monitoring, and iteration based on real usage—not just
            opinions.
          </span>
        </li>
      </ol>
      <SiteSection title="Collaboration tools">
        <div className="site-prose">
          <p>
            We meet you where you are: shared Figma files, tracked issues, and
            recorded walkthroughs so decisions stay traceable.
          </p>
        </div>
      </SiteSection>
      <SiteCta
        title="Ready to start?"
        body="Book a short call to walk through your goals and timeline."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/about/team"
        secondaryLabel="Meet the team"
      />
    </SitePage>
  );
}

export function TeamPage() {
  return (
    <SitePage
      kicker="About"
      title="Meet the team"
      lead="The people behind disciplined design, solid engineering, and long-term care for your site."
    >
      <SiteSection eyebrow="Leadership" title="From the founder">
        <div className="site-split site-split--founder">
          <div className="site-founder-photo">
            <img
              src="/assets/team-founder.png"
              alt="Mahdi Tanzim, founder of LIC Web Solutions"
              width={960}
              height={720}
            />
          </div>
          <div className="site-founder__copy">
            <h3 className="site-card__title">Mahdi Tanzim</h3>
            <p className="site-founder__role">Founder &amp; CEO</p>
            <div className="site-founder__blocks">
              <section className="site-founder__block">
                <h4 className="site-founder__block-title">Mission</h4>
                <p className="site-founder__block-text">
                  LIC Web Solutions exists to help organizations ship web
                  experiences that stay fast, clear, and maintainable—so your
                  team can focus on the work, not wrestling with the stack.
                </p>
              </section>
              <section className="site-founder__block">
                <h4 className="site-founder__block-title">How I work</h4>
                <p className="site-founder__block-text">
                  I stay hands-on with clients on strategy and delivery, and I
                  build the practice around accountability, craft, and respect
                  for your audience&apos;s time.
                </p>
              </section>
            </div>
          </div>
        </div>
      </SiteSection>
      <SiteSection
        eyebrow="Capabilities"
        title="How the team shows up on every project"
      >
        <div className="site-grid site-grid--2">
          <article className="site-card">
            <h3 className="site-card__title">Design & UX</h3>
            <p className="site-card__text">
              Brand-aware layouts, interaction patterns, and content hierarchy
              tuned for conversion and comprehension.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Engineering</h3>
            <p className="site-card__text">
              Modern front-end stacks, performance tuning, and integrations with
              your CRM or marketing tools.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Content & strategy</h3>
            <p className="site-card__text">
              Messaging that fits your voice, migration plans, and SEO-friendly
              structure.
            </p>
          </article>
          <article className="site-card">
            <h3 className="site-card__title">Support</h3>
            <p className="site-card__text">
              Post-launch updates, monitoring, and training so your team stays
              unblocked.
            </p>
          </article>
        </div>
      </SiteSection>
      <SiteCta
        title="Work with us"
        body="Tell us about your project and we will match you with the right squad."
        primaryHref="/contact/book-a-call"
        primaryLabel="Book a call"
        secondaryHref="/work/featured-projects"
        secondaryLabel="See featured work"
      />
    </SitePage>
  );
}
