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
  logoWhite: "/assets/brand/logo-white.webp",
  logoBlack: "/assets/brand/logo-black.webp",
};

export const CHARACTERS: Record<string, string> = {
  presenter: "/assets/characters/presenter.webp",
  piano: "/assets/characters/piano.webp",
  drums: "/assets/characters/drums.webp",
  saxophone: "/assets/characters/saxophone.webp",
  guitar: "/assets/characters/guitar.webp",
  violin: "/assets/characters/violin.webp",
  flute: "/assets/characters/flute.webp",
  eguitar: "/assets/characters/eguitar.webp",
};

/* ---------- טופס הצטרפות לתפוצה — הצהרה + אימות קולי ---------- */
export function JoinForm() {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [declareWoman, setDeclareWoman] = useState(false);
  const [declareNoShare, setDeclareNoShare] = useState(false);
  const [recState, setRecState] = useState<"idle" | "recording" | "done">("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");
  const recRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const blobRef = useRef<Blob | null>(null);
  const timerRef = useRef<number | null>(null);

  const stopRecording = () => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    recRef.current?.stop();
    recRef.current?.stream.getTracks().forEach((t) => t.stop());
  };

  const startRecording = async () => {
    setErrMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : MediaRecorder.isTypeSupported("audio/mp4")
          ? "audio/mp4"
          : "";
      const rec = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream);
      recRef.current = rec;
      chunksRef.current = [];
      rec.ondataavailable = (e) => e.data.size && chunksRef.current.push(e.data);
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType || "audio/webm" });
        blobRef.current = blob;
        setAudioUrl(URL.createObjectURL(blob));
        setRecState("done");
      };
      rec.start();
      setRecState("recording");
      timerRef.current = window.setTimeout(stopRecording, 10_000); // עד 10 שניות
    } catch {
      setErrMsg("לא הצלחנו לגשת למיקרופון. בדקי שהדפדפן קיבל הרשאה ונסי שוב.");
    }
  };

  const submit = async () => {
    const blob = blobRef.current;
    if (!blob) return;
    setState("sending");
    setErrMsg("");
    try {
      const b64 = await new Promise<string>((res, rej) => {
        const fr = new FileReader();
        fr.onload = () => res(String(fr.result).split(",")[1] || "");
        fr.onerror = rej;
        fr.readAsDataURL(blob);
      });
      const r = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          declareWoman,
          declareNoShare,
          audio: b64,
          audioType: blob.type || "audio/webm",
        }),
      });
      const d = (await r.json().catch(() => ({}))) as { ok?: boolean };
      if (!r.ok || !d.ok) throw new Error();
      setState("ok");
    } catch {
      setState("err");
      setErrMsg("משהו השתבש בשליחה — נסי שוב בעוד רגע.");
    }
  };

  if (state === "ok") {
    return (
      <div className="notice ok center">✅ הצטרפת בהצלחה! מייל אישור נשלח אלייך עכשיו 🎶</div>
    );
  }

  return (
    <div className="join-steps">
      {/* שלב 1 — פרטים */}
      {step === 1 && (
        <div className="join-form">
          <input aria-label="שם פרטי" placeholder="שם פרטי" value={name}
            onChange={(e) => setName(e.target.value)} />
          <input aria-label="כתובת מייל" type="email" dir="ltr" placeholder="you@example.com"
            value={email} onChange={(e) => setEmail(e.target.value)} />
          <button className="btn-primary" onClick={() => {
            if (!email.includes("@")) { setErrMsg("נא להזין כתובת מייל תקינה."); return; }
            setErrMsg(""); setStep(2);
          }}>
            <Spark size={18} /> להמשך הרשמה
          </button>
          {errMsg && <div className="notice" style={{ gridColumn: "1 / -1" }}>{errMsg}</div>}
        </div>
      )}

      {/* שלב 2 — הצהרה */}
      {step === 2 && (
        <div className="card" style={{ textAlign: "start", maxWidth: 560, margin: "0 auto" }}>
          <h3>הצהרה קצרה 🤝</h3>
          <p style={{ color: "var(--text-soft)" }}>
            התפוצה והתכנים בה מיועדים לנשים בלבד. כדי לשמור על המרחב הזה:
          </p>
          <label className="declare-line">
            <input type="checkbox" checked={declareWoman}
              onChange={(e) => setDeclareWoman(e.target.checked)} />
            <span>אני מצהירה שאני אישה</span>
          </label>
          <label className="declare-line">
            <input type="checkbox" checked={declareNoShare}
              onChange={(e) => setDeclareNoShare(e.target.checked)} />
            <span>אני מתחייבת שהתכנים לא יועברו הלאה</span>
          </label>
          <div style={{ height: 12 }} />
          <button className="btn-primary" disabled={!declareWoman || !declareNoShare}
            style={{ opacity: declareWoman && declareNoShare ? 1 : 0.5 }}
            onClick={() => setStep(3)}>
            להמשך — אימות קולי קצר
          </button>
        </div>
      )}

      {/* שלב 3 — הקלטה */}
      {step === 3 && (
        <div className="card center" style={{ maxWidth: 560, margin: "0 auto" }}>
          <h3>🎙️ אימות קולי — שנייה אחת ודי</h3>
          <p style={{ color: "var(--text-soft)" }}>
            לחצי על ההקלטה ואמרי בקול: <b>"אני {name || "..."} ואני אישה"</b>
          </p>
          {recState === "idle" && (
            <button className="btn-primary" onClick={startRecording}>🔴 התחלת הקלטה</button>
          )}
          {recState === "recording" && (
            <button className="btn-primary rec-pulse" onClick={stopRecording}>⏹ מקליטה... לחצי לסיום</button>
          )}
          {recState === "done" && audioUrl && (
            <>
              <audio controls src={audioUrl} style={{ width: "100%", margin: "10px 0" }} />
              <div className="cta-row" style={{ justifyContent: "center" }}>
                <button className="btn-secondary" onClick={() => { setRecState("idle"); setAudioUrl(null); blobRef.current = null; }}>
                  להקליט שוב
                </button>
                <button className="btn-primary" onClick={submit} disabled={state === "sending"}>
                  <Spark size={18} /> {state === "sending" ? "רושמת אותך..." : "סיום הרשמה"}
                </button>
              </div>
            </>
          )}
          {errMsg && (<><div style={{ height: 10 }} /><div className="notice">{errMsg}</div></>)}
          <p style={{ color: "var(--text-faint)", fontSize: "0.82rem", marginBottom: 0, marginTop: 12 }}>
            ההקלטה משמשת לאימות בלבד ונשמרת באופן מאובטח אצל טובי.
          </p>
        </div>
      )}
    </div>
  );
}

/* ---------- טיקר נע ---------- */
export function Ticker({ items }: { items: string[] }) {
  const row = items.map((t, i) => (
    <span className="ticker-item" key={i}>{t}</span>
  ));
  return (
    <div className="ticker" dir="ltr" aria-hidden="true">
      <div className="ticker-track" dir="rtl">
        {row}
        {row.map((el, i) => <span className="ticker-item" key={`b${i}`}>{items[i]}</span>)}
      </div>
    </div>
  );
}

/* ---------- Hero פנימי עם דמות ---------- */
export function CharacterHero({
  character,
  titleLines,
  introLines,
  eyebrow,
}: {
  character: string;
  titleLines: string[];
  introLines: string[];
  eyebrow?: string;
}) {
  return (
    <section className="char-hero">
      <div className="container char-hero-grid">
        <div>
          {eyebrow && <div className="eyebrow">{eyebrow}</div>}
          <h1>
            {titleLines.map((l, i) => (
              <span key={i}>{l}<br /></span>
            ))}
          </h1>
          <Wave animate />
          <div className="intro-lines">
            {introLines.map((l, i) => <p key={i}>{l}</p>)}
          </div>
        </div>
        <img className="char-hero-img" src={CHARACTERS[character]} alt="" loading="eager" />
      </div>
    </section>
  );
}

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
  { to: "/orchestras", label: "תזמורות" },
  { to: "/performances", label: "הופעות" },
  { to: "/students", label: "תלמידות" },
  { to: "/sheets", label: "תווים" },
  { to: "/blog", label: "בלוג" },
  { to: "/members", label: "מנויות 🔒" },
  { to: "/contact", label: "צור קשר" },
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
          <Link to="/contact" className="header-cta">צרי קשר ✨</Link>
        </nav>

        <div className="header-actions">
          <Link to="/contact" className="header-cta mobile-only">צרי קשר ✨</Link>
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
  const links = [
    { to: "/", label: "דף הבית" },
    { to: "/about", label: "אודות" },
    { to: "/orchestras", label: "תזמורות" },
    { to: "/performances", label: "הופעות" },
    { to: "/students", label: "תלמידות" },
    { to: "/sheets", label: "תווים" },
    { to: "/blog", label: "בלוג" },
    { to: "/contact", label: "יצירת קשר" },
  ];
  return (
    <footer className="site-footer">
      <div className="container">
        <Wave divider />
        <nav aria-label="ניווט מהיר" style={{ display: "flex", flexWrap: "wrap", gap: "6px 18px", justifyContent: "center", marginBottom: 18 }}>
          {links.map((l) => (
            <Link key={l.to} to={l.to} style={{ color: "var(--text-soft)", textDecoration: "none", fontSize: "0.92rem" }}>
              {l.label}
            </Link>
          ))}
          <a href="/#newsletter" style={{ color: "var(--accent)", textDecoration: "none", fontSize: "0.92rem", fontWeight: 700 }}>
            להצטרף לתפוצה
          </a>
        </nav>
        <nav aria-label="מדיניות" style={{ display: "flex", gap: 18, justifyContent: "center", marginBottom: 14 }}>
          <Link to="/accessibility" style={{ color: "var(--text-faint)", textDecoration: "none", fontSize: "0.84rem" }}>
            הצהרת נגישות
          </Link>
          <Link to="/privacy" style={{ color: "var(--text-faint)", textDecoration: "none", fontSize: "0.84rem" }}>
            פרטיות ותנאי שימוש
          </Link>
        </nav>
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
