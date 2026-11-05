import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

/** Sets the browser tab title for the current page. */
export function useTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}

/**
 * How this page was just opened: from the landing page's seam, or from the switch
 * between sides. The flag is cleared from history straight away, so a refresh or
 * the back button doesn't replay it.
 */
export function useArrival(side: "developer" | "creative") {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();
  const [via] = useState<"seam" | "switch" | null>(() =>
    state?.arrive === side ? state.via : null,
  );
  useEffect(() => {
    if (via) navigate(pathname, { replace: true, state: null });
  }, [via]);
  return via;
}

/** Scrolls to the top when the route changes, and respects #hash links. */
export function useScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const el = document.getElementById(hash.slice(1));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname, hash]);
}
