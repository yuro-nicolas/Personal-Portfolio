import type { ReactNode } from "react";
import { site } from "../data/content";

/**
 * The name and tagline, drawn in the same spot wherever they appear. On the landing
 * page both layers draw it, so the colour switches at the seam. Children share the
 * tagline's position, so a transition can swap one for the other.
 */
export default function Center({ children }: { children?: ReactNode }) {
  const [first, ...rest] = site.name.split(" ");
  return (
    <div className="land-center" aria-hidden="true">
      <p className="land-name">
        <span>{first}</span> <span>{rest.join(" ")}</span>
      </p>
      <p className="land-tag">{site.tagline}</p>
      {children}
    </div>
  );
}
