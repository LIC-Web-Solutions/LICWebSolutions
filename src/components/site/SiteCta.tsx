import Link from "next/link";

export function SiteCta({
  title,
  body,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: {
  title: string;
  body: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
}) {
  return (
    <div className="site-cta">
      <div className="site-cta__inner">
        <h2 className="site-cta__title">{title}</h2>
        <p className="site-cta__body">{body}</p>
        <div className="site-cta__actions">
          <Link
            className="site-cta__btn site-cta__btn--primary"
            href={primaryHref}
          >
            {primaryLabel}
          </Link>
          {secondaryHref && secondaryLabel ? (
            <Link
              className="site-cta__btn site-cta__btn--ghost"
              href={secondaryHref}
            >
              {secondaryLabel}
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}
