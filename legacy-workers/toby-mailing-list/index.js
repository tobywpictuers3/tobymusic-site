--544c8fa5534493c186719631824781b00278e6aff62c538c8650f96f73b6
Content-Disposition: form-data; name="worker_v4.js"

var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// worker_v4.js
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
var __defProp22 = Object.defineProperty;
var __name22 = /* @__PURE__ */ __name2((target, value) => __defProp22(target, "name", { value, configurable: true }), "__name");
var LOGO_URL = "https://raw.githubusercontent.com/tobywpictuers3/the-music-dd01e777/main/src/assets/logo-white.png";
function getSiteOrigin(env) {
  try {
    return new URL(env.SITE_BASE_URL).origin;
  } catch {
    return "";
  }
}
__name(getSiteOrigin, "getSiteOrigin");
__name2(getSiteOrigin, "getSiteOrigin");
__name22(getSiteOrigin, "getSiteOrigin");
function buildCorsHeaders(request, env) {
  const siteOrigin = getSiteOrigin(env);
  const requestOrigin = request.headers.get("Origin") || "";
  const allowOrigin = requestOrigin && requestOrigin === siteOrigin ? requestOrigin : siteOrigin || "*";
  return {
    "access-control-allow-origin": allowOrigin,
    "access-control-allow-methods": "GET,POST,OPTIONS",
    "access-control-allow-headers": "Content-Type, Authorization, X-Admin-Secret, tally-signature",
    "access-control-allow-credentials": "true",
    vary: "Origin"
  };
}
__name(buildCorsHeaders, "buildCorsHeaders");
__name2(buildCorsHeaders, "buildCorsHeaders");
__name22(buildCorsHeaders, "buildCorsHeaders");
function json(request, env, data, status = 200, extraHeaders = {}) {
  return new Response(JSON.stringify(data, null, 2), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      ...buildCorsHeaders(request, env),
      ...extraHeaders
    }
  });
}
__name(json, "json");
__name2(json, "json");
__name22(json, "json");
function html(body, status = 200, extraHeaders = {}) {
  return new Response(body, {
    status,
    headers: {
      "content-type": "text/html; charset=utf-8",
      ...extraHeaders
    }
  });
}
__name(html, "html");
__name2(html, "html");
__name22(html, "html");
function redirect(location, extraHeaders = {}) {
  return new Response(null, {
    status: 302,
    headers: {
      Location: location,
      ...extraHeaders
    }
  });
}
__name(redirect, "redirect");
__name2(redirect, "redirect");
__name22(redirect, "redirect");
function noContent(request, env) {
  return new Response(null, {
    status: 204,
    headers: buildCorsHeaders(request, env)
  });
}
__name(noContent, "noContent");
__name2(noContent, "noContent");
__name22(noContent, "noContent");
function getMissingSecrets(env) {
  const required = [
    "GMAIL_CLIENT_ID",
    "GMAIL_CLIENT_SECRET",
    "GMAIL_REFRESH_TOKEN",
    "GMAIL_USER",
    "MAGIC_LINK_SECRET",
    "ADMIN_ACTION_SECRET",
    "SITE_BASE_URL",
    "COOKIE_SECRET",
    "BREVO_API_KEY",
    "BREVO_LIST_NAME"
  ];
  return required.filter((key) => !env[key] || !String(env[key]).trim());
}
__name(getMissingSecrets, "getMissingSecrets");
__name2(getMissingSecrets, "getMissingSecrets");
__name22(getMissingSecrets, "getMissingSecrets");
function normalizeEmail(value) {
  return (value || "").trim().toLowerCase();
}
__name(normalizeEmail, "normalizeEmail");
__name2(normalizeEmail, "normalizeEmail");
__name22(normalizeEmail, "normalizeEmail");
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
__name(isValidEmail, "isValidEmail");
__name2(isValidEmail, "isValidEmail");
__name22(isValidEmail, "isValidEmail");
function getAdminSecretFromRequest(request) {
  return (request.headers.get("x-admin-secret") || request.headers.get("X-Admin-Secret") || "").trim();
}
__name(getAdminSecretFromRequest, "getAdminSecretFromRequest");
__name2(getAdminSecretFromRequest, "getAdminSecretFromRequest");
__name22(getAdminSecretFromRequest, "getAdminSecretFromRequest");
function isAuthorizedAdmin(request, env) {
  const incoming = getAdminSecretFromRequest(request);
  const expected = (env.ADMIN_ACTION_SECRET || "").trim();
  return !!incoming && !!expected && incoming === expected;
}
__name(isAuthorizedAdmin, "isAuthorizedAdmin");
__name2(isAuthorizedAdmin, "isAuthorizedAdmin");
__name22(isAuthorizedAdmin, "isAuthorizedAdmin");
async function readJson(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}
__name(readJson, "readJson");
__name2(readJson, "readJson");
__name22(readJson, "readJson");
function escapeHtml(value) {
  return String(value || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
__name(escapeHtml, "escapeHtml");
__name2(escapeHtml, "escapeHtml");
__name22(escapeHtml, "escapeHtml");
function bytesToBase64Url(bytes) {
  let binary = "";
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}
__name(bytesToBase64Url, "bytesToBase64Url");
__name2(bytesToBase64Url, "bytesToBase64Url");
__name22(bytesToBase64Url, "bytesToBase64Url");
function textToBase64Url(text) {
  return bytesToBase64Url(new TextEncoder().encode(text));
}
__name(textToBase64Url, "textToBase64Url");
__name2(textToBase64Url, "textToBase64Url");
__name22(textToBase64Url, "textToBase64Url");
function bytesToHex(bytes) {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, "0")).join("");
}
__name(bytesToHex, "bytesToHex");
__name2(bytesToHex, "bytesToHex");
__name22(bytesToHex, "bytesToHex");
function errorMessage(error, fallback) {
  return error instanceof Error ? error.message : fallback;
}
__name(errorMessage, "errorMessage");
__name2(errorMessage, "errorMessage");
__name22(errorMessage, "errorMessage");
function randomToken(byteLength = 32) {
  const bytes = new Uint8Array(byteLength);
  crypto.getRandomValues(bytes);
  return bytesToBase64Url(bytes);
}
__name(randomToken, "randomToken");
__name2(randomToken, "randomToken");
__name22(randomToken, "randomToken");
function addMinutesIso(minutes) {
  return new Date(Date.now() + minutes * 60 * 1e3).toISOString();
}
__name(addMinutesIso, "addMinutesIso");
__name2(addMinutesIso, "addMinutesIso");
__name22(addMinutesIso, "addMinutesIso");
function addDaysIso(days) {
  return new Date(Date.now() + days * 24 * 60 * 60 * 1e3).toISOString();
}
__name(addDaysIso, "addDaysIso");
__name2(addDaysIso, "addDaysIso");
__name22(addDaysIso, "addDaysIso");
function getCookie(request, name) {
  const cookieHeader = request.headers.get("Cookie") || "";
  const parts = cookieHeader.split(";").map((part) => part.trim());
  for (const part of parts) {
    const index = part.indexOf("=");
    if (index === -1) continue;
    const key = part.slice(0, index).trim();
    const value = part.slice(index + 1).trim();
    if (key === name) {
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    }
  }
  return "";
}
__name(getCookie, "getCookie");
__name2(getCookie, "getCookie");
__name22(getCookie, "getCookie");
function buildSessionCookie(token, maxAgeSeconds) {
  return [
    `toby_session=${encodeURIComponent(token)}`,
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=None",
    `Max-Age=${maxAgeSeconds}`
  ].join("; ");
}
__name(buildSessionCookie, "buildSessionCookie");
__name2(buildSessionCookie, "buildSessionCookie");
__name22(buildSessionCookie, "buildSessionCookie");
function clearSessionCookie() {
  return [
    "toby_session=",
    "Path=/",
    "HttpOnly",
    "Secure",
    "SameSite=None",
    "Max-Age=0"
  ].join("; ");
}
__name(clearSessionCookie, "clearSessionCookie");
__name2(clearSessionCookie, "clearSessionCookie");
__name22(clearSessionCookie, "clearSessionCookie");
async function sha256Hex(text) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(text)
  );
  return bytesToHex(new Uint8Array(digest));
}
__name(sha256Hex, "sha256Hex");
__name2(sha256Hex, "sha256Hex");
__name22(sha256Hex, "sha256Hex");
async function sessionHash(env, token) {
  return sha256Hex(`session:${token}:${env.COOKIE_SECRET}`);
}
__name(sessionHash, "sessionHash");
__name2(sessionHash, "sessionHash");
__name22(sessionHash, "sessionHash");
async function magicLinkHash(env, token) {
  return sha256Hex(`magic:${token}:${env.MAGIC_LINK_SECRET}`);
}
__name(magicLinkHash, "magicLinkHash");
__name2(magicLinkHash, "magicLinkHash");
__name22(magicLinkHash, "magicLinkHash");
async function hmacHex(secret, message) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(message)
  );
  return bytesToHex(new Uint8Array(signature));
}
__name(hmacHex, "hmacHex");
__name2(hmacHex, "hmacHex");
__name22(hmacHex, "hmacHex");
async function hmacBase64(secret, messageBytes) {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(secret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const signature = await crypto.subtle.sign("HMAC", key, messageBytes);
  let binary = "";
  const bytes = new Uint8Array(signature);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}
__name(hmacBase64, "hmacBase64");
__name2(hmacBase64, "hmacBase64");
__name22(hmacBase64, "hmacBase64");
async function buildAdminActionUrl(origin, action, email, env) {
  const ts = String(Date.now());
  const payload = `${action}|${email}|${ts}`;
  const sig = await hmacHex(env.ADMIN_ACTION_SECRET, payload);
  return `${origin}/admin_action?action=${encodeURIComponent(
    action
  )}&email=${encodeURIComponent(email)}&ts=${encodeURIComponent(
    ts
  )}&sig=${encodeURIComponent(sig)}`;
}
__name(buildAdminActionUrl, "buildAdminActionUrl");
__name2(buildAdminActionUrl, "buildAdminActionUrl");
__name22(buildAdminActionUrl, "buildAdminActionUrl");
async function brevoRequest(env, path, options = {}) {
  const apiKey = options.apiKey || env.BREVO_API_KEY;
  const response = await fetch(`https://api.brevo.com/v3${path}`, {
    method: options.method || "GET",
    headers: {
      "api-key": apiKey,
      "content-type": "application/json",
      ...options.headers || {}
    },
    body: options.body ? JSON.stringify(options.body) : void 0
  });
  const text = await response.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text || null;
  }
  if (!response.ok) {
    throw new Error(
      `brevo_request_failed:${response.status}:${typeof data === "string" ? data : JSON.stringify(data)}`
    );
  }
  return data;
}
__name(brevoRequest, "brevoRequest");
__name2(brevoRequest, "brevoRequest");
__name22(brevoRequest, "brevoRequest");
function getBrevoConfig(env, createdAt) {
  const cutoff = /* @__PURE__ */ new Date("2026-06-28T21:00:00Z");
  const regDate = createdAt ? new Date(createdAt) : /* @__PURE__ */ new Date();
  const useAccount2 = regDate >= cutoff;
  return {
    apiKey: useAccount2 ? env.BREVO_API_KEY_2 : env.BREVO_API_KEY,
    listId: useAccount2 ? 3 : 4,
    t7TemplateId: useAccount2 ? 1 : 7,
    t8TemplateId: useAccount2 ? 2 : 8,
    t9TemplateId: useAccount2 ? 3 : 32,
    t8ListId: useAccount2 ? 5 : 33,
    t9ListId: useAccount2 ? 6 : 34,
    senderEmail: "toby@tobybymusic.com",
    // אחיד בשני החשבונות
    senderName: "\u05D8\u05D5\u05D1\u05D9 \u05D5\u05D9\u05E0\u05D1\u05E8\u05D2 | TOBY music"
  };
}
__name(getBrevoConfig, "getBrevoConfig");
__name2(getBrevoConfig, "getBrevoConfig");
async function getBrevoApprovedListId(env) {
  const data = await brevoRequest(env, "/contacts/lists?limit=50&sort=desc");
  const list = (data?.lists || []).find(
    (item) => item.name === env.BREVO_LIST_NAME
  );
  if (!list?.id) {
    throw new Error("brevo_list_not_found");
  }
  return list.id;
}
__name(getBrevoApprovedListId, "getBrevoApprovedListId");
__name2(getBrevoApprovedListId, "getBrevoApprovedListId");
__name22(getBrevoApprovedListId, "getBrevoApprovedListId");
async function syncApprovedSubscriberToBrevo(env, email, name, createdAt) {
  const brevoConf = getBrevoConfig(env, createdAt);
  const listId = brevoConf.listId;
  const parts = (name || "").trim().split(" ");
  const firstName = parts[0] || "";
  const lastName = parts.slice(1).join(" ") || "";
  await brevoRequest(env, "/contacts", {
    method: "POST",
    apiKey: brevoConf.apiKey,
    body: {
      email,
      listIds: [listId],
      updateEnabled: true,
      emailBlacklisted: false,
      attributes: { FIRSTNAME: firstName, LASTNAME: lastName }
    }
  });
}
__name(syncApprovedSubscriberToBrevo, "syncApprovedSubscriberToBrevo");
__name2(syncApprovedSubscriberToBrevo, "syncApprovedSubscriberToBrevo");
__name22(syncApprovedSubscriberToBrevo, "syncApprovedSubscriberToBrevo");
async function syncSubscriberToAirtable(env, email, name, createdAt, brevoAccount) {
  const AT_TOKEN = "patXNqbxy2uPpwzXn.0cadfe2b1f32b01fc691dfa6d501db8a9bdcc150004cb1eb11aa44048b42ec03";
  const BASE = "appL485Q3pKnZixHw";
  const TABLE = "tbldzrYfboGgHaXKP";
  const CUTOFF = "2026-06-29";
  const joinDate = createdAt ? createdAt.slice(0, 10) : (/* @__PURE__ */ new Date()).toISOString().slice(0, 10);
  const account = brevoAccount || (joinDate >= CUTOFF ? 2 : 1);
  const payload = {
    fields: {
      "\u05DE\u05D9\u05D9\u05DC": email,
      "\u05E9\u05DD": name || "",
      "\u05E1\u05D8\u05D8\u05D5\u05E1": "approved",
      "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA": joinDate,
      "brevo_account": account,
      "newsletter_opt_in": true
    }
  };
  const searchUrl = `https://api.airtable.com/v0/${BASE}/${TABLE}?filterByFormula=` + encodeURIComponent(`{\u05DE\u05D9\u05D9\u05DC}="${email}"`);
  try {
    const searchRes = await fetch(searchUrl, {
      headers: { "Authorization": `Bearer ${AT_TOKEN}` }
    });
    const searchData = await searchRes.json();
    if (searchData.records && searchData.records.length > 0) {
      const recordId = searchData.records[0].id;
      await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}/${recordId}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${AT_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ fields: payload.fields })
      });
    } else {
      await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
        method: "POST",
        headers: { "Authorization": `Bearer ${AT_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    }
  } catch (e) {
    console.error("airtable_sync_failed:", e.message);
  }
}
__name(syncSubscriberToAirtable, "syncSubscriberToAirtable");
__name2(syncSubscriberToAirtable, "syncSubscriberToAirtable");
async function removeSubscriberFromBrevo(env, email, createdAt) {
  const brevoConf = getBrevoConfig(env, createdAt || null);
  const listId = brevoConf.listId;
  try {
    await brevoRequest(env, `/contacts/lists/${listId}/contacts/remove`, {
      method: "POST",
      apiKey: brevoConf.apiKey,
      body: { emails: [email] }
    });
  } catch (error) {
    const message = errorMessage(error, "brevo_remove_failed");
    if (message.includes("404") || message.includes("document_not_found") || message.includes("contact_not_found")) {
      return;
    }
    throw error;
  }
}
__name(removeSubscriberFromBrevo, "removeSubscriberFromBrevo");
__name2(removeSubscriberFromBrevo, "removeSubscriberFromBrevo");
__name22(removeSubscriberFromBrevo, "removeSubscriberFromBrevo");
async function getGmailAccessToken(env) {
  const body = new URLSearchParams({
    client_id: env.GMAIL_CLIENT_ID,
    client_secret: env.GMAIL_CLIENT_SECRET,
    refresh_token: env.GMAIL_REFRESH_TOKEN,
    grant_type: "refresh_token"
  });
  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body
  });
  const data = await response.json();
  if (!response.ok || !data.access_token) {
    throw new Error(`gmail_token_failed: ${JSON.stringify(data)}`);
  }
  return data.access_token;
}
__name(getGmailAccessToken, "getGmailAccessToken");
__name2(getGmailAccessToken, "getGmailAccessToken");
__name22(getGmailAccessToken, "getGmailAccessToken");
function encodeMimeHeader(value) {
  const bytes = new TextEncoder().encode(String(value || ""));
  let binary = "";
  const chunkSize = 32768;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    binary += String.fromCharCode(...bytes.subarray(i, i + chunkSize));
  }
  const base64 = btoa(binary);
  return `=?UTF-8?B?${base64}?=`;
}
__name(encodeMimeHeader, "encodeMimeHeader");
__name2(encodeMimeHeader, "encodeMimeHeader");
__name22(encodeMimeHeader, "encodeMimeHeader");
async function sendGmailMessage(env, accessToken, { to, subject, htmlBody, replyTo }) {
  const mime = [
    `From: ${env.GMAIL_USER}`,
    `To: ${to}`,
    replyTo ? `Reply-To: ${replyTo}` : "",
    `Subject: ${encodeMimeHeader(subject)}`,
    "MIME-Version: 1.0",
    'Content-Type: text/html; charset="UTF-8"',
    "Content-Transfer-Encoding: 8bit",
    "",
    htmlBody
  ].filter(Boolean).join("\r\n");
  const raw = textToBase64Url(mime);
  const response = await fetch(
    "https://gmail.googleapis.com/gmail/v1/users/me/messages/send",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "content-type": "application/json"
      },
      body: JSON.stringify({ raw })
    }
  );
  const data = await response.json();
  if (!response.ok) {
    throw new Error(`gmail_send_failed: ${JSON.stringify(data)}`);
  }
  return data;
}
__name(sendGmailMessage, "sendGmailMessage");
__name2(sendGmailMessage, "sendGmailMessage");
__name22(sendGmailMessage, "sendGmailMessage");
async function createMagicLink(env, workerOrigin, subscriberId, email) {
  const token = randomToken(32);
  const tokenHash = await magicLinkHash(env, token);
  const expiresAt = addMinutesIso(60);
  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO magic_links (id, subscriber_id, token_hash, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(id, subscriberId, tokenHash, expiresAt, (/* @__PURE__ */ new Date()).toISOString()).run();
  const url = `${workerOrigin}/verify_magic_link?token=${encodeURIComponent(token)}`;
  return { id, token, tokenHash, expiresAt, url, email };
}
__name(createMagicLink, "createMagicLink");
__name2(createMagicLink, "createMagicLink");
__name22(createMagicLink, "createMagicLink");
async function createSession(env, subscriberId) {
  const token = randomToken(32);
  const hash = await sessionHash(env, token);
  const expiresAt = addDaysIso(30);
  const id = crypto.randomUUID();
  await env.DB.prepare(
    `INSERT INTO sessions (id, subscriber_id, session_hash, expires_at, created_at)
     VALUES (?, ?, ?, ?, ?)`
  ).bind(id, subscriberId, hash, expiresAt, (/* @__PURE__ */ new Date()).toISOString()).run();
  return { id, token, expiresAt, maxAgeSeconds: 30 * 24 * 60 * 60 };
}
__name(createSession, "createSession");
__name2(createSession, "createSession");
__name22(createSession, "createSession");
async function getSessionSubscriber(request, env) {
  const token = getCookie(request, "toby_session");
  if (!token) return null;
  const hash = await sessionHash(env, token);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const row = await env.DB.prepare(
    `SELECT sessions.id AS session_id, sessions.subscriber_id AS subscriber_id,
        subscribers.email AS email, subscribers.name AS name, subscribers.status AS status,
        subscribers.source AS source, subscribers.newsletter_opt_in AS newsletter_opt_in,
        subscribers.created_at AS created_at, subscribers.approved_at AS approved_at,
        subscribers.blocked_at AS blocked_at, subscribers.last_login_at AS last_login_at
     FROM sessions JOIN subscribers ON subscribers.id = sessions.subscriber_id
     WHERE sessions.session_hash = ? AND sessions.revoked_at IS NULL AND sessions.expires_at > ?
     LIMIT 1`
  ).bind(hash, now).first();
  if (!row || row.status !== "approved") return null;
  return row;
}
__name(getSessionSubscriber, "getSessionSubscriber");
__name2(getSessionSubscriber, "getSessionSubscriber");
__name22(getSessionSubscriber, "getSessionSubscriber");
async function revokeSessionByToken(request, env) {
  const token = getCookie(request, "toby_session");
  if (!token) return;
  const hash = await sessionHash(env, token);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE sessions SET revoked_at = ? WHERE session_hash = ? AND revoked_at IS NULL`
  ).bind(now, hash).run();
}
__name(revokeSessionByToken, "revokeSessionByToken");
__name2(revokeSessionByToken, "revokeSessionByToken");
__name22(revokeSessionByToken, "revokeSessionByToken");
async function revokeAllSubscriberSessions(env, subscriberId) {
  const now = (/* @__PURE__ */ new Date()).toISOString();
  await env.DB.prepare(
    `UPDATE sessions SET revoked_at = ? WHERE subscriber_id = ? AND revoked_at IS NULL`
  ).bind(now, subscriberId).run();
}
__name(revokeAllSubscriberSessions, "revokeAllSubscriberSessions");
__name2(revokeAllSubscriberSessions, "revokeAllSubscriberSessions");
__name22(revokeAllSubscriberSessions, "revokeAllSubscriberSessions");
function brandedEmailWrapper(title, contentHtml, ctaButton = null) {
  return `
<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><title>${escapeHtml(title)}</title></head>
<body style="margin:0;padding:0;background:#0F0F12;font-family:'Heebo',Arial,sans-serif;direction:rtl;">
  <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="background:#0F0F12;padding:40px 20px;">
    <tr><td align="center">
      <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="600" style="max-width:600px;background:#0F0F12;border:1px solid #6B1F2A;border-radius:12px;">
        <tr><td style="padding:32px 32px 16px;text-align:center;">
          <img src="${LOGO_URL}" alt="TOBY music" width="180" height="auto" style="display:block;margin:0 auto 16px auto;max-width:180px;height:auto;border:0;" />
          <div style="font-family:'Frank Ruhl Libre',Georgia,serif;font-size:32px;color:#FFE5A0;letter-spacing:2px;">TOBY <span style="color:#6B1F2A;">music</span></div>
          <div style="font-size:13px;color:#C9A961;margin-top:8px;font-style:italic;">\u05D0\u05D5\u05DE\u05E0\u05D5\u05EA \u05D5\u05D0\u05DE\u05D9\u05E0\u05D5\u05EA, \u05D6\u05D5 \u05D9\u05E6\u05D9\u05E8\u05D4 \u2728</div>
        </td></tr>
        <tr><td style="padding:0 32px;"><div style="height:1px;background:linear-gradient(110deg, #6B1F2A 0%, #8B2A37 20%, #C9A961 45%, #FFE5A0 55%, #C9A961 65%, #8B2A37 80%, #6B1F2A 100%);"></div></td></tr>
        <tr><td style="padding:24px 32px;color:#F5F1EA;font-size:16px;line-height:1.8;">
          <h2 style="font-family:'Frank Ruhl Libre',Georgia,serif;color:#FFE5A0;font-size:24px;margin:0 0 16px;font-weight:normal;">${escapeHtml(title)}</h2>
          ${contentHtml}
          ${ctaButton || ""}
        </td></tr>
        <tr><td style="padding:16px 32px 32px;text-align:center;color:#C9A961;font-size:12px;border-top:1px solid #6B1F2A;margin-top:24px;">
          <div style="padding-top:16px;">TOBY music \xB7 \u05D8\u05D5\u05D1\u05D9 \u05D5\u05D9\u05E0\u05D1\u05E8\u05D2 \xB7 050-412-4161</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;
}
__name(brandedEmailWrapper, "brandedEmailWrapper");
__name2(brandedEmailWrapper, "brandedEmailWrapper");
__name22(brandedEmailWrapper, "brandedEmailWrapper");
function brandedButton(url, text) {
  return `<div style="text-align:center;margin:24px 0;">
    <a href="${url}" style="display:inline-block;padding:14px 28px;background:#6B1F2A;color:#FFE5A0;text-decoration:none;border-radius:8px;font-weight:bold;font-size:16px;">${escapeHtml(text)}</a>
  </div>`;
}
__name(brandedButton, "brandedButton");
__name2(brandedButton, "brandedButton");
__name22(brandedButton, "brandedButton");
async function sendAdminSignupEmail(env, workerOrigin, subscriber) {
  const approveUrl = await buildAdminActionUrl(workerOrigin, "approve", subscriber.email, env);
  const blockUrl = await buildAdminActionUrl(workerOrigin, "block", subscriber.email, env);
  const htmlBody = brandedEmailWrapper(
    "\u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05EA\u05E4\u05D5\u05E6\u05D4 \u2728",
    `<p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(subscriber.email)}</p>
     <p><strong style="color:#C9A961;">\u05E9\u05DD:</strong> ${escapeHtml(subscriber.name || "")}</p>
     <p><strong style="color:#C9A961;">\u05DE\u05E7\u05D5\u05E8:</strong> ${escapeHtml(subscriber.source || "")}</p>
     <p><strong style="color:#C9A961;">\u05E1\u05D8\u05D8\u05D5\u05E1:</strong> \u05DE\u05DE\u05EA\u05D9\u05E0\u05D4 \u05DC\u05D0\u05D9\u05E9\u05D5\u05E8</p>
     <div style="text-align:center;margin:24px 0;">
       <a href="${approveUrl}" style="display:inline-block;padding:12px 24px;background:#0f766e;color:#fff;text-decoration:none;border-radius:8px;margin:4px;">\u2713 \u05D0\u05E9\u05E8</a>
       <a href="${blockUrl}" style="display:inline-block;padding:12px 24px;background:#b91c1c;color:#fff;text-decoration:none;border-radius:8px;margin:4px;">\u2715 \u05D7\u05E1\u05D5\u05DD</a>
     </div>`
  );
  const accessToken = await getGmailAccessToken(env);
  return await sendGmailMessage(env, accessToken, {
    to: env.GMAIL_USER,
    subject: `\u{1F4E7} \u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4: ${subscriber.email}`,
    htmlBody,
    replyTo: subscriber.email
  });
}
__name(sendAdminSignupEmail, "sendAdminSignupEmail");
__name2(sendAdminSignupEmail, "sendAdminSignupEmail");
__name22(sendAdminSignupEmail, "sendAdminSignupEmail");
async function sendPendingSubscriberEmail(env, subscriber) {
  const htmlBody = brandedEmailWrapper(
    "\u05D4\u05D4\u05E8\u05E9\u05DE\u05D4 \u05E9\u05DC\u05DA \u05D4\u05EA\u05E7\u05D1\u05DC\u05D4",
    `<p>\u05E9\u05DE\u05D7\u05D4 \u05E9\u05D4\u05D2\u05E2\u05EA \u05D0\u05DC\u05D9\u05E0\u05D5 \u2728</p>
     <p>\u05D4\u05D1\u05E7\u05E9\u05D4 \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05EA\u05E4\u05D5\u05E6\u05D4 \u05D4\u05EA\u05E7\u05D1\u05DC\u05D4 \u05D5\u05DE\u05D7\u05DB\u05D4 \u05DC\u05D0\u05D9\u05E9\u05D5\u05E8.</p>
     <p>\u05EA\u05D5\u05DA \u05D6\u05DE\u05DF \u05E7\u05E6\u05E8 \u05EA\u05E7\u05D1\u05DC\u05D9 \u05DE\u05D9\u05D9\u05DC \u05DB\u05E0\u05D9\u05E1\u05D4.</p>`
  );
  const accessToken = await getGmailAccessToken(env);
  return await sendGmailMessage(env, accessToken, {
    to: subscriber.email,
    subject: "\u05D4\u05D4\u05E8\u05E9\u05DE\u05D4 \u05D4\u05EA\u05E7\u05D1\u05DC\u05D4 \xB7 TOBY music",
    htmlBody
  });
}
__name(sendPendingSubscriberEmail, "sendPendingSubscriberEmail");
__name2(sendPendingSubscriberEmail, "sendPendingSubscriberEmail");
__name22(sendPendingSubscriberEmail, "sendPendingSubscriberEmail");
async function sendMagicLinkEmail(env, workerOrigin, subscriber) {
  const magic = await createMagicLink(env, workerOrigin, subscriber.id, subscriber.email);
  const htmlBody = brandedEmailWrapper(
    "\u05D4\u05DB\u05E0\u05D9\u05E1\u05D4 \u05E9\u05DC\u05DA \u05DE\u05D5\u05DB\u05E0\u05D4 \u2728",
    `<p>\u05DC\u05D7\u05E6\u05D9 \u05E2\u05DC \u05D4\u05DB\u05E4\u05EA\u05D5\u05E8 \u05DB\u05D3\u05D9 \u05DC\u05D4\u05D9\u05DB\u05E0\u05E1 \u05DC\u05D0\u05D6\u05D5\u05E8 \u05D4\u05DE\u05E0\u05D5\u05D9\u05D5\u05EA.</p>
     <p style="font-size:13px;color:#C9A961;">\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05EA\u05E7\u05E3 \u05DC\u05E9\u05E2\u05D4 \u05D0\u05D7\u05EA \u05D1\u05DC\u05D1\u05D3.</p>`,
    brandedButton(magic.url, "\u2728 \u05DB\u05E0\u05D9\u05E1\u05D4 \u05DC\u05DE\u05E0\u05D5\u05D9\u05D5\u05EA")
  );
  const accessToken = await getGmailAccessToken(env);
  await sendGmailMessage(env, accessToken, {
    to: subscriber.email,
    subject: "\u05E7\u05D9\u05E9\u05D5\u05E8 \u05DB\u05E0\u05D9\u05E1\u05D4 \xB7 TOBY music \u2728",
    htmlBody
  });
  return magic;
}
__name(sendMagicLinkEmail, "sendMagicLinkEmail");
__name2(sendMagicLinkEmail, "sendMagicLinkEmail");
__name22(sendMagicLinkEmail, "sendMagicLinkEmail");
async function sendApprovedSubscriberEmail(env, workerOrigin, subscriber) {
  const magic = await createMagicLink(env, workerOrigin, subscriber.id, subscriber.email);
  const htmlBody = brandedEmailWrapper(
    "\u05D1\u05E8\u05D5\u05DB\u05D4 \u05D4\u05D1\u05D0\u05D4 \u2728",
    `<p>\u05D4\u05D4\u05E8\u05E9\u05DE\u05D4 \u05E9\u05DC\u05DA \u05D0\u05D5\u05E9\u05E8\u05D4 \u05D5\u05D0\u05EA \u05DE\u05E6\u05D5\u05E8\u05E4\u05EA \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05EA\u05E4\u05D5\u05E6\u05D4.</p>
     <p>\u05D0\u05E4\u05E9\u05E8 \u05DC\u05D4\u05D9\u05DB\u05E0\u05E1 \u05DC\u05D0\u05D6\u05D5\u05E8 \u05D4\u05DE\u05E0\u05D5\u05D9\u05D5\u05EA \u05D5\u05DC\u05D2\u05DC\u05D5\u05EA \u05D9\u05E6\u05D9\u05E8\u05D5\u05EA \u05D7\u05D3\u05E9\u05D5\u05EA:</p>
     <p style="font-size:13px;color:#C9A961;">\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05EA\u05E7\u05E3 \u05DC\u05E9\u05E2\u05D4 \u05D0\u05D7\u05EA \u05D1\u05DC\u05D1\u05D3.</p>`,
    brandedButton(magic.url, "\u2728 \u05DB\u05E0\u05D9\u05E1\u05D4 \u05DC\u05DE\u05E0\u05D5\u05D9\u05D5\u05EA")
  );
  const accessToken = await getGmailAccessToken(env);
  await sendGmailMessage(env, accessToken, {
    to: subscriber.email,
    subject: "\u05D0\u05D5\u05E9\u05E8\u05EA \u2728 \xB7 TOBY music",
    htmlBody
  });
  return magic;
}
__name(sendApprovedSubscriberEmail, "sendApprovedSubscriberEmail");
__name2(sendApprovedSubscriberEmail, "sendApprovedSubscriberEmail");
__name22(sendApprovedSubscriberEmail, "sendApprovedSubscriberEmail");
function tallyField(fields, ...possibleLabels) {
  if (!Array.isArray(fields)) return null;
  for (const label of possibleLabels) {
    const labelNorm = String(label || "").trim().toLowerCase();
    const field = fields.find((f) => {
      const flabel = String(f.label || f.title || "").trim().toLowerCase();
      return flabel === labelNorm || flabel.includes(labelNorm);
    });
    if (field) {
      if (field.value !== void 0 && field.value !== null) {
        if (Array.isArray(field.value)) {
          if (field.options && Array.isArray(field.options)) {
            const selected = field.options.filter((opt) => field.value.includes(opt.id)).map((opt) => opt.text);
            return selected.join(", ");
          }
          return field.value.join(", ");
        }
        if (typeof field.value === "object") {
          if (field.value.url) return field.value.url;
          if (field.value.text) return field.value.text;
          return JSON.stringify(field.value);
        }
        return String(field.value);
      }
    }
  }
  return null;
}
__name(tallyField, "tallyField");
__name2(tallyField, "tallyField");
__name22(tallyField, "tallyField");
async function verifyTallySignature(request, env, rawBody) {
  const signingSecret = env.TALLY_SIGNING_SECRET;
  if (!signingSecret) return { valid: true, skipped: true };
  const signature = request.headers.get("tally-signature") || "";
  if (!signature) return { valid: false, reason: "missing_signature" };
  const expectedSig = await hmacBase64(signingSecret, new TextEncoder().encode(rawBody));
  return {
    valid: signature === expectedSig,
    reason: signature === expectedSig ? null : "invalid_signature"
  };
}
__name(verifyTallySignature, "verifyTallySignature");
__name2(verifyTallySignature, "verifyTallySignature");
__name22(verifyTallySignature, "verifyTallySignature");
async function sendFormSubmissionEmail(env, subject, title, fieldsHtml, replyTo = null) {
  const htmlBody = brandedEmailWrapper(title, fieldsHtml);
  const accessToken = await getGmailAccessToken(env);
  return await sendGmailMessage(env, accessToken, {
    to: env.GMAIL_USER,
    subject,
    htmlBody,
    replyTo: replyTo || void 0
  });
}
__name(sendFormSubmissionEmail, "sendFormSubmissionEmail");
__name2(sendFormSubmissionEmail, "sendFormSubmissionEmail");
__name22(sendFormSubmissionEmail, "sendFormSubmissionEmail");
async function handleNewsletterSubmission(env, workerOrigin, payload, rawJson) {
  const fields = payload?.fields || [];
  const email = normalizeEmail(tallyField(fields, "\u05DE\u05D9\u05D9\u05DC", "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", "email", "Email"));
  const name = (tallyField(fields, "\u05E9\u05DD", "\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9", "\u05E9\u05DD \u05DE\u05DC\u05D0", "name", "Name") || "").trim();
  const interests = tallyField(fields, "\u05EA\u05D7\u05D5\u05DE\u05D9 \u05E2\u05E0\u05D9\u05D9\u05DF", "\u05D1\u05DE\u05D4 \u05EA\u05E8\u05E6\u05D9 \u05DC\u05E7\u05D1\u05DC \u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD", "interests");
  const audienceType = tallyField(fields, "\u05DE\u05D9 \u05D0\u05EA", "audience type");
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "invalid_email_in_form" };
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const existing = await env.DB.prepare(
    "SELECT id, email, status FROM subscribers WHERE email = ?"
  ).bind(email).first();
  let subscriberId;
  let isNew = false;
  if (existing) {
    if (existing.status === "blocked") {
      return { ok: false, error: "subscriber_blocked", email };
    }
    subscriberId = existing.id;
    await env.DB.prepare(
      `UPDATE subscribers SET name = ?, source = ? WHERE email = ?`
    ).bind(name, "tally_newsletter", email).run();
  } else {
    subscriberId = crypto.randomUUID();
    isNew = true;
    await env.DB.prepare(
      `INSERT INTO subscribers (id, email, name, status, source, newsletter_opt_in, created_at)
       VALUES (?, ?, ?, 'pending', 'tally_newsletter', 1, ?)`
    ).bind(subscriberId, email, name, now).run();
  }
  await env.DB.prepare(
    `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    isNew ? "tally_newsletter_signup" : "tally_newsletter_update",
    email,
    subscriberId,
    JSON.stringify({ interests, audienceType }),
    now
  ).run();
  if (isNew) {
    try {
      await sendAdminSignupEmail(env, workerOrigin, { email, name, source: "tally_newsletter" });
    } catch (e) {
      console.error("admin_email_failed", e);
    }
    try {
      await sendPendingSubscriberEmail(env, { email, name });
    } catch (e) {
      console.error("pending_email_failed", e);
    }
  }
  return {
    ok: true,
    routed_to_table: "subscribers",
    routed_to_id: subscriberId,
    isNew,
    email
  };
}
__name(handleNewsletterSubmission, "handleNewsletterSubmission");
__name2(handleNewsletterSubmission, "handleNewsletterSubmission");
__name22(handleNewsletterSubmission, "handleNewsletterSubmission");
async function handleMusicianSubmission(env, payload, rawJson) {
  const fields = payload?.fields || [];
  const id = crypto.randomUUID();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const data = {
    id,
    full_name: tallyField(fields, "\u05E9\u05DD \u05DE\u05DC\u05D0", "\u05E9\u05DD", "full name", "name") || "",
    phone: tallyField(fields, "\u05D8\u05DC\u05E4\u05D5\u05DF", "phone", "\u05D8\u05DC\u05E4\u05D5\u05DF \u05E0\u05D9\u05D9\u05D3") || "",
    email: normalizeEmail(tallyField(fields, "\u05DE\u05D9\u05D9\u05DC", "email", "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC") || ""),
    primary_instrument: tallyField(fields, "\u05DB\u05DC\u05D9 \u05E0\u05D2\u05D9\u05E0\u05D4 \u05E8\u05D0\u05E9\u05D9", "primary instrument", "\u05DB\u05DC\u05D9 \u05E8\u05D0\u05E9\u05D9"),
    secondary_instrument: tallyField(fields, "\u05DB\u05DC\u05D9 \u05E0\u05D2\u05D9\u05E0\u05D4 \u05DE\u05E9\u05E0\u05D9", "secondary instrument", "\u05DB\u05DC\u05D9 \u05DE\u05E9\u05E0\u05D9"),
    level: tallyField(fields, "\u05E8\u05DE\u05D4", "\u05E8\u05DE\u05D4 \u05DE\u05E7\u05E6\u05D5\u05E2\u05D9\u05EA", "level"),
    experience: tallyField(fields, "\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF", "\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF \u05D1\u05E7\u05D1\u05D5\u05E6\u05D5\u05EA", "experience"),
    region: tallyField(fields, "\u05D0\u05D6\u05D5\u05E8", "\u05D0\u05D6\u05D5\u05E8 \u05DE\u05D2\u05D5\u05E8\u05D9\u05DD", "region"),
    availability: tallyField(fields, "\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA", "availability"),
    audio_file_url: tallyField(fields, "\u05E7\u05D5\u05D1\u05E5 \u05E1\u05D0\u05D5\u05E0\u05D3", "\u05E1\u05E8\u05D8\u05D5\u05DF", "audio file", "audio"),
    notes: tallyField(fields, "\u05D4\u05E2\u05E8\u05D5\u05EA", "notes"),
    source: "tally_musicians",
    raw: JSON.stringify(rawJson),
    created_at: now
  };
  if (!data.full_name) {
    return { ok: false, error: "missing_name" };
  }
  await env.DB.prepare(
    `INSERT INTO musicians
     (id, full_name, phone, email, primary_instrument, secondary_instrument, level, experience,
      region, availability, audio_file_url, notes, source, raw_payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    data.id,
    data.full_name,
    data.phone,
    data.email,
    data.primary_instrument,
    data.secondary_instrument,
    data.level,
    data.experience,
    data.region,
    data.availability,
    data.audio_file_url,
    data.notes,
    data.source,
    data.raw,
    data.created_at
  ).run();
  const fieldsHtml = `
    <p><strong style="color:#C9A961;">\u05E9\u05DD:</strong> ${escapeHtml(data.full_name)}</p>
    <p><strong style="color:#C9A961;">\u05D8\u05DC\u05E4\u05D5\u05DF:</strong> ${escapeHtml(data.phone)}</p>
    ${data.email ? `<p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(data.email)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05DB\u05DC\u05D9 \u05E8\u05D0\u05E9\u05D9:</strong> ${escapeHtml(data.primary_instrument || "")}</p>
    ${data.secondary_instrument ? `<p><strong style="color:#C9A961;">\u05DB\u05DC\u05D9 \u05DE\u05E9\u05E0\u05D9:</strong> ${escapeHtml(data.secondary_instrument)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05E8\u05DE\u05D4:</strong> ${escapeHtml(data.level || "")}</p>
    ${data.experience ? `<p><strong style="color:#C9A961;">\u05E0\u05D9\u05E1\u05D9\u05D5\u05DF:</strong> ${escapeHtml(data.experience)}</p>` : ""}
    ${data.region ? `<p><strong style="color:#C9A961;">\u05D0\u05D6\u05D5\u05E8:</strong> ${escapeHtml(data.region)}</p>` : ""}
    ${data.availability ? `<p><strong style="color:#C9A961;">\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA:</strong> ${escapeHtml(data.availability)}</p>` : ""}
    ${data.audio_file_url ? `<p><strong style="color:#C9A961;">\u05E7\u05D5\u05D1\u05E5:</strong> <a href="${data.audio_file_url}" style="color:#FFE5A0;">${escapeHtml(data.audio_file_url)}</a></p>` : ""}
    ${data.notes ? `<p><strong style="color:#C9A961;">\u05D4\u05E2\u05E8\u05D5\u05EA:</strong> ${escapeHtml(data.notes)}</p>` : ""}
  `;
  try {
    await sendFormSubmissionEmail(
      env,
      `\u{1F3BC} \u05E0\u05D2\u05E0\u05D9\u05EA \u05D7\u05D3\u05E9\u05D4 \u05D1\u05DE\u05D0\u05D2\u05E8: ${data.full_name}`,
      "\u05E0\u05D2\u05E0\u05D9\u05EA \u05D7\u05D3\u05E9\u05D4 \u05D1\u05DE\u05D0\u05D2\u05E8 \u2728",
      fieldsHtml,
      data.email || null
    );
  } catch (e) {
    console.error("musician_email_failed", e);
  }
  return { ok: true, routed_to_table: "musicians", routed_to_id: id };
}
__name(handleMusicianSubmission, "handleMusicianSubmission");
__name2(handleMusicianSubmission, "handleMusicianSubmission");
__name22(handleMusicianSubmission, "handleMusicianSubmission");
async function handleEventSubmission(env, payload, rawJson) {
  const fields = payload?.fields || [];
  const id = crypto.randomUUID();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const data = {
    id,
    client_name: tallyField(fields, "\u05E9\u05DD", "\u05E9\u05DD \u05D4\u05DE\u05D6\u05DE\u05D9\u05E0\u05D4", "client name") || "",
    organization: tallyField(fields, "\u05D0\u05E8\u05D2\u05D5\u05DF", "\u05E9\u05DD \u05D4\u05D0\u05E8\u05D2\u05D5\u05DF", "organization"),
    phone: tallyField(fields, "\u05D8\u05DC\u05E4\u05D5\u05DF", "phone") || "",
    email: normalizeEmail(tallyField(fields, "\u05DE\u05D9\u05D9\u05DC", "email", "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC") || ""),
    event_type: tallyField(fields, "\u05E1\u05D5\u05D2 \u05D4\u05D0\u05D9\u05E8\u05D5\u05E2", "event type"),
    preferred_date: tallyField(fields, "\u05EA\u05D0\u05E8\u05D9\u05DA", "\u05EA\u05D0\u05E8\u05D9\u05DA \u05DE\u05D5\u05E2\u05D3\u05E3", "date"),
    preferred_time: tallyField(fields, "\u05E9\u05E2\u05D4", "\u05E9\u05E2\u05D4 \u05DE\u05E9\u05D5\u05E2\u05E8\u05EA", "time"),
    location: tallyField(fields, "\u05DE\u05E7\u05D5\u05DD", "\u05DE\u05E7\u05D5\u05DD \u05D4\u05D0\u05D9\u05E8\u05D5\u05E2", "location"),
    audience: tallyField(fields, "\u05E7\u05D4\u05DC \u05D9\u05E2\u05D3", "audience"),
    service_needed: tallyField(fields, "\u05DE\u05D4 \u05D0\u05EA \u05E6\u05E8\u05D9\u05DB\u05D4", "service", "\u05E9\u05D9\u05E8\u05D5\u05EA"),
    budget: tallyField(fields, "\u05EA\u05E7\u05E6\u05D9\u05D1", "budget"),
    notes: tallyField(fields, "\u05D4\u05E2\u05E8\u05D5\u05EA", "notes"),
    source: "tally_events",
    raw: JSON.stringify(rawJson),
    created_at: now
  };
  if (!data.client_name || !data.phone) {
    return { ok: false, error: "missing_required_fields" };
  }
  await env.DB.prepare(
    `INSERT INTO event_requests
     (id, client_name, organization, phone, email, event_type, preferred_date, preferred_time,
      location, audience, service_needed, budget, notes, source, raw_payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    data.id,
    data.client_name,
    data.organization,
    data.phone,
    data.email,
    data.event_type,
    data.preferred_date,
    data.preferred_time,
    data.location,
    data.audience,
    data.service_needed,
    data.budget,
    data.notes,
    data.source,
    data.raw,
    data.created_at
  ).run();
  const fieldsHtml = `
    <div style="background:#6B1F2A;color:#FFE5A0;padding:12px;border-radius:8px;margin-bottom:16px;text-align:center;">
      <strong>\u{1F3AD} \u05D4\u05D6\u05DE\u05E0\u05EA \u05D0\u05D9\u05E8\u05D5\u05E2 \u2014 \u05D3\u05D5\u05E8\u05E9 \u05DE\u05E2\u05E0\u05D4 \u05DE\u05D4\u05D9\u05E8</strong>
    </div>
    <p><strong style="color:#C9A961;">\u05DC\u05E7\u05D5\u05D7\u05D4:</strong> ${escapeHtml(data.client_name)}</p>
    ${data.organization ? `<p><strong style="color:#C9A961;">\u05D0\u05E8\u05D2\u05D5\u05DF:</strong> ${escapeHtml(data.organization)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05D8\u05DC\u05E4\u05D5\u05DF:</strong> ${escapeHtml(data.phone)}</p>
    ${data.email ? `<p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(data.email)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05E1\u05D5\u05D2 \u05D0\u05D9\u05E8\u05D5\u05E2:</strong> ${escapeHtml(data.event_type || "")}</p>
    <p><strong style="color:#C9A961;">\u05EA\u05D0\u05E8\u05D9\u05DA:</strong> ${escapeHtml(data.preferred_date || "")}</p>
    ${data.preferred_time ? `<p><strong style="color:#C9A961;">\u05E9\u05E2\u05D4:</strong> ${escapeHtml(data.preferred_time)}</p>` : ""}
    ${data.location ? `<p><strong style="color:#C9A961;">\u05DE\u05E7\u05D5\u05DD:</strong> ${escapeHtml(data.location)}</p>` : ""}
    ${data.audience ? `<p><strong style="color:#C9A961;">\u05E7\u05D4\u05DC:</strong> ${escapeHtml(data.audience)}</p>` : ""}
    ${data.service_needed ? `<p><strong style="color:#C9A961;">\u05E9\u05D9\u05E8\u05D5\u05EA:</strong> ${escapeHtml(data.service_needed)}</p>` : ""}
    ${data.budget ? `<p><strong style="color:#C9A961;">\u05EA\u05E7\u05E6\u05D9\u05D1:</strong> ${escapeHtml(data.budget)}</p>` : ""}
    ${data.notes ? `<p><strong style="color:#C9A961;">\u05D4\u05E2\u05E8\u05D5\u05EA:</strong> ${escapeHtml(data.notes)}</p>` : ""}
  `;
  try {
    await sendFormSubmissionEmail(
      env,
      `\u{1F3AD} \u05D4\u05D6\u05DE\u05E0\u05EA \u05D0\u05D9\u05E8\u05D5\u05E2: ${data.client_name} - ${data.event_type || ""}`,
      "\u05D4\u05D6\u05DE\u05E0\u05EA \u05D0\u05D9\u05E8\u05D5\u05E2 \u05D7\u05D3\u05E9\u05D4 \u2728",
      fieldsHtml,
      data.email || null
    );
  } catch (e) {
    console.error("event_email_failed", e);
  }
  return { ok: true, routed_to_table: "event_requests", routed_to_id: id };
}
__name(handleEventSubmission, "handleEventSubmission");
__name2(handleEventSubmission, "handleEventSubmission");
__name22(handleEventSubmission, "handleEventSubmission");
async function handleStudentSubmission(env, payload, rawJson) {
  const fields = payload?.fields || [];
  const id = crypto.randomUUID();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const data = {
    id,
    student_name: tallyField(fields, "\u05E9\u05DD \u05D4\u05D1\u05EA", "\u05E9\u05DD \u05D4\u05EA\u05DC\u05DE\u05D9\u05D3\u05D4", "student name") || "",
    student_age: tallyField(fields, "\u05D2\u05D9\u05DC", "age"),
    parent_name: tallyField(fields, "\u05E9\u05DD \u05D4\u05D4\u05D5\u05E8\u05D4", "\u05E9\u05DD \u05D4\u05D5\u05E8\u05D4", "parent name"),
    parent_phone: tallyField(fields, "\u05D8\u05DC\u05E4\u05D5\u05DF \u05D4\u05D5\u05E8\u05D4", "\u05D8\u05DC\u05E4\u05D5\u05DF", "phone") || "",
    parent_email: normalizeEmail(tallyField(fields, "\u05DE\u05D9\u05D9\u05DC", "email", "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC") || ""),
    instrument: tallyField(fields, "\u05DB\u05DC\u05D9 \u05DE\u05D1\u05D5\u05E7\u05E9", "\u05DB\u05DC\u05D9", "instrument"),
    current_level: tallyField(fields, "\u05E8\u05DE\u05D4 \u05E0\u05D5\u05DB\u05D7\u05D9\u05EA", "\u05E8\u05DE\u05D4", "level"),
    years_studied: tallyField(fields, "\u05E9\u05E0\u05D5\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3", "years"),
    why_me: tallyField(fields, "\u05DC\u05DE\u05D4 \u05D0\u05E6\u05DC\u05D9", "\u05DC\u05DE\u05D4 \u05D0\u05EA", "why me"),
    weekly_availability: tallyField(fields, "\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA", "\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA \u05E9\u05D1\u05D5\u05E2\u05D9\u05EA", "availability"),
    notes: tallyField(fields, "\u05D4\u05E2\u05E8\u05D5\u05EA", "notes"),
    source: "tally_students",
    raw: JSON.stringify(rawJson),
    created_at: now
  };
  if (!data.student_name || !data.parent_phone) {
    return { ok: false, error: "missing_required_fields" };
  }
  await env.DB.prepare(
    `INSERT INTO student_inquiries
     (id, student_name, student_age, parent_name, parent_phone, parent_email, instrument,
      current_level, years_studied, why_me, weekly_availability, notes, source,
      raw_payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(
    data.id,
    data.student_name,
    data.student_age,
    data.parent_name,
    data.parent_phone,
    data.parent_email,
    data.instrument,
    data.current_level,
    data.years_studied,
    data.why_me,
    data.weekly_availability,
    data.notes,
    data.source,
    data.raw,
    data.created_at
  ).run();
  const fieldsHtml = `
    <p><strong style="color:#C9A961;">\u05EA\u05DC\u05DE\u05D9\u05D3\u05D4:</strong> ${escapeHtml(data.student_name)}${data.student_age ? ` (\u05D2\u05D9\u05DC ${escapeHtml(data.student_age)})` : ""}</p>
    ${data.parent_name ? `<p><strong style="color:#C9A961;">\u05D4\u05D5\u05E8\u05D4:</strong> ${escapeHtml(data.parent_name)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05D8\u05DC\u05E4\u05D5\u05DF:</strong> ${escapeHtml(data.parent_phone)}</p>
    ${data.parent_email ? `<p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(data.parent_email)}</p>` : ""}
    <p><strong style="color:#C9A961;">\u05DB\u05DC\u05D9:</strong> ${escapeHtml(data.instrument || "")}</p>
    <p><strong style="color:#C9A961;">\u05E8\u05DE\u05D4:</strong> ${escapeHtml(data.current_level || "")}</p>
    ${data.years_studied ? `<p><strong style="color:#C9A961;">\u05E9\u05E0\u05D5\u05EA \u05DC\u05D9\u05DE\u05D5\u05D3:</strong> ${escapeHtml(data.years_studied)}</p>` : ""}
    ${data.why_me ? `<div style="background:#0F0F12;border-right:3px solid #C9A961;padding:12px;margin:12px 0;"><strong style="color:#C9A961;">\u05DC\u05DE\u05D4 \u05D0\u05E6\u05DC\u05D9:</strong><br>${escapeHtml(data.why_me)}</div>` : ""}
    ${data.weekly_availability ? `<p><strong style="color:#C9A961;">\u05D6\u05DE\u05D9\u05E0\u05D5\u05EA:</strong> ${escapeHtml(data.weekly_availability)}</p>` : ""}
    ${data.notes ? `<p><strong style="color:#C9A961;">\u05D4\u05E2\u05E8\u05D5\u05EA:</strong> ${escapeHtml(data.notes)}</p>` : ""}
  `;
  try {
    await sendFormSubmissionEmail(
      env,
      `\u{1F393} \u05EA\u05DC\u05DE\u05D9\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4: ${data.student_name}`,
      "\u05E4\u05E0\u05D9\u05D9\u05D4 \u05DC\u05E8\u05D9\u05E9\u05D5\u05DD \u05EA\u05DC\u05DE\u05D9\u05D3\u05D4 \u05D7\u05D3\u05E9\u05D4 \u2728",
      fieldsHtml,
      data.parent_email || null
    );
  } catch (e) {
    console.error("student_email_failed", e);
  }
  return { ok: true, routed_to_table: "student_inquiries", routed_to_id: id };
}
__name(handleStudentSubmission, "handleStudentSubmission");
__name2(handleStudentSubmission, "handleStudentSubmission");
__name22(handleStudentSubmission, "handleStudentSubmission");
async function handleContactSubmission(env, payload, rawJson) {
  const fields = payload?.fields || [];
  const id = crypto.randomUUID();
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const data = {
    id,
    name: tallyField(fields, "\u05E9\u05DD", "name") || "",
    contact_info: tallyField(fields, "\u05D8\u05DC\u05E4\u05D5\u05DF", "\u05DE\u05D9\u05D9\u05DC", "phone", "email", "\u05E4\u05E8\u05D8\u05D9 \u05E7\u05E9\u05E8") || "",
    message: tallyField(fields, "\u05D4\u05D5\u05D3\u05E2\u05D4", "\u05E4\u05E0\u05D9\u05D9\u05D4", "message", "\u05DE\u05D8\u05E8\u05EA \u05D4\u05E4\u05E0\u05D9\u05D9\u05D4") || "",
    source: "tally_contact",
    raw: JSON.stringify(rawJson),
    created_at: now
  };
  await env.DB.prepare(
    `INSERT INTO contact_messages
     (id, name, contact_info, message, source, raw_payload_json, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  ).bind(data.id, data.name, data.contact_info, data.message, data.source, data.raw, data.created_at).run();
  const fieldsHtml = `
    <p><strong style="color:#C9A961;">\u05E9\u05DD:</strong> ${escapeHtml(data.name)}</p>
    <p><strong style="color:#C9A961;">\u05E4\u05E8\u05D8\u05D9 \u05E7\u05E9\u05E8:</strong> ${escapeHtml(data.contact_info)}</p>
    <div style="background:#0F0F12;border-right:3px solid #C9A961;padding:12px;margin:12px 0;">
      <strong style="color:#C9A961;">\u05E4\u05E0\u05D9\u05D9\u05D4:</strong><br>
      ${escapeHtml(data.message)}
    </div>
  `;
  try {
    const replyTo = data.contact_info.includes("@") ? data.contact_info : null;
    await sendFormSubmissionEmail(
      env,
      `\u{1F4EC} \u05E4\u05E0\u05D9\u05D9\u05D4: ${data.name || "\u05DC\u05DC\u05D0 \u05E9\u05DD"}`,
      "\u05E4\u05E0\u05D9\u05D9\u05D4 \u05D7\u05D3\u05E9\u05D4 \u2728",
      fieldsHtml,
      replyTo
    );
  } catch (e) {
    console.error("contact_email_failed", e);
  }
  return { ok: true, routed_to_table: "contact_messages", routed_to_id: id };
}
__name(handleContactSubmission, "handleContactSubmission");
__name2(handleContactSubmission, "handleContactSubmission");
__name22(handleContactSubmission, "handleContactSubmission");
async function approveSubscriberByEmail(env, email, workerOrigin) {
  const existing = await env.DB.prepare(
    `SELECT id, email, status, newsletter_opt_in, name, source, approved_at FROM subscribers WHERE email = ?`
  ).bind(email).first();
  if (!existing) return { ok: false, error: "subscriber_not_found", status: 404 };
  if (existing.status === "approved") {
    return {
      ok: true,
      email,
      status: "approved",
      approvedAt: existing.approved_at || null,
      alreadyApproved: true,
      brevoSynced: false,
      brevoSyncError: null,
      approvedEmailSent: false,
      approvedEmailError: null
    };
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let brevoSynced = false;
  let brevoSyncError = null;
  if (existing.newsletter_opt_in) {
    try {
      await syncApprovedSubscriberToBrevo(env, email, existing.name, existing.created_at);
      await syncSubscriberToAirtable(env, email, existing.name, existing.created_at, null);
      brevoSynced = true;
      try {
        const conf32 = getBrevoConfig(env, existing?.created_at);
        await brevoRequest(env, "/contacts", {
          method: "POST",
          apiKey: conf32.apiKey,
          body: { email, listIds: [conf32.t7TemplateId === 1 ? 4 : 32], updateEnabled: true }
        });
      } catch (e) {
      }
    } catch (error) {
      brevoSyncError = errorMessage(error, "brevo_sync_failed");
    }
  }
  await env.DB.prepare(
    `UPDATE subscribers SET status = 'approved', approved_at = ?, blocked_at = NULL WHERE email = ?`
  ).bind(now, email).run();
  let approvedEmailSent = false;
  let approvedEmailError = null;
  try {
    await sendApprovedSubscriberEmail(env, workerOrigin, { id: existing.id, email, name: existing.name, source: existing.source });
    approvedEmailSent = true;
  } catch (error) {
    approvedEmailError = errorMessage(error, "approved_email_failed");
  }
  await env.DB.prepare(
    `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    "approve_subscriber",
    "admin",
    existing.id,
    JSON.stringify({ email, brevoSynced, brevoSyncError, approvedEmailSent, approvedEmailError }),
    now
  ).run();
  return {
    ok: true,
    email,
    status: "approved",
    approvedAt: now,
    alreadyApproved: false,
    brevoSynced,
    brevoSyncError,
    approvedEmailSent,
    approvedEmailError
  };
}
__name(approveSubscriberByEmail, "approveSubscriberByEmail");
__name2(approveSubscriberByEmail, "approveSubscriberByEmail");
__name22(approveSubscriberByEmail, "approveSubscriberByEmail");
async function blockSubscriberByEmail(env, email) {
  const existing = await env.DB.prepare(
    `SELECT id, email, status, blocked_at FROM subscribers WHERE email = ?`
  ).bind(email).first();
  if (!existing) return { ok: false, error: "subscriber_not_found", status: 404 };
  if (existing.status === "blocked") {
    return {
      ok: true,
      email,
      status: "blocked",
      blockedAt: existing.blocked_at || null,
      alreadyBlocked: true,
      brevoRemoved: false,
      brevoRemoveError: null
    };
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let brevoRemoved = false;
  let brevoRemoveError = null;
  try {
    await removeSubscriberFromBrevo(env, email, existing?.created_at);
    brevoRemoved = true;
  } catch (error) {
    brevoRemoveError = errorMessage(error, "brevo_remove_failed");
  }
  await revokeAllSubscriberSessions(env, existing.id);
  await env.DB.prepare(
    `UPDATE subscribers SET status = 'blocked', blocked_at = ? WHERE email = ?`
  ).bind(now, email).run();
  await env.DB.prepare(
    `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    crypto.randomUUID(),
    "block_subscriber",
    "admin",
    existing.id,
    JSON.stringify({ email, brevoRemoved, brevoRemoveError }),
    now
  ).run();
  return {
    ok: true,
    email,
    status: "blocked",
    blockedAt: now,
    alreadyBlocked: false,
    brevoRemoved,
    brevoRemoveError
  };
}
__name(blockSubscriberByEmail, "blockSubscriberByEmail");
__name2(blockSubscriberByEmail, "blockSubscriberByEmail");
__name22(blockSubscriberByEmail, "blockSubscriberByEmail");
async function sendWelcomeEmailToSubscriber(env, subscriber) {
  const htmlBody = brandedEmailWrapper(
    "\u05D1\u05E8\u05D5\u05DB\u05D4 \u05D4\u05D1\u05D0\u05D4 \u05DC\u05EA\u05E4\u05D5\u05E6\u05D4! \u{1F3B6}",
    `<p>\u05E9\u05DE\u05D7\u05E0\u05D5 \u05E9\u05D4\u05E6\u05D8\u05E8\u05E4\u05EA \u05D0\u05DC\u05D9\u05E0\u05D5!</p>
     <p>\u05D4\u05D4\u05E8\u05E9\u05DE\u05D4 \u05E9\u05DC\u05DA \u05D4\u05EA\u05E7\u05D1\u05DC\u05D4 \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4 \u2705</p>
     <p>\u05DE\u05E2\u05DB\u05E9\u05D9\u05D5 \u05EA\u05E7\u05D1\u05DC\u05D9 \u05E2\u05D3\u05DB\u05D5\u05E0\u05D9\u05DD \u05D0\u05DA \u05D5\u05E8\u05E7 \u05DETOBY music.</p>
     <p style="font-size:14px;color:#C9A961;margin-top:16px;">\u05EA\u05D5\u05D3\u05D4 \u05E9\u05D1\u05D7\u05E8\u05EA \u05D1\u05E0\u05D5! \u2728</p>`
  );
  const accessToken = await getGmailAccessToken(env);
  return await sendGmailMessage(env, accessToken, {
    to: subscriber.email,
    subject: "\u05D1\u05E8\u05D5\u05DB\u05D4 \u05D4\u05D1\u05D0\u05D4! \u2728 TOBY music",
    htmlBody
  });
}
__name(sendWelcomeEmailToSubscriber, "sendWelcomeEmailToSubscriber");
__name2(sendWelcomeEmailToSubscriber, "sendWelcomeEmailToSubscriber");
__name22(sendWelcomeEmailToSubscriber, "sendWelcomeEmailToSubscriber");
async function sendAdminNotificationEmail(env, subscriber) {
  const htmlBody = brandedEmailWrapper(
    "\u{1F514} \u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4 \u05DC\u05E8\u05E9\u05D9\u05DE\u05EA \u05D4\u05EA\u05E4\u05D5\u05E6\u05D4",
    `<p><strong style="color:#C9A961;">\u05E9\u05DD:</strong> ${escapeHtml(subscriber.name || "\u05DC\u05D0 \u05D9\u05D3\u05D5\u05E2")}</p>
     <p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(subscriber.email)}</p>
     <p><strong style="color:#C9A961;">\u05DE\u05E7\u05D5\u05E8:</strong> ${escapeHtml(subscriber.source || "\u05DC\u05D0 \u05E6\u05D5\u05D9\u05DF")}</p>
     <p><strong style="color:#C9A961;">\u05E1\u05D8\u05D8\u05D5\u05E1:</strong> ${escapeHtml(subscriber.status || "approved")}</p>
     <p style="color:#FFE5A0;margin-top:16px;">\u2705 \u05D4\u05D4\u05E8\u05E9\u05DE\u05D4 \u05E0\u05E7\u05DC\u05D8\u05D4 \u05D1\u05DE\u05E2\u05E8\u05DB\u05EA</p>`
  );
  const accessToken = await getGmailAccessToken(env);
  return await sendGmailMessage(env, accessToken, {
    to: "tobyw.tobymusic@gmail.com",
    subject: `\u{1F514} \u05D4\u05E8\u05E9\u05DE\u05D4 \u05D7\u05D3\u05E9\u05D4: ${subscriber.email}`,
    htmlBody
  });
}
__name(sendAdminNotificationEmail, "sendAdminNotificationEmail");
__name2(sendAdminNotificationEmail, "sendAdminNotificationEmail");
__name22(sendAdminNotificationEmail, "sendAdminNotificationEmail");
var worker_default = {
  async fetch(request, env) {
    if (request.method === "OPTIONS") {
      return noContent(request, env);
    }
    const url = new URL(request.url);
    const path = url.pathname;
    if (request.method === "GET" && path === "/health") {
      try {
        const missingSecrets = getMissingSecrets(env);
        const dbCheck = await env.DB.prepare("SELECT 1 as ok").first();
        return json(request, env, {
          ok: true,
          service: "toby-mailing-list",
          version: "3.1-clean-join-email",
          features: ["subscribers", "magic_links", "tally_webhook", "join_form", "auto_approve_web_join", "dual_email_notifications"],
          siteBaseUrl: env.SITE_BASE_URL,
          db: !!dbCheck,
          missingSecrets,
          time: (/* @__PURE__ */ new Date()).toISOString()
        });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "health_failed") }, 500);
      }
    }
    if (request.method === "GET" && path === "/join") {
      return html(`<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05DC\u05EA\u05E4\u05D5\u05E6\u05D4 \xB7 TOBY music</title>
  <style>
    body{margin:0;background:#0F0F12;color:#F5F1EA;font-family:Arial,"Heebo",sans-serif;direction:rtl;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:24px;box-sizing:border-box}
    .card{width:100%;max-width:520px;border:1px solid #6B1F2A;border-radius:18px;background:#17171c;padding:28px;box-shadow:0 18px 60px rgba(0,0,0,.35)}
    .logo{text-align:center;margin-bottom:18px}.logo img{max-width:170px;height:auto}.brand{font-family:Georgia,serif;font-size:30px;letter-spacing:2px;color:#FFE5A0}.brand span{color:#C9A961}
    h1{margin:18px 0 8px;color:#FFE5A0;font-size:28px;text-align:center;font-weight:400}p{line-height:1.7;color:#e8dfcf;text-align:center;margin:0 0 18px}
    label{display:block;margin:14px 0 6px;color:#FFE5A0;font-weight:bold}input{width:100%;box-sizing:border-box;border:1px solid #6B1F2A;background:#0F0F12;color:#F5F1EA;border-radius:10px;padding:13px 14px;font-size:16px;direction:rtl}input:focus{outline:2px solid #C9A961;border-color:#C9A961}
    button{width:100%;margin-top:18px;border:0;border-radius:12px;background:#C9A961;color:#0F0F12;font-weight:bold;font-size:18px;padding:14px 16px;cursor:pointer}button:disabled{opacity:.7;cursor:default}
    .msg{display:none;margin-top:18px;border-radius:12px;padding:14px;line-height:1.7;text-align:center}.ok{display:block;background:#11351f;color:#d8ffe0;border:1px solid #2e8b57}.err{display:block;background:#3a1414;color:#ffe0e0;border:1px solid #8b2e2e}.small{font-size:12px;color:#C9A961;margin-top:12px;text-align:center}
  </style>
</head>
<body>
  <main class="card">
    <div class="logo"><img src="${LOGO_URL}" alt="TOBY music" /><div class="brand">TOBY <span>music</span></div></div>
    <h1>\u05D4\u05E6\u05D8\u05E8\u05E4\u05D5\u05EA \u05DC\u05EA\u05E4\u05D5\u05E6\u05D4 \u{1F3B6}</h1>
    <p>\u05DE\u05DC\u05D0\u05D9 \u05E9\u05DD \u05D5\u05DE\u05D9\u05D9\u05DC, \u05D5\u05EA\u05E7\u05D1\u05DC\u05D9 \u05DE\u05D9\u05D9\u05DC \u05D0\u05D9\u05E9\u05D5\u05E8 \u05EA\u05D5\u05DA \u05E9\u05E0\u05D9\u05D5\u05EA.</p>
    <form id="joinForm">
      <label for="name">\u05E9\u05DD</label>
      <input id="name" name="name" autocomplete="name" required />
      <label for="email">\u05DE\u05D9\u05D9\u05DC</label>
      <input id="email" name="email" type="email" autocomplete="email" required />
      <button id="submitBtn" type="submit">\u2728 \u05D0\u05E0\u05D9 \u05E8\u05D5\u05E6\u05D4 \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3</button>
      <div id="message" class="msg"></div>
    </form>
    <div class="small">TOBY music \xB7 \u05D8\u05D5\u05D1\u05D9 \u05D5\u05D9\u05E0\u05D1\u05E8\u05D2</div>
  </main>
  <script>
    const form = document.getElementById('joinForm');
    const msg = document.getElementById('message');
    const btn = document.getElementById('submitBtn');
    form.addEventListener('submit', async function(event){
      event.preventDefault();
      msg.className = 'msg';
      msg.textContent = '';
      btn.disabled = true;
      btn.textContent = '\u05E8\u05D5\u05E9\u05DE\u05EA \u05D0\u05D5\u05EA\u05DA...';
      try {
        const res = await fetch('/subscribe_request', {
          method: 'POST',
          headers: {'content-type':'application/json'},
          body: JSON.stringify({
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            source: 'web_join',
            newsletterOptIn: true
          })
        });
        const data = await res.json().catch(function(){ return {}; });
        if (!res.ok || !data.ok) throw new Error(data.error || 'registration_failed');
        msg.className = 'msg ok';
        msg.innerHTML = '\u2705 \u05D4\u05E6\u05D8\u05E8\u05E4\u05EA \u05D1\u05D4\u05E6\u05DC\u05D7\u05D4! \u05DE\u05D9\u05D9\u05DC \u05D0\u05D9\u05E9\u05D5\u05E8 \u05E0\u05E9\u05DC\u05D7 \u05D0\u05DC\u05D9\u05D9\u05DA \u05E2\u05DB\u05E9\u05D9\u05D5 \u{1F3B6}';
        form.reset();
      } catch (e) {
        msg.className = 'msg err';
        msg.textContent = '\u05DC\u05D0 \u05D4\u05E6\u05DC\u05D7\u05EA\u05D9 \u05DC\u05D4\u05E9\u05DC\u05D9\u05DD \u05D0\u05EA \u05D4\u05D4\u05E8\u05E9\u05DE\u05D4. \u05D1\u05D3\u05E7\u05D9 \u05E9\u05D4\u05DE\u05D9\u05D9\u05DC \u05EA\u05E7\u05D9\u05DF \u05D5\u05E0\u05E1\u05D9 \u05E9\u05D5\u05D1.';
      } finally {
        btn.disabled = false;
        btn.textContent = '\u2728 \u05D0\u05E0\u05D9 \u05E8\u05D5\u05E6\u05D4 \u05DC\u05D4\u05E6\u05D8\u05E8\u05E3';
      }
    });
  <\/script>
</body>
</html>`);
    }
    if (request.method === "POST" && path === "/tally_webhook") {
      try {
        const rawBody = await request.text();
        const sigCheck = await verifyTallySignature(request, env, rawBody);
        if (!sigCheck.valid) {
          return json(request, env, { ok: false, error: sigCheck.reason || "invalid_signature" }, 401);
        }
        let payload;
        try {
          payload = JSON.parse(rawBody);
        } catch {
          return json(request, env, { ok: false, error: "invalid_json" }, 400);
        }
        const data = payload.data || payload;
        const fields = data.fields || [];
        const formId = data.formId || data.form_id || "";
        const formName = data.formName || data.form_name || "";
        const submissionId = data.submissionId || data.submission_id || payload.eventId || "";
        let formType = url.searchParams.get("type") || "";
        if (!formType) {
          const nameLower = formName.toLowerCase();
          if (nameLower.includes("newsletter") || nameLower.includes("\u05E0\u05D9\u05D5\u05D6\u05DC\u05D8\u05E8") || nameLower.includes("\u05EA\u05E4\u05D5\u05E6\u05D4")) {
            formType = "newsletter";
          } else if (nameLower.includes("musician") || nameLower.includes("\u05E0\u05D2\u05E0\u05D9\u05EA") || nameLower.includes("\u05DE\u05D0\u05D2\u05E8")) {
            formType = "musician";
          } else if (nameLower.includes("event") || nameLower.includes("\u05D0\u05D9\u05E8\u05D5\u05E2") || nameLower.includes("\u05D4\u05D6\u05DE\u05E0")) {
            formType = "event";
          } else if (nameLower.includes("student") || nameLower.includes("\u05EA\u05DC\u05DE\u05D9\u05D3") || nameLower.includes("\u05E8\u05D9\u05E9\u05D5\u05DD")) {
            formType = "student";
          } else {
            formType = "contact";
          }
        }
        const subRecordId = crypto.randomUUID();
        const now = (/* @__PURE__ */ new Date()).toISOString();
        await env.DB.prepare(
          `INSERT INTO tally_submissions
           (id, form_id, form_name, submission_id, form_type, raw_payload_json, ip_address, user_agent, created_at)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        ).bind(
          subRecordId,
          formId,
          formName,
          submissionId,
          formType,
          rawBody.slice(0, 5e4),
          // cap raw payload to avoid huge rows
          request.headers.get("cf-connecting-ip") || "",
          request.headers.get("user-agent") || "",
          now
        ).run();
        let result;
        switch (formType) {
          case "newsletter":
            result = await handleNewsletterSubmission(env, url.origin, data, payload);
            break;
          case "musician":
            result = await handleMusicianSubmission(env, data, payload);
            break;
          case "event":
            result = await handleEventSubmission(env, data, payload);
            break;
          case "student":
            result = await handleStudentSubmission(env, data, payload);
            break;
          case "contact":
          default:
            result = await handleContactSubmission(env, data, payload);
            break;
        }
        if (result.ok) {
          await env.DB.prepare(
            `UPDATE tally_submissions SET routed_to_table = ?, routed_to_id = ? WHERE id = ?`
          ).bind(result.routed_to_table || null, result.routed_to_id || null, subRecordId).run();
        }
        return json(request, env, {
          ok: result.ok,
          formType,
          submissionRecordId: subRecordId,
          ...result
        });
      } catch (error) {
        return json(request, env, {
          ok: false,
          error: errorMessage(error, "tally_webhook_failed")
        }, 500);
      }
    }
    if (request.method === "POST" && path === "/subscribe_request") {
      try {
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        const name = (body.name || "").trim();
        const source = (body.source || "blog").trim();
        const newsletterOptIn = body.newsletterOptIn === void 0 ? true : !!body.newsletterOptIn;
        const isWebJoin = source === "web_join";
        if (!email || !isValidEmail(email)) {
          return json(request, env, { ok: false, error: "invalid_email" }, 400);
        }
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const existing = await env.DB.prepare(
          "SELECT id, email, name, status, source, newsletter_opt_in, approved_at FROM subscribers WHERE email = ? LIMIT 1"
        ).bind(email).first();
        let subscriberId = existing?.id || crypto.randomUUID();
        let status = isWebJoin ? "approved" : "pending";
        let approvedAt = isWebJoin ? now : null;
        let message = existing ? "subscriber_updated" : "subscriber_created";
        if (existing) {
          if (existing.status === "blocked") {
            return json(request, env, { ok: false, error: "subscriber_blocked", email, status: "blocked" }, 403);
          }
          if (isWebJoin) {
            status = "approved";
            approvedAt = existing.approved_at || now;
            await env.DB.prepare(
              `UPDATE subscribers
               SET name = ?, source = ?, newsletter_opt_in = ?, status = 'approved', approved_at = COALESCE(approved_at, ?), blocked_at = NULL
               WHERE email = ?`
            ).bind(name, source, newsletterOptIn ? 1 : 0, now, email).run();
          } else {
            status = existing.status || "pending";
            approvedAt = existing.approved_at || null;
            await env.DB.prepare(
              `UPDATE subscribers SET name = ?, source = ?, newsletter_opt_in = ? WHERE email = ?`
            ).bind(name, source, newsletterOptIn ? 1 : 0, email).run();
          }
        } else {
          await env.DB.prepare(
            `INSERT INTO subscribers (id, email, name, status, source, newsletter_opt_in, created_at, approved_at)
             VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
          ).bind(subscriberId, email, name, status, source, newsletterOptIn ? 1 : 0, now, approvedAt).run();
        }
        let brevoSynced = false;
        let brevoSyncError = null;
        if (status === "approved") {
          try {
            if (newsletterOptIn) {
              await syncApprovedSubscriberToBrevo(env, email, name);
              brevoSynced = true;
              try {
                const confNew = getBrevoConfig(env, null);
                await brevoRequest(env, "/contacts", {
                  method: "POST",
                  apiKey: confNew.apiKey,
                  body: { email, listIds: [confNew.t7TemplateId === 1 ? 4 : 32], updateEnabled: true }
                });
              } catch (e) {
              }
            } else {
              await removeSubscriberFromBrevo(env, email, existing?.created_at);
            }
          } catch (error) {
            brevoSyncError = errorMessage(error, "brevo_sync_failed");
            console.error("brevo_sync_failed_on_subscribe_request", error);
          }
        }
        let subscriberEmailSent = false;
        let subscriberEmailError = null;
        if (isWebJoin) {
          try {
            const nameParts = (name || "").split(" ");
            const brevoConf = getBrevoConfig(env, (/* @__PURE__ */ new Date()).toISOString());
            await brevoRequest(env, "/smtp/email", {
              method: "POST",
              apiKey: brevoConf.apiKey,
              body: {
                to: [{ email, name: name || email }],
                templateId: brevoConf.t7TemplateId,
                params: {
                  FIRSTNAME: nameParts[0] || name || "",
                  LASTNAME: nameParts.slice(1).join(" ") || ""
                }
              }
            });
            subscriberEmailSent = true;
            await syncSubscriberToAirtable(env, email, name, (/* @__PURE__ */ new Date()).toISOString(), null);
            try {
              const scheduleDate = /* @__PURE__ */ __name2((daysFromNow) => {
                const d = /* @__PURE__ */ new Date();
                d.setUTCHours(10, 0, 0, 0);
                d.setDate(d.getDate() + daysFromNow);
                if (d.getDay() === 6) d.setDate(d.getDate() + 1);
                return d.toISOString().split("T")[0];
              }, "scheduleDate");
              const { v4: uuidv4 } = { v4: /* @__PURE__ */ __name2(() => crypto.randomUUID(), "v4") };
              const confSched = getBrevoConfig(env, (/* @__PURE__ */ new Date()).toISOString());
              await env.DB.prepare(
                `INSERT OR IGNORE INTO email_schedule (id, subscriber_email, template_id, scheduled_date, status, created_at) VALUES (?, ?, ?, ?, 'pending', ?)`
              ).bind(crypto.randomUUID(), email, confSched.t8TemplateId, scheduleDate(1), now).run();
              await env.DB.prepare(
                `INSERT OR IGNORE INTO email_schedule (id, subscriber_email, template_id, scheduled_date, status, created_at) VALUES (?, ?, ?, ?, 'pending', ?)`
              ).bind(crypto.randomUUID(), email, confSched.t9TemplateId, scheduleDate(6), now).run();
            } catch (schedErr) {
              console.error("schedule_followup_failed", schedErr);
            }
          } catch (error) {
            subscriberEmailError = errorMessage(error, "brevo_welcome_email_failed");
            console.error("brevo_welcome_email_failed", error);
          }
        } else if (!existing) {
          try {
            await sendPendingSubscriberEmail(env, { email, name, source });
            subscriberEmailSent = true;
          } catch (error) {
            subscriberEmailError = errorMessage(error, "pending_email_failed");
            console.error("pending_email_failed", error);
          }
        }
        let adminNotificationSent = false;
        let adminNotificationError = null;
        try {
          await sendAdminNotificationEmail(env, { email, name, source, status, isNew: !existing });
          adminNotificationSent = true;
        } catch (error) {
          adminNotificationError = errorMessage(error, "admin_notification_failed");
          console.error("admin_notification_failed", error);
        }
        await env.DB.prepare(
          `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          existing ? "subscribe_request_update" : "subscribe_request",
          email,
          subscriberId,
          JSON.stringify({ source, newsletterOptIn, status, approvedAt, brevoSynced, subscriberEmailSent, adminNotificationSent, existing: !!existing }),
          now
        ).run();
        return json(request, env, {
          ok: true,
          message,
          email,
          status,
          approvedAt,
          brevoSynced,
          brevoSyncError,
          subscriberEmailSent,
          subscriberEmailError,
          adminNotificationSent,
          adminNotificationError
        });
      } catch (error) {
        console.error("subscribe_failed", error);
        return json(request, env, { ok: false, error: errorMessage(error, "subscribe_failed") }, 500);
      }
    }
    if (request.method === "POST" && path === "/send_magic_link") {
      try {
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        if (!email || !isValidEmail(email)) {
          return json(request, env, { ok: false, error: "invalid_email" }, 400);
        }
        const subscriber = await env.DB.prepare(
          `SELECT id, email, name, status, source FROM subscribers WHERE email = ? LIMIT 1`
        ).bind(email).first();
        let sent = false;
        let sendError = null;
        if (subscriber && subscriber.status === "approved") {
          try {
            await sendMagicLinkEmail(env, url.origin, subscriber);
            sent = true;
            await env.DB.prepare(
              `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`
            ).bind(
              crypto.randomUUID(),
              "send_magic_link",
              email,
              subscriber.id,
              JSON.stringify({ email }),
              (/* @__PURE__ */ new Date()).toISOString()
            ).run();
          } catch (error) {
            sendError = errorMessage(error, "send_magic_link_failed");
          }
        }
        return json(request, env, { ok: true, message: "if_approved_magic_link_sent", sent, sendError });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "send_magic_link_failed") }, 500);
      }
    }
    if (request.method === "GET" && path === "/verify_magic_link") {
      try {
        const token = (url.searchParams.get("token") || "").trim();
        if (!token) return html("<h2>Missing token</h2>", 400);
        const tokenHash = await magicLinkHash(env, token);
        const now = (/* @__PURE__ */ new Date()).toISOString();
        const link = await env.DB.prepare(
          `SELECT magic_links.id AS magic_link_id, magic_links.subscriber_id AS subscriber_id,
                  subscribers.email AS email, subscribers.name AS name, subscribers.status AS status
           FROM magic_links JOIN subscribers ON subscribers.id = magic_links.subscriber_id
           WHERE magic_links.token_hash = ? AND magic_links.used_at IS NULL AND magic_links.expires_at > ?
           LIMIT 1`
        ).bind(tokenHash, now).first();
        if (!link) return html("<h2>\u05D4\u05E7\u05D9\u05E9\u05D5\u05E8 \u05D0\u05D9\u05E0\u05D5 \u05EA\u05E7\u05E3 \u05D0\u05D5 \u05E9\u05E4\u05D2 \u05EA\u05D5\u05E7\u05E4\u05D5.</h2>", 403);
        if (link.status !== "approved") return html("<h2>\u05D4\u05D2\u05D9\u05E9\u05D4 \u05E2\u05D3\u05D9\u05D9\u05DF \u05DC\u05D0 \u05D0\u05D5\u05E9\u05E8\u05D4.</h2>", 403);
        await env.DB.prepare(`UPDATE magic_links SET used_at = ? WHERE id = ?`).bind(now, link.magic_link_id).run();
        const session = await createSession(env, link.subscriber_id);
        await env.DB.prepare(`UPDATE subscribers SET last_login_at = ? WHERE id = ?`).bind(now, link.subscriber_id).run();
        await env.DB.prepare(
          `INSERT INTO audit_log (id, action, actor, target_id, meta_json, created_at) VALUES (?, ?, ?, ?, ?, ?)`
        ).bind(
          crypto.randomUUID(),
          "verify_magic_link",
          link.email,
          link.subscriber_id,
          JSON.stringify({ email: link.email }),
          now
        ).run();
        return redirect(env.SITE_BASE_URL, {
          "Set-Cookie": buildSessionCookie(session.token, session.maxAgeSeconds)
        });
      } catch (error) {
        return html(`<h2>${escapeHtml(errorMessage(error, "verify_magic_link_failed"))}</h2>`, 500);
      }
    }
    if (request.method === "GET" && path === "/session_me") {
      try {
        const subscriber = await getSessionSubscriber(request, env);
        if (!subscriber) return json(request, env, { ok: true, authenticated: false });
        return json(request, env, {
          ok: true,
          authenticated: true,
          subscriber: {
            id: subscriber.subscriber_id,
            email: subscriber.email,
            name: subscriber.name,
            status: subscriber.status,
            source: subscriber.source,
            newsletterOptIn: !!subscriber.newsletter_opt_in,
            createdAt: subscriber.created_at,
            approvedAt: subscriber.approved_at,
            lastLoginAt: subscriber.last_login_at
          }
        });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "session_me_failed") }, 500);
      }
    }
    if (request.method === "POST" && path === "/logout") {
      try {
        await revokeSessionByToken(request, env);
        return json(request, env, { ok: true, message: "logged_out" }, 200, { "Set-Cookie": clearSessionCookie() });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "logout_failed") }, 500);
      }
    }
    if (request.method === "GET" && path === "/admin_action") {
      try {
        const action = (url.searchParams.get("action") || "").trim();
        const email = normalizeEmail(url.searchParams.get("email"));
        const ts = (url.searchParams.get("ts") || "").trim();
        const sig = (url.searchParams.get("sig") || "").trim();
        if (!action || !email || !ts || !sig) return html("<h2>Missing parameters</h2>", 400);
        if (!["approve", "block"].includes(action)) return html("<h2>Invalid action</h2>", 400);
        const ageMs = Date.now() - Number(ts);
        const maxAgeMs = 7 * 24 * 60 * 60 * 1e3;
        if (!Number.isFinite(Number(ts)) || ageMs < 0 || ageMs > maxAgeMs) {
          return html("<h2>This admin link has expired.</h2>", 403);
        }
        const payload = `${action}|${email}|${ts}`;
        const expectedSig = await hmacHex(env.ADMIN_ACTION_SECRET, payload);
        if (sig !== expectedSig) return html("<h2>Invalid signature.</h2>", 403);
        let result;
        if (action === "approve") result = await approveSubscriberByEmail(env, email, url.origin);
        else result = await blockSubscriberByEmail(env, email);
        if (!result.ok) return html(`<h2>${escapeHtml(result.error || "Action failed")}</h2>`, result.status || 500);
        return html(`
          <div style="font-family:Arial,sans-serif;line-height:1.6;padding:24px;background:#0F0F12;color:#F5F1EA;">
            <h2 style="color:#FFE5A0;">\u2728 \u05D4\u05E4\u05E2\u05D5\u05DC\u05D4 \u05D4\u05D5\u05E9\u05DC\u05DE\u05D4</h2>
            <p><strong style="color:#C9A961;">\u05DE\u05D9\u05D9\u05DC:</strong> ${escapeHtml(email)}</p>
            <p><strong style="color:#C9A961;">\u05E1\u05D8\u05D8\u05D5\u05E1:</strong> ${escapeHtml(result.status)}</p>
            <p><a href="${escapeHtml(env.SITE_BASE_URL)}" style="color:#FFE5A0;">\u05D7\u05D6\u05E8\u05D4 \u05DC\u05D0\u05EA\u05E8</a></p>
          </div>
        `);
      } catch (error) {
        return html(`<h2>${escapeHtml(errorMessage(error, "admin_action_failed"))}</h2>`, 500);
      }
    }
    if (request.method === "POST" && path === "/approve_subscriber") {
      try {
        if (!isAuthorizedAdmin(request, env)) {
          return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
        }
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        if (!email) return json(request, env, { ok: false, error: "missing_email" }, 400);
        const result = await approveSubscriberByEmail(env, email, url.origin);
        if (!result.ok) return json(request, env, { ok: false, error: result.error }, result.status || 500);
        return json(request, env, {
          ok: true,
          message: result.alreadyApproved ? "subscriber_already_approved" : "subscriber_approved",
          email: result.email,
          status: result.status,
          approvedAt: result.approvedAt,
          alreadyApproved: result.alreadyApproved,
          brevoSynced: result.brevoSynced,
          brevoSyncError: result.brevoSyncError,
          approvedEmailSent: result.approvedEmailSent,
          approvedEmailError: result.approvedEmailError
        });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "approve_failed") }, 500);
      }
    }
    if (request.method === "POST" && path === "/block_subscriber") {
      try {
        if (!isAuthorizedAdmin(request, env)) {
          return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
        }
        const body = await readJson(request);
        const email = normalizeEmail(body.email);
        if (!email) return json(request, env, { ok: false, error: "missing_email" }, 400);
        const result = await blockSubscriberByEmail(env, email);
        if (!result.ok) return json(request, env, { ok: false, error: result.error }, result.status || 500);
        return json(request, env, {
          ok: true,
          message: result.alreadyBlocked ? "subscriber_already_blocked" : "subscriber_blocked",
          email: result.email,
          status: result.status,
          blockedAt: result.blockedAt,
          alreadyBlocked: result.alreadyBlocked,
          brevoRemoved: result.brevoRemoved,
          brevoRemoveError: result.brevoRemoveError
        });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "block_failed") }, 500);
      }
    }
    if (request.method === "GET" && path === "/list_subscribers") {
      try {
        if (!isAuthorizedAdmin(request, env)) {
          return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
        }
        const result = await env.DB.prepare(
          `SELECT id, email, name, status, source, newsletter_opt_in, created_at, approved_at, blocked_at, last_login_at
           FROM subscribers ORDER BY created_at DESC`
        ).all();
        return json(request, env, { ok: true, items: result.results || [] });
      } catch (error) {
        return json(request, env, { ok: false, error: errorMessage(error, "list_failed") }, 500);
      }
    }
    if (request.method === "GET" && path === "/list_musicians") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
      const result = await env.DB.prepare(`SELECT * FROM musicians ORDER BY created_at DESC LIMIT 500`).all();
      return json(request, env, { ok: true, items: result.results || [] });
    }
    if (request.method === "GET" && path === "/list_events") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
      const result = await env.DB.prepare(`SELECT * FROM event_requests ORDER BY created_at DESC LIMIT 500`).all();
      return json(request, env, { ok: true, items: result.results || [] });
    }
    if (request.method === "GET" && path === "/list_students") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
      const result = await env.DB.prepare(`SELECT * FROM student_inquiries ORDER BY created_at DESC LIMIT 500`).all();
      return json(request, env, { ok: true, items: result.results || [] });
    }
    if (request.method === "GET" && path === "/list_contacts") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
      const result = await env.DB.prepare(`SELECT * FROM contact_messages ORDER BY created_at DESC LIMIT 500`).all();
      return json(request, env, { ok: true, items: result.results || [] });
    }
    if (request.method === "GET" && path === "/list_tally_submissions") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized_admin" }, 401);
      const result = await env.DB.prepare(
        `SELECT id, form_id, form_name, submission_id, form_type, routed_to_table, routed_to_id, created_at
         FROM tally_submissions ORDER BY created_at DESC LIMIT 100`
      ).all();
      return json(request, env, { ok: true, items: result.results || [] });
    }
    if (request.method === "POST" && path === "/fillout_webhook") {
      try {
        const secret = url.searchParams.get("secret") || "";
        if (!secret || secret !== (env.FILLOUT_WEBHOOK_SECRET || "")) {
          return json(request, env, { ok: false, error: "unauthorized" }, 401);
        }
        const rawBody = await request.text();
        let payload;
        try {
          payload = JSON.parse(rawBody);
        } catch {
          return json(request, env, { ok: false, error: "invalid_json" }, 400);
        }
        const questions = payload?.submission?.questions || payload?.questions || [];
        const findQ = /* @__PURE__ */ __name((...labels) => {
          for (const lbl of labels) {
            const q = questions.find((q2) => (q2.name || "").toLowerCase().includes(lbl.toLowerCase()) || (q2.label || "").toLowerCase().includes(lbl.toLowerCase()));
            if (q && q.value !== null && q.value !== void 0 && q.value !== "") return String(q.value).trim();
          }
          return "";
        }, "findQ");
        const email = (findQ("\u05DB\u05EA\u05D5\u05D1\u05EA \u05DE\u05D9\u05D9\u05DC", "email", "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC", "\u05DE\u05D9\u05D9\u05DC") || "").toLowerCase().trim();
        if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
          return json(request, env, { ok: true, skipped: true, reason: "no_email" });
        }
        const firstName = findQ("\u05E9\u05DE\u05D9 \u05D4\u05E4\u05E8\u05D8\u05D9", "\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9", "first name");
        const lastName = findQ("\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05EA\u05D9", "\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4", "last name");
        const city = findQ("\u05D1\u05D0\u05EA\u05D9 \u05DE", "\u05E2\u05D9\u05E8", "city");
        const phone = findQ("\u05D5\u05D8\u05DC\u05E4\u05D5\u05E0\u05D9", "\u05D8\u05DC\u05E4\u05D5\u05DF", "phone");
        const studied = questions.find((q) => (q.name || "").includes("\u05DE\u05D4 \u05DC\u05DE\u05D3\u05EA\u05D9"))?.value;
        const interests = questions.find((q) => (q.name || "").includes("\u05EA\u05D7\u05D5\u05DD \u05D4\u05D4\u05EA\u05E2\u05E0\u05D9\u05D9\u05E0\u05D5\u05EA") || (q.name || "").includes("\u05E1\u05E4\u05E8\u05D9 \u05DC\u05D9"))?.value;
        const isMusicianRaw = questions.find((q) => (q.name || "").includes("\u05D0\u05DE\u05E0\u05DD \u05D4\u05E8\u05E9\u05D9\u05DE\u05D4"))?.value;
        const isMusician = isMusicianRaw === true || isMusicianRaw === "true" || isMusicianRaw === "\u05DB\u05DF";
        const musicRoles = questions.find((q) => (q.name || "").includes("\u05D0\u05D5\u05D4\u05D5, \u05DE\u05D5\u05E1\u05D9\u05E7\u05D0\u05D9\u05EA") || (q.name || "").includes("\u05EA\u05D7\u05D5\u05DE\u05D9 \u05DE\u05D5\u05E1\u05D9\u05E7\u05D4"))?.value;
        const brevoAttrs = {};
        if (firstName) brevoAttrs.FIRSTNAME = firstName;
        if (lastName) brevoAttrs.LASTNAME = lastName;
        if (city) brevoAttrs.CITY = city;
        if (phone) brevoAttrs.PHONE = phone;
        if (studied) brevoAttrs.INSTRUMENT = Array.isArray(studied) ? studied.join(", ") : String(studied);
        if (interests) brevoAttrs.INTERESTS = Array.isArray(interests) ? interests.join(", ") : String(interests);
        if (musicRoles) brevoAttrs.PROFESSION = Array.isArray(musicRoles) ? musicRoles.join(", ") : String(musicRoles);
        await brevoRequest(env, `/contacts/${encodeURIComponent(email)}`, {
          method: "PUT",
          body: { attributes: brevoAttrs }
        });
        if (firstName || lastName) {
          const fullName = (firstName + " " + lastName).trim();
          await env.DB.prepare(
            `UPDATE subscribers SET name = ? WHERE email = ?`
          ).bind(fullName, email).run().catch(() => {
          });
        }
        await env.DB.prepare(
          `INSERT OR IGNORE INTO audit_log (id, action, target_email, notes, created_at)
           VALUES (?, 'fillout_profile_update', ?, ?, ?)`
        ).bind(crypto.randomUUID(), email, JSON.stringify(brevoAttrs), (/* @__PURE__ */ new Date()).toISOString()).run().catch(() => {
        });
        try {
          const SHEET_ID = "18d-QBuzl4tKJSTEp70ZsOdvu081YFKWh9W7zSrI50GE";
          const SHEET_NAME = "newsletter_subscribers";
          const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              client_id: env.GMAIL_CLIENT_ID,
              client_secret: env.GMAIL_CLIENT_SECRET,
              refresh_token: env.GMAIL_REFRESH_TOKEN,
              grant_type: "refresh_token"
            })
          });
          const tokenData = await tokenRes.json();
          const accessToken = tokenData.access_token;
          if (accessToken) {
            const readRes = await fetch(
              `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME + "!A:A")}`,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            const readData = await readRes.json();
            const rows = readData.values || [];
            const existingRowIdx = rows.findIndex((r, i) => i > 0 && r[0] === email);
            const now = (/* @__PURE__ */ new Date()).toISOString();
            const fullName = (firstName + " " + lastName).trim() || email;
            if (existingRowIdx === -1) {
              await fetch(
                `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME + "!A:I")}:append?valueInputOption=RAW&insertDataOption=INSERT_ROWS`,
                {
                  method: "POST",
                  headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
                  body: JSON.stringify({ values: [[email, firstName || fullName, "fillout_t9", now, "active", "", "", "", ""]] })
                }
              );
            } else {
              const rowNum = existingRowIdx + 1;
              if (firstName) {
                await fetch(
                  `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${encodeURIComponent(SHEET_NAME + "!B" + rowNum)}?valueInputOption=RAW`,
                  {
                    method: "PUT",
                    headers: { Authorization: `Bearer ${accessToken}`, "Content-Type": "application/json" },
                    body: JSON.stringify({ values: [[firstName]] })
                  }
                );
              }
            }
          }
        } catch (sheetErr) {
          console.error("Sheet sync failed:", sheetErr?.message);
        }
        return json(request, env, { ok: true, email, updated: Object.keys(brevoAttrs) });
      } catch (error) {
        return json(request, env, { ok: false, error: error?.message || "fillout_webhook_failed" }, 500);
      }
    }
    if (request.method === "POST" && path === "/admin/sync_crm") {
      if (!isAuthorizedAdmin(request, env)) return json(request, env, { ok: false, error: "unauthorized" }, 401);
      try {
        const count = await syncCrmToSheet(env);
        return json(request, env, { ok: true, rows: count, message: `Synced ${count} subscribers to CRM sheet` });
      } catch (err) {
        return json(request, env, { ok: false, error: err?.message || "sync_failed" }, 500);
      }
    }
    return json(request, env, { ok: false, error: "not_found" }, 404);
  },
  scheduled: handleScheduled
};
var TEMPLATE9_HTML = `<!DOCTYPE html>
<html dir="rtl" lang="he">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background-color:#0F0F12;direction:rtl;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0F0F12;">
<tr><td align="center" style="padding:24px 12px;">
<table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background-color:#0F0F12;">
<tr><td align="center" style="padding:28px 32px 20px;border-bottom:1px solid #6B1F2A;">
<img src="https://raw.githubusercontent.com/tobywpictuers3/the-music-dd01e777/main/src/assets/logo-white.png" alt="TOBY music" width="175" style="max-width:175px;height:auto;display:block;margin:0 auto;">
</td></tr>
<tr><td style="padding:28px 32px 0;">
<p style="font-family:Georgia,serif;font-size:28px;font-weight:700;color:#C9A961;margin:0 0 20px;line-height:1.3;text-align:center;">\u05E0\u05E2\u05D9\u05DD \u05DC\u05D4\u05DB\u05D9\u05E8?---- \u{1F60A}</p>
<p style="font-family:Georgia,serif;font-size:22px;font-weight:700;color:#FFE5A0;line-height:1.6;margin:0 0 20px;text-align:center;">\u05E8\u05D2\u05E2...\u05DC\u05D0 \u05E2\u05E9\u05D9\u05E0\u05D5 \u05DB\u05D1\u05E8 \u05D4\u05D9\u05DB\u05E8\u05D5\u05EA?</p>
<p style="font-family:Arial,sans-serif;font-size:17px;color:#F5F1EA;line-height:2.0;margin:0;text-align:center;">\u05E0\u05D5----<br>\u05D8\u05D5\u05D1\u05D9, \u05E9\u05DB\u05D7\u05EA<br>\u05E2\u05E8\u05DB\u05E0\u05D5 \u05D4\u05D9\u05DB\u05E8\u05D5\u05EA \u05D1\u05DE\u05D9\u05D9\u05DC \u05D4\u05E7\u05D5\u05D3\u05DD<br>\u05D4\u05DE\u05DB\u05D7\u05DB\u05D7 \u05D4\u05D4\u05D5\u05D0----<br>\u05D6\u05D4 \u05E9\u05DE\u05E8\u05D9\u05DD \u05D2\u05D5\u05D8\u05DC\u05D9\u05D1, \u05D4\u05DE\u05D5\u05E8\u05D4 \u05D4\u05D0\u05D2\u05D3\u05D9\u05EA \u05DC\u05E4\u05D9\u05EA\u05D5\u05D7 \u05E7\u05D5\u05DC<br>\u05DB\u05D1\u05E8 \u05DE\u05D7\u05EA\u05D4 \u05E0\u05DE\u05E8\u05E6\u05D5\u05EA \u05E2\u05DC \u05DB\u05DA \u05E9\u05D6\u05D4 \u05D4\u05D5\u05E8\u05E1 \u05D0\u05EA \u05D4\u05D2\u05E8\u05D5\u05DF*</p>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:20px 0;"><tr>
<td style="background-color:#1a1014;border-right:3px solid #C9A961;border-radius:0 4px 4px 0;padding:16px 18px;">
<p style="font-family:Arial,sans-serif;font-size:17px;color:#FFE5A0;line-height:1.9;margin:0;text-align:center;">\u05D0\u05D6 \u05DB\u05DF:)<br>\u05E0\u05DB\u05D5\u05DF....<br>\u05E2\u05E9\u05D9\u05E0\u05D5 \u05D4\u05D9\u05DB\u05E8\u05D5\u05EA<br>\u05D4\u05D9\u05DB\u05E8\u05D5\u05EA \u05D7\u05D3 \u05E6\u05D3\u05D3\u05D9\u05EA** \u05D1\u05D4\u05D7\u05DC\u05D8 \u05DE\u05D5\u05D7\u05DC\u05D8 \u05DC\u05D2\u05DE\u05E8\u05D9<br>\u05D5\u05DC\u05DE\u05E2\u05DF \u05D4\u05D4\u05D2\u05D9\u05E0\u05D5\u05EA,<br>\u05D4\u05D9\u05D5\u05E9\u05E8<br>\u05D5\u05D4\u05E6\u05D3\u05E7 \u05D4\u05E2\u05D5\u05DC\u05DE\u05D9-<br>\u05D2\u05DD \u05D0\u05EA \u05DE\u05D5\u05D6\u05DE\u05E0\u05EA \u05DC\u05D4\u05E9\u05DC\u05D9\u05DD \u05D0\u05EA \u05D4\u05D4\u05D9\u05DB\u05E8\u05D5\u05EA</p>
</td></tr></table>
<table width="100%" cellpadding="0" cellspacing="0" style="margin:28px 0;"><tr><td align="center">
<a href="https://forms.fillout.com/t/gufnrMGwgmus" style="display:inline-block;padding:13px 32px;background:linear-gradient(110deg,#8B2A37,#C9A961,#FFE5A0,#C9A961,#6B1F2A);color:#0F0F12;font-family:Arial,sans-serif;font-weight:700;font-size:17px;border-radius:8px;text-decoration:none;">&#x2728; \u05DB\u05E0\u05E1\u05D9 \u05DC\u05D4\u05DE\u05E9\u05DA \u05D4\u05D4\u05D9\u05DB\u05E8\u05D5\u05EA \u05D4\u05D4\u05D3\u05D3\u05D9\u05EA</a>
</td></tr></table>
<p style="font-family:Georgia,serif;font-size:14px;font-style:italic;color:#8B6030;line-height:1.9;margin:0 0 12px;text-align:center;">*\u05E0\u05D1\u05D4\u05DC\u05EA \u05E9\u05D0\u05E0\u05D9 \u05DE\u05D1\u05D9\u05D0\u05D4 \u05D8\u05D9\u05E4\u05D9\u05DD \u05DC\u05D0 \u05DE\u05E7\u05E6\u05D5\u05E2\u05D9\u05D9\u05DD? \u05E9\u05D9\u05DE\u05D9 \u05DC\u05D1 \u05E9\u05E9\u05DE\u05EA\u05D9 \u05E9\u05DD \u05DB\u05D5\u05DB\u05D1\u05D9\u05EA \u05D0\u05D6\u05D4\u05E8\u05D4 \u05D1\u05E1\u05D5\u05E3!!! \u05DC\u05DB\u05D9 \u05DC\u05D1\u05D3\u05D5\u05E7...</p>
<p style="font-family:Georgia,serif;font-size:14px;font-style:italic;color:#8B6030;line-height:1.9;margin:0 0 8px;text-align:center;">**\u05D0\u05EA \u05DB\u05D1\u05E8 \u05E9\u05DE\u05D4 \u05DC\u05D1.... \u05D6\u05D5 \u05DC\u05D0 \u05EA\u05E4\u05D5\u05E6\u05D4 \u05D1\u05D4 \u05E7\u05D5\u05E8\u05D0\u05D9\u05DD \u05D0\u05D9\u05D6\u05D4 \u05D8\u05E7\u05E1\u05D8 \u05D7\u05DE\u05D5\u05D3\u05D9 \u05D5\u05D4\u05D5\u05DC\u05DB\u05D9\u05DD \u05D4\u05DC\u05D0\u05D4, \u05DC\u05DE\u05D9\u05D9\u05DC \u05D4\u05D1\u05D0<br>\u05D0\u05EA, \u05D0\u05E0\u05D9, \u05D0\u05E0\u05D7\u05E0\u05D5= \u05E7\u05D4\u05D9\u05DC\u05D4 \u05D1\u05D4\u05EA\u05D4\u05D5\u05D5\u05EA!<br>\u05DE\u05D5\u05D6\u05DE\u05E0\u05EA \u05DC\u05D4\u05D2\u05D9\u05D1, \u05DC\u05D1\u05E7\u05E9, \u05DC\u05E9\u05D0\u05D5\u05DC \u05D5\u05DC\u05D4\u05EA\u05E2\u05E0\u05D9\u05D9\u05DF.<br>\u05DC\u05D0 \u05DE\u05E4\u05D8\u05D9\u05D7\u05D4 \u05DC\u05E2\u05E0\u05D5\u05EA<br>\u05DB\u05DF \u05DE\u05E4\u05D8\u05D9\u05D7\u05D4 \u05D1\u05DC\u05D9 \u05E0\u05D3\u05E8 \u05DC\u05D4\u05EA\u05E2\u05E0\u05D9\u05D9\u05DF \u05D5\u05DC\u05E7\u05E8\u05D5\u05D0 \u05D1\u05EA\u05E9\u05D5\u05DE\u05EA \u05DC\u05D1:)</p>
</td></tr>
<tr><td style="padding:16px 32px 0;">
<table width="100%" cellpadding="0" cellspacing="0"><tr><td height="1" style="background:linear-gradient(110deg,#6B1F2A,#C9A961,#FFE5A0,#C9A961,#6B1F2A);font-size:0;line-height:0;">&nbsp;</td></tr></table>
</td></tr>
<tr><td style="padding:20px 32px 28px;text-align:center;">
<p style="font-family:Georgia,serif;font-size:18px;font-weight:700;color:#C9A961;margin:0 0 6px;">\u05D8\u05D5\u05D1\u05D9 \u05D5\u05D9\u05E0\u05D1\u05E8\u05D2</p>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#8B6030;margin:0 0 6px;line-height:1.7;">\u05E7\u05DC\u05D9\u05D3\u05E0\u05D9\u05EA &middot; \u05D7\u05DC\u05D9\u05DC\u05E0\u05D9\u05EA &middot; \u05DE\u05E0\u05D4\u05DC\u05EA \u05EA\u05D6\u05DE\u05D5\u05E8\u05EA &middot; \u05D4\u05D5\u05E8\u05D0\u05EA \u05E4\u05E1\u05E0\u05EA\u05E8 \u05D5\u05D7\u05DC\u05D9\u05DC \u05E6\u05D3</p>
<p style="font-family:Arial,sans-serif;font-size:13px;color:#8B6030;margin:0 0 8px;"><a href="tel:0504124161" style="color:#8B6030;text-decoration:none;">050-412-4161</a></p>
<p style="font-family:Georgia,serif;font-size:13px;font-style:italic;color:#6B1F2A;margin:0;">&quot;\u05D0\u05D5\u05DE\u05E0\u05D5\u05EA \u05D5\u05D0\u05DE\u05D9\u05E0\u05D5\u05EA, \u05D6\u05D5 \u05D9\u05E6\u05D9\u05E8\u05D4&quot;</p>
</td></tr>
</table></td></tr></table>
</body></html>`;
async function syncCrmToSheet(env) {
  const SHEET_WEBHOOK_URL = env.SHEET_WEBHOOK_URL;
  const SHEET_WEBHOOK_SECRET = env.SHEET_WEBHOOK_SECRET;
  if (!SHEET_WEBHOOK_URL || !SHEET_WEBHOOK_SECRET) {
    console.log("CRM sync skipped: SHEET_WEBHOOK_URL or SHEET_WEBHOOK_SECRET not set");
    return 0;
  }
  const result = await env.DB.prepare(
    `SELECT email, name, source, newsletter_opt_in,
            created_at, approved_at, last_login_at
     FROM subscribers
     WHERE status = 'approved'
     ORDER BY approved_at DESC`
  ).all();
  const rows = result.results || [];
  const now = /* @__PURE__ */ new Date();
  const headers = [
    "\u05D0\u05D9\u05DE\u05D9\u05D9\u05DC",
    "\u05E9\u05DD \u05E4\u05E8\u05D8\u05D9",
    "\u05E9\u05DD \u05DE\u05E9\u05E4\u05D7\u05D4",
    "\u05E9\u05DD \u05DE\u05DC\u05D0",
    "\u05DE\u05E7\u05D5\u05E8",
    "\u05E0\u05D9\u05D5\u05D6\u05DC\u05D8\u05E8",
    "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D4\u05E8\u05E9\u05DE\u05D4",
    "\u05EA\u05D0\u05E8\u05D9\u05DA \u05D0\u05D9\u05E9\u05D5\u05E8",
    "\u05DB\u05E0\u05D9\u05E1\u05D4 \u05D0\u05D7\u05E8\u05D5\u05E0\u05D4",
    "\u05D9\u05DE\u05D9\u05DD \u05DE\u05D0\u05D6 \u05D4\u05E8\u05E9\u05DE\u05D4"
  ];
  const dataRows = rows.map((sub) => {
    const nameParts = (sub.name || "").trim().split(" ");
    const firstName = nameParts[0] || "";
    const lastName = nameParts.slice(1).join(" ") || "";
    const createdAt = sub.created_at ? sub.created_at.slice(0, 10) : "";
    const approvedAt = sub.approved_at ? sub.approved_at.slice(0, 10) : "";
    const lastLogin = sub.last_login_at ? sub.last_login_at.slice(0, 10) : "";
    const daysSince = sub.created_at ? Math.floor((now - new Date(sub.created_at)) / (1e3 * 60 * 60 * 24)) : "";
    return [
      sub.email,
      firstName,
      lastName,
      sub.name || "",
      sub.source || "",
      sub.newsletter_opt_in ? "\u05DB\u05DF" : "\u05DC\u05D0",
      createdAt,
      approvedAt,
      lastLogin,
      daysSince
    ];
  });
  const res = await fetch(SHEET_WEBHOOK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      secret: SHEET_WEBHOOK_SECRET,
      rows: [headers, ...dataRows]
    })
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Sheet webhook failed: ${res.status} ${err.slice(0, 200)}`);
  }
  const result2 = await res.json();
  console.log(`CRM sync: ${result2.rows || rows.length} rows written`);
  return rows.length;
}
__name(syncCrmToSheet, "syncCrmToSheet");
__name2(syncCrmToSheet, "syncCrmToSheet");
async function syncBrevoStatsToAirtable(env) {
  const AT_TOKEN = "patXNqbxy2uPpwzXn.0cadfe2b1f32b01fc691dfa6d501db8a9bdcc150004cb1eb11aa44048b42ec03";
  const BASE = "appL485Q3pKnZixHw";
  const TABLE = "tbldzrYfboGgHaXKP";
  const API1 = env.BREVO_API_KEY;
  const API2 = env.BREVO_API_KEY_2;
  const T7_IDS = /* @__PURE__ */ new Set([7, 1]);
  const T8_IDS = /* @__PURE__ */ new Set([8, 2]);
  const T9_IDS = /* @__PURE__ */ new Set([32, 3]);
  async function fetchBrevoEvents(apiKey) {
    try {
      const res = await fetch("https://api.brevo.com/v3/smtp/statistics/events?limit=500&sort=desc", {
        headers: { "api-key": apiKey }
      });
      const data = await res.json();
      return data.events || [];
    } catch (e) {
      console.error("brevo_stats_fetch_failed:", e.message);
      return [];
    }
  }
  __name(fetchBrevoEvents, "fetchBrevoEvents");
  const [events1, events2] = await Promise.all([
    fetchBrevoEvents(API1),
    fetchBrevoEvents(API2)
  ]);
  const stats = {};
  const allEvents = [...events1, ...events2];
  for (const e of allEvents) {
    const email = (e.email || "").toLowerCase().trim();
    if (!email) continue;
    if (!stats[email]) stats[email] = { t7: false, t8: false, t9: false, opened: false, clicked: false };
    const tid = e.templateId;
    const ev = e.event;
    if (ev === "delivered") {
      if (T7_IDS.has(tid)) stats[email].t7 = true;
      else if (T8_IDS.has(tid)) stats[email].t8 = true;
      else if (T9_IDS.has(tid)) stats[email].t9 = true;
    }
    if (ev === "opened") stats[email].opened = true;
    if (ev === "clicks") stats[email].clicked = true;
  }
  if (Object.keys(stats).length === 0) {
    console.log("airtable_stats_sync: no events");
    return 0;
  }
  const emailToId = {};
  let offset = null;
  do {
    const qs = "fields%5B%5D=" + encodeURIComponent("\u05DE\u05D9\u05D9\u05DC") + "&pageSize=100" + (offset ? "&offset=" + offset : "");
    const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}?${qs}`, {
      headers: { "Authorization": `Bearer ${AT_TOKEN}` }
    });
    const data = await res.json();
    for (const r of data.records || []) {
      const m = (r.fields["\u05DE\u05D9\u05D9\u05DC"] || "").toLowerCase().trim();
      if (m) emailToId[m] = r.id;
    }
    offset = data.offset || null;
  } while (offset);
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const updates = [];
  for (const [email, s] of Object.entries(stats)) {
    const rid = emailToId[email];
    if (!rid) continue;
    const fields = { "\u05EA\u05D0\u05E8\u05D9\u05DA \u05E1\u05E0\u05DB\u05E8\u05D5\u05DF Brevo": now };
    if (s.t7) fields["\u05E7\u05D9\u05D1\u05DC\u05D4 T7"] = true;
    if (s.t8) fields["\u05E7\u05D9\u05D1\u05DC\u05D4 T8"] = true;
    if (s.t9) fields["\u05E7\u05D9\u05D1\u05DC\u05D4 T9"] = true;
    if (s.opened) fields["\u05E4\u05EA\u05D7\u05D4 \u05DE\u05D9\u05D9\u05DC"] = true;
    if (s.clicked) fields["\u05DC\u05D7\u05E6\u05D4 \u05E7\u05D9\u05E9\u05D5\u05E8"] = true;
    updates.push({ id: rid, fields });
  }
  let total = 0;
  for (let i = 0; i < updates.length; i += 10) {
    const batch = updates.slice(i, i + 10);
    try {
      const res = await fetch(`https://api.airtable.com/v0/${BASE}/${TABLE}`, {
        method: "PATCH",
        headers: { "Authorization": `Bearer ${AT_TOKEN}`, "Content-Type": "application/json" },
        body: JSON.stringify({ records: batch })
      });
      const data = await res.json();
      total += (data.records || []).length;
    } catch (e) {
      console.error("airtable_batch_failed:", e.message);
    }
  }
  console.log(`airtable_stats_sync: updated ${total} records`);
  return total;
}
__name(syncBrevoStatsToAirtable, "syncBrevoStatsToAirtable");
__name2(syncBrevoStatsToAirtable, "syncBrevoStatsToAirtable");
async function handleScheduled(event, env) {
  const today = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const due = await env.DB.prepare(
    `SELECT id, subscriber_email, template_id FROM email_schedule 
     WHERE status = 'pending' AND scheduled_date <= ? 
     ORDER BY scheduled_date ASC LIMIT 50`
  ).bind(today).all();
  console.log(`Cron: ${due.results.length} emails due`);
  for (const row of due.results) {
    try {
      const sub = await env.DB.prepare(
        `SELECT name FROM subscribers WHERE email = ? AND status = 'approved'`
      ).bind(row.subscriber_email).first();
      if (!sub) {
        await env.DB.prepare(
          `UPDATE email_schedule SET status = 'skipped', sent_at = ? WHERE id = ?`
        ).bind((/* @__PURE__ */ new Date()).toISOString(), row.id).run();
        continue;
      }
      const nameParts = (sub.name || "").split(" ");
      const subConf = getBrevoConfig(env, row.subscriber_email ? (await env.DB.prepare("SELECT created_at FROM subscribers WHERE email = ?").bind(row.subscriber_email).first())?.created_at : null);
      if (row.template_id === subConf.t9TemplateId || row.template_id === 32) {
        await brevoRequest(env, "/smtp/email", {
          method: "POST",
          apiKey: subConf.apiKey,
          body: {
            sender: { name: "\u05D8\u05D5\u05D1\u05D9 \u05D5\u05D9\u05E0\u05D1\u05E8\u05D2 TOBY music", email: subConf.senderEmail },
            replyTo: { email: "toby.musicartist@gmail.com" },
            to: [{ email: row.subscriber_email, name: sub.name || row.subscriber_email }],
            subject: "\u05E0\u05E2\u05D9\u05DD \u05DC\u05D4\u05DB\u05D9\u05E8",
            htmlContent: TEMPLATE9_HTML
          }
        });
        try {
          const t9Lists = subConf.apiKey === env.BREVO_API_KEY_2 ? [subConf.t9ListId] : [12, 33];
          await brevoRequest(env, "/contacts", {
            method: "POST",
            apiKey: subConf.apiKey,
            body: { email: row.subscriber_email, listIds: t9Lists, updateEnabled: true }
          });
        } catch (e) {
        }
      } else {
        await brevoRequest(env, "/smtp/email", {
          method: "POST",
          apiKey: subConf.apiKey,
          body: {
            to: [{ email: row.subscriber_email, name: sub.name || row.subscriber_email }],
            templateId: row.template_id,
            params: {
              FIRSTNAME: nameParts[0] || "",
              LASTNAME: nameParts.slice(1).join(" ") || ""
            }
          }
        });
        if (row.template_id === 8 || row.template_id === subConf.t8TemplateId) {
          try {
            const t8Lists = subConf.apiKey === env.BREVO_API_KEY_2 ? [subConf.t8ListId] : [12, 34];
            await brevoRequest(env, "/contacts", {
              method: "POST",
              apiKey: subConf.apiKey,
              body: { email: row.subscriber_email, listIds: t8Lists, updateEnabled: true }
            });
          } catch (e) {
          }
        }
      }
      await env.DB.prepare(
        `UPDATE email_schedule SET status = 'sent', sent_at = ? WHERE id = ?`
      ).bind((/* @__PURE__ */ new Date()).toISOString(), row.id).run();
      console.log(`Sent template ${row.template_id} to ${row.subscriber_email}`);
    } catch (err) {
      console.error(`Failed template ${row.template_id} to ${row.subscriber_email}:`, err);
      await env.DB.prepare(
        `UPDATE email_schedule SET status = 'error' WHERE id = ?`
      ).bind(row.id).run();
    }
  }
  try {
    const count = await syncCrmToSheet(env);
    console.log(`CRM sync done: ${count} rows`);
  } catch (err) {
    console.error("CRM sync failed:", err?.message || err);
  }
  try {
    const statsCount = await syncBrevoStatsToAirtable(env);
    console.log(`Brevo stats synced: ${statsCount} records`);
  } catch (err) {
    console.error("Brevo stats sync failed:", err?.message || err);
  }
}
__name(handleScheduled, "handleScheduled");
__name2(handleScheduled, "handleScheduled");
__name2(handleScheduled, "handleScheduled");
__name22(handleScheduled, "handleScheduled");
export {
  worker_default as default
};
//# sourceMappingURL=worker_v4.js.map

--544c8fa5534493c186719631824781b00278e6aff62c538c8650f96f73b6--
