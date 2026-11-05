import type { TimelineEntry } from "../data/content";

export default function Timeline({ entries }: { entries: TimelineEntry[] }) {
  return (
    <ol className="timeline">
      {entries.map((t) => (
        <li key={t.title} className="timeline__item">
          <p className="timeline__when">{t.when}</p>
          <div>
            <h3 className="timeline__title">{t.title}</h3>
            <p className="timeline__place">{t.place}</p>
            <p className="prose">{t.text}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
