import { useEffect, useMemo, useState } from "react";

type LiveEvent = { title: string; date: string; time: string; place: string; text: string };
function useLiveEvents() {
  const [events, setEvents] = useState<LiveEvent[] | null>(null);
  useEffect(() => {
    fetch("/api/events")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((d) => setEvents(Array.isArray(d?.events) && d.events.length ? d.events : null))
      .catch(() => setEvents(null));
  }, []);
  return events;
}
import { Link } from "react-router-dom";
import { CharacterHero, CONTACT, Reveal, Spark, Ticker, Wave } from "../components/shared";
import { ABOUT, CONTACT_PAGE, ORCHESTRAS, PERFORMANCES } from "../content/site";

/* ═══════════════ אודות ═══════════════ */
export function About() {
  return (
    <>
      <CharacterHero
        character="saxophone"
        eyebrow="אודות"
        titleLines={ABOUT.hero.titleLines}
        introLines={ABOUT.hero.introLines}
      />
      <Ticker items={ABOUT.ticker} />
      <section className="section">
        <div className="container">
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))" }}>
            {ABOUT.topics.map((t) => (
              <Reveal key={t.id}>
                <div className="card" id={`about-${t.id}`}>
                  <div className="eyebrow">{t.eyebrow}</div>
                  <h3>{t.title}</h3>
                  <p style={{ fontWeight: 500, color: "var(--text)" }}>{t.preview}</p>
                  {t.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                  <p style={{ fontFamily: "var(--font-display)", color: "var(--accent-strong)" }}>
                    {t.signature}
                  </p>
                  {t.ctaLabel && t.ctaTo && (
                    <Link className="btn-secondary" to={t.ctaTo}>
                      {t.ctaLabel}
                    </Link>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 44 }} />
          <div className="center">
            <Wave divider />
            <p className="lead" style={{ marginInline: "auto", fontFamily: "var(--font-display)" }}>
              {ABOUT.closing}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ הופעות ═══════════════ */
export function Performances() {
  const live = useLiveEvents();
  return (
    <>
      <CharacterHero
        character="flute"
        eyebrow="הופעות"
        titleLines={PERFORMANCES.hero.titleLines}
        introLines={PERFORMANCES.hero.introLines}
      />
      <Ticker items={PERFORMANCES.ticker} />

      <section className="section" id="performances-overview-section">
        <div className="container">
          <div className="grid">
            {PERFORMANCES.overviewCards.map((c) => (
              <Reveal key={c.title}>
                <div className="card">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="performances-packages-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">מסלולים</div>
              <h2>אפשרויות נפוצות להרכבים, התאמות וסוגי אירועים</h2>
            </div>
          </Reveal>
          <div style={{ height: 24 }} />
          <div className="grid">
            {PERFORMANCES.tracks.map((t) => (
              <Reveal key={t.title}>
                <div className="card">
                  <h3>{t.title}</h3>
                  <p>{t.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="performances-calendar-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">יומן</div>
              <h2>מועדים קרובים</h2>
            </div>
          </Reveal>
          <div style={{ height: 24 }} />
          <div className="grid">
            {(live ?? PERFORMANCES.events.map((e) => ({ title: e.title, date: "", time: e.when, place: e.place, text: e.text }))).map((e) => (
              <Reveal key={e.title}>
                <div className="card">
                  <h3>{e.title}</h3>
                  <p style={{ color: "var(--accent)", marginBottom: 6 }}>
                    {[e.date, e.time, e.place].filter(Boolean).join(" · ")}
                  </p>
                  <p>{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="performances-faq-section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">שאלות</div>
              <h2>לפני שפונים</h2>
            </div>
            {PERFORMANCES.faq.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section-tight" id="performances-contact-section">
        <div className="container center">
          <Link className="btn-primary" to="/contact">
            <Spark size={22} /> פנייה מסודרת כדי לבדוק התאמה לאירוע שלך
          </Link>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ תזמורות ═══════════════ */
export function Orchestras() {
  const live = useLiveEvents();
  const [pkg, setPkg] = useState<string | null>(null);
  const [addons, setAddons] = useState<string[]>([]);

  const selectedPkg = ORCHESTRAS.packages.find((p) => p.id === pkg) || null;
  const total = useMemo(
    () =>
      (selectedPkg?.basePrice || 0) +
      ORCHESTRAS.addons.filter((a) => addons.includes(a.id)).reduce((s, a) => s + a.price, 0),
    [selectedPkg, addons]
  );
  const toggleAddon = (id: string) =>
    setAddons((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));

  return (
    <>
      <CharacterHero
        character="drums"
        eyebrow="תזמורות"
        titleLines={ORCHESTRAS.hero.titleLines}
        introLines={ORCHESTRAS.hero.introLines}
      />
      <Ticker items={ORCHESTRAS.ticker} />

      <section className="section" id="overview-section">
        <div className="container">
          <div className="grid">
            {ORCHESTRAS.overviewCards.map((c) => (
              <Reveal key={c.title}>
                <div className="card">
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* בונה הצעת מחיר */}
      <section className="section-tight" id="pricing-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">הצעה</div>
              <h2>בניית הצעת מחיר לפי חבילות, כלים ותוספות</h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                בחרי חבילה, הוסיפי תוספות — והסכום מתעדכן מיד.
              </p>
            </div>
          </Reveal>
          <div style={{ height: 24 }} />
          <div className="grid">
            {[...ORCHESTRAS.packages].reverse().map((p) => (
              <Reveal key={p.id}>
                <button
                  className={`card${p.id === "pro" ? " popular" : ""}`}
                  onClick={() => setPkg(p.id)}
                  style={{
                    position: "relative",
                    width: "100%",
                    textAlign: "start",
                    cursor: "pointer",
                    fontFamily: "var(--font-body)",
                    borderColor: pkg === p.id ? "var(--accent)" : undefined,
                    outline: pkg === p.id ? "2px solid var(--accent)" : "none",
                  }}
                >
                  {p.id === "pro" && <span className="badge-popular">⭐ המבוקשת ביותר</span>}
                  <h3>{p.name}</h3>
                  <div className="price-tag">₪{p.basePrice.toLocaleString()}</div>
                  <ul style={{ paddingInlineStart: 18, margin: "10px 0 0", color: "var(--text-soft)" }}>
                    {p.features.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>
                </button>
              </Reveal>
            ))}
          </div>

          <div style={{ height: 22 }} />
          <Reveal>
            <div className="card">
              <h3>תוספות</h3>
              <div>
                {ORCHESTRAS.addons.map((a) => (
                  <button
                    key={a.id}
                    className={`chip selectable${addons.includes(a.id) ? " selected" : ""}`}
                    onClick={() => toggleAddon(a.id)}
                  >
                    {a.name} · ₪{a.price.toLocaleString()}
                  </button>
                ))}
              </div>
              <div style={{ height: 14 }} />
              <h3 style={{ marginBottom: 4 }}>סיכום הצעת מחיר</h3>
              {selectedPkg ? (
                <p style={{ marginBottom: 10 }}>
                  חבילת {selectedPkg.name} + {addons.length} תוספות:{" "}
                  <span className="price-tag">₪{total.toLocaleString()}</span>
                </p>
              ) : (
                <p style={{ color: "var(--text-faint)", marginBottom: 10 }}>בחרי חבילה כדי להתחיל.</p>
              )}
              <div>
                <span style={{ color: "var(--text-soft)", fontSize: "0.94rem" }}>כלים להרכב: </span>
                {ORCHESTRAS.instruments.map((i) => (
                  <span className="chip" key={i}>
                    {i}
                  </span>
                ))}
              </div>
              <div style={{ height: 16 }} />
              <Link className="btn-primary" to="/contact">
                <Spark size={20} /> לקבל הצעת מחיר מסודרת — ללא התחייבות
              </Link>
              <p className="reassure" style={{ marginBottom: 0 }}>
                המחיר שרואים הוא המחיר — בלי הפתעות ובלי אותיות קטנות.
              </p>
            </div>
          </Reveal>

          <div style={{ height: 22 }} />
          <Reveal>
            <div className="grid">
              {ORCHESTRAS.budgetPaths.map((b) => (
                <div className="card" key={b.name}>
                  <h3>{b.name}</h3>
                  <p>{b.description}</p>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" id="events-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">הופעות</div>
              <h2>יומן אירועים קרובים</h2>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid">
            {(live ?? ORCHESTRAS.events.map((e) => ({ title: e.title, date: e.date, time: "", place: e.place, text: e.text }))).map((e) => (
              <Reveal key={e.title}>
                <div className="card">
                  <h3>{e.title}</h3>
                  <p style={{ color: "var(--accent)", marginBottom: 6 }}>
                    {[e.date, e.time, e.place].filter(Boolean).join(" · ")}
                  </p>
                  <p>{e.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="contact-section">
        <div className="container center">
          <Link className="btn-primary" to="/contact">
            <Spark size={22} /> יצירת קשר והמשך מסודר
          </Link>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ צור קשר ═══════════════ */
export function Contact() {
  const [topics, setTopics] = useState<string[]>([]);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "", phone: "", details: "" });
  const [state, setState] = useState<"idle" | "sending" | "ok" | "err">("idle");
  const [errMsg, setErrMsg] = useState("");

  const toggleTopic = (id: string) =>
    setTopics((cur) => (cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id]));
  const activeHints = CONTACT_PAGE.topics.filter((t) => topics.includes(t.id));

  const submit = async () => {
    if (topics.length === 0) {
      setErrMsg("בחרו לפחות נושא אחד.");
      setState("err");
      return;
    }
    if (!form.firstName || (!form.email && !form.phone)) {
      setErrMsg("כמה פרטים יעזרו לי להבין ולחזור אליכם בצורה מדויקת.");
      setState("err");
      return;
    }
    setState("sending");
    try {
      const r = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${form.firstName} ${form.lastName}`.trim(),
          email: form.email,
          phone: form.phone,
          topics: topics.map((id) => CONTACT_PAGE.topics.find((t) => t.id === id)?.label),
          details: form.details,
        }),
      });
      if (!r.ok) throw new Error();
      setState("ok");
    } catch {
      setErrMsg("משהו השתבש. נסו שוב בעוד רגע.");
      setState("err");
    }
  };

  return (
    <>
      <CharacterHero
        character="presenter"
        eyebrow="יצירת קשר"
        titleLines={CONTACT_PAGE.hero.titleLines}
        introLines={CONTACT_PAGE.hero.introLines}
      />
      <Ticker items={CONTACT_PAGE.ticker} />

      <section className="section">
        <div className="container" style={{ maxWidth: 720 }}>
          <Reveal>
            <p className="lead">{CONTACT_PAGE.hero.lead}</p>
            <p className="reassure" style={{ marginTop: -6 }}>
              ⏱️ דקה אחת · בלי התחייבות · אני חוזרת אישית לכל פנייה
            </p>
            <div style={{ height: 10 }} />

            <h3>בחירת נושא</h3>
            <div style={{ marginBottom: 18 }}>
              {CONTACT_PAGE.topics.map((t) => (
                <button
                  key={t.id}
                  className={`chip selectable${topics.includes(t.id) ? " selected" : ""}`}
                  onClick={() => toggleTopic(t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {activeHints.length > 0 && (
              <div className="notice" style={{ marginBottom: 18 }}>
                {activeHints.length > 1 && (
                  <p style={{ fontWeight: 500 }}>{CONTACT_PAGE.fields.multiTopicNote}</p>
                )}
                {activeHints.map((t) => (
                  <p key={t.id} style={{ marginBottom: 6 }}>
                    <b>{t.label}:</b> {t.hint}
                  </p>
                ))}
              </div>
            )}

            {state === "ok" ? (
              <div className="notice ok center">
                <h3>הפנייה נשלחה 🎶</h3>
                <p style={{ marginBottom: 0 }}>אחזור אליכם בצורה מסודרת ומדויקת.</p>
              </div>
            ) : (
              <div className="card">
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="field">
                    <label htmlFor="fn">{CONTACT_PAGE.fields.firstName}</label>
                    <input id="fn" value={form.firstName} onChange={(e) => setForm({ ...form, firstName: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="ln">{CONTACT_PAGE.fields.lastName}</label>
                    <input id="ln" value={form.lastName} onChange={(e) => setForm({ ...form, lastName: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="em">{CONTACT_PAGE.fields.email}</label>
                    <input id="em" type="email" dir="ltr" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                  </div>
                  <div className="field">
                    <label htmlFor="ph">טלפון — {CONTACT_PAGE.fields.phone}</label>
                    <input id="ph" type="tel" dir="ltr" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
                  </div>
                </div>
                <div className="field">
                  <label htmlFor="dt">{CONTACT_PAGE.fields.detailsTitle}</label>
                  <textarea
                    id="dt"
                    rows={5}
                    placeholder={CONTACT_PAGE.fields.placeholder}
                    value={form.details}
                    onChange={(e) => setForm({ ...form, details: e.target.value })}
                  />
                </div>
                {state === "err" && <div className="notice" style={{ marginBottom: 14 }}>{errMsg}</div>}
                <button className="btn-primary" onClick={submit} disabled={state === "sending"}>
                  <Spark size={20} />{" "}
                  {state === "sending" ? CONTACT_PAGE.fields.submitting : CONTACT_PAGE.fields.submit}
                </button>
              </div>
            )}

            <div style={{ height: 22 }} />
            <div className="center" style={{ color: "var(--text-soft)" }}>
              <a href={`tel:${CONTACT.phone.replace(/-/g, "")}`} style={{ textDecoration: "none" }}>
                📞 {CONTACT.phone}
              </a>
              {" · "}
              <a href={`mailto:${CONTACT.email}`} style={{ textDecoration: "none" }}>
                ✉️ {CONTACT.email}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ 404 ═══════════════ */
export function NotFound() {
  return (
    <section className="hero" style={{ minHeight: "56vh" }}>
      <div className="container center">
        <h1>הדף לא נמצא</h1>
        <p className="lead" style={{ marginInline: "auto" }}>
          נראה שהצליל הזה לא קיים ברפרטואר. 🎵
        </p>
        <div style={{ height: 18 }} />
        <Link className="btn-secondary" to="/">
          חזרה לעמוד הבית
        </Link>
      </div>
    </section>
  );
}
