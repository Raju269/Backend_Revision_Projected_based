// ============================================================
// Express CRUD — In-memory "database" (an array of users)
// Each user: { id, name, age, email, balance }
//
// Goal: learn the HTTP verbs (GET, POST, PUT, PATCH, DELETE).
// We are NOT learning databases yet, so our "DB" is just an array.
// ============================================================

// FIRST THOUGHT:
// In raw Node we wrote http.createServer, then hand-checked
// req.url + req.method with a pile of if/else, and parsed the body
// chunk-by-chunk. That does not scale. Express exists to delete that
// boilerplate — it gives us app.get / app.post / app.put ... directly.
const express = require("express");
const app = express();

// FIRST THOUGHT:
// The client sends JSON in the request body. In raw Node WE collected
// the data chunks and ran JSON.parse ourselves. Express ships a body
// parser to do this — but it is OFF by default. Turn it on, or every
// req.body will be undefined. (Great trap: comment this line out and
// watch POST break.)
app.use(express.json());

// Our "database": a plain array living in memory. Restart the server
// and it is wiped. That is fine — persistence is a later lesson.
let users = [];

// FIRST THOUGHT:
// To update or delete ONE user, we must be able to point at exactly
// that user. Can we use the array index? No — after a delete, every
// index shifts, so index 2 is now a different person. So each user
// needs a STABLE id. A simple counter is enough.
let nextId = 1;

// ---------- READ (GET) ----------
// "Show me all the users." Read the whole collection.
app.get("/users", (req, res) => {
  res.json(users);
});

// "Show me just ONE user." This is WHY we needed an id — the id
// arrives in the URL as a route param.
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

// ---------- CREATE (POST) ----------
// "Here is a NEW user, add them." The client does NOT know the id —
// the server invents it. That is exactly why creating is POST to the
// collection (/users), not PUT to some id that doesn't exist yet.
app.post("/users", (req, res) => {
  const { name, age, email, balance } = req.body;
  const user = { id: nextId++, name, age, email, balance };
  users.push(user);
  res.status(201).json(user); // 201 = Created
});

// ---------- REPLACE, full (PUT) ----------
// "Replace this user ENTIRELY with what I send." The client must send
// every field. Anything it omits gets wiped out. PUT means:
// "make this record be EXACTLY this." (Demo: PUT without `balance`
// and show students that balance is now gone.)
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const { name, age, email, balance } = req.body;
  users[index] = { id, name, age, email, balance }; // full overwrite
  res.json(users[index]);
});

// ---------- UPDATE, partial (PATCH) ----------
// "I only changed ONE field, don't make me resend everything." PATCH
// merges the fields the client sent onto the existing user and leaves
// the rest untouched. This is THE contrast with PUT.
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  Object.assign(user, req.body); // merge only the incoming fields
  res.json(user);

  // Trap to spring on students: what if the client sends { id: 999 }?
  // Object.assign happily overwrites the id. Ask them to fix it.
});

// ---------- DELETE ----------
// "Remove this user from the collection." splice by index, return the
// one we removed so the client can confirm what was deleted.
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });
  const [removed] = users.splice(index, 1);
  res.json(removed);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));