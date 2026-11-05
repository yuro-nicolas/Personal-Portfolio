import {
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
  type MouseEvent,
  type PointerEvent,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type AnimationPlaybackControls,
  type MotionStyle,
} from "framer-motion";
import { projects, site } from "../data/content";
import { useTitle } from "../hooks";
import Center from "../components/Center";

/**
 * The seam is how you choose a side.
 * Drag it toward a side to preview it. Release past the commit line to open it.
 */
const COMMIT = 85; // seam at or beyond this % opens the developer side
const COMMIT_LOW = 100 - COMMIT; // seam at or below this % opens the creative side
const KEY_STEP = 5;
const KEY_MIN = 8;
const KEY_MAX = 92;
const VERTICAL_QUERY = "(max-width: 760px)";

type Side = "developer" | "creative";

const clamp = (n: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, n));

const tracks: { w: number; c: "cyan" | "pink" | "sun" }[][] = [
  [
    { w: 38, c: "cyan" },
    { w: 22, c: "pink" },
    { w: 30, c: "cyan" },
  ],
  [
    { w: 18, c: "sun" },
    { w: 46, c: "pink" },
    { w: 26, c: "sun" },
  ],
  [
    { w: 60, c: "cyan" },
    { w: 28, c: "pink" },
  ],
];

const creativeKinds: { label: string; c: "cyan" | "pink" | "sun"; w: number }[] = [
  { label: "Video", c: "cyan", w: 100 },
  { label: "AI UGC", c: "pink", w: 86 },
  { label: "3D art", c: "sun", w: 72 },
  { label: "Digital art", c: "cyan", w: 62 },
  { label: "Graphics", c: "pink", w: 52 },
];

const INTENT_TEXT: Record<Side, string> = {
  developer: "Release to open the developer portfolio",
  creative: "Release to open the creative portfolio",
};

export default function Landing() {
  useTitle(`${site.name} — Software developer, video editor, digital artist`);

  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const intro = useRef<AnimationPlaybackControls | null>(null);
  const dragging = useRef(false);
  const committing = useRef(false);

  const pos = useMotionValue(reduce ? 50 : 100);
  const seam = useTransform(pos, (v) => `${v}%`);
  // Each side's preview fades in as the seam moves toward it.
  const devPreview = useTransform(pos, [55, 72], [0, 1]);
  const crePreview = useTransform(pos, [28, 45], [1, 0]);

  const [value, setValue] = useState(50);
  const [armed, setArmed] = useState(false); // true once the visitor touches the seam
  const [isDragging, setIsDragging] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [vertical, setVertical] = useState(
    () => typeof window !== "undefined" && window.matchMedia(VERTICAL_QUERY).matches,
  );

  // Stack the two sides on narrow screens.
  useEffect(() => {
    const mq = window.matchMedia(VERTICAL_QUERY);
    const onChange = () => setVertical(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // One orchestrated moment: the seam scrubs in from the edge on first load.
  useEffect(() => {
    const unsub = pos.on("change", (v) => setValue(Math.round(v)));
    if (!reduce) {
      intro.current = animate(pos, 50, { duration: 1.5, delay: 0.25, ease: [0.65, 0, 0.35, 1] });
    }
    return () => {
      unsub();
      intro.current?.stop();
    };
  }, [pos, reduce]);

  // Which side would open if the visitor let go right now.
  const intent: Side | null = !armed
    ? null
    : value >= COMMIT
      ? "developer"
      : value <= COMMIT_LOW
        ? "creative"
        : null;

  /** Floods the screen with the chosen side, then hands over to its page's arrival. */
  const commit = (side: Side) => {
    if (committing.current) return;
    committing.current = true;
    intro.current?.stop();
    if (reduce) {
      navigate(`/${side}`);
      return;
    }
    setLeaving(true);
    const target = side === "developer" ? 100 : 0;
    animate(pos, target, {
      duration: 0.3 + (Math.abs(target - pos.get()) / 50) * 0.35,
      ease: [0.65, 0, 0.35, 1],
      onComplete: () => navigate(`/${side}`, { state: { arrive: side, via: "seam" } }),
    });
  };

  /** The doors open the same way as the seam. Modified clicks still open a new tab. */
  const onDoorClick = (side: Side) => (e: MouseEvent<HTMLAnchorElement>) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    commit(side);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (committing.current) return;
    intro.current?.stop();
    dragging.current = true;
    setArmed(true);
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    pos.set(clamp(pos.get()));
  };

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current || !rootRef.current) return;
    const r = rootRef.current.getBoundingClientRect();
    const p = vertical ? (e.clientY - r.top) / r.height : (e.clientX - r.left) / r.width;
    pos.set(clamp(p * 100));
  };

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    const v = pos.get();
    if (v >= COMMIT) commit("developer");
    else if (v <= COMMIT_LOW) commit("creative");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (committing.current) return;
    setArmed(true);

    if (e.key === "Enter" && intent) {
      e.preventDefault();
      commit(intent);
      return;
    }

    const step = e.shiftKey ? KEY_STEP * 2 : KEY_STEP;
    let next: number | null = null;
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = pos.get() - step;
    if (e.key === "ArrowRight" || e.key === "ArrowDown") next = pos.get() + step;
    if (e.key === "Home") next = KEY_MIN;
    if (e.key === "End") next = KEY_MAX;
    if (next === null) return;
    e.preventDefault();
    intro.current?.stop();
    pos.set(clamp(next, KEY_MIN, KEY_MAX));
  };

  const shown = clamp(value);

  return (
    <motion.div
      ref={rootRef}
      className={`landing${leaving ? " is-leaving" : ""}`}
      style={{ "--seam": seam } as MotionStyle}
    >
      <header className="land-bar">
        <Link to="/quick" className="land-pill">
          Quick view
        </Link>
      </header>

      <main id="main" className="land-stage">
        <h1 className="sr-only">{site.name}</h1>
        <p className="sr-only">
          {site.tagline} Choose a side to explore. You can use the two links, or move the slider
          toward a side and press Enter.
        </p>

        <div className="layer layer--dev">
          <Center />
          <motion.ul className="land-preview land-preview--dev" aria-hidden="true" style={{ opacity: devPreview }}>
            {projects.slice(0, 3).map((p) => (
              <li key={p.id} className="land-preview__item">
                <span className="land-preview__name">{p.name}</span>
                <span className="land-preview__meta">{p.status}</span>
              </li>
            ))}
          </motion.ul>
          <div className="land-side land-side--dev">
            <pre className="land-code" aria-hidden="true">{`{
  role: "software developer",
  school: "HAU, BS CS",
}`}</pre>
            <Link to="/developer" className="land-door" onClick={onDoorClick("developer")}>
              <span className="land-door__title">Software developer</span>
              <span className="land-door__sub">Web, mobile, and browser projects</span>
            </Link>
          </div>
        </div>

        <div className="layer layer--creative">
          <Center />
          <motion.div
            className="land-preview land-preview--creative"
            aria-hidden="true"
            style={{ opacity: crePreview }}
          >
            {creativeKinds.map((k) => (
              <span
                key={k.label}
                className={`land-preview__bar clip--${k.c}`}
                style={{ width: `${k.w}%` }}
              >
                {k.label}
              </span>
            ))}
          </motion.div>
          <div className="land-side land-side--creative">
            <div className="land-tracks" aria-hidden="true">
              {tracks.map((row, i) => (
                <div className="land-tracks__row" key={i}>
                  {row.map((clip, j) => (
                    <i key={j} className={`clip clip--${clip.c}`} style={{ flexBasis: `${clip.w}%` }} />
                  ))}
                </div>
              ))}
            </div>
            <Link to="/creative" className="land-door" onClick={onDoorClick("creative")}>
              <span className="land-door__title">Video editor and digital artist</span>
              <span className="land-door__sub">Ad edits, 3D art, graphics, and AI UGC</span>
            </Link>
          </div>
        </div>

        <div
          className={`seam${isDragging ? " is-dragging" : ""}`}
          role="slider"
          tabIndex={0}
          aria-label="Choose a side. Move toward the developer or creative side, then press Enter to open it."
          aria-orientation={vertical ? "vertical" : "horizontal"}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={shown}
          aria-valuetext={
            intent
              ? `Developer side ${shown} percent. Press Enter to open the ${intent} portfolio.`
              : `Developer side ${shown} percent`
          }
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          onKeyDown={onKeyDown}
        >
          <span className="seam__line" />
          <span className="seam__head" />
          <span className="seam__foot" />
          <span className="seam__knob">
            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
              <path
                d="M8 5 3 11l5 6M14 5l5 6-5 6"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        </div>

        <p
          className={`land-hint${intent ? ` is-intent is-intent--${intent}` : ""}`}
          aria-hidden="true"
        >
          <span className={`land-hint__text${intent ? "" : " is-on"}`}>
            Drag the line to a side to open it
          </span>
          {(["developer", "creative"] as const).map((side) => (
            <span key={side} className={`land-hint__text${intent === side ? " is-on" : ""}`}>
              {INTENT_TEXT[side]}
            </span>
          ))}
        </p>
        <p className="sr-only" role="status">
          {intent ? INTENT_TEXT[intent].replace("Release", "Press Enter") : ""}
        </p>
      </main>
    </motion.div>
  );
}
