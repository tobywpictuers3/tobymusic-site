import { useEffect, useRef, useState, type ReactNode } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";

export const CONTACT = {
  name: "טובי וינברג",
  roles: "קלידנית · חלילנית · מנהלת תזמורת · הוראת פסנתר וחליל צד",
  phone: "050-412-4161",
  email: "toby.musicartist@gmail.com",
  slogan: "אומנות ואמינות, זו יצירה",
  joinUrl: "https://toby-mailing-list.w0504124161.workers.dev/join",
  studentsUrl: "https://tobymusic.lovable.app",
  logoWhite:
    "https://raw.githubusercontent.com/tobywpictuers3/the-music-dd01e777/main/src/assets/logo-white.png",
  logoBlack:
    "https://raw.githubusercontent.com/tobywpictuers3/the-music-dd01e777/main/src/assets/logo-black.png",
};

/* ---------- הניצוץ ---------- */
export function Spark({ size = 24 }: { size?: number }) {
  return (
    <svg className="spark" width={size} height={size} viewBox="0 0 80 80" aria-hidden="true">
      <defs>
        <radialGradient id={`sp${size}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="15%" stopColor="#FFE5A0" />
          <stop offset="50%" stopColor="#C9A961" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#C9A961" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="40" cy="40" r="35" fill={`url(#sp${size})`} />
      <path d="M40 15 L42 38 L65 40 L42 42 L40 65 L38 42 L15 40 L38 38 Z" fill="#FFE5A0" />
      <circle cx="40" cy="40" r="3" fill="#FFFFFF" />
    </svg>
  );
}

/* ---------- קו הגל — החתימה העיצובית ---------- */
const WAVE_PATH =
  "M2 20 Q 30 20 48 20 T 90 20 Q 100 20 106 8 T 120 32 T 134 4 T 148 34 T 162 12 Q 170 20 190 20 T 260 20 T 340 20 T 418 20";

export function Wave({ animate = false, divider = false }: { animate?: boolean; divider?: boolean }) {
  return (
    <svg
      className={divider ? "wave-divider" : `wave${animate ? " animate" : ""}`}
      viewBox="0 0 420 40"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path d={WAVE_PATH} />
    </svg>
  );
}

/* ---------- Reveal on scroll ---------- */
export function Reveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("visible")),
      { threshold: 0.12 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <div ref={ref} className="reveal">
      {children}
    </div>
  );
}

/* ---------- Theme ---------- */
function useTheme() {
  const [theme, setTheme] = useState<string>(
    () => document.documentElement.getAttribute("data-theme") || "dark"
  );
  const toggle = () => {
    const next = theme === "dark" ? "light" : "dark";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("toby-theme", next);
    } catch {}
    setTheme(next);
  };
  return { theme, toggle };
}

/* ---------- Header ---------- */
const NAV = [
  { to: "/", label: "בית" },
  { to: "/about", label: "אודות" },
  { to: "/performances", label: "הופעות" },
  { to: "/orchestras", label: "תזמורות" },
  { to: "/teaching", label: "הוראה" },
  { to: "/scores", label: "עיבודים ותווים" },
  { to: "/blog", label: "תכנים" },
  { to: "/members", label: "אזור מנויות 🔒" },
  { to: "/contact", label: "קשר" },
];

export function Header() {
  const { theme, toggle } = useTheme();
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => setOpen(false), [location.pathname]);

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-link" aria-label="TOBY music — עמוד הבית">
          <img
            className="logo-img"
            src={theme === "dark" ? CONTACT.logoWhite : CONTACT.logoBlack}
            alt="TOBY music"
          />
        </Link>

        <nav className="nav-desktop" aria-label="ניווט ראשי">
          {NAV.map((n) => (
            <NavLink
              key={n.to}
              to={n.to}
              className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
              end={n.to === "/"}
            >
              {n.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <button className="theme-toggle" onClick={toggle} aria-label="החלפת מצב תצוגה">
            {theme === "dark" ? "☀" : "🌙"}
          </button>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="תפריט"
            aria-expanded={open}
          >
            ☰
          </button>
        </div>
      </div>

      <nav className={`nav-mobile container${open ? " open" : ""}`} aria-label="ניווט נייד">
        {NAV.map((n) => (
          <NavLink
            key={n.to}
            to={n.to}
            className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
            end={n.to === "/"}
          >
            {n.label}
          </NavLink>
        ))}
      </nav>
    </header>
  );
}

/* ---------- Footer ---------- */
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <Wave divider />
        <div className="footer-name">{CONTACT.name}</div>
        <div className="footer-roles">{CONTACT.roles}</div>
        <div className="footer-contact">
          <a href={`tel:${CONTACT.phone.replace(/-/g, "")}`}>{CONTACT.phone}</a>
          {" · "}
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
        </div>
        <div className="footer-slogan">"{CONTACT.slogan}"</div>
      </div>
    </footer>
  );
}

/* ---------- Page hero (inner pages) ---------- */
export function PageHero({
  eyebrow,
  title,
  lead,
}: {
  eyebrow?: string;
  title: string;
  lead?: string;
}) {
  return (
    <section className="hero">
      <div className="container center">
        {eyebrow && <div className="eyebrow">{eyebrow}</div>}
        <h1>{title}</h1>
        <Wave animate />
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}
