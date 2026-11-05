import { useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { creativeTools, experience, site, workKinds, works, type WorkKind } from "../data/content";
import { useArrival, useTitle } from "../hooks";
import { timecode } from "../timecode";
import Arrival from "../components/Arrival";
import SiteNav from "../components/SiteNav";
import Footer from "../components/Footer";
import Contact from "../components/Contact";
import DraftBadge from "../components/DraftBadge";
import Lightbox, { toSlides } from "../components/Lightbox";
import SideLink from "../components/SideLink";
import Timeline from "../components/Timeline";

const tracks: { label: string; clips: { w: number; c: "cyan" | "pink" | "sun" | "gap" }[] }[] = [
  {
    label: "V2",
    clips: [
      { w: 12, c: "gap" },
      { w: 26, c: "pink" },
      { w: 8, c: "gap" },
      { w: 34, c: "sun" },
      { w: 20, c: "pink" },
    ],
  },
  {
    label: "V1",
    clips: [
      { w: 30, c: "cyan" },
      { w: 22, c: "sun" },
      { w: 28, c: "cyan" },
      { w: 20, c: "pink" },
    ],
  },
  {
    label: "A1",
    clips: [
      { w: 18, c: "gap" },
      { w: 64, c: "cyan" },
      { w: 18, c: "gap" },
    ],
  },
];

/** A decorative timeline. A playhead follows the pointer and reads out a timecode. */
function TimelineDemo() {
  const x = useMotionValue(22);
  const left = useTransform(x, (v) => `${v}%`);
  const code = useTransform(x, timecode);

  return (
    <div
      className="tl"
      aria-hidden="true"
      onPointerMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        const labelWidth = 44;
        const p = ((e.clientX - r.left - labelWidth) / (r.width - labelWidth)) * 100;
        x.set(Math.min(100, Math.max(0, p)));
      }}
    >
      <div className="tl__ruler" />
      <div className="tl__tracks">
        {tracks.map((t) => (
          <div className="tl__track" key={t.label}>
            <span className="tl__label">{t.label}</span>
            <div className="tl__lane">
              {t.clips.map((c, i) => (
                <i
                  key={i}
                  className={c.c === "gap" ? "tl__gap" : `clip clip--${c.c}`}
                  style={{ flexBasis: `${c.w}%` }}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
      <div className="tl__playfield">
        <motion.div className="tl__playhead" style={{ left }}>
          <motion.span className="tl__code">{code}</motion.span>
        </motion.div>
      </div>
    </div>
  );
}

export default function Creative() {
  useTitle(`Video editor and digital artist — ${site.name}`);
  const arrival = useArrival("creative");
  const [kind, setKind] = useState<"all" | WorkKind>("all");
  const [openAt, setOpenAt] = useState<number | null>(null);
  const shown = kind === "all" ? works : works.filter((w) => w.kind === kind);
  const slides = toSlides(shown);
  const usedKinds = workKinds.filter((k) => works.some((w) => w.kind === k.id));

  return (
    <div className={`page theme-creative${arrival ? ` is-arriving is-arriving--${arrival}` : ""}`}>
      {arrival === "seam" && <Arrival side="creative" />}
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <SiteNav />

      <main id="main">
        <section className="wrap cre-hero" aria-labelledby="cre-title">
          <h1 id="cre-title" className="cre-hero__title">
            Video, 3D, and digital art
          </h1>
          <div className="cre-hero__row">
            <p className="cre-hero__lead">I edit ads that hold attention, and take on passion projects when the story is worth telling.</p>
            <div className="cre-hero__actions">
              <a className="btn" href="#work">
                See the work
              </a>
              <Link className="btn btn--ghost" to="/quick">
                Quick view
              </Link>
            </div>
          </div>
          <TimelineDemo />
        </section>

        <div className="wrap">
          <section className="section" id="work" aria-labelledby="work-title">
            <h2 id="work-title" className="section__title">
              Work
            </h2>

            <p className="samples">
              <strong>These are just samples, not all of my work.</strong> Want to see more, or
              something closer to your brand? <a href="#contact">Ask me</a>.
            </p>

            <div className="chips" role="group" aria-label="Filter by type">
              {[{ id: "all" as const, label: "All" }, ...usedKinds].map((k) => (
                <button
                  key={k.id}
                  type="button"
                  className="chip"
                  aria-pressed={kind === k.id}
                  onClick={() => setKind(k.id)}
                >
                  {k.label}
                </button>
              ))}
            </div>
            <p className="sr-only" aria-live="polite">
              {shown.length} {shown.length === 1 ? "piece" : "pieces"} shown
            </p>

            <ul className="works">
              <AnimatePresence mode="popLayout">
                {shown.map((w) => (
                  <motion.li
                    key={w.id}
                    layout
                    className={`work work--${w.kind}`}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.22 }}
                  >
                    <article className="work__card">
                      <div className="work__media">
                        <img className="work__backdrop" src={w.image} alt="" loading="lazy" />
                        <img className="work__cover" src={w.image} alt="" loading="lazy" />
                        {w.video && (
                          <span className="work__badge work__badge--play" aria-hidden="true">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                              <path d="M4 2.5v11l9-5.5z" />
                            </svg>
                          </span>
                        )}
                        {w.gallery && (
                          <span className="work__badge" aria-hidden="true">
                            {w.gallery.length + 1} images
                          </span>
                        )}
                      </div>
                      <h3 className="work__title">
                        <button
                          type="button"
                          className="work__open"
                          onClick={() =>
                            setOpenAt(slides.findIndex((s) => s.work.id === w.id))
                          }
                        >
                          {w.title}
                        </button>{" "}
                        <DraftBadge show={w.draft} />
                      </h3>
                      <p className="work__kind">{workKinds.find((k) => k.id === w.kind)?.label}</p>
                      <p className="work__note">{w.note}</p>
                    </article>
                  </motion.li>
                ))}
              </AnimatePresence>
            </ul>

            {openAt !== null && (
              <Lightbox
                slides={slides}
                index={openAt}
                onIndex={setOpenAt}
                onClose={() => setOpenAt(null)}
              />
            )}
          </section>

          <section className="section" id="experience" aria-labelledby="experience-title">
            <h2 id="experience-title" className="section__title">
              Experience
            </h2>
            <Timeline entries={experience} />
          </section>

          <section className="section" id="tools" aria-labelledby="tools-title">
            <h2 id="tools-title" className="section__title">
              Tools <DraftBadge show={creativeTools.draft} />
            </h2>
            <ul className="tool-list">
              {creativeTools.items.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </section>
        </div>

        <div className="wrap">
          <Contact
            heading="Got footage that needs a story?"
            intro="I edit video ads and passion projects, and make 3D art, graphics, and AI UGC. Send me a brief and a deadline."
          />
        </div>

        <div className="dev-switch wrap">
          <p>
            I also build web apps.{" "}
            <SideLink side="developer" className="text-link">
              See the developer side
            </SideLink>
          </p>
        </div>
      </main>

      <Footer />
    </div>
  );
}
