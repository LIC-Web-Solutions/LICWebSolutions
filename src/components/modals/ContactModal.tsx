export function ContactModal() {
  return (
    <div
      className="contact-modal"
      id="contact-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-modal-title"
      aria-hidden="true"
      inert
    >
      <div className="contact-modal__dialog">
        <button
          type="button"
          className="contact-modal__close"
          aria-label="Close contact form"
        >
          &times;
        </button>

        <h2 className="contact-modal__title" id="contact-modal-title">
          Let's talk about your project
        </h2>
        <p className="contact-modal__subtitle">
          Share a few details and we&apos;ll reach out shortly.
        </p>

        <form className="contact-modal__form">
          <label className="contact-modal__label">
            Full Name
            <input
              type="text"
              name="name"
              className="contact-modal__input"
              placeholder="Jane Doe"
              required
            />
          </label>

          <label className="contact-modal__label">
            Email
            <input
              type="email"
              name="email"
              className="contact-modal__input"
              placeholder="you@example.com"
              required
            />
          </label>

          <label className="contact-modal__label">
            How can we help?
            <textarea
              name="message"
              rows={4}
              className="contact-modal__textarea"
              placeholder="Tell us about your goals, timeline, and budget."
              required
            />
          </label>

          <div className="contact-modal__actions">
            <button type="submit" className="contact-modal__submit">
              Send message
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
