export function SitePage({
  kicker,
  title,
  lead,
  children,
}: {
  kicker?: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <main className="site-page">
      <header className="site-page__hero">
        <div className="site-page__hero-inner">
          {kicker ? <p className="site-page__kicker">{kicker}</p> : null}
          <h1 className="site-page__title">{title}</h1>
          <p className="site-page__lead">{lead}</p>
        </div>
      </header>
      <div className="site-page__body">{children}</div>
    </main>
  );
}
