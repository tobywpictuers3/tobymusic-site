import { useCallback, useEffect, useState } from "react";
import { PageHero, Reveal, Spark } from "../components/shared";

type Inquiry = { id: string; name: string; contact_info: string; message: string; status: string; created_at: string; responded_at: string | null };
type Pending = { id: string; email: string; name: string | null; created_at: string; status: string | null };
type Thread = { sid: string; name: string | null; email: string; last_at: string; unread: number };
type Msg = { id: string; direction: string; body: string; created_at: string };
type Draft = { id: string; subject: string; body_html: string; status: string; brevo_ids: string | null; updated_at: string };

const TABS = [
  { id: "inbox", label: "📥 פניות" },
  { id: "pending", label: "🎙️ ממתינות לאישור" },
  { id: "messages", label: "💬 הודעות מנויות" },
  { id: "newsletter", label: "✍️ כתיבה לתפוצה" },
];

const fmtDate = (d: string) => (d ? new Date(d.includes("T") ? d : d + "Z").toLocaleString("he-IL", { dateStyle: "short", timeStyle: "short" }) : "");

export default function Admin() {
  const [auth, setAuth] = useState<"loading" | "guest" | "admin">("loading");
  const [code, setCode] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const [tab, setTab] = useState("inbox");

  useEffect(() => {
    fetch("/api/admin/me")
      .then((r) => r.json())
      .then((d) => setAuth(d?.admin ? "admin" : "guest"))
      .catch(() => setAuth("guest"));
  }, []);

  const login = async () => {
    setLoginErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code: code.trim() }),
    }).catch(() => null);
    if (r?.ok) setAuth("admin");
    else setLoginErr("קוד שגוי — נסי שוב.");
  };

  if (auth === "loading") return null;

  if (auth === "guest") {
    return (
      <>
        <PageHero eyebrow="ניהול" title="כניסת מנהלת" lead="האזור הזה שמור לטובי בלבד." />
        <section className="section">
          <div className="container" style={{ maxWidth: 420 }}>
            <div className="card">
              <div className="field">
                <label htmlFor="admin-code">קוד מנהלת</label>
                <input id="admin-code" type="password" dir="ltr" value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && login()} />
              </div>
              <button className="btn-primary" onClick={login}><Spark size={18} /> כניסה</button>
              {loginErr && (<><div style={{ height: 10 }} /><div className="notice">{loginErr}</div></>)}
              <p style={{ color: "var(--text-faint)", fontSize: "0.85rem", marginTop: 14, marginBottom: 0 }}>
                הכניסה נשמרת במכשיר הזה ל-180 יום.
              </p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <PageHero eyebrow="ניהול" title="שלום טובי 👋" lead="פניות, מנויות, אישורים והתפוצה — במקום אחד." />
      <section className="section-tight">
        <div className="container" style={{ maxWidth: 860 }}>
          <div className="members-tabs" style={{ justifyContent: "center" }}>
            {TABS.map((t) => (
              <button key={t.id} className={`members-tab${tab === t.id ? " active" : ""}`} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </div>
          <div style={{ height: 16 }} />
          {tab === "inbox" && <InboxTab />}
          {tab === "pending" && <PendingTab />}
          {tab === "messages" && <MessagesTab />}
          {tab === "newsletter" && <NewsletterTab />}
          <div style={{ height: 26 }} />
          <div className="center">
            <button className="btn-secondary" onClick={async () => {
              await fetch("/api/admin/logout", { method: "POST" });
              setAuth("guest");
            }}>יציאה מהניהול</button>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════ פניות ═══════════ */
function InboxTab() {
  const [items, setItems] = useState<Inquiry[] | null>(null);
  const [replyTo, setReplyTo] = useState<Inquiry | null>(null);
  const [replyEmail, setReplyEmail] = useState("");
  const [replyBody, setReplyBody] = useState("");
  const [state, setState] = useState("");

  const load = useCallback(() => {
    fetch("/api/admin/inbox").then((r) => r.json()).then((d) => setItems(d.items || []));
  }, []);
  useEffect(load, [load]);

  const openReply = (q: Inquiry) => {
    setReplyTo(q);
    const em = (q.contact_info || "").split("|").map((x) => x.trim()).find((x) => x.includes("@")) || "";
    setReplyEmail(em);
    setReplyBody("");
    setState("");
  };

  const send = async () => {
    setState("שולחת…");
    const r = await fetch("/api/admin/reply", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: replyTo?.id, toEmail: replyEmail, body: replyBody }),
    }).catch(() => null);
    if (r?.ok) { setState("נשלח ✅"); load(); setTimeout(() => setReplyTo(null), 900); }
    else setState("השליחה נכשלה — בדקי את הכתובת.");
  };

  if (items === null) return <div className="notice center">טוענת…</div>;
  if (!items.length) return <div className="card center"><p style={{ marginBottom: 0 }}>אין פניות עדיין.</p></div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((q) => (
        <div key={q.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <b>{q.name}</b>
            <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>
              {fmtDate(q.created_at)} · {q.status === "responded" ? "✅ נענתה" : "🕐 חדשה"}
            </span>
          </div>
          <p style={{ color: "var(--accent)", margin: "4px 0", fontSize: "0.9rem" }} dir="ltr">{q.contact_info}</p>
          <p style={{ whiteSpace: "pre-wrap", marginBottom: 10 }}>{q.message}</p>
          {replyTo?.id === q.id ? (
            <div>
              <div className="field">
                <label>אל (מייל)</label>
                <input dir="ltr" value={replyEmail} onChange={(e) => setReplyEmail(e.target.value)} />
              </div>
              <div className="field">
                <label>התשובה שלך</label>
                <textarea rows={4} value={replyBody} onChange={(e) => setReplyBody(e.target.value)} />
              </div>
              <div className="cta-row">
                <button className="btn-primary" onClick={send} disabled={!replyBody.trim() || !replyEmail.includes("@")}>שליחת תשובה</button>
                <button className="btn-secondary" onClick={() => setReplyTo(null)}>ביטול</button>
              </div>
              {state && <p style={{ marginTop: 8, marginBottom: 0 }}>{state}</p>}
            </div>
          ) : (
            <button className="btn-secondary" onClick={() => openReply(q)}>✉️ מענה במייל</button>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ ממתינות לאישור ═══════════ */
function PendingTab() {
  const [items, setItems] = useState<Pending[] | null>(null);
  const [busy, setBusy] = useState("");

  const load = useCallback(() => {
    fetch("/api/admin/pending").then((r) => r.json()).then((d) => setItems(d.items || []));
  }, []);
  useEffect(load, [load]);

  const decide = async (id: string, action: string) => {
    setBusy(id);
    await fetch("/api/admin/panel-decide", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, action }),
    });
    setBusy("");
    load();
  };

  if (items === null) return <div className="notice center">טוענת…</div>;
  if (!items.length) return <div className="card center"><p style={{ marginBottom: 0 }}>אין נרשמות ממתינות 🎉</p></div>;

  return (
    <div style={{ display: "grid", gap: 12 }}>
      {items.map((p) => (
        <div key={p.id} className="card">
          <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
            <b>{p.name || "—"}</b>
            <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{fmtDate(p.created_at)}</span>
          </div>
          <p style={{ color: "var(--accent)", margin: "4px 0" }} dir="ltr">{p.email}</p>
          <audio controls preload="none" src={`/api/admin/audio?id=${p.id}`} style={{ width: "100%", margin: "8px 0" }} />
          <div className="cta-row">
            <button className="btn-primary" disabled={busy === p.id} onClick={() => decide(p.id, "approve")}>✅ לאשר</button>
            <button className="btn-secondary" disabled={busy === p.id} onClick={() => decide(p.id, "reject")}>✖ לדחות</button>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ═══════════ הודעות מנויות ═══════════ */
function MessagesTab() {
  const [threads, setThreads] = useState<Thread[] | null>(null);
  const [open, setOpen] = useState<Thread | null>(null);
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [text, setText] = useState("");
  const [broadcast, setBroadcast] = useState("");
  const [state, setState] = useState("");

  const loadThreads = useCallback(() => {
    fetch("/api/admin/threads").then((r) => r.json()).then((d) => setThreads(d.items || []));
  }, []);
  useEffect(loadThreads, [loadThreads]);

  const openThread = async (t: Thread) => {
    setOpen(t);
    const d = await fetch(`/api/admin/thread?sid=${encodeURIComponent(t.sid)}`).then((r) => r.json());
    setMsgs(d.items || []);
  };

  const send = async () => {
    if (!text.trim() || !open) return;
    await fetch("/api/admin/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sid: open.sid, body: text.trim() }),
    });
    setText("");
    openThread(open);
  };

  const sendBroadcast = async () => {
    if (!broadcast.trim()) return;
    if (!window.confirm("ההודעה תופיע אצל כל המנויות באזור המנויות (בלי מייל). לשלוח?")) return;
    setState("שולחת…");
    const r = await fetch("/api/admin/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ broadcast: true, body: broadcast.trim() }),
    });
    setState(r.ok ? "פורסם לכולן ✅" : "שגיאה");
    if (r.ok) setBroadcast("");
  };

  if (threads === null) return <div className="notice center">טוענת…</div>;

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="card">
        <h3>📢 הודעה לכל המנויות</h3>
        <p style={{ color: "var(--text-faint)", fontSize: "0.88rem" }}>
          מופיעה במדור "בינינו" אצל כולן. לא נשלח מייל — לתפוצה במייל משתמשים במדור "כתיבה לתפוצה".
        </p>
        <textarea rows={3} value={broadcast} onChange={(e) => setBroadcast(e.target.value)} placeholder="מה תרצי לומר לכולן?" style={{ width: "100%" }} />
        <div style={{ height: 8 }} />
        <button className="btn-primary" onClick={sendBroadcast} disabled={!broadcast.trim()}>פרסום לכולן</button>
        {state && <span style={{ marginInlineStart: 12 }}>{state}</span>}
      </div>

      {!threads.length && <div className="card center"><p style={{ marginBottom: 0 }}>עוד לא התקבלו הודעות ממנויות.</p></div>}

      {threads.map((t) => (
        <div key={t.sid} className="card">
          <button className="archive-item" style={{ border: "none", background: "none", padding: 0 }} onClick={() => openThread(t)}>
            <span><b>{t.name || t.email}</b>{t.unread > 0 && <span style={{ color: "var(--fire-red)", marginInlineStart: 8 }}>● {t.unread} חדשות</span>}</span>
            <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{fmtDate(t.last_at)}</span>
          </button>
          {open?.sid === t.sid && (
            <div style={{ marginTop: 12, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
              <div style={{ display: "grid", gap: 8, maxHeight: 320, overflowY: "auto" }}>
                {msgs.map((m) => (
                  <div key={m.id} className={`msg-bubble ${m.direction === "out" ? "mine" : ""}`}>
                    <div style={{ whiteSpace: "pre-wrap" }}>{m.body}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-faint)", marginTop: 4 }}>{fmtDate(m.created_at)}</div>
                  </div>
                ))}
              </div>
              <div style={{ height: 10 }} />
              <textarea rows={2} value={text} onChange={(e) => setText(e.target.value)} placeholder="התשובה שלך…" style={{ width: "100%" }} />
              <div style={{ height: 8 }} />
              <button className="btn-primary" onClick={send} disabled={!text.trim()}>שליחה 💬</button>
              <p style={{ color: "var(--text-faint)", fontSize: "0.8rem", marginTop: 6, marginBottom: 0 }}>
                המנויה תקבל מייל עדין שמחכה לה הודעה באתר.
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/* ═══════════ כתיבה לתפוצה ═══════════ */
function NewsletterTab() {
  const [drafts, setDrafts] = useState<Draft[] | null>(null);
  const [id, setId] = useState<string | null>(null);
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [state, setState] = useState("");
  const [preview, setPreview] = useState(false);

  const load = useCallback(() => {
    fetch("/api/admin/drafts").then((r) => r.json()).then((d) => setDrafts(d.items || []));
  }, []);
  useEffect(load, [load]);

  const save = async () => {
    setState("שומרת…");
    const r = await fetch("/api/admin/draft", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, subject, body }),
    });
    const d = await r.json().catch(() => ({}));
    if (r.ok) { setId(d.id); setState("נשמר ✅"); load(); } else setState("שגיאה בשמירה");
  };

  const test = async () => {
    if (!id) { setState("קודם שמרי טיוטה"); return; }
    setState("שולחת טסט…");
    const r = await fetch("/api/admin/draft-test", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    setState(r.ok ? "טסט נשלח למייל שלך ✅" : "שגיאה בשליחת הטסט");
  };

  const toBrevo = async () => {
    if (!id) { setState("קודם שמרי טיוטה"); return; }
    if (!window.confirm("ייווצרו טיוטות קמפיין בשני חשבונות Brevo (לא נשלח כלום עדיין). להמשיך?")) return;
    setState("יוצרת טיוטות בברבו…");
    const r = await fetch("/api/admin/draft-to-brevo", {
      method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id }),
    });
    setState(r.ok ? "נוצרו טיוטות בברבו ✅ — השליחה הסופית משם" : "שגיאה ביצירת הקמפיין");
    load();
  };

  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div className="card">
        <h3>{id ? "עריכת טיוטה" : "טיוטה חדשה"}</h3>
        <div className="field">
          <label>נושא המייל</label>
          <input value={subject} onChange={(e) => setSubject(e.target.value)} />
        </div>
        <div className="field">
          <label>תוכן — הטקסט שלך, מילה במילה (אפשר גם HTML)</label>
          <textarea rows={10} value={body} onChange={(e) => setBody(e.target.value)} style={{ width: "100%" }} />
        </div>
        <div className="cta-row" style={{ flexWrap: "wrap" }}>
          <button className="btn-primary" onClick={save} disabled={!subject.trim()}>💾 שמירת טיוטה</button>
          <button className="btn-secondary" onClick={() => setPreview(!preview)}>{preview ? "סגירת תצוגה" : "👁 תצוגה מקדימה"}</button>
          <button className="btn-secondary" onClick={test}>📧 טסט אליי</button>
          <button className="btn-secondary" onClick={toBrevo}>🚀 יצירת קמפיין בברבו</button>
          {id && <button className="btn-secondary" onClick={() => { setId(null); setSubject(""); setBody(""); setState(""); }}>➕ חדשה</button>}
        </div>
        {state && <p style={{ marginTop: 10, marginBottom: 0 }}>{state}</p>}
        {preview && (
          <iframe title="תצוגה" sandbox="" style={{ width: "100%", minHeight: 380, marginTop: 12, border: "1px solid var(--line)", borderRadius: 10, background: "#fff" }}
            srcDoc={`<div dir="rtl" style="font-family:Arial;padding:20px;line-height:1.8;">${/<[a-z][\s\S]*>/i.test(body) ? body : body.replace(/\n/g, "<br/>")}</div>`} />
        )}
      </div>

      <h3 style={{ marginBottom: 0 }}>טיוטות קודמות</h3>
      {drafts === null && <div className="notice center">טוענת…</div>}
      {drafts?.length === 0 && <p style={{ color: "var(--text-faint)" }}>אין עדיין.</p>}
      {drafts?.map((d) => (
        <button key={d.id} className="card archive-item" onClick={() => { setId(d.id); setSubject(d.subject); setBody(d.body_html); setPreview(false); setState(""); window.scrollTo({ top: 0, behavior: "smooth" }); }}>
          <span><b>{d.subject}</b> {d.status === "in_brevo" && <span style={{ color: "var(--accent)" }}>· בברבו</span>}</span>
          <span style={{ color: "var(--text-faint)", fontSize: "0.85rem" }}>{fmtDate(d.updated_at)}</span>
        </button>
      ))}
    </div>
  );
}
