import { Link } from "react-router-dom";
import { CHARACTERS, CONTACT, Reveal, Spark, Ticker } from "../components/shared";
import { HOME, HOME_MARKETING as MKT } from "../content/site";

export default function Home() {
  return (
    <>
      {/* ═══ הבמה — הזהות המוכרת + CTA ראשי מעל הקפל ═══ */}
      <section className="stage-hero">
        <div className="stage-bg" aria-hidden="true" />
        <div className="stage-fade" aria-hidden="true" />
        <div className="stage-hero-inner container">
          <h1>
            {HOME.hero.subtitle}{" "}
            <a href="#stage" className="hero-kaan">
              {HOME.hero.linkWord}
            </a>
          </h1>
          <p className="hero-support">{HOME.hero.supportLine}</p>
          <p className="hero-slogan-line">
            {HOME.hero.sloganPrefix} <b>{HOME.hero.sloganAccent}</b>
          </p>
          <div className="cta-row" style={{ justifyContent: "center", marginTop: 18 }}>
            <Link className="btn-primary" to="/contact">
              <Spark size={20} /> {MKT.heroCtaPrimary}
            </Link>
            <a className="btn-secondary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
              {MKT.heroCtaSecondary}
            </a>
          </div>
        </div>

        {/* הדמויות על הבמה */}
        <nav className="stage-floor" id="stage" aria-label="עמודי האתר">
          {HOME.stageCharacters.map((c) => (
            <Link to={c.href} className="stage-char" key={c.href}>
              <span className="char-quote">{c.quote}</span>
              <img src={CHARACTERS[c.character]} alt={c.title} loading="eager" />
              <span className="char-title">{c.title}</span>
            </Link>
          ))}
        </nav>
        <nav className="char-cards" aria-label="עמודי האתר">
          {HOME.stageCharacters.map((c) => (
            <Link to={c.href} className="char-card" key={`m-${c.href}`}>
              <img src={CHARACTERS[c.character]} alt="" loading="lazy" />
              <span className="char-card-title">{c.title}</span>
              <span className="char-card-text">{c.card}</span>
            </Link>
          ))}
        </nav>
      </section>

      {/* ═══ פס אמון — סמכות במספרים ═══ */}
      <div className="trust-bar">
        {MKT.trustBar.map((t) => (
          <div key={t.label}>
            <div className="tv">{t.value}</div>
            <div className="tl">{t.label}</div>
          </div>
        ))}
      </div>

      {/* ═══ סקשן מכירתי לכל עמוד ═══ */}
      {MKT.sections.map((s, i) => (
        <section className={`home-sec${i % 2 === 1 ? " flip" : ""}`} key={s.href}>
          <div className="container home-sec-grid">
            <Link to={s.href} className="home-sec-char" aria-hidden="true" tabIndex={-1}>
              <img src={CHARACTERS[s.character]} alt="" loading="lazy" />
            </Link>
            <Reveal>
              <div>
                <div className="kicker">{s.kicker}</div>
                <h2>{s.headline}</h2>
                {"quote" in s && s.quote && <p className="sec-quote">{s.quote}</p>}
                <p style={{ maxWidth: 640 }}>{s.text}</p>
                <Link className="sec-cta" to={s.href}>
                  {s.cta}
                </Link>
              </div>
            </Reveal>
          </div>
        </section>
      ))}

      {/* ═══ הוכחה חברתית — פס המלצות נע ═══ */}
      <div className="ticker testimonials" dir="ltr" aria-hidden="true">
        <div className="ticker-track" dir="rtl">
          {[...MKT.testimonialStrip, ...MKT.testimonialStrip].map((t, i) => (
            <span className="ticker-item" key={i}>
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* ═══ המנחה — טקסט מקורי ═══ */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div className="card" style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              <img src={CHARACTERS.presenter} alt="" style={{ height: 120, filter: "var(--char-glow)" }} />
              <div style={{ flex: 1, minWidth: 240 }}>
                <h3>{HOME.guide.floatingLabel}</h3>
                <p style={{ marginBottom: 12 }}>{HOME.guide.welcomeText}</p>
                <Link className="btn-secondary" to="/contact">
                  לשיחה איתי
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ תפוצה — בלעדיות ═══ */}
      <section className="section-tight">
        <div className="container center">
          <Reveal>
            <div className="kicker" style={{ color: "var(--accent)" }}>
              🔒 {MKT.newsletter.kicker}
            </div>
            <h2>{MKT.newsletter.headline}</h2>
            <p className="lead" style={{ marginInline: "auto" }}>
              {MKT.newsletter.text}
            </p>
            <div style={{ height: 16 }} />
            <div className="cta-row">
              <a className="btn-primary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
                <Spark size={22} /> {MKT.newsletter.ctaJoin}
              </a>
              <Link className="btn-secondary" to="/members">
                {MKT.newsletter.ctaMembers}
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ CTA סופי — הפחתת חיכוך ═══ */}
      <section className="final-cta">
        <Reveal>
          <h2>{MKT.finalCta.headline}</h2>
          <p className="lead" style={{ marginInline: "auto" }}>
            {MKT.finalCta.text}
          </p>
          <div style={{ height: 16 }} />
          <Link className="btn-primary" to="/contact">
            <Spark size={22} /> {MKT.finalCta.cta}
          </Link>
          <div className="reassure">{CONTACT.slogan} · {CONTACT.name} · {CONTACT.phone}</div>
        </Reveal>
      </section>
    </>
  );
}
