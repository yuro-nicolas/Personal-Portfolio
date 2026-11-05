import { Link } from "react-router-dom";
import { site } from "../data/content";
import { useTitle } from "../hooks";

export default function NotFound() {
  useTitle(`Page not found — ${site.name}`);
  return (
    <div className="page theme-dev">
      <main id="main" className="wrap not-found">
        <h1>Page not found</h1>
        <p>That address doesn’t lead anywhere on this site.</p>
        <p>
          <Link to="/" className="btn">
            Go to the start
          </Link>
        </p>
      </main>
    </div>
  );
}
