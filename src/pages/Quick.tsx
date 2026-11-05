import type { CSSProperties } from "react";
import { projects, site } from "../data/content";
import { useTitle } from "../hooks";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";

const projectLink = (id: string) => projects.find((p) => p.id === id)?.links[0]?.href ?? "";

// The PDF's page size, and the links printed on it as x, y, width, and height on that page.
const PAGE = { width: 595.28, height: 841.89 };
const RESUME_LINKS = [
  { label: "LinkedIn", href: site.linkedin, box: [34.5, 58, 206, 12] },
  { label: `Call ${site.phone}`, href: `tel:${site.phone}`, box: [251, 58, 67, 12] },
  { label: `Email ${site.email}`, href: `mailto:${site.email}`, box: [331.5, 58, 95, 12] },
  { label: "GitHub", href: site.github, box: [445, 58, 109, 12] },
  { label: "VeilText", href: projectLink("veiltext"), box: [36.3, 322.1, 252.3, 12.2] },
  { label: "Prime Meridian Realty", href: projectLink("prime-meridian"), box: [38.8, 400, 177.6, 12.2] },
  { label: "MoodCheck", href: projectLink("moodcheck"), box: [38.6, 476.4, 245.2, 12.2] },
];

/** The resume itself. The page opens the PDF, and the links printed on it work. */
export default function Quick() {
  useTitle(`Quick view — ${site.name}`);
  return (
    <div className="page theme-dev quick">
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />

      <main id="main" className="wrap quick__main">
        <header className="quick__head">
          <div>
            <h1 className="quick__name">{site.name}</h1>
            <p className="muted">{site.availability}</p>
          </div>
          <a className="btn" href={site.resume} target="_blank" rel="noreferrer">
            Open resume
          </a>
        </header>

        <div className="resume">
          <a className="resume__page" href={site.resume} target="_blank" rel="noreferrer">
            <img
              src={site.resumeImage}
              width={1600}
              height={2263}
              alt={`Resume of ${site.name}, covering technical skills, education, projects, freelance work, and certifications. Opens the PDF.`}
            />
          </a>
          {RESUME_LINKS.map(({ label, href, box: [x, y, w, h] }) => (
            <a
              key={label}
              className="resume__link"
              href={href}
              aria-label={label}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={
                {
                  "--x": x / PAGE.width,
                  "--y": y / PAGE.height,
                  "--w": w / PAGE.width,
                  "--h": h / PAGE.height,
                } as CSSProperties
              }
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
