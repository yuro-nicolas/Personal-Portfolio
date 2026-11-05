import { site } from "../data/content";

/** Contact links. Anything left empty in content.ts is skipped. */
export default function Contact({ heading, intro }: { heading: string; intro: string }) {
  const isDraftEmail = site.email === "you@example.com";
  return (
    <section className="contact" id="contact" aria-labelledby="contact-title">
      <h2 id="contact-title" className="contact__title">
        {heading}
      </h2>
      <p className="contact__intro">{intro}</p>
      <p className="contact__avail">{site.availability}</p>
      <ul className="contact__links">
        {site.email && (
          <li>
            <a className="btn" href={`mailto:${site.email}`}>
              Email {site.email}
            </a>
            {isDraftEmail && site.showDraftBadges && <span className="draft-badge">Sample</span>}
          </li>
        )}
        {site.github && (
          <li>
            <a className="btn btn--ghost" href={site.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
          </li>
        )}
        {site.linkedin && (
          <li>
            <a className="btn btn--ghost" href={site.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
          </li>
        )}
        {site.resume && (
          <li>
            <a className="btn btn--ghost" href={site.resume} target="_blank" rel="noreferrer">
              Resume (PDF)
            </a>
          </li>
        )}
      </ul>
    </section>
  );
}
