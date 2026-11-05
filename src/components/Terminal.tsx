import { useState, type CSSProperties } from "react";
import { projects, site } from "../data/content";

type Line = { text: string; href?: string };

const mailto = `mailto:${site.email}`;

const COMMANDS: { command: string; output: Line[] }[] = [
  {
    command: "whoami",
    output: [
      { text: site.name },
      { text: "Computer science student, Holy Angel University" },
      { text: "Builds web and mobile apps. Also edits video." },
    ],
  },
  {
    command: "ls projects",
    output: projects.map((p) => ({ text: `${p.name}/`, href: p.links[0]?.href })),
  },
  {
    command: "cat honors.txt",
    output: [
      { text: "President's Lister, 6 semesters" },
      { text: "Dean's Lister, 1 semester" },
      { text: "CHED Scholar" },
      { text: "Google Developer Student Club, 2023 to 2025" },
    ],
  },
  {
    command: "sudo hire-euan",
    output: [
      { text: "[sudo] password: ********" },
      { text: "Access granted." },
      { text: site.availability },
      { text: site.email, href: mailto },
    ],
  },
];

/** A small terminal for the developer hero. Each button runs a real answer about me. */
export default function Terminal() {
  const [current, setCurrent] = useState(0);
  const [ran, setRan] = useState(false);
  const { command, output } = COMMANDS[current];

  return (
    <div className="editor term">
      <p className="editor__bar">euan@portfolio: ~</p>
      <div className="term__screen" role="log" aria-live="polite">
        <div key={command} className={ran ? undefined : "term__intro"}>
          <p className="term__line" style={{ "--i": 0 } as CSSProperties}>
            <span className="term__prompt" aria-hidden="true">
              ${" "}
            </span>
            {command}
          </p>
          {output.map((line, i) => (
            <p
              key={line.text}
              className="term__line term__line--out"
              style={{ "--i": i + 1 } as CSSProperties}
            >
              {line.href ? (
                <a
                  href={line.href}
                  {...(line.href === mailto ? {} : { target: "_blank", rel: "noreferrer" })}
                >
                  {line.text}
                </a>
              ) : (
                line.text
              )}
            </p>
          ))}
          <span className="term__caret" aria-hidden="true" />
        </div>
      </div>
      <div className="term__commands" role="group" aria-label="Run a command">
        {COMMANDS.map((c, i) => (
          <button
            key={c.command}
            type="button"
            className="term__command"
            aria-pressed={i === current}
            onClick={() => {
              setRan(true);
              setCurrent(i);
            }}
          >
            {c.command}
          </button>
        ))}
      </div>
    </div>
  );
}
