import { Link } from "react-router-dom";
import { CHARACTERS, CONTACT, Reveal, Spark, Ticker } from "../components/shared";
import { HOME } from "../content/site";

export default function Home() {
  return (
    <>
      {/* ═══ הבמה ═══ */}
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
        </div>

        {/* הדמויות על הבמה — לחיצה מובילה לעמוד, ריחוף מציג ציטוט */}
        <nav className="stage-floor" id="stage" aria-label="עמודי האתר">
          {HOME.stageCharacters.map((c) => (
            <Link to={c.href} className="stage-char" key={c.href}>
              <span className="char-quote">{c.quote}</span>
              <img src={CHARACTERS[c.character]} alt={c.title} loading="eager" />
              <span className="char-title">{c.title}</span>
            </Link>
          ))}
        </nav>

        {/* מובייל — כרטיסי דמויות */}
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

      <Ticker items={HOME.marquee} />

      {/* ═══ המנחה ═══ */}
      <section className="section-tight">
        <div className="container">
          <Reveal>
            <div
              className="card"
              style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}
            >
              <img
                src={CHARACTERS.presenter}
                alt=""
                style={{ height: 120, filter: "var(--char-glow)" }}
              />
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

      {/* ═══ תפוצה ═══ */}
      <section className="section-tight">
        <div className="container center">
          <Reveal>
            <h2>התפוצה המוסיקלית</h2>
            <p className="lead">
              שירים חדשים, תובנות, אירועים וחוויות מאחורי הקלעים — במייל, בלי פרסומות. חלקים
              מהאתר פתוחים לרשומות התפוצה בלבד.
            </p>
            <div style={{ height: 18 }} />
            <div className="cta-row">
              <a className="btn-primary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
                <Spark size={22} /> אני רוצה להצטרף
              </a>
              <Link className="btn-secondary" to="/members">
                כבר רשומה? לאזור המנויות
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
