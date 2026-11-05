import { useEffect, useRef, type CSSProperties, type MouseEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { Work } from "../data/content";

export type Slide = {
  work: Work;
  image: string;
  /** Position within the work's own images, for works with more than one. */
  step: number;
  steps: number;
};

/** One slide per image, so stepping runs through a series and then on to the next work. */
export function toSlides(works: Work[]): Slide[] {
  return works.flatMap((work) => {
    const images = [work.image, ...(work.gallery ?? [])];
    return images.map((image, i) => ({ work, image, step: i + 1, steps: images.length }));
  });
}

/** The full view of a work. A native dialog handles focus and the Escape key. */
export default function Lightbox({
  slides,
  index,
  onIndex,
  onClose,
}: {
  slides: Slide[];
  index: number;
  onIndex: (index: number) => void;
  onClose: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = ref.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const { work, image, step, steps } = slides[index];
  const move = (by: number) => onIndex((index + by + slides.length) % slides.length);

  // A click that lands on the dialog itself is a click on the backdrop.
  const onClick = (e: MouseEvent<HTMLDialogElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <dialog
      ref={ref}
      className="lb"
      aria-label={work.title}
      onClick={onClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") move(-1);
        if (e.key === "ArrowRight") move(1);
      }}
    >
      <button type="button" className="lb__close" onClick={onClose}>
        Close
      </button>

      <AnimatePresence mode="wait" initial={false}>
        <motion.figure
          key={`${work.id}-${step}`}
          className="lb__figure"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.16 }}
        >
          <div className="lb__stage" style={{ "--ar": work.aspect } as CSSProperties}>
            {work.video ? (
              <iframe
                src={work.video.embed}
                title={work.title}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <img src={image} alt={steps > 1 ? `${work.title}, image ${step} of ${steps}` : work.title} />
            )}
          </div>
          <figcaption className="lb__caption">
            <strong>{work.title}</strong> <span>{work.note}</span>
            {steps > 1 && (
              <span className="lb__count">
                {step} of {steps}
              </span>
            )}
            {work.video && (
              <a className="text-link" href={work.video.href} target="_blank" rel="noreferrer">
                Open in a new tab
              </a>
            )}
          </figcaption>
        </motion.figure>
      </AnimatePresence>

      {slides.length > 1 && (
        <div className="lb__nav">
          <button type="button" className="btn btn--ghost" onClick={() => move(-1)}>
            Previous
          </button>
          <button type="button" className="btn btn--ghost" onClick={() => move(1)}>
            Next
          </button>
        </div>
      )}
    </dialog>
  );
}
