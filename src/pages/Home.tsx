import { Link } from "react-router-dom";
import { CONTACT, Reveal, Spark, Wave } from "../components/shared";

const AREAS = [
  {
    to: "/performances",
    icon: "🎹",
    title: "הופעות",
    text: "ליווי מוסיקלי יחיד ומופעים מלאים על במות — לאירועי נשים.",
  },
  {
    to: "/orchestras",
    icon: "🎼",
    title: "תזמורות",
    text: "ניהול תזמורות לימודיות ותזמורות לאירועים — מהחזרה הראשונה ועד הבמה.",
  },
  {
    to: "/teaching",
    icon: "🎵",
    title: "הוראה",
    text: "שיעורי פסנתר וחליל צד לתלמידות מתקדמות, עם פלטפורמת תלמידות אישית.",
  },
  {
    to: "/scores",
    icon: "✍️",
    title: "עיבודים ותווים",
    text: "כתיבת עיבודים, תווים והפקת מוסיקה — לפי הזמנה.",
  },
  {
    to: "/blog",
    icon: "📖",
    title: "תכנים מוסיקליים",
    text: "מאמרים, תובנות וחוויות מאחורי הקלעים של עולם המוזיקה.",
  },
  {
    to: "/members",
    icon: "🔒",
    title: "אזור מנויות",
    text: "שירים, הקלטות, הטבות ותקשורת ישירה — לרשומות התפוצה בלבד.",
  },
];

export default function Home() {
  return (
    <>
      <section className="hero">
        <div className="container center">
          <div className="eyebrow">TOBY music</div>
          <h1 className="hero-title">טובי וינברג</h1>
          <div className="hero-roles">{CONTACT.roles}</div>
          <Wave animate />
          <p className="hero-slogan">"{CONTACT.slogan}"</p>
          <div className="cta-row">
            <a className="btn-primary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
              <Spark size={22} /> הצטרפי לתפוצה שלי
            </a>
            <Link className="btn-secondary" to="/contact">
              דברי איתי
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Reveal>
            <div className="center">
              <h2>מה קורה כאן על הבמה</h2>
              <p className="lead">
                מוזיקה חיה, הוראה, ניהול תזמורות ויצירה — הכול במקום אחד, לקהל נשים.
              </p>
            </div>
          </Reveal>
          <div style={{ height: 34 }} />
          <div className="grid">
            {AREAS.map((a) => (
              <Reveal key={a.to}>
                <Link to={a.to} className="card-link">
                  <div className="card">
                    <div className="card-icon">{a.icon}</div>
                    <h3>{a.title}</h3>
                    <p>{a.text}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight">
        <div className="container center">
          <Wave divider />
          <Reveal>
            <h2>התפוצה המוסיקלית</h2>
            <p className="lead">
              שירים חדשים, תובנות, אירועים וחוויות מאחורי הקלעים — במייל, בלי פרסומות.
              חלקים מהאתר פתוחים לרשומות התפוצה בלבד.
            </p>
            <div style={{ height: 18 }} />
            <div className="cta-row">
              <a className="btn-primary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
                <Spark size={22} /> אני רוצה להצטרף
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
