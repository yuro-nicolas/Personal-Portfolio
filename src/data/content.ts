/**
 * Everything you will want to edit lives in this file.
 *
 * - Anything marked `draft: true` shows a small "Sample" badge on the site
 *   so you can spot placeholder content. Remove the flag once it is real.
 * - Set `site.showDraftBadges` to false to hide every badge at once.
 * - Leave a link empty ("") and it will not be shown.
 */

export const site = {
  name: "Euan Nicolas",
  initials: "EN",
  tagline:
    "Computer science student. Software developer. Video editor and digital artist.",
  availability: "Open to internships, entry-level roles, and freelance projects.",

  email: "yuro.roie@gmail.com",
  phone: "+639568321369",
  github: "https://github.com/yuro-nicolas",
  linkedin: "https://www.linkedin.com/in/euan-roie-nicolas-b026a227b/",
  // The PDF, and the picture of it that the Quick view page shows. Replace both together.
  resume: "/resume.pdf",
  resumeImage: "/resume.png",

  showDraftBadges: true,
};

export type Project = {
  id: string;
  name: string;
  summary: string;
  status: string;
  details: string[];
  stack: string[];
  links: { label: string; href: string }[];
  /** A picture of the project, shown when its row is open. Lives in /public/projects. */
  preview: { src: string; alt: string; label: string };
  draft?: boolean;
};

export const projects: Project[] = [
  {
    id: "veiltext",
    name: "VeilText",
    summary: "A Chrome extension that blurs, hides, or replaces unwanted words as you browse.",
    status: "On the Chrome Web Store",
    details: [
      "VeilText checks the text on the pages you visit against a keyword list you can edit, including comments and feeds that load as you scroll.",
      "You decide what happens to a match: blur it, hide it, or replace it. A View Anyway toggle brings the original text back, and nothing you browse is sent to an outside server.",
    ],
    stack: ["Browser extension", "Aho–Corasick", "Wu–Manber"],
    links: [
      {
        label: "View on the Chrome Web Store",
        href: "https://chromewebstore.google.com/detail/veiltext-profanity-filter/clhbicgajbeccgkhkelpkompmoeeomin",
      },
    ],
    preview: {
      src: "/projects/veiltext.jpg",
      alt: "VeilText's store image: the extension's settings panel beside the words “Blur the things that you don't want to see”.",
      label: "chromewebstore.google.com",
    },
  },
  {
    id: "prime-meridian",
    name: "Prime Meridian Realty",
    summary: "A full-stack property listings site with an admin login for managing properties.",
    status: "Course project, live",
    details: [
      "Visitors browse property listings, view photo galleries, and send inquiries through spam-protected forms. Admins sign in to create, edit, and delete properties, upload photos, and manage incoming messages through the API.",
      "The React client talks to an Express API backed by PostgreSQL, deployed on Vercel, Render, and Neon. I secured it with strict CORS, security headers, and rate limiting, added email alerts and photo uploads, and I run the database migrations myself.",
    ],
    stack: ["React", "Vite", "Express", "PostgreSQL"],
    links: [{ label: "Visit the live site", href: "https://prime-meridian-olive.vercel.app/" }],
    preview: {
      src: "/projects/prime-meridian.jpg",
      alt: "The Prime Meridian Realty home page: an aerial view of a housing estate behind the headline “Buying, selling, or settling a dispute. One broker, start to finish.”",
      label: "prime-meridian-olive.vercel.app",
    },
  },
  {
    id: "moodcheck",
    name: "MoodCheck",
    summary: "A Flutter app for logging your mood each day and seeing the patterns over time.",
    status: "Mobile app",
    details: [
      "I led the full-stack development and UI/UX design, building both the interface and the backend functionality.",
      "It has a calendar of past moods, daily reflection logs, motivational content after each entry, and automated trend analytics.",
    ],
    stack: ["Flutter", "Dart", "Supabase"],
    links: [{ label: "View on GitHub", href: "https://github.com/edf-vitero/MoodCheck" }],
    preview: {
      src: "/projects/moodcheck.jpg",
      alt: "The MoodCheck logo: a smiling green cup under the app's name.",
      label: "github.com/edf-vitero/MoodCheck",
    },
  },
  {
    id: "this-site",
    name: "This portfolio",
    summary: "A split-screen portfolio with one side for code and one side for video and art.",
    status: "You are looking at it",
    details: [
      "The landing page is built around a draggable seam that works like both a text caret and a video playhead. It is keyboard accessible and respects reduced motion.",
      "A one-page Quick view is there for anyone who just needs the facts.",
    ],
    stack: ["React", "TypeScript", "Vite", "Framer Motion"],
    links: [],
    preview: {
      src: "/projects/portfolio.jpg",
      alt: "This portfolio's landing page, split down the middle by a pink line.",
      label: "the landing page",
    },
  },
];

export const skillGroups: { label: string; items: string[] }[] = [
  { label: "Languages", items: ["TypeScript", "JavaScript", "Java", "Python", "Dart", "SQL"] },
  { label: "Frontend", items: ["React", "Flutter", "Vite", "HTML and CSS", "Framer Motion"] },
  { label: "Backend and data", items: ["Node.js", "Express", "PostgreSQL", "MySQL", "Firebase Firestore"] },
  { label: "Tools", items: ["Git and GitHub", "VS Code", "Figma", "Chrome DevTools", "Postman", "Vercel"] },
];

export type TimelineEntry = {
  when: string;
  title: string;
  place: string;
  text: string;
};

// Shown on the developer page.
export const education: TimelineEntry[] = [
  {
    when: "2023 – 2027",
    title: "BS Computer Science",
    place: "Holy Angel University",
    text: "CHED Scholar. President's Lister for 6 semesters and Dean's Lister for 1. Google Developer Student Club member, 2023 to 2025.",
  },
];

// Shown on the creative page.
export const experience: TimelineEntry[] = [
  {
    when: "Jul – Sep 2026",
    title: "Video Editor",
    place: "FitSleeps and Acentecom",
    text: "Produced 49+ video assets, including B-roll footage and AI-generated UGC content for product advertising campaigns.",
  },
  {
    when: "Apr – Jun 2026",
    title: "Video Editor and Illustrator",
    place: "Productive Peter",
    text: "Illustrated and edited 7 videos and designed over 30 custom thumbnails, tailored to the brand's style and audience.",
  },
  {
    when: "May – Aug 2025",
    title: "Video Editor and Marketing Assistant",
    place: "Buzzer",
    text: "Created 72 short-form sports videos as an exclusive content creator, and promoted the app across social media.",
  },
];

export type WorkKind = "video" | "art" | "3d" | "graphics" | "ugc";

// A filter only appears once it has at least one piece of work in it.
export const workKinds: { id: WorkKind; label: string }[] = [
  { id: "video", label: "Video" },
  { id: "art", label: "Digital art" },
  { id: "3d", label: "3D art" },
  { id: "graphics", label: "Graphics" },
  { id: "ugc", label: "AI UGC" },
];

export type Work = {
  id: string;
  title: string;
  kind: WorkKind;
  note: string;
  /** The cover, a path in /public, e.g. "/work/poster.jpg". */
  image: string;
  /** Width divided by height, so the viewer opens at the right shape. */
  aspect: number;
  /** A video to play when the work is opened. Use the vimeo() or youtube() helpers below. */
  video?: { embed: string; href: string };
  /** More images to step through after the cover. */
  gallery?: string[];
  draft?: boolean;
};

const WIDE = 16 / 9;
const VERTICAL = 9 / 16;

const vimeo = (id: number) => ({
  embed: `https://player.vimeo.com/video/${id}?autoplay=1&title=0&byline=0&portrait=0`,
  href: `https://vimeo.com/${id}`,
});

const youtube = (id: string) => ({
  embed: `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`,
  href: `https://www.youtube.com/watch?v=${id}`,
});

export const works: Work[] = [
  {
    id: "ocean",
    title: "Ocean",
    kind: "3d",
    note: "A buoy on a stormy sea. 3D animation.",
    image: "/work/v1242028158.jpg",
    aspect: WIDE,
    video: vimeo(1242028158),
  },
  {
    id: "manage-your-time",
    title: "I'm begging you to manage your time",
    kind: "video",
    note: "Illustrated and edited for Productive Peter.",
    image: "/work/yt-manage-your-time.jpg",
    aspect: WIDE,
    video: youtube("YJu8CKx-Xws"),
  },
  {
    id: "berberine",
    title: "Berberine mascot",
    kind: "ugc",
    note: "An animated product character for a vertical ad.",
    image: "/work/v1242027939.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027939),
  },
  {
    id: "morning",
    title: "Finally has a morning",
    kind: "video",
    note: "Vertical ad edit.",
    image: "/work/v1242028449.jpg",
    aspect: VERTICAL,
    video: vimeo(1242028449),
  },
  {
    id: "apples",
    title: "Apple still life",
    kind: "3d",
    note: "A basket of apples on burlap. 3D render.",
    image: "/work/apples.jpg",
    aspect: WIDE,
  },
  {
    id: "dragon",
    title: "Red dragon",
    kind: "ugc",
    note: "An animated character ad, vertical.",
    image: "/work/v1242027937.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027937),
  },
  {
    id: "firefighter",
    title: "Firefighter",
    kind: "video",
    note: "Vertical ad edit.",
    image: "/work/v1242028451.jpg",
    aspect: VERTICAL,
    video: vimeo(1242028451),
  },
  {
    id: "sword",
    title: "Runic sword",
    kind: "3d",
    note: "A blade lit by its own glowing runes. 3D render.",
    image: "/work/sword.jpg",
    aspect: 4 / 5,
  },
  {
    id: "home-early",
    title: "Tuesday home early",
    kind: "ugc",
    note: "An animated character story, vertical.",
    image: "/work/v1242027981.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027981),
  },
  {
    id: "factory",
    title: "Low-poly factory",
    kind: "3d",
    note: "An industrial site, from the full view down to the production line. 3D renders.",
    image: "/work/factory-overview.jpg",
    aspect: WIDE,
    gallery: [
      "/work/factory-gate.jpg",
      "/work/factory-loading.jpg",
      "/work/factory-forklift.jpg",
      "/work/factory-waste.jpg",
      "/work/factory-line.jpg",
    ],
  },
  {
    id: "alarm",
    title: "Wake-up call",
    kind: "video",
    note: "Vertical ad edit.",
    image: "/work/v1242028450.jpg",
    aspect: VERTICAL,
    video: vimeo(1242028450),
  },
  {
    id: "red-panda",
    title: "Red panda creature",
    kind: "art",
    note: "A red panda with owl wings, talons, and vision. Character illustration.",
    image: "/work/panda-labelled.jpg",
    aspect: 1070 / 622,
    gallery: ["/work/panda.jpg"],
  },
  {
    id: "journey",
    title: "28-day journey",
    kind: "ugc",
    note: "An AI avatar testimonial, vertical.",
    image: "/work/v1242027979.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027979),
  },
  {
    id: "presenter",
    title: "We need to talk",
    kind: "ugc",
    note: "An AI presenter speaking to camera, vertical.",
    image: "/work/v1242027983.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027983),
  },
  {
    id: "roommate",
    title: "The worst roommate",
    kind: "ugc",
    note: "A POV animated ad, vertical.",
    image: "/work/v1242027936.jpg",
    aspect: VERTICAL,
    video: vimeo(1242027936),
  },
];

export const creativeTools = {
  draft: false,
  items: ["Premiere Pro", "DaVinci Resolve", "CapCut", "Canva"],
};
