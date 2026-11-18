# 📝 Node.js Backend — One Page Summary Notes

---

## 🎯 WHY BACKEND EXISTS

```
Frontend = User's Machine (PUBLIC — anyone can see code)
Backend  = Your Machine (PRIVATE — user sees nothing)

Problem 1: Login check in browser → password visible in DevTools
Problem 2: DB credentials in frontend → user steals them

Solution: Browser → Backend → Database
          Backend = Trusted Middleman
```

---

## 🔄 TCP 3-WAY HANDSHAKE

```
STEP 1: SYN      You → Server   "Are you there? I start from 1000"
STEP 2: SYN-ACK  Server → You   "Yes! Got 1000. I start from 5000"
STEP 3: ACK      You → Server   "Heard you! Got 5000."

✅ Confirms BOTH directions work
✅ Minimum messages needed = 3 (not 2, not 4)

IP = Which Machine    Port = Which Program
Socket = IP:Port pair on both sides

Packet Flow:
  Send 100 packets → Each has sequence number
  Server ACKs each → Timer expires → RESEND
  Out of order → BUFFER → REORDER → Reassemble
  Done → FIN → ACK → FIN → ACK → Closed
```

---

## 📦 MODULE SYSTEMS

### CommonJS (Default)
```javascript
// Export
module.exports = { add, subtract };  // or
exports.add = function() {}

// Import
const math = require('./math');
```

### ESM (Add "type":"module")
```javascript
// Export
export function add() {}            // named (unlimited)
export default function add() {}    // default (only 1)

// Import (MUST be at top, .js required)
import add, { subtract } from './math.js';
```

```
⚠️ Never mix exports and module.exports
✅ require() returns ONLY module.exports
✅ Named exports: unlimited (picked by name)
✅ Default export: only 1 (no name = no confusion)
```

---

## 📋 package.json SYSTEM

```
package.json        → What packages you NEED (version ranges)
package-lock.json   → EXACT versions installed (don't touch)
node_modules/       → Actual code (NEVER commit to git)

Version: 4.18.2 = MAJOR.MINOR.PATCH
  ~4.18.2 → Patch only (4.18.3 ✅, 4.19.0 ❌)
  ^4.18.2 → Patch + Minor (4.18.3 ✅, 4.19.0 ✅, 5.0.0 ❌)
  4.18.2  → Exact only

dependencies     → Production (npm install express)
devDependencies  → Development only (npm install nodemon --save-dev)

npm install → flexible    npm ci → strict (production)
```

---

## 🌐 HTTP PROTOCOL

### Request Structure
```
POST /users HTTP/1.1          ← Method + URL + Version
Host: localhost:3000          ← Headers
Content-Type: application/json
                              ← Blank line (\r\n\r\n)
{"name":"Rohit"}              ← Body (POST/PUT/PATCH only)
```

### Response Structure
```
HTTP/1.1 200 OK               ← Status line
Content-Type: application/json
                              ← Blank line
{"name":"Rohit"}              ← Body
```

### Methods
```
GET     → Read (no body)
POST    → Create (has body) → 201 Created
PUT     → Replace ALL (has body) → wipes omitted fields!
PATCH   → Update PART (has body) → merges only sent fields
DELETE  → Delete (no body)
```

### Status Codes
```
200 OK        201 Created      204 No Content
400 Bad Req   401 Unauthorized 403 Forbidden  404 Not Found
500 Server Error
```

---

## 🚀 EXPRESS.JS ESSENTIALS

### The 5 Lines That Do Everything
```javascript
const express = require('express');
const app = express();
app.use(express.json());              // ← Without this, req.body = undefined!

// Routes
app.get('/users', (req, res) => { res.json(users); });
app.get('/users/:id', (req, res) => { const id = req.params.id; });

// Dynamic routes: /users/:id → req.params.id
// Query strings: /add?num1=10 → req.query.num1 (always STRING!)

app.listen(3000, () => console.log("Server running"));
```

### Raw Node vs Express
```
Raw Node Pain              →  Express Cure
──────────────────────        ──────────────────────
if-else on url/method     →  app.get('/users')
req.url.split('/')        →  /users/:id → req.params.id
req.on('data') chunks     →  express.json() → req.body
writeHead + stringify     →  res.status(201).json()
Forget res.end() → hangs  →  Catch-all + error handler
Copy-paste logging        →  app.use() middleware
250-line monster          →  express.Router()
```

---

## 🧠 THE GOLDEN RULES

```
1. Backend code runs on YOUR machine — user can't see it
2. Never trust user input — ALWAYS validate
3. Always set Content-Type in responses
4. Always call res.end() or res.json() — or request hangs
5. Always use 'return' before sending response in a branch
6. req.params and req.query are ALWAYS strings — convert!
7. NextId pattern: id: nextId++ (stable, survives deletes)
8. PUT = replace everything, PATCH = update only sent fields
9. import must be at top (ESM), require can be anywhere (CJS)
10. Check these 3 always:
    → Is input valid? (isNaN check)
    → Is input in range? (bounds check)
    → What am I sending back? (Content-Type + status)
```

---

## 🔄 COMPLETE CRUD PATTERN

```javascript
// GET all
app.get('/users', (req, res) => {
    res.json(users);
});

// GET one
app.get('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "Not found" });
    res.json(user);
});

// POST create
app.post('/users', (req, res) => {
    const user = { id: nextId++, ...req.body };
    users.push(user);
    res.status(201).json(user);
});

// PUT replace
app.put('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    users[index] = { id, ...req.body };
    res.json(users[index]);
});

// PATCH update
app.patch('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const user = users.find(u => u.id === id);
    if (!user) return res.status(404).json({ error: "Not found" });
    Object.assign(user, req.body);
    res.json(user);
});

// DELETE
app.delete('/users/:id', (req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex(u => u.id === id);
    if (index === -1) return res.status(404).json({ error: "Not found" });
    const [removed] = users.splice(index, 1);
    res.json(removed);
});
```

---

## 🔍 DEBUGGING CHECKLIST

```
❌ req.body is undefined?     → app.use(express.json()) missing
❌ Cannot set headers?        → Two responses sent. Add 'return'
❌ Server hangs?              → res.end() / res.json() not called
❌ Wrong content type?        → Use res.json() not res.send()
❌ import fails?              → Check "type":"module" + .js extension
❌ Module not found?          → Wrong path or missing node_modules
❌ NaN result?                → Forgot Number() conversion
```

---

## ✅ EVERYTHING IN ONE LINE

> **"Backend = hidden code protecting data. TCP = reliable delivery. Modules = organized code. Express = remove boilerplate. Always validate input, always send response, always handle errors."**