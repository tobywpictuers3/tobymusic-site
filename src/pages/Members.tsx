import { useEffect, useState } from "react";
import { CONTACT, PageHero, Reveal, Spark } from "../components/shared";

const SECTIONS = [
  { id: "songs", icon: "🎵", label: "שירים והקלטות", text: "השירים וההקלטות של טובי — להאזנה בלעדית." },
  { id: "articles", icon: "📖", label: "תכנים ומאמרים", text: "המאמרים והתובנות המלאים — גרסת המנויות." },
  { id: "benefits", icon: "🎁", label: "הטבות והגרלות", text: "הטבות, הגרלות והפתעות — רק לרשומות." },
  { id: "messages", icon: "💬", label: "בינינו", text: "תקשורת ישירה בינך לבין טובי — הודעות ותגובות." },
];

type AuthState = "loading" | "guest" | "member";

export default function Members() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [memberName, setMemberName] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [tab, setTab] = useState(SECTIONS[0].id);

  useEffect(() => {
    const login = new URLSearchParams(window.location.search).get("login");
    if (login === "expired" || login === "invalid") {
      setStatus("הקישור פג תוקף או כבר שומש — אפשר לבקש קישור חדש כאן למטה.");
    }
    fetch("/api/me")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => {
        setAuth(d?.member ? "member" : "guest");
        setMemberName(d?.name || null);
      })
      .catch(() => setAuth("guest"));
  }, []);

  const logout = async () => {
    await fetch("/api/auth/logout", { method: "POST" }).catch(() => {});
    setAuth("guest");
    setMemberName(null);
  };

  const requestLink = async () => {
    if (!email.includes("@")) {
      setStatus("נא להזין כתובת מייל תקינה.");
      return;
    }
    setStatus("שולחת קישור...");
    try {
      const r = await fetch("/api/auth/request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      if (r.ok) {
        setStatus("נשלח! בדקי את תיבת המייל שלך — הקישור מחכה שם. ✨");
      } else if (r.status === 404) {
        setStatus("הכתובת לא נמצאה ברשימת התפוצה. אפשר להצטרף בקישור למטה.");
      } else {
        setStatus("הכניסה עוד לא מחוברת — ממש בקרוב. בינתיים אפשר להצטרף לתפוצה למטה.");
      }
    } catch {
      setStatus("הכניסה עוד לא מחוברת — ממש בקרוב. בינתיים אפשר להצטרף לתפוצה למטה.");
    }
  };

  return (
    <>
      <PageHero
        eyebrow="אזור מנויות"
        title="ברוכה הבאה פנימה"
        lead="שירים, הקלטות, תכנים מלאים, הטבות ותקשורת ישירה — לרשומות התפוצה בלבד."
      />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          {auth === "member" && (
            <Reveal>
              <div className="card center">
                <h3>ברוכה הבאה{memberName ? `, ${memberName}` : ""}! 🔓</h3>
                <p style={{ color: "var(--text-soft)" }}>
                  את מחוברת לאזור המנויות. התכנים הראשונים בדרך — ברגע שיעלו, הם יחכו לך כאן.
                </p>
                <button className="btn-secondary" onClick={logout}>יציאה</button>
              </div>
            </Reveal>
          )}

          {auth !== "member" && (
            <Reveal>
              <div className="card">
                <h3>כניסה לרשומות תפוצה</h3>
                <p style={{ color: "var(--text-soft)" }}>
                  הזיני את המייל איתו נרשמת — ונשלח לך קישור כניסה אישי. בלי סיסמאות.
                </p>
                <div className="field">
                  <label htmlFor="member-email">כתובת מייל</label>
                  <input
                    id="member-email"
                    type="email"
                    dir="ltr"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <button className="btn-primary" onClick={requestLink}>
                  <Spark size={20} /> שלחי לי קישור כניסה
                </button>
                {status && (
                  <>
                    <div style={{ height: 14 }} />
                    <div className="notice">{status}</div>
                  </>
                )}
                <div style={{ height: 18 }} />
                <p style={{ marginBottom: 0, fontSize: "0.95rem", color: "var(--text-faint)" }}>
                  עוד לא רשומה?{" "}
                  <a href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
                    הצטרפי לתפוצה כאן
                  </a>
                </p>
              </div>
            </Reveal>
          )}

          <div style={{ height: 34 }} />

          <Reveal>
            <div className="center">
              <span className="lock-badge">
                {auth === "member" ? "🔓 מחוברת" : "🔒 מה מחכה בפנים"}
              </span>
            </div>
            <div className="members-tabs" style={{ justifyContent: "center" }}>
              {SECTIONS.map((s) => (
                <button
                  key={s.id}
                  className={`members-tab${tab === s.id ? " active" : ""}`}
                  onClick={() => setTab(s.id)}
                >
                  {s.icon} {s.label}
                </button>
              ))}
            </div>
            {SECTIONS.filter((s) => s.id === tab).map((s) => (
              <div key={s.id} className="card center">
                <div className="card-icon" style={{ fontSize: "2rem" }}>
                  {s.icon}
                </div>
                <h3>{s.label}</h3>
                <p>{s.text}</p>
                {auth === "member" && (
            <Reveal>
              <div className="card center">
                <h3>ברוכה הבאה{memberName ? `, ${memberName}` : ""}! 🔓</h3>
                <p style={{ color: "var(--text-soft)" }}>
                  את מחוברת לאזור המנויות. התכנים הראשונים בדרך — ברגע שיעלו, הם יחכו לך כאן.
                </p>
                <button className="btn-secondary" onClick={logout}>יציאה</button>
              </div>
            </Reveal>
          )}

          {auth !== "member" && (
                  <p style={{ marginTop: 12, marginBottom: 0, color: "var(--text-faint)", fontSize: "0.92rem" }}>
                    התוכן ייפתח לאחר כניסה עם קישור אישי.
                  </p>
                )}
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}
