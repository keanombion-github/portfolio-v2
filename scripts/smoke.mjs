import assert from "node:assert/strict";
const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const paths = [
  "/",
  "/about",
  "/projects",
  "/project/boardsync",
  "/project/storecraft",
  "/blog/storecraft-from-storefronts-to-store-builder",
  "/blog/boardsync-making-work-visible",
  "/blog/from-storefront-work-to-full-stack-projects",
  "/blog",
  "/blog/a-portfolio-with-clear-boundaries",
  "/blog/planning-a-realtime-kanban-board",
  "/recommendations",
  "/rss.xml",
  "/sitemap.xml",
  "/robots.txt",
  "/icon.svg",
  "/opengraph-image",
];
for (const path of paths) {
  const response = await fetch(base + path);
  assert.equal(response.status, 200, path);
  if (path === "/projects") {
    const html = await response.text();
    assert.match(html, /\/project\/storecraft/);
    assert.doesNotMatch(html, /\/project\/invoice-reminder/);
  }
  if (path === "/project/storecraft") {
    const html = await response.text();
    assert.match(html, /https:\/\/storecraft-demo\.netlify\.app/);
    assert.match(html, /storecraft-from-storefronts-to-store-builder/);
    assert.match(html, /simulated/);
  }
  if (path === "/rss.xml")
    assert.match(await response.text(), /<rss version="2.0">/);
  if (path === "/sitemap.xml")
    assert.match(
      await response.text(),
      /\/blog\/planning-a-realtime-kanban-board/,
    );
  console.log("PASS GET " + path);
}
assert.equal((await fetch(base + "/project/does-not-exist")).status, 404);
assert.equal((await fetch(base + "/blog/does-not-exist")).status, 404);
async function post(path, body, origin = base) {
  return fetch(base + path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: origin },
    body: JSON.stringify(body),
  });
}
const chat = await post("/api/chat", {
  messages: [{ role: "user", content: "What is your stack?" }],
});
assert.equal(chat.status, 200);
assert.match((await chat.json()).reply, /React/);
assert.equal(
  (await post("/api/chat", { messages: [{ role: "system", content: "test" }] }))
    .status,
  400,
);
assert.equal(
  (
    await post("/api/chat", {
      messages: [{ role: "user", content: "x".repeat(601) }],
    })
  ).status,
  400,
);
assert.equal(
  (await post("/api/chat", { messages: [] }, "https://unrelated.invalid"))
    .status,
  403,
);
assert.equal(
  (
    await post("/api/chat", {
      messages: [{ role: "user", content: "x".repeat(20000) }],
    })
  ).status,
  413,
);
assert.equal(
  (
    await post("/api/contact", {
      name: "Test",
      email: "invalid",
      message: "This is validation only.",
    })
  ).status,
  400,
);
assert.equal(
  (
    await post("/api/recommendations", {
      name: "Test",
      email: "invalid",
      relationship: "Validation",
      quote: "This is only an input validation test.",
      consent: "yes",
    })
  ).status,
  400,
);
console.log(
  "PASS unknown routes, working chat, invalid roles, input bounds, origin protection, contact and recommendation validation",
);
