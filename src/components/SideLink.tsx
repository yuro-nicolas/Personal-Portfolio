import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { animate, motion, useMotionValue, useReducedMotion, useTransform } from "framer-motion";

type Side = "developer" | "creative";

/** The landing page's seam crossing the screen: the new side's colour follows behind it. */
function Wipe({ side, onDone }: { side: Side; onDone: () => void }) {
  // Same direction as the landing page: the developer side grows from the left.
  const toDeveloper = side === "developer";
  const x = useMotionValue(toDeveloper ? 0 : 100);
  const left = useTransform(x, (v) => `${v}%`);
  const clipPath = useTransform(x, (v) =>
    toDeveloper ? `inset(0 ${100 - v}% 0 0)` : `inset(0 0 0 ${v}%)`,
  );

  useEffect(() => {
    const sweep = animate(x, toDeveloper ? 100 : 0, {
      delay: 0.08,
      duration: 0.6,
      ease: [0.65, 0, 0.35, 1],
      onComplete: onDone,
    });
    return () => sweep.stop();
  }, []);

  return createPortal(
    <div className="wipe" aria-hidden="true">
      <motion.div className={`wipe__panel wipe__panel--${side}`} style={{ clipPath }} />
      <motion.div className="wipe__seam" style={{ left }} />
    </div>,
    document.body,
  );
}

/** A link to one of the two sides that crosses over instead of cutting. */
export default function SideLink({
  side,
  className,
  onSwitch,
  children,
}: {
  side: Side;
  className?: string;
  onSwitch?: () => void;
  children: ReactNode;
}) {
  const to = `/${side}`;
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const reduce = useReducedMotion();
  const [wiping, setWiping] = useState(false);

  // Modified clicks still open a new tab, and the current page has nowhere to go.
  const onClick = (e: MouseEvent<HTMLAnchorElement>) => {
    if (reduce || pathname === to || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    onSwitch?.();
    setWiping(true);
  };

  return (
    <>
      <NavLink to={to} className={className} onClick={onClick}>
        {children}
      </NavLink>
      {wiping && (
        <Wipe side={side} onDone={() => navigate(to, { state: { arrive: side, via: "switch" } })} />
      )}
    </>
  );
}
