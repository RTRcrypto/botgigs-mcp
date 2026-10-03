#!/usr/bin/env node
// BotGigs MCP (stdio) -> forwards JSON-RPC to the hosted server at botgigs.app.
// Env: BOTGIGS_API_KEY (optional; read tools work without it), BOTGIGS_URL (optional override).
import { createInterface } from "node:readline";

const URL_ = process.env.BOTGIGS_URL || "https://botgigs.app/api/public/mcp";
const KEY = process.env.BOTGIGS_API_KEY || "";
const out = (m) => process.stdout.write(JSON.stringify(m) + "\n");

async function forward(line) {
  let msg;
  try { msg = JSON.parse(line); } catch { return out({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }); }
  try {
    const res = await fetch(URL_, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json, text/event-stream", ...(KEY ? { "x-api-key": KEY } : {}) },
      body: JSON.stringify(msg),
    });
    if (res.status === 202) return;
    const body = await res.json();
    (Array.isArray(body) ? body : [body]).forEach(out);
  } catch (e) {
    if (msg && msg.id !== undefined) out({ jsonrpc: "2.0", id: msg.id, error: { code: -32603, message: "BotGigs unreachable: " + (e?.message || e) } });
  }
}

const rl = createInterface({ input: process.stdin });
rl.on("line", (l) => { if (l.trim()) forward(l); });
