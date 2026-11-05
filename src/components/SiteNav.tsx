import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { site } from "../data/content";
import SideLink from "./SideLink";

/**
 * Shared header for the inner pages. The Developer / Creator switch is a
 * small version of the landing page seam.
 */
export default function SiteNav() {
  const { pathname } = useLocation();
  // Moves as soon as a side is clicked, so the thumb slides before the page changes.
  const [active, setActive] = useState(pathname);

  return (
    <header className="site-nav">
      <Link to="/" className="site-nav__brand" aria-label={`${site.name}, back to the start`}>
        <span className="site-nav__mark" aria-hidden="true">
          <i />
          <i />
        </span>
        <span>{site.name}</span>
      </Link>

      <nav aria-label="Main" className="site-nav__links">
        <div className="switch" role="group" aria-label="Choose a side" data-active={active.slice(1)}>
          <span className="switch__thumb" aria-hidden="true" />
          <SideLink
            side="developer"
            className="switch__item switch__item--developer"
            onSwitch={() => setActive("/developer")}
          >
            Developer
          </SideLink>
          <SideLink
            side="creative"
            className="switch__item switch__item--creative"
            onSwitch={() => setActive("/creative")}
          >
            Creative
          </SideLink>
        </div>
        <Link to="/quick" className="site-nav__quick">
          Quick view
        </Link>
      </nav>
    </header>
  );
}
