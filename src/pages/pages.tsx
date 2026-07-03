import { Link } from "react-router-dom";
import { CONTACT, PageHero, Reveal, Spark } from "../components/shared";

/* ============ אודות ============ */
export function About() {
  return (
    <>
      <PageHero
        eyebrow="אודות"
        title="נעים מאוד, טובי"
        lead="מוסיקאית, מורה, מנהלת תזמורות ויוצרת — מבני ברק, לקהל נשים."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <p className="lead">
              אני מנגנת, מלמדת, מנצחת וכותבת: קלידים, חליל צד, ניהול תזמורות לימודיות
              ותזמורות לאירועים, כתיבת עיבודים ותווים, והפקת מוסיקה.
            </p>
            <div className="brand-block">
              <p style={{ margin: 0, fontFamily: "var(--font-display)", fontSize: "1.25rem" }}>
                "{CONTACT.slogan}"
              </p>
            </div>
            <div className="placeholder-note">
              [כאן ייכנס הטקסט האישי שלך — הסיפור, הדרך, האמירה. את כותבת, אני מציב.]
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ הופעות ============ */
export function Performances() {
  return (
    <>
      <PageHero
        eyebrow="הופעות"
        title="על הבמה"
        lead="ליווי מוסיקלי יחיד ומופעים מלאים — קונצרטים, התוועדויות, ערבי ריקודים, דינרים ופלייבקים. לנשים בלבד."
      />
      <section className="section">
        <div className="container">
          <div className="grid">
            <Reveal>
              <div className="card">
                <div className="card-icon">🎹</div>
                <h3>מלווה יחידה</h3>
                <p>ליווי זמרות, אמניות ומורות למוזיקה קלאסית — בקלידים ובחליל צד.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">🎼</div>
                <h3>ניהול תזמורת באירוע</h3>
                <p>הרכב מלא בניהולי — מהתאמת הרפרטואר ועד הרגע שהאולם קם על הרגליים.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">✨</div>
                <h3>מופע מותאם</h3>
                <p>בניית תוכנית מוסיקלית סביב האירוע שלך — אופי, קהל ורגעי שיא.</p>
              </div>
            </Reveal>
          </div>
          <div style={{ height: 40 }} />
          <div className="center">
            <Link className="btn-primary" to="/contact">
              <Spark size={22} /> בואי נדבר על האירוע שלך
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ תזמורות ============ */
export function Orchestras() {
  return (
    <>
      <PageHero
        eyebrow="תזמורות"
        title="ניהול תזמורות"
        lead="תזמורות לימודיות ותזמורות לאירועים — ניצוח, עיבודים, חזרות ובמה."
      />
      <section className="section">
        <div className="container">
          <div className="grid">
            <Reveal>
              <div className="card">
                <div className="card-icon">🏫</div>
                <h3>תזמורות לימודיות</h3>
                <p>הקמה וניהול של תזמורות במוסדות לימוד — בחירת רפרטואר, עיבודים לפי הרכב, וחניכה עד ההופעה.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">🎤</div>
                <h3>תזמורות לאירועים</h3>
                <p>הרכבים מקצועיים לאירועי נשים — ניהול מוסיקלי מלא מהחזרה הראשונה ועד הצליל האחרון.</p>
              </div>
            </Reveal>
          </div>
          <div style={{ height: 40 }} />
          <div className="center">
            <Link className="btn-secondary" to="/contact">
              לפרטים ותיאום
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ הוראה ============ */
export function Teaching() {
  return (
    <>
      <PageHero
        eyebrow="הוראה"
        title="פסנתר וחליל צד"
        lead="שיעורים לתלמידות מתקדמות — עם מעקב אישי, דוחות תרגול ופלטפורמה דיגיטלית."
      />
      <section className="section">
        <div className="container">
          <div className="grid">
            <Reveal>
              <div className="card">
                <div className="card-icon">🎹</div>
                <h3>פסנתר</h3>
                <p>טכניקה, קריאת תווים, פיתוח נגינה אישית — בהתאמה לרמת כל תלמידה.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">🎶</div>
                <h3>חליל צד</h3>
                <p>מהצליל הראשון ועד נגינה בתזמורת — הוראה מקצועית לחליל צד.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">📱</div>
                <h3>פלטפורמת התלמידות</h3>
                <p>אזור אישי לכל תלמידה: מערכת שיעורים, מעקב אימונים, הודעות, מדליות והישגים.</p>
              </div>
            </Reveal>
          </div>
          <div style={{ height: 40 }} />
          <div className="center cta-row">
            <a className="btn-primary" href={CONTACT.studentsUrl} target="_blank" rel="noreferrer">
              <Spark size={22} /> כניסה לפלטפורמת התלמידות
            </a>
            <Link className="btn-secondary" to="/contact">
              הצטרפות לשיעורים
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ עיבודים ותווים ============ */
export function Scores() {
  return (
    <>
      <PageHero
        eyebrow="יצירה"
        title="עיבודים, תווים והפקה"
        lead="כתיבת עיבודים לפי הרכב, תווים מסודרים והפקת מוסיקה — לפי הזמנה."
      />
      <section className="section">
        <div className="container">
          <div className="grid">
            <Reveal>
              <div className="card">
                <div className="card-icon">✍️</div>
                <h3>עיבודים</h3>
                <p>עיבוד יצירות להרכבים — מסולו ועד תזמורת מלאה, בהתאמה לרמת הנגניות.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">🎼</div>
                <h3>תווים</h3>
                <p>כתיבת תווים מקצועית ומסודרת — לשיעורים, לתזמורות ולהופעות.</p>
              </div>
            </Reveal>
            <Reveal>
              <div className="card">
                <div className="card-icon">🎧</div>
                <h3>הפקת מוסיקה</h3>
                <p>הפקה והלחנה של קטעים מוסיקליים לפי צורך — לאירועים, למופעים וללימוד.</p>
              </div>
            </Reveal>
          </div>
          <div style={{ height: 40 }} />
          <div className="center">
            <Link className="btn-primary" to="/contact">
              <Spark size={22} /> הזמנת עבודה
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ============ תכנים / בלוג ============ */
export function Blog() {
  return (
    <>
      <PageHero
        eyebrow="תכנים"
        title="תכנים מוסיקליים"
        lead="מאמרים, תובנות וחוויות מעולם המוזיקה. חלק מהתכנים פתוחים לכולן — והמלא, לרשומות התפוצה."
      />
      <section className="section">
        <div className="container" style={{ maxWidth: 760 }}>
          <Reveal>
            <div className="notice center">
              <p style={{ marginBottom: 10 }}>
                המדור בבנייה — התכנים הראשונים בדרך. 📖
              </p>
              <span className="lock-badge">🔒 תכנים מלאים — לרשומות התפוצה בלבד</span>
            </div>
            <div style={{ height: 24 }} />
            <div className="center cta-row">
              <a className="btn-primary" href={CONTACT.joinUrl} target="_blank" rel="noreferrer">
                <Spark size={22} /> הצטרפי כדי לא לפספס
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

/* ============ קשר ============ */
export function Contact() {
  return (
    <>
      <PageHero
        eyebrow="קשר"
        title="דברי איתי"
        lead="לאירועים, שיעורים, עיבודים או כל שאלה — אני כאן."
      />
      <section className="section">
        <div className="container center" style={{ maxWidth: 560 }}>
          <Reveal>
            <div className="card" style={{ textAlign: "center" }}>
              <h3>{CONTACT.name}</h3>
              <p style={{ marginBottom: 14 }}>{CONTACT.roles}</p>
              <p style={{ fontSize: "1.15rem", marginBottom: 6 }}>
                <a href={`tel:${CONTACT.phone.replace(/-/g, "")}`} style={{ textDecoration: "none" }}>
                  📞 {CONTACT.phone}
                </a>
              </p>
              <p style={{ fontSize: "1.05rem", marginBottom: 0 }}>
                <a href={`mailto:${CONTACT.email}`} style={{ textDecoration: "none" }}>
                  ✉️ {CONTACT.email}
                </a>
              </p>
            </div>
            <div style={{ height: 20 }} />
            <p className="placeholder-note">
              [טופס קשר ישיר יחובר בשלב הבא ל-Worker הקיים toby-contact-proxy]
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}

/* ============ 404 ============ */
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
