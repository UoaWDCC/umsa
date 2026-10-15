import "dotenv/config";
import assert from "node:assert/strict";
import { once } from "node:events";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { randomUUID } from "node:crypto";

process.env.NODE_ENV = "test";
const database = `umsa_integration_test_${Date.now()}`;
const uri = process.env.ATLAS_URI;
assert(uri, "ATLAS_URI must be configured");
const { default: app } = await import("../src/app.js");
const { default: AdminUser } = await import("../src/models/AdminUser.js");
const { default: SiteRecord } = await import("../src/models/SiteRecord.js");
let server: ReturnType<typeof app.listen> | undefined;
let base = "";
let cookie = "";
async function start() {
  server = app.listen(0, "127.0.0.1");
  await once(server, "listening");
  const address = server.address();
  assert(address && typeof address !== "string");
  base = `http://127.0.0.1:${address.port}/api`;
}
async function request(
  path: string,
  method = "GET",
  body?: unknown,
  auth = false,
) {
  return fetch(base + path, {
    method,
    headers: {
      ...(body ? { "Content-Type": "application/json" } : {}),
      ...(auth ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
}
async function close() {
  if (server)
    await new Promise<void>((resolve, reject) =>
      server!.close((err) => (err ? reject(err) : resolve())),
    );
  server = undefined;
}
try {
  await mongoose.connect(uri, {
    dbName: database,
    serverSelectionTimeoutMS: 10000,
  });
  const password = randomUUID();
  await AdminUser.create({
    email: "integration@example.com",
    passwordHash: await bcrypt.hash(password, 12),
  });
  await start();
  assert.equal((await request("/health")).status, 200);
  assert.equal((await request("/admin/auth/me")).status, 401);
  assert.equal(
    (
      await request("/admin/auth/login", "POST", {
        email: "integration@example.com",
        password: "wrong",
      })
    ).status,
    401,
  );
  const login = await request("/admin/auth/login", "POST", {
    email: "integration@example.com",
    password,
  });
  assert.equal(login.status, 200);
  const setCookie = login.headers.get("set-cookie");
  assert(setCookie);
  assert(setCookie.includes("HttpOnly"));
  cookie = setCookie.split(";")[0];
  assert.equal(
    (await request("/admin/auth/me", "GET", undefined, true)).status,
    200,
  );
  const samples: Record<string, Record<string, string>> = {
    members: {
      fullName: "Integration test",
      role: "Test role",
      committee: "marketing",
      img: "https://example.com/photo.jpg",
    },
    events: {
      eventName: "Integration test",
      eventDate: "2026-12-20",
      eventTag: "Social",
    },
    sponsors: {
      name: "Integration test",
      offer: "Test offer",
      region: "Central",
    },
    gallery: {
      caption: "Integration test",
      src: "https://example.com/photo.jpg",
      album: "Test album",
    },
    faqs: { question: "Integration test?", answer: "Test answer" },
  };
  const ids: Record<string, string> = {};
  for (const [name, sample] of Object.entries(samples)) {
    assert.equal((await request(`/admin/${name}`, "POST", sample)).status, 401);
    assert.equal(
      (await request(`/admin/${name}`, "POST", {}, true)).status,
      400,
    );
    const response = await request(`/admin/${name}`, "POST", sample, true);
    assert.equal(response.status, 201, `${name} create`);
    const row = await response.json();
    ids[name] = row.id;
    assert(mongoose.isObjectIdOrHexString(row.id));
    assert.equal((await (await request(`/${name}`)).json())[0].id, row.id);
    const updated = { ...sample };
    const field =
      name === "faqs"
        ? "answer"
        : name === "members"
          ? "role"
          : name === "events"
            ? "location"
            : name === "sponsors"
              ? "offer"
              : "caption";
    updated[field] = "Persisted update";
    assert.equal(
      (await request(`/admin/${name}/${row.id}`, "PUT", updated, true)).status,
      200,
    );
    assert.equal(
      (await request(`/admin/${name}/${row.id}`, "DELETE")).status,
      401,
    );
    assert.equal(
      (await request(`/admin/${name}/invalid`, "DELETE", undefined, true))
        .status,
      400,
    );
  }
  assert.equal(
    (
      await request(
        "/admin/events",
        "POST",
        { ...samples.events, eventDate: "not-a-date" },
        true,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await request(
        "/admin/gallery",
        "POST",
        { ...samples.gallery, src: "javascript:alert(1)" },
        true,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await request(
        "/admin/members",
        "POST",
        { ...samples.members, committee: "invalid" },
        true,
      )
    ).status,
    400,
  );
  const savedMembers = await (await request("/members")).json();
  assert.equal(savedMembers[0].committee, "marketing");
  const home = {
    heading: "Integration homepage",
    subtitle: "Subtitle",
    aboutHeading: "About",
    aboutBody: "Persisted body",
    introVideoUrl: "https://www.youtube-nocookie.com/embed/abcdefghijk",
  };
  assert.equal((await request("/admin/content/home", "PUT", home)).status, 401);
  assert.equal(
    (await request("/admin/content/home", "PUT", home, true)).status,
    200,
  );
  assert.deepEqual(await (await request("/content/home")).json(), home);
  assert.equal(
    (
      await request(
        "/admin/content/home",
        "PUT",
        { ...home, introVideoUrl: "https://example.com/embed/abcdefghijk" },
        true,
      )
    ).status,
    400,
  );
  assert.equal(
    (
      await request("/contact", "POST", {
        name: "Test",
        email: "test@example.com",
        message: "Hello",
      })
    ).status,
    404,
  );
  assert.equal(
    (
      await request("/membership", "POST", {
        name: "Test",
        email: "test@example.com",
        year: "First year",
      })
    ).status,
    404,
  );
  assert.equal(
    (await request("/admin/submissions", "GET", undefined, true)).status,
    404,
  );
  assert.equal(
    (await request("/admin/uploads/signature", "POST", { folder: "umsa/team" }))
      .status,
    401,
  );
  assert.equal(
    (
      await request(
        "/admin/uploads/signature",
        "POST",
        { folder: "other" },
        true,
      )
    ).status,
    400,
  );
  const signature = await request(
    "/admin/uploads/signature",
    "POST",
    { folder: "umsa/team" },
    true,
  );
  assert.equal(signature.status, 200);
  assert.equal(typeof (await signature.json()).signature, "string");
  // Restart both Express and the database connection: persisted content must remain.
  await close();
  await mongoose.disconnect();
  await mongoose.connect(uri, { dbName: database });
  await start();
  assert.equal(await SiteRecord.countDocuments(), 5);
  assert.deepEqual(await (await request("/content/home")).json(), home);
  assert.equal(
    (
      await request(
        "/admin/content/home",
        "PUT",
        { ...home, introVideoUrl: "https://example.com/embed/abcdefghijk" },
        true,
      )
    ).status,
    400,
  );
  assert.equal(
    (await request("/admin/auth/me", "GET", undefined, true)).status,
    200,
  );
  for (const [name, id] of Object.entries(ids)) {
    assert.equal((await (await request(`/${name}`)).json())[0].id, id);
    assert.equal(
      (await request(`/admin/${name}/${id}`, "DELETE", undefined, true)).status,
      200,
    );
    assert.equal(
      (await request(`/admin/${name}/${id}`, "DELETE", undefined, true)).status,
      404,
    );
  }
  const logout = await request("/admin/auth/logout", "POST", undefined, true);
  assert.equal(logout.status, 200);
  assert(logout.headers.get("set-cookie")?.includes("Expires="));
  cookie = "";
  assert.equal(
    (await request("/admin/auth/me", "GET", undefined, true)).status,
    401,
  );
  console.log(
    "PASS: real MongoDB CRUD for five collections, validation, login/session/logout, homepage, removed submission routes, upload signing, and persistence after restart.",
  );
} finally {
  await close();
  if (mongoose.connection.readyState === 1) {
    assert.equal(mongoose.connection.name, database);
    await mongoose.connection.dropDatabase();
    console.log("Removed isolated integration test database.");
  }
  await mongoose.disconnect();
}
