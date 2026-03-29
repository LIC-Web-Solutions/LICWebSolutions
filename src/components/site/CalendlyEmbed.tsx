/**
 * Inline Calendly booking. Set NEXT_PUBLIC_CALENDLY_URL to your event link
 * (Calendly → Event types → Share → copy link).
 */
export function CalendlyEmbed({ url }: { url: string }) {
  const src = url.includes("?") ? `${url}&embed=true` : `${url}?embed=true`;

  return (
    <div className="site-calendly-embed">
      <iframe
        title="Book a call with LIC Web Solutions"
        src={src}
        loading="lazy"
      />
    </div>
  );
}
