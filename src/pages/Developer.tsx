import { useState } from "react";
import { Link } from "react-router-dom";
import { education, projects, site, skillGroups, type Project } from "../data/content";
import { useArrival, useTitle } from "../hooks";
import Arrival from "../components/Arrival";
import SideLink from "../components/SideLink";
import Terminal from "../components/Terminal";
import Timeline from "../components/Timeline";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import DraftBadge from "../components/DraftBadge";

const FACTS = [
  { value: "6", label: "semesters on the President's List" },
  { value: "1", label: "semester on the Dean's List" },
  { value: "2027", label: "graduating class, BS Computer Science" },
];

/** A browser window around a picture of the project. Opens the project when it has a link. */
function ProjectPreview({ project }: { project: Project }) {
  const { preview, links } = project;
  const frame = (
    <>
      <span className="proj__chrome" aria-hidden="true">
        <i />
        <i />
        <i />
        <span>{preview.label}</span>
      </span>
      <img src={preview.src} alt={preview.alt} />
    </>
  );
  return links[0] ? (
    <a className="proj__preview" href={links[0].href} target="_blank" rel="noreferrer">
      {frame}
    </a>
  ) : (
    <div className="proj__preview">{frame}</div>
  );
}

function ProjectRow({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  const panelId = `project-${project.id}`;
  return (
    <li className="proj">
      <h3 className="proj__head">
        <button
          type="button"
          className="proj__button"
          aria-expanded={open}
          aria-controls={panelId}
          onClick={onToggle}
        >
          <span className="proj__name">
            {project.name} <DraftBadge show={project.draft} />
          </span>
          <span className="proj__summary">{project.summary}</span>
          <span className="proj__status">{project.status}</span>
          <span className="proj__toggle" aria-hidden="true">
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 9h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path
                className="proj__plus"
                d="M9 2v14"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </span>
        </button>
      </h3>

      {/* Stays mounted, so the picture has already loaded by the time the row opens. */}
      <div id={panelId} role="region" aria-label={`${project.name} details`} className="proj__panel">
        <div className="proj__clip">
          <div className="proj__inner">
            <div className="proj__copy">
              <div className="prose">
                {project.details.map((d) => (
                  <p key={d}>{d}</p>
                ))}
              </div>
              <ul className="proj__stack" aria-label="Technologies">
                {project.stack.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
              {project.links.length > 0 && (
                <ul className="proj__links">
                  {project.links.map((l) => (
                    <li key={l.href}>
                      <a className="btn" href={l.href} target="_blank" rel="noreferrer">
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
            <ProjectPreview project={project} />
          </div>
        </div>
      </div>
    </li>
  );
}

export default function Developer() {
  useTitle(`Software developer — ${site.name}`);
  const arrival = useArrival("developer");
  // Each row opens on its own, so a row never moves under the pointer because another one closed.
  const [openIds, setOpenIds] = useState<string[]>(projects[0] ? [projects[0].id] : []);

  return (
    <div className={`page theme-dev${arrival ? ` is-arriving is-arriving--${arrival}` : ""}`}>
      {arrival === "seam" && <Arrival side="developer" />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />

      <main id="main">
        <section className="dev-hero wrap" aria-labelledby="dev-title">
          <div className="dev-hero__copy">
            <h1 id="dev-title" className="dev-hero__title">
              Web and mobile apps, from database to interface
              <span className="caret" aria-hidden="true" />
            </h1>
            <div className="prose">
              <p>
                I’m a computer science student and CHED scholar at Holy Angel University. I take
                apps from the first table to the last screen, and I care as much about how they
                feel to use as how they work.
              </p>
            </div>
            <div className="dev-hero__actions">
              <a className="btn" href="#projects">
                See projects
              </a>
              <Link className="btn btn--ghost" to="/quick">
                Quick view
              </Link>
            </div>
          </div>

          <Terminal />
        </section>

        <ul className="dev-facts wrap" aria-label="At a glance">
          {FACTS.map((f) => (
            <li key={f.label}>
              <strong>{f.value}</strong>
              <span>{f.label}</span>
            </li>
          ))}
        </ul>

        <div className="wrap">
          <section className="section" id="projects" aria-labelledby="projects-title">
            <h2 id="projects-title" className="section__title">
              Projects
            </h2>
            <ul className="proj-list">
              {projects.map((p) => (
                <ProjectRow
                  key={p.id}
                  project={p}
                  open={openIds.includes(p.id)}
                  onToggle={() =>
                    setOpenIds((ids) =>
                      ids.includes(p.id) ? ids.filter((id) => id !== p.id) : [...ids, p.id],
                    )
                  }
                />
              ))}
            </ul>
          </section>

          <section className="section" id="stack" aria-labelledby="stack-title">
            <h2 id="stack-title" className="section__title">
              Tools I use
            </h2>
            <dl className="stack-list">
              {skillGroups.map((g) => (
                <div key={g.label} className="stack-list__row">
                  <dt>{g.label}</dt>
                  <dd>
                    <ul>
                      {g.items.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section className="section" id="education" aria-labelledby="education-title">
            <h2 id="education-title" className="section__title">
              Education
            </h2>
            <Timeline entries={education} />
            <p className="timeline__aside">
              I’ve also worked as a freelance video editor.{" "}
              <SideLink side="creative" className="text-link">
                See the creative side
              </SideLink>
            </p>
          </section>
        </div>

        <div className="wrap">
          <Contact
            heading="Let’s build something"
            intro="Hiring for an internship or a junior role, or need a site or web app? Send me a message."
          />
        </div>

        <div className="dev-switch wrap">
          <p>
            I also edit video and make digital art.{" "}
            <SideLink side="creative" className="text-link">
              See the creative side
            </SideLink>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
