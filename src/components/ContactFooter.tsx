import { CONTACT, SITE, SOCIAL_LINKS } from "@/data/content";

export function ContactFooter() {
  return (
    <>
      <section
        id="contact"
        className="contact-section"
        aria-labelledby="contact-heading"
      >
        <div className="container">
          <h2 id="contact-heading" className="contact-headline">
            {CONTACT.headline}
          </h2>
          <p className="contact-line">{CONTACT.line}</p>

          <div className="contact-links">
            <a
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.linkedin.label}
            </a>
            <a
              href={SOCIAL_LINKS.github.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.github.label}
            </a>
            <a href={SOCIAL_LINKS.email.href} className="text-link">
              {SOCIAL_LINKS.email.display}
            </a>
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container footer-inner">
          <div className="footer-meta">
            <span>{SITE.domain}</span>
            <span aria-hidden="true">·</span>
            <span>{SITE.location}</span>
            <span aria-hidden="true">·</span>
            <span>No tracking or marketing analytics.</span>
          </div>

          <div className="footer-links">
            <a
              href={SOCIAL_LINKS.linkedin.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.linkedin.label}
            </a>
            <a
              href={SOCIAL_LINKS.github.href}
              target="_blank"
              rel="noreferrer"
              className="text-link"
            >
              {SOCIAL_LINKS.github.label}
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
