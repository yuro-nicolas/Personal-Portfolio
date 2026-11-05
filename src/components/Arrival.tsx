import { useEffect, useState, type CSSProperties } from "react";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { timecode } from "../timecode";
import Center from "./Center";

type Side = "developer" | "creative";

const HOLD = 0.55; // how long the name stays up before the page shows through
const LENGTH: Record<Side, number> = { developer: 1.25, creative: 1.3 };
const ROWS = 9;
const COMMAND = "cd ./developer";

/** The name runs a command, then the screen clears line by line. */
function DeveloperArrival() {
  return (
    <div className="arrive arrive--developer" aria-hidden="true">
      {Array.from({ length: ROWS }, (_, i) => (
        <motion.i
          key={i}
          className="arrive__row"
          initial={{ scaleX: 1 }}
          animate={{ scaleX: 0 }}
          transition={{ delay: HOLD + 0.05 + i * 0.03, duration: 0.4, ease: [0.65, 0, 0.35, 1] }}
        />
      ))}
      <motion.div
        className="arrive__title"
        animate={{ opacity: 0, y: -24 }}
        transition={{ delay: HOLD, duration: 0.2, ease: "easeIn" }}
      >
        <Center>
          <p className="arrive__cmd" style={{ "--chars": COMMAND.length } as CSSProperties}>
            <span>{COMMAND}</span>
          </p>
        </Center>
      </motion.div>
    </div>
  );
}

/** Clips land on a track, then a playhead scrubs across and reveals the page. */
function CreativeArrival() {
  const x = useMotionValue(0);
  const left = useTransform(x, (v) => `${v}%`);
  const clipPath = useTransform(x, (v) => `inset(0 0 0 ${v}%)`);
  const code = useTransform(x, timecode);

  useEffect(() => {
    const sweep = animate(x, 100, { delay: HOLD, duration: 0.72, ease: [0.65, 0, 0.35, 1] });
    return () => sweep.stop();
  }, [x]);

  return (
    <div className="arrive arrive--creative" aria-hidden="true">
      <motion.div className="arrive__panel" style={{ clipPath }}>
        <Center>
          <div className="arrive__clips">
            <i className="clip clip--cyan" />
            <i className="clip clip--pink" />
            <i className="clip clip--sun" />
          </div>
        </Center>
      </motion.div>
      <motion.div className="arrive__playhead" style={{ left }}>
        <motion.span className="arrive__code">{code}</motion.span>
      </motion.div>
    </div>
  );
}

/**
 * Picks up where the landing page's flood ends, with the name on a solid colour.
 * Plays once over the page, then removes itself.
 */
export default function Arrival({ side }: { side: Side }) {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), LENGTH[side] * 1000);
    return () => clearTimeout(timer);
  }, [side]);

  if (done) return null;
  return side === "developer" ? <DeveloperArrival /> : <CreativeArrival />;
}
