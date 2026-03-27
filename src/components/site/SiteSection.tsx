export function SiteSection({
  eyebrow,
  title,
  children,
}: {
  eyebrow?: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="site-section">
      <div className="site-section__head">
        {eyebrow ? <p className="site-section__eyebrow">{eyebrow}</p> : null}
        <h2 className="site-section__title">{title}</h2>
      </div>
      <div className="site-section__content">{children}</div>
    </section>
  );
}
