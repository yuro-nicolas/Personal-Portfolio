import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { MotionConfig } from "framer-motion";

import "@fontsource-variable/bricolage-grotesque/standard.css";
import "@fontsource-variable/source-serif-4";
import "@fontsource-variable/jetbrains-mono";

import "./styles/global.css";
import "./styles/landing.css";
import "./styles/pages.css";
import "./styles/developer.css";
import "./styles/creative.css";
import "./styles/quick.css";
import "./styles/arrival.css";

import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <App />
      </MotionConfig>
    </BrowserRouter>
  </StrictMode>,
);
