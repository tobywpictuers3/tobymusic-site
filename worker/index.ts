/**
 * TOBY music — site worker (שלב ב')
 * נכסים סטטיים + אזור מנויות: Magic Link מול D1 הקיים + שליחה ב-Brevo.
 */
export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  BREVO_API_KEY: string;
  BREVO_API_KEY_2: string;
  AIRTABLE_TOKEN: string;
}

const SITE = "https://tobymusic.club";
const COOKIE = "toby_session";
const LINK_TTL_MIN = 30;
const SESSION_DAYS = 90;

/* ---------- utils ---------- */
async function sha256(s: string): Promise<string> {
  const buf = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(s));
  return [...new Uint8Array(buf)].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function randToken(): string {
  const a = new Uint8Array(32);
  crypto.getRandomValues(a);
  return [...a].map((b) => b.toString(16).padStart(2, "0")).join("");
}
function json(data: unknown, status = 200, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: { "Content-Type": "application/json; charset=utf-8", ...headers },
  });
}
function getCookie(req: Request, name: string): string | null {
  const c = req.headers.get("Cookie") || "";
  const m = c.match(new RegExp(`(?:^|;\\s*)${name}=([^;]+)`));
  return m ? m[1] : null;
}

/* ---------- מייל קישור כניסה ---------- */
function loginEmailHtml(name: string | null, link: string): string {
  const greet = name ? `שלום ${name},` : "שלום,";
  return `<!doctype html><html dir="rtl" lang="he"><body style="margin:0;background:#F5F1EA;font-family:Heebo,Arial,sans-serif;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="background:#0F0F12;border-radius:12px;padding:36px 28px;text-align:center;">
      <img src="https://raw.githubusercontent.com/tobywpictuers3/the-music-dd01e777/main/src/assets/logo-white.png" alt="TOBY music" style="height:56px;margin-bottom:22px;" />
      <p style="color:#F5F1EA;font-size:18px;margin:0 0 8px;">${greet}</p>
      <p style="color:#CFC8BC;font-size:16px;margin:0 0 26px;">הנה קישור הכניסה האישי שלך לאזור המנויות:</p>
      <a href="${link}" style="display:inline-block;padding:14px 36px;border-radius:8px;font-weight:700;font-size:16px;color:#0F0F12;text-decoration:none;background:linear-gradient(110deg,#8B2A37,#C9A961,#FFE5A0,#C9A961,#6B1F2A);">✨ כניסה לאזור המנויות</a>
      <p style="color:#8F8A80;font-size:13px;margin:26px 0 0;">הקישור תקף ל-${LINK_TTL_MIN} דקות ולשימוש חד-פעמי.<br/>לא ביקשת? אפשר להתעלם מהמייל הזה.</p>
    </div>
    <p style="text-align:center;color:#6B1F2A;font-size:13px;margin-top:18px;">"אומנות ואמינות, זו יצירה" · TOBY music</p>
  </div></body></html>`;
}

async function sendLoginEmail(env: Env, to: string, name: string | null, link: string) {
  const r = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({
      sender: { name: "טובי וינברג · TOBY music", email: "toby@tobybymusic.com" },
      replyTo: { email: "toby.musicartist@gmail.com" },
      to: [{ email: to }],
      subject: "קישור הכניסה שלך לאזור המנויות ✨",
      htmlContent: loginEmailHtml(name, link),
    }),
  });
  if (!r.ok) throw new Error(`brevo ${r.status}: ${await r.text()}`);
}

/* ---------- auth ---------- */
async function currentMember(req: Request, env: Env) {
  const tok = getCookie(req, COOKIE);
  if (!tok) return null;
  const h = await sha256(tok);
  return env.DB.prepare(
    `SELECT s.id AS session_id, sub.id, sub.email, sub.name
     FROM sessions s JOIN subscribers sub ON sub.id = s.subscriber_id
     WHERE s.session_hash = ? AND s.revoked_at IS NULL AND s.expires_at > datetime('now')
       AND sub.status = 'approved'`
  )
    .bind(h)
    .first<{ session_id: string; id: string; email: string; name: string | null }>();
}

async function handleApi(req: Request, env: Env, url: URL): Promise<Response> {
  /* --- מי אני --- */
  if (url.pathname === "/api/me") {
    const m = await currentMember(req, env);
    return json(m ? { member: true, name: m.name, email: m.email } : { member: false });
  }

  /* --- בקשת קישור --- */
  if (url.pathname === "/api/auth/request" && req.method === "POST") {
    let email = "";
    try {
      email = String(((await req.json()) as { email?: string }).email || "")
        .trim()
        .toLowerCase();
    } catch {}
    if (!email.includes("@")) return json({ error: "bad_email" }, 400);

    const sub = await env.DB.prepare(
      "SELECT id, email, name FROM subscribers WHERE lower(email) = ? AND status = 'approved'"
    )
      .bind(email)
      .first<{ id: string; email: string; name: string | null }>();

    if (!sub) return json({ error: "not_found" }, 404);

    const token = randToken();
    const hash = await sha256(token);
    await env.DB.prepare(
      `INSERT INTO magic_links (id, subscriber_id, token_hash, expires_at, created_at)
       VALUES (?, ?, ?, datetime('now', '+${LINK_TTL_MIN} minutes'), datetime('now'))`
    )
      .bind(crypto.randomUUID(), sub.id, hash)
      .run();

    await sendLoginEmail(env, sub.email, sub.name, `${SITE}/api/auth/verify?token=${token}`);
    return json({ ok: true });
  }

  /* --- אימות קישור --- */
  if (url.pathname === "/api/auth/verify") {
    const token = url.searchParams.get("token") || "";
    if (!token) return Response.redirect(`${SITE}/members?login=invalid`, 302);

    const h = await sha256(token);
    const link = await env.DB.prepare(
      `SELECT id, subscriber_id FROM magic_links
       WHERE token_hash = ? AND used_at IS NULL AND expires_at > datetime('now')`
    )
      .bind(h)
      .first<{ id: string; subscriber_id: string }>();

    if (!link) return Response.redirect(`${SITE}/members?login=expired`, 302);

    const session = randToken();
    const sHash = await sha256(session);
    await env.DB.batch([
      env.DB.prepare("UPDATE magic_links SET used_at = datetime('now') WHERE id = ?").bind(link.id),
      env.DB.prepare(
        `INSERT INTO sessions (id, subscriber_id, session_hash, expires_at, created_at)
         VALUES (?, ?, ?, datetime('now', '+${SESSION_DAYS} days'), datetime('now'))`
      ).bind(crypto.randomUUID(), link.subscriber_id, sHash),
      env.DB.prepare("UPDATE subscribers SET last_login_at = datetime('now') WHERE id = ?").bind(
        link.subscriber_id
      ),
    ]);

    return new Response(null, {
      status: 302,
      headers: {
        Location: `${SITE}/members?login=ok`,
        "Set-Cookie": `${COOKIE}=${session}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=${
          SESSION_DAYS * 86400
        }`,
      },
    });
  }

  /* --- טופס קשר → contact_messages --- */
  if (url.pathname === "/api/contact" && req.method === "POST") {
    let body: {
      name?: string; email?: string; phone?: string;
      topics?: (string | undefined)[]; details?: string;
    } = {};
    try { body = (await req.json()) as typeof body; } catch {}
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().slice(0, 160);
    const phone = String(body.phone || "").trim().slice(0, 40);
    const topics = (body.topics || []).filter(Boolean).join(", ").slice(0, 300);
    const details = String(body.details || "").trim().slice(0, 4000);
    if (!name || (!email && !phone)) return json({ error: "missing_fields" }, 400);

    await env.DB.prepare(
      `INSERT INTO contact_messages (id, name, contact_info, message, source, raw_payload_json, status, created_at)
       VALUES (?, ?, ?, ?, 'tobymusic.club', ?, 'new', datetime('now'))`
    )
      .bind(
        crypto.randomUUID(),
        name,
        [email, phone].filter(Boolean).join(" | "),
        topics ? `[${topics}] ${details}` : details,
        JSON.stringify(body)
      )
      .run();

    // התראה לטובי — כשל בשליחה לא מפיל את הטופס
    try {
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "האתר tobymusic.club", email: "toby@tobybymusic.com" },
          to: [{ email: "tobyw.tobymusic@gmail.com" }],
          subject: `📩 פנייה חדשה מהאתר: ${name}`,
          htmlContent: `<div dir="rtl" style="font-family:Heebo,Arial,sans-serif;max-width:560px;margin:0 auto;">
            <div style="background:#0F0F12;border-radius:12px;padding:26px;color:#F5F1EA;">
              <h2 style="color:#FFE5A0;margin:0 0 14px;">פנייה חדשה מטופס הקשר ✨</h2>
              <p><b style="color:#C9A961;">שם:</b> ${name}</p>
              <p><b style="color:#C9A961;">יצירת קשר:</b> ${[email, phone].filter(Boolean).join(" | ")}</p>
              <p><b style="color:#C9A961;">נושאים:</b> ${topics || "—"}</p>
              <p><b style="color:#C9A961;">פירוט:</b><br/>${details.replace(/\n/g, "<br/>") || "—"}</p>
            </div>
          </div>`,
        }),
      });
    } catch {}

    return json({ ok: true });
  }

  /* --- ארכיון התפוצה — למנויות מחוברות בלבד --- */
  if (url.pathname === "/api/members/content") {
    const m = await currentMember(req, env);
    if (!m) return json({ error: "unauthorized" }, 401);

    const id = url.searchParams.get("id");
    const keys = [env.BREVO_API_KEY, env.BREVO_API_KEY_2].filter(Boolean);

    if (id) {
      // תוכן מלא של מייל אחד — מחפשים בשני החשבונות
      const [acct, cid] = id.split(":");
      const key = acct === "2" ? env.BREVO_API_KEY_2 : env.BREVO_API_KEY;
      const r = await fetch(`https://api.brevo.com/v3/emailCampaigns/${cid}`, {
        headers: { "api-key": key },
      });
      if (!r.ok) return json({ error: "not_found" }, 404);
      const c = (await r.json()) as { subject?: string; htmlContent?: string; sentDate?: string };
      return json({ subject: c.subject || "", html: c.htmlContent || "", sentDate: c.sentDate || "" });
    }

    // רשימת כל מה שנשלח, משני החשבונות
    const items: { id: string; subject: string; name: string; sentDate: string }[] = [];
    for (let i = 0; i < keys.length; i++) {
      const r = await fetch("https://api.brevo.com/v3/emailCampaigns?status=sent&limit=100", {
        headers: { "api-key": keys[i] },
      });
      if (!r.ok) continue;
      const d = (await r.json()) as {
        campaigns?: { id: number; subject?: string; name?: string; sentDate?: string }[];
      };
      for (const c of d.campaigns || []) {
        items.push({
          id: `${i + 1}:${c.id}`,
          subject: c.subject || c.name || "",
          name: c.name || "",
          sentDate: c.sentDate || "",
        });
      }
    }
    items.sort((a, b) => (b.sentDate > a.sentDate ? 1 : -1));
    return json({ items });
  }

  /* --- הרשמה לתפוצה — עם שכבת אימות: הצהרה + הקלטה קולית --- */
  if (url.pathname === "/api/join" && req.method === "POST") {
    let body: {
      name?: string; email?: string;
      declareWoman?: boolean; declareNoShare?: boolean;
      audio?: string; audioType?: string;
    } = {};
    try { body = (await req.json()) as typeof body; } catch {}
    const name = String(body.name || "").trim().slice(0, 120);
    const email = String(body.email || "").trim().toLowerCase().slice(0, 160);
    if (!email.includes("@")) return json({ ok: false, error: "bad_email" }, 400);
    if (!body.declareWoman || !body.declareNoShare)
      return json({ ok: false, error: "missing_declarations" }, 400);
    const audio = String(body.audio || "");
    if (!audio || audio.length < 2000)
      return json({ ok: false, error: "missing_audio" }, 400);
    if (audio.length > 600_000) return json({ ok: false, error: "audio_too_large" }, 400);
    const audioType = String(body.audioType || "audio/webm").slice(0, 60);

    // שמירת ראיית האימות ב-D1 (טבלה ייעודית)
    await env.DB.prepare(
      `CREATE TABLE IF NOT EXISTS join_verifications (
        id TEXT PRIMARY KEY, email TEXT, name TEXT,
        declared_woman INTEGER, declared_noshare INTEGER,
        audio_type TEXT, audio_b64 TEXT, created_at TEXT
      )`
    ).run();
    await env.DB.prepare(
      `INSERT INTO join_verifications (id, email, name, declared_woman, declared_noshare, audio_type, audio_b64, created_at)
       VALUES (?, ?, ?, 1, 1, ?, ?, datetime('now'))`
    )
      .bind(crypto.randomUUID(), email, name, audioType, audio)
      .run();

    // ההרשמה עצמה — דרך הוורקר הקיים (לוגיקה אחת)
    const r = await fetch("https://toby-mailing-list.w0504124161.workers.dev/subscribe_request", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ name, email, source: "tobymusic.club", newsletterOptIn: true }),
    });
    const data = (await r.json().catch(() => ({}))) as Record<string, unknown>;

    // מייל לטובי עם ההקלטה מצורפת — כשל כאן לא מפיל את ההרשמה
    try {
      const ext = audioType.includes("mp4") ? "m4a" : audioType.includes("ogg") ? "ogg" : "webm";
      await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: { "api-key": env.BREVO_API_KEY, "Content-Type": "application/json" },
        body: JSON.stringify({
          sender: { name: "האתר tobymusic.club", email: "toby@tobybymusic.com" },
          to: [{ email: "tobyw.tobymusic@gmail.com" }],
          subject: `🎙️ נרשמת חדשה עם אימות קולי: ${name || email}`,
          htmlContent: `<div dir="rtl" style="font-family:Heebo,Arial,sans-serif;">
            <h3>נרשמת חדשה מהאתר — עם הצהרה והקלטה</h3>
            <p><b>שם:</b> ${name || "—"}<br/><b>מייל:</b> ${email}</p>
            <p>✔ הצהירה שהיא אישה &nbsp; ✔ התחייבה שהתכנים לא יועברו הלאה</p>
            <p>ההקלטה הקולית מצורפת למייל זה. עותק נשמר גם במסד הנתונים.</p>
          </div>`,
          attachment: [{ name: `verification-${Date.now()}.${ext}`, content: audio }],
        }),
      });
    } catch {}

    return json(data, r.status);
  }

  /* --- יומן הופעות ציבורי מאיירטייבל (רק "פרסום באתר" מסומן) --- */
  if (url.pathname === "/api/events") {
    const cache = caches.default;
    const cacheKey = new Request("https://tobymusic.club/api/events");
    const cached = await cache.match(cacheKey);
    if (cached) return cached;

    const params = new URLSearchParams({
      filterByFormula:
        "AND({פרסום באתר}, IS_AFTER({תאריך}, DATEADD(TODAY(), -1, 'days')))",
      "sort[0][field]": "תאריך",
      "sort[0][direction]": "asc",
      maxRecords: "6",
    });
    const r = await fetch(
      `https://api.airtable.com/v0/apptvmUSGj4vP21jU/tblRuNuG95AW3TNsu?${params}`,
      { headers: { Authorization: `Bearer ${env.AIRTABLE_TOKEN}` } }
    );
    if (!r.ok) return json({ events: [] });
    const data = (await r.json()) as {
      records: { fields: Record<string, unknown> }[];
    };
    const events = data.records.map((rec) => {
      const f = rec.fields;
      const dateStr = String(f["תאריך"] || "");
      let dateHe = "";
      if (dateStr) {
        const d = new Date(dateStr + "T00:00:00");
        dateHe = d.toLocaleDateString("he-IL", { day: "numeric", month: "long", year: "numeric" });
      }
      return {
        title: String(f["כותרת לאתר"] || f["שם האירוע"] || ""),
        date: dateHe,
        time: String(f["שעה"] || ""),
        place: String(f["מיקום לאתר"] || ""),
        text: String(f["תיאור לאתר"] || ""),
      };
    });
    const res = json({ events }, 200, { "Cache-Control": "public, max-age=600" });
    await cache.put(cacheKey, res.clone());
    return res;
  }

  /* --- יציאה --- */
  if (url.pathname === "/api/auth/logout" && req.method === "POST") {
    const m = await currentMember(req, env);
    if (m) {
      await env.DB.prepare("UPDATE sessions SET revoked_at = datetime('now') WHERE id = ?")
        .bind(m.session_id)
        .run();
    }
    return json(
      { ok: true },
      200,
      { "Set-Cookie": `${COOKIE}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0` }
    );
  }

  return json({ error: "not_found" }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname.startsWith("/api/")) {
      try {
        return await handleApi(request, env, url);
      } catch (e) {
        return json({ error: "server_error", message: String(e) }, 500);
      }
    }
    return env.ASSETS.fetch(request);
  },
};
