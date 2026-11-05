const FPS = 24;
const LENGTH_SECONDS = 90;

/** Reads a position along a 90 second edit as mm:ss:ff. */
export function timecode(percent: number) {
  const frames = Math.round((percent / 100) * LENGTH_SECONDS * FPS);
  const f = frames % FPS;
  const s = Math.floor(frames / FPS) % 60;
  const m = Math.floor(frames / FPS / 60);
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${pad(m)}:${pad(s)}:${pad(f)}`;
}
