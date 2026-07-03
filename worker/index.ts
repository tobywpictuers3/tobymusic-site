/**
 * TOBY music — site worker
 * מגיש את קבצי האתר + נקודות API לאזור המנויות.
 * חיבור D1 (magic links) יופעל בשלב ב׳ — לאחר אישור טובי.
 */
export interface Env {
  ASSETS: Fetcher;
  // DB?: D1Database; // שלב ב׳: binding ל-toby-mailing-list D1
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/api/")) {
      // שלב ב׳: כאן ייכנסו request-link / verify / me / content מול D1 + Brevo
      if (url.pathname === "/api/me") {
        return Response.json({ member: false });
      }
      return new Response(
        JSON.stringify({ error: "not_configured", message: "החיבור לאזור המנויות יופעל בשלב הבא" }),
        { status: 503, headers: { "Content-Type": "application/json" } }
      );
    }

    return env.ASSETS.fetch(request);
  },
};
