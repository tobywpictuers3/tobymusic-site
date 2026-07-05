import { useState } from "react";
import { Link } from "react-router-dom";
import { CharacterHero, CONTACT, Reveal, Spark, Ticker } from "../components/shared";
import { BLOG, SHEETS, STUDENTS } from "../content/site";

/* ═══════════════ תלמידות ═══════════════ */
export function Students() {
  return (
    <>
      <CharacterHero
        character="piano"
        eyebrow="תלמידות"
        titleLines={STUDENTS.hero.titleLines}
        introLines={STUDENTS.hero.introLines}
      />
      <Ticker items={STUDENTS.testimonials.map((t) => `${t.name} — ${t.quote}`)} />

      <section className="section-tight">
        <div className="container center">
          <Reveal>
            <p className="lead" style={{ marginInline: "auto", fontFamily: "var(--font-display)" }}>
              {STUDENTS.hero.heroQuote}
            </p>
            <div style={{ height: 14 }} />
            <Link className="btn-primary" to="/contact">
              <Spark size={20} /> {STUDENTS.topCta}
            </Link>
            <p className="reassure">
              הקבלה למסלול נעשית לפי בדיקת התאמה אישית · פנייה קצרה, בלי התחייבות
            </p>
          </Reveal>
        </div>
      </section>

      {/* המסלול + המלצות */}
      <section className="section-tight" id="track-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.track.badge}</div>
              <h2>
                {STUDENTS.track.titleLines[0]}
                <br />
                {STUDENTS.track.titleLines[1]}
              </h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {STUDENTS.track.description}
              </p>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
            {STUDENTS.testimonials.map((t, i) => (
              <Reveal key={i}>
                <div className="card">
                  <p style={{ marginBottom: 10 }}>"{t.quote}"</p>
                  <p style={{ marginBottom: 0, color: "var(--accent)", fontWeight: 500 }}>
                    {t.name} · {t.context}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 24 }} />
          <Reveal>
            <div className="brand-block">
              <h3>
                {STUDENTS.track.sideCardTitleLines[0]} {STUDENTS.track.sideCardTitleLines[1]}
              </h3>
              <ul style={{ paddingInlineStart: 18, color: "var(--text-soft)" }}>
                {STUDENTS.track.sideCardBullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
              <Link className="btn-secondary" to="/contact">
                {STUDENTS.track.sideCardCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* תהליך נכון */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.commitment.badge}</div>
              <h2>
                {STUDENTS.commitment.titleLines[0]}
                <br />
                {STUDENTS.commitment.titleLines[1]}
              </h2>
            </div>
            <div style={{ height: 20 }} />
            <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))" }}>
              <div className="card">
                <h3>{STUDENTS.commitment.importantTitle}</h3>
                <p>{STUDENTS.commitment.importantText}</p>
              </div>
              <div className="card">
                <h3>{STUDENTS.commitment.resultTitle}</h3>
                <p>{STUDENTS.commitment.resultText}</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* תחומי הלימוד */}
      <section className="section-tight" id="studies-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.studies.badge}</div>
              <h2>{STUDENTS.studies.title}</h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {STUDENTS.studies.description}
              </p>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
            {STUDENTS.studies.primary.map((s) => (
              <Reveal key={s.title}>
                <div className="card">
                  <h3>{s.title}</h3>
                  <p style={{ fontWeight: 500 }}>{s.subtitle}</p>
                  <ul style={{ paddingInlineStart: 18, color: "var(--text-soft)", marginBottom: 0 }}>
                    {s.bullets.map((b) => (
                      <li key={b}>{b}</li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 20 }} />
          <Reveal>
            <div className="card">
              <h3>{STUDENTS.studies.supportTitle}</h3>
              <p>{STUDENTS.studies.supportDescription}</p>
              <div>
                {STUDENTS.studies.supportStudies.map((s) => (
                  <span className="chip" key={s}>
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
          <div style={{ height: 20 }} />
          <Reveal>
            <div className="card">
              <h3>{STUDENTS.studies.orchestraTitle}</h3>
              <p>{STUDENTS.studies.orchestraDescription}</p>
              <Link className="btn-secondary" to="/orchestras">
                {STUDENTS.studies.orchestraCta}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* הדרך שלי */}
      <section className="section-tight" id="belief-section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.belief.label}</div>
              <h2>
                {STUDENTS.belief.titleLines[0]}
                <br />
                {STUDENTS.belief.titleLines[1]}
              </h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {STUDENTS.belief.description}
              </p>
            </div>
            <div className="brand-block">
              {STUDENTS.belief.lines.map((l) => (
                <p key={l} style={{ marginBottom: 6 }}>
                  ✦ {l}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* איך זה עובד */}
      <section className="section-tight" id="process-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.process.badge}</div>
              <h2>{STUDENTS.process.title}</h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {STUDENTS.process.description}
              </p>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid">
            {STUDENTS.process.items.map((it) => (
              <Reveal key={it.title}>
                <div className="card">
                  <div className="card-icon">{it.icon}</div>
                  <h3>{it.title}</h3>
                  <p>{it.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* המערכת */}
      <section className="section-tight" id="system-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">{STUDENTS.system.badge}</div>
              <h2>
                {STUDENTS.system.titleLines[0]}
                <br />
                {STUDENTS.system.titleLines[1]}
              </h2>
              <p className="lead" style={{ marginInline: "auto" }}>
                {STUDENTS.system.description}
              </p>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid">
            {STUDENTS.system.features.map((f) => (
              <Reveal key={f.title}>
                <div className="card">
                  <div className="card-icon">{f.icon}</div>
                  <h3>{f.title}</h3>
                  <p>{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 24 }} />
          <div className="center cta-row">
            <a className="btn-primary" href={CONTACT.studentsUrl} target="_blank" rel="noreferrer">
              <Spark size={20} /> {STUDENTS.system.loginLabel}
            </a>
            <a className="btn-secondary" href={CONTACT.studentsUrl} target="_blank" rel="noreferrer">
              {STUDENTS.system.demoLabel}
            </a>
          </div>
        </div>
      </section>

      {/* מספרים */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="numbers-grid">
              {STUDENTS.numbers.map((n) => (
                <div key={n.label}>
                  <div className="number-value">{n.value}</div>
                  <div className="number-label">{n.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* CTA תחתון */}
      <section className="section-tight">
        <div className="container center">
          <Reveal>
            <h2>{STUDENTS.bottomCta.title}</h2>
            <p className="lead" style={{ marginInline: "auto" }}>
              {STUDENTS.bottomCta.description}
            </p>
            <div style={{ height: 16 }} />
            <div className="cta-row">
              <Link className="btn-primary" to="/contact">
                <Spark size={20} /> {STUDENTS.bottomCta.contactLabel}
              </Link>
              <a className="btn-secondary" href={CONTACT.studentsUrl} target="_blank" rel="noreferrer">
                {STUDENTS.bottomCta.loginLabel}
              </a>
              <Link className="btn-secondary" to="/about">
                {STUDENTS.bottomCta.aboutLabel}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ תווים ═══════════════ */
export function Sheets() {
  const [filter, setFilter] = useState("הכל");
  const instruments = ["הכל", ...Array.from(new Set(SHEETS.catalog.map((c) => c.instrument)))];
  const items = SHEETS.catalog.filter((c) => filter === "הכל" || c.instrument === filter);

  const buyMail = (item: (typeof SHEETS.catalog)[0]) =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent("רכישת תווים — " + item.title)}&body=${encodeURIComponent(
      `שלום, אני מעוניינת לרכוש את "${item.title}" עבור ${item.instrument}, ברמה ${item.level}.`
    )}`;
  const requestMail = (request: string) =>
    `mailto:${CONTACT.email}?subject=${encodeURIComponent("הזמנת תווים אישית")}&body=${encodeURIComponent(
      `שלום, אני מעוניינת בבקשה מהסוג הבא: ${request}.`
    )}`;

  return (
    <>
      <CharacterHero
        character="guitar"
        eyebrow="תווים"
        titleLines={SHEETS.hero.titleLines}
        introLines={SHEETS.hero.introLines}
      />
      <Ticker items={SHEETS.ticker} />

      <section className="section" id="services-section">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">שירותים</div>
              <h2>מה אפשר להזמין</h2>
            </div>
          </Reveal>
          <div style={{ height: 22 }} />
          <div className="grid">
            {SHEETS.services.map((s) => (
              <Reveal key={s.title}>
                <div className="card">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="catalog">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">מאגר</div>
              <h2>חיפוש תווים קיימים</h2>
            </div>
            <div className="center" style={{ margin: "14px 0" }}>
              {instruments.map((i) => (
                <button
                  key={i}
                  className={`chip selectable${filter === i ? " selected" : ""}`}
                  onClick={() => setFilter(i)}
                >
                  {i}
                </button>
              ))}
            </div>
          </Reveal>
          <div className="grid">
            {items.map((c) => (
              <Reveal key={c.title}>
                <div className="card">
                  <span className="lock-badge">{c.status}</span>
                  <h3 style={{ marginTop: 10 }}>{c.title}</h3>
                  <p style={{ marginBottom: 6, color: "var(--accent)" }}>{c.author}</p>
                  <p style={{ marginBottom: 12 }}>
                    {c.instrument} · {c.level} · {c.style} · {c.kind}
                  </p>
                  <a className="btn-secondary" href={buyMail(c)}>
                    {c.status === "מוכן" ? "רכישת תווים קיימים" : "הזמנה אישית"}
                  </a>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" id="custom-order">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">הזמנה</div>
              <h2>מסלול ברור להזמנה אישית</h2>
            </div>
            <div className="brand-block">
              {SHEETS.process.map((p, i) => (
                <p key={p} style={{ marginBottom: 6 }}>
                  <b style={{ color: "var(--accent)" }}>{i + 1}.</b> {p}
                </p>
              ))}
            </div>
            <div className="center">
              {SHEETS.quickRequests.map((q) => (
                <a className="chip selectable" style={{ textDecoration: "none" }} key={q} href={requestMail(q)}>
                  {q}
                </a>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" id="request-form">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="card">
              <h3>מה בדיוק צריך?</h3>
              <p style={{ color: "var(--text-soft)" }}>שליחת בקשה מסודרת עם כל הפרטים הדרושים:</p>
              <ul style={{ paddingInlineStart: 18, color: "var(--text-soft)" }}>
                {SHEETS.formGuide.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
              <a
                className="btn-primary"
                href={`mailto:${CONTACT.email}?subject=${encodeURIComponent("הזמנת תווים אישית")}`}
              >
                <Spark size={20} /> שליחת בקשה במייל
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" id="faq-section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">שאלות</div>
              <h2>לפני קנייה או הזמנה</h2>
            </div>
            {SHEETS.faq.map((f) => (
              <div className="faq-item" key={f.q}>
                <h3>{f.q}</h3>
                <p>{f.a}</p>
              </div>
            ))}
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ═══════════════ בלוג ═══════════════ */
export function Blog() {
  const [cat, setCat] = useState("הכל");
  const articles = BLOG.articles.filter((a) => cat === "הכל" || a.cat === cat);

  return (
    <>
      <CharacterHero
        character="violin"
        eyebrow="בלוג"
        titleLines={BLOG.hero.titleLines}
        introLines={BLOG.hero.introLines}
      />
      <Ticker items={BLOG.ticker} />

      {/* מוביל */}
      <section className="section" id="featured">
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <div className="brand-block">
              <div className="qa-badge">מוביל</div>
              <h2 style={{ fontSize: "1.6rem" }}>{BLOG.featured.title}</h2>
              <p style={{ marginBottom: 0 }}>{BLOG.featured.text}</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* מאמרים */}
      <section className="section-tight" id="articles">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">מאמרים</div>
              <h2>כל המאמרים</h2>
              <div style={{ margin: "14px 0" }}>
                {BLOG.categories.map((c) => (
                  <button
                    key={c}
                    className={`chip selectable${cat === c ? " selected" : ""}`}
                    onClick={() => setCat(c)}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>
          </Reveal>
          <div className="grid">
            {articles.map((a) => (
              <Reveal key={a.title}>
                <div className="card">
                  <span className="lock-badge">{a.cat}</span>
                  <h3 style={{ marginTop: 10 }}>{a.title}</h3>
                  <p>{a.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* שאלות */}
      <section className="section-tight" id="quick-questions">
        <div className="container" style={{ maxWidth: 820 }}>
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">שאלות</div>
              <h2>Q&A קצר — שאלות שנולדות מהשטח</h2>
            </div>
          </Reveal>
          <div style={{ height: 20 }} />
          <div style={{ display: "grid", gap: 16 }}>
            {BLOG.qa.map((q) => (
              <Reveal key={q.q}>
                <div className="qa-card">
                  <div className="qa-badge">{q.badge}</div>
                  <h3>{q.q}</h3>
                  <p>{q.a}</p>
                  <span style={{ color: "var(--accent)", fontSize: "0.92rem" }}>{q.cta} ←</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* קהילה ונושאים */}
      <section className="section-tight" id="community">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">קהילה</div>
              <h2>נושאים שביקשו שאכתוב</h2>
            </div>
          </Reveal>
          <div style={{ height: 20 }} />
          <div className="grid" id="requested-topics">
            {BLOG.requestedTopics.map((t) => (
              <Reveal key={t.q}>
                <div className="card">
                  <h3>{t.q}</h3>
                  <p>{t.a}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 16 }} />
          <div className="center">
            {BLOG.futureTopics.map((t) => (
              <span className="chip" key={t}>
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ניוזלטרים */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">רשימת התפוצה</div>
              <h2>מהניוזלטר</h2>
            </div>
          </Reveal>
          <div style={{ height: 20 }} />
          <div className="grid">
            {BLOG.newsletters.map((n) => (
              <Reveal key={n.title}>
                <div className="card">
                  <span className="lock-badge">{n.when}</span>
                  <h3 style={{ marginTop: 10 }}>{n.title}</h3>
                  <p>{n.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* לרשומות בלבד */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="center">
              <div className="badge-eyebrow">🔒 לרשומות התפוצה בלבד</div>
              <h2>תוכן נעול</h2>
            </div>
          </Reveal>
          <div style={{ height: 20 }} />
          <div className="grid">
            {BLOG.membersOnly.map((m) => (
              <Reveal key={m.title}>
                <div className="card locked-card">
                  <span className="lock-badge">🔒</span>
                  <h3 style={{ marginTop: 10 }}>{m.title}</h3>
                  <p>{m.text}</p>
                  <div className="lock-overlay">{BLOG.lockNote}</div>
                </div>
              </Reveal>
            ))}
          </div>
          <div style={{ height: 22 }} />
          <div className="center cta-row">
            <Link className="btn-primary" to="/members">
              <Spark size={20} /> {BLOG.membersLink}
            </Link>
            <a className="btn-secondary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
              להצטרפות לתפוצה
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
