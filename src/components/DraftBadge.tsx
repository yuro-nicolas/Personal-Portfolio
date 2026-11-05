import { site } from "../data/content";

/** Small badge that marks placeholder content. Hidden when site.showDraftBadges is false. */
export default function DraftBadge({ show }: { show?: boolean }) {
  if (!show || !site.showDraftBadges) return null;
  return (
    <span className="draft-badge" title="Placeholder. Replace in src/data/content.ts">
      Sample
    </span>
  );
}
