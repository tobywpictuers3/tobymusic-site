import { useEffect, useState } from "react";
import { JoinForm, PageHero, Reveal, Spark } from "../components/shared";

const SECTIONS = [
  { id: "songs", icon: "🎵", label: "שירים והקלטות" },
  { id: "articles", icon: "📖", label: "תכנים ומאמרים" },
  { id: "benefits", icon: "🎁", label: "הטבות והגרלות" },
  { id: "messages", icon: "💬", label: "בינינו" },
];

type AuthState = "loading" | "guest" | "member";

export default function Members() {
  const [auth, setAuth] = useState<AuthState>("loading");
  const [memberName, setMemberName] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [tab, setTab] = useState(SECTIONS[0].id);
  const [archive, setArchive] = useState<{ id: string; subject: string; sentDate: string }[] | null>(null);
  const [openItem, setOpenItem] = useState<{ subject: string; html: string } | null>(null);
  const [loadingItem, setLoadingItem] = useState(false);

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

  useEffect(() => {
    if (auth !== "member") return;
    fetch("/api/members/content")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setArchive(d?.items || []))
      .catch(() => setArchive([]));
  }, [auth]);

  const openArchiveItem = async (id: string) => {
    setLoadingItem(true);
    setOpenItem(null);
    try {
      const r = await fetch(`/api/members/content?id=${encodeURIComponent(id)}`);
      if (!r.ok) throw new Error();
      const d = await r.json();
      setOpenItem({ subject: d.subject, html: d.html });
    } catch {
      setOpenItem({ subject: "שגיאה", html: "<p dir='rtl'>לא הצלחנו לטעון את התוכן — נסי שוב.</p>" });
    }
    setLoadingItem(false);
  };

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
        setStatus("משהו השתבש — נסי שוב בעוד רגע.");
      }
    } catch {
      setStatus("משהו השתבש — נסי שוב בעוד רגע.");
    }
  };

  /* ───────── מנויה מחוברת — רק כאן רואים מה יש ───────── */
  if (auth === "member") {
    return (
      <>
        <PageHero
          eyebrow="אזור מנויות"
          title={`ברוכה הבאה${memberName ? `, ${memberName}` : ""}! 🔓`}
          lead="נעים שאת כאן. זה המקום שלנו."
        />
        <section className="section">
          <div className="container" style={{ maxWidth: 720 }}>
            <Reveal>
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
              {tab === "articles" ? (
                <div>
                  {openItem ? (
                    <div className="card">
                      <button className="btn-secondary" onClick={() => setOpenItem(null)}>
                        → חזרה לרשימה
                      </button>
                      <h3 style={{ marginTop: 14 }}>{openItem.subject}</h3>
                      <iframe
                        title={openItem.subject}
                        sandbox=""
                        srcDoc={openItem.html}
                        style={{
                          width: "100%", minHeight: "70vh", border: "1px solid var(--line)",
                          borderRadius: 10, background: "#fff",
                        }}
                      />
                    </div>
                  ) : (
                    <>
                      <p className="center" style={{ color: "var(--text-soft)" }}>
                        כל מה שנשלח בתפוצה — במקום אחד, רק בשבילך.
                      </p>
                      {loadingItem && <div className="notice center">טוענת…</div>}
                      {archive === null && <div className="notice center">טוענת את הארכיון…</div>}
                      {archive?.length === 0 && (
                        <div className="card center"><p style={{ marginBottom: 0 }}>הארכיון עוד מתמלא — בקרוב.</p></div>
                      )}
                      <div style={{ display: "grid", gap: 10 }}>
                        {archive?.map((a) => (
                          <button key={a.id} className="card archive-item" onClick={() => openArchiveItem(a.id)}>
                            <span style={{ fontWeight: 700 }}>{a.subject}</span>
                            <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>
                              {a.sentDate ? new Date(a.sentDate).toLocaleDateString("he-IL") : ""}
                            </span>
                          </button>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                SECTIONS.filter((s) => s.id === tab).map((s) => (
                  <div key={s.id} className="card center">
                    <div className="card-icon" style={{ fontSize: "2rem" }}>{s.icon}</div>
                    <h3>{s.label}</h3>
                    <p style={{ color: "var(--text-soft)" }}>
                      התכנים הראשונים בדרך — ברגע שיעלו, הם יחכו לך כאן.
                    </p>
                  </div>
                ))
              )}
              <div style={{ height: 20 }} />
              <div className="center">
                <button className="btn-secondary" onClick={logout}>יציאה</button>
              </div>
            </Reveal>
          </div>
        </section>
      </>
    );
  }

  /* ───────── אורחת — דלת סגורה. לא מגלים כלום ───────── */
  return (
    <>
      <PageHero
        eyebrow="אזור מנויות"
        title="יש דברים ששומרים לרשומות בלבד"
        lead="מה מחכה בפנים? זה בדיוק העניין — רק מי שנכנסת, יודעת. ✨"
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 560 }}>
          <Reveal>
            <div className="card">
              <div className="center" style={{ fontSize: "2.4rem", marginBottom: 6 }}>🔒</div>
              <h3 className="center">כניסה לרשומות תפוצה</h3>
              <p style={{ color: "var(--text-soft)", textAlign: "center" }}>
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
              <div className="center">
                <button className="btn-primary" onClick={requestLink}>
                  <Spark size={20} /> שלחי לי קישור כניסה
                </button>
              </div>
              {status && (
                <>
                  <div style={{ height: 14 }} />
                  <div className="notice">{status}</div>
                </>
              )}
              <div style={{ height: 18 }} />
              <p className="center" style={{ marginBottom: 10, fontSize: "0.95rem", color: "var(--text-faint)" }}>
                עוד לא רשומה? הצטרפי כאן — חינם, בחצי דקה:
              </p>
              <JoinForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
