// A drop-in axios adapter that answers /api/* from local memory instead of the
// Express server, so the whole prototype runs offline with no Mongo.
import type { AxiosAdapter, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import * as seed from "./data";

type Row = { id: string } & Record<string, unknown>;

// Everything lives in sessionStorage rather than plain module state, so a full
// page load (or a hard navigation to /admin/*) doesn't wipe the demo. Closing
// the tab still resets to the seed, which is what we want for a throwaway.
const STORE_KEY = "umsa-prototype-state";

/* Bumped by the build so a redeploy invalidates whatever a visitor's tab has
   cached. Without this, anyone who had the site open kept seeing the previous
   deploy's seed data until they closed the tab — which looked exactly like a
   deploy that had not gone out. */
const SEED_VERSION = __SEED_VERSION__;

type Store = {
  version: string;
  db: Record<string, Row[]>;
  session: { email: string } | null;
  content: Record<string, string>;
};

function freshStore(): Store {
  return {
    version: SEED_VERSION,
    db: {
      members: structuredClone(seed.members) as Row[],
      events: structuredClone(seed.events) as Row[],
      sponsors: structuredClone(seed.sponsors) as Row[],
      gallery: structuredClone(seed.gallery) as Row[],
      faqs: structuredClone(seed.faqs) as Row[],
    },
    session: null,
    content: { ...seed.homeContent },
  };
}

function load(): Store {
  try {
    const raw = sessionStorage.getItem(STORE_KEY);
    if (raw) {
      const saved = JSON.parse(raw) as Store;
      // a stale cache from an older build is worse than losing demo edits
      if (saved.version === SEED_VERSION) return saved;
    }
  } catch {
    // corrupt or unavailable storage -> just start clean
  }
  return freshStore();
}

const store = load();
const db = store.db;
const content = store.content;

function persist() {
  try {
    sessionStorage.setItem(STORE_KEY, JSON.stringify(store));
  } catch {
    // private mode / quota — the prototype still works in memory
  }
}

function fail(status: number, code: string, message: string) {
  const err = new Error(message) as Error & { status: number; body: unknown };
  err.status = status;
  err.body = { error: { code, message } };
  return err;
}

function requireSession() {
  if (!store.session) throw fail(401, "UNAUTHORISED", "Not signed in");
}

function nextId(collection: string) {
  return `${collection}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
}

type Ctx = { body: unknown; params: string[] };
type Handler = (ctx: Ctx) => unknown;

// [method, regex, handler] — first match wins
const routes: [string, RegExp, Handler][] = [
  ["GET", /^\/content\/home$/, () => content],
  [
    "PUT",
    /^\/admin\/content\/home$/,
    ({ body }) => {
      requireSession();
      Object.assign(content, body as Record<string, unknown>);
      persist();
      return content;
    },
  ],

  ["GET", /^\/admin\/auth\/me$/, () => {
    requireSession();
    return store.session;
  }],
  [
    "POST",
    /^\/admin\/auth\/login$/,
    ({ body }) => {
      const { email, password } = (body ?? {}) as { email?: string; password?: string };
      if (email !== seed.adminUser.email || password !== seed.adminUser.password) {
        throw fail(401, "BAD_CREDENTIALS", "Incorrect email or password.");
      }
      store.session = { email: seed.adminUser.email };
      persist();
      return store.session;
    },
  ],
  ["POST", /^\/admin\/auth\/logout$/, () => {
    store.session = null;
    persist();
    return {};
  }],

  // public reads
  ["GET", /^\/(members|events|sponsors|gallery|faqs)$/, ({ params }) => db[params[0]]],

  // admin writes
  [
    "POST",
    /^\/admin\/(members|events|sponsors|gallery|faqs)$/,
    ({ body, params }) => {
      requireSession();
      const row = { ...(body as Row), id: nextId(params[0]) };
      db[params[0]].unshift(row);
      persist();
      return row;
    },
  ],
  [
    "PUT",
    /^\/admin\/(members|events|sponsors|gallery|faqs)\/([^/]+)$/,
    ({ body, params }) => {
      requireSession();
      const [collection, id] = params;
      const i = db[collection].findIndex((r) => r.id === id);
      if (i === -1) throw fail(404, "NOT_FOUND", "That record no longer exists.");
      db[collection][i] = { ...db[collection][i], ...(body as Row), id };
      persist();
      return db[collection][i];
    },
  ],
  [
    "DELETE",
    /^\/admin\/(members|events|sponsors|gallery|faqs)\/([^/]+)$/,
    ({ params }) => {
      requireSession();
      const [collection, id] = params;
      const i = db[collection].findIndex((r) => r.id === id);
      if (i === -1) throw fail(404, "NOT_FOUND", "That record no longer exists.");
      const [removed] = db[collection].splice(i, 1);
      persist();
      return removed;
    },
  ],
];

function errorResponse(
  config: InternalAxiosRequestConfig,
  err: Error & { status?: number; body?: unknown },
): AxiosResponse {
  return {
    data: err.body,
    status: err.status ?? 500,
    statusText: err.message,
    headers: {},
    config,
  };
}

export const mockAdapter: AxiosAdapter = async (config) => {
  const method = (config.method ?? "get").toUpperCase();
  // config.url is relative to baseURL ("/api"), but strip it defensively
  const path = (config.url ?? "").replace(/^\/api/, "").split("?")[0] || "/";

  // small delay so loading states are actually visible in the demo
  await new Promise((r) => setTimeout(r, 140));

  const match = routes.find(([m, re]) => m === method && re.test(path));

  try {
    if (!match) throw fail(404, "NOT_FOUND", `No mock route for ${method} ${path}`);
    const params = path.match(match[1])!.slice(1);
    const body = typeof config.data === "string" ? JSON.parse(config.data) : config.data;
    const data = match[2]({ body, params });
    return { data, status: 200, statusText: "OK", headers: {}, config };
  } catch (e) {
    const err = e as Error & { status?: number; body?: unknown };
    if (!err.status) throw err;
    throw Object.assign(err, { isAxiosError: true, response: errorResponse(config, err) });
  }
};
