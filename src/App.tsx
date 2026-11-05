import { Route, Routes } from "react-router-dom";
import { useScrollToTop } from "./hooks";
import Landing from "./pages/Landing";
import Developer from "./pages/Developer";
import Creative from "./pages/Creative";
import Quick from "./pages/Quick";
import NotFound from "./pages/NotFound";

export default function App() {
  useScrollToTop();
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/developer" element={<Developer />} />
      <Route path="/creative" element={<Creative />} />
      <Route path="/quick" element={<Quick />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
