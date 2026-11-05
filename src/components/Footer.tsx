import { Link } from "react-router-dom";
import { site } from "../data/content";

export default function Footer() {
  return (
    <footer className="site-footer">
      <p>
        © {new Date().getFullYear()} {site.name}
      </p>
      <p>
        <Link to="/" className="text-link">
          Start over
        </Link>
      </p>
      <p>Built with React, Vite, and TypeScript.</p>
    </footer>
  );
}
