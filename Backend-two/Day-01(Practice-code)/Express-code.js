// ============================================================
// Express CRUD — In-memory "database" (array of users)
// ============================================================

const express = require("express");
// THINK: require() loads express. Express is a function
// that creates an app object with routing capabilities.

const app = express();
// THINK: app is now an Express application.
// It has methods like .get(), .post(), .put(), .delete().

app.use(express.json());
// THINK: This is MIDDLEWARE. It runs BEFORE every request.
// It parses JSON from the request body.
// Without this, req.body would be undefined!
// GREAT TRAP: Comment out this line and watch POST break.

let users = [];
// THINK: Our "database" — a plain array.
// Restart server → data wiped. That's fine for learning.

let nextId = 1;
// THINK: Auto-incrementing ID. Why not use array index?
// Because after delete, indices shift. ID must be stable.

// ============ READ (GET) ============
app.get("/users", (req, res) => {
    // THINK: GET all users. No body needed.
    res.json(users);
    // THINK: res.json() automatically:
    // 1. Sets Content-Type to application/json
    // 2. JSON.stringify's the data
    // 3. Sends the response
    // Raw Node equivalent: res.writeHead(200, {'Content-Type': 'application/json'}); res.end(JSON.stringify(users));
});

app.get("/users/:id", (req, res) => {
    // THINK: ':id' is a ROUTE PARAMETER.
    // Express extracts it from the URL automatically.
    // GET /users/5 → req.params.id = "5"
    
    const id = Number(req.params.id);
    // THINK: req.params.id is a STRING. Convert to number.
    
    const user = users.find((u) => u.id === id);
    // THINK: Find the user with matching id.
    
    if (!user) {
        // THINK: User not found → 404 status.
        return res.status(404).json({ error: "User not found" });
        // THINK: 'return' is CRITICAL! Without it, code continues.
    }
    
    res.json(user);
    // THINK: Send the found user back.
});

// ============ CREATE (POST) ============
app.post("/users", (req, res) => {
    // THINK: POST creates new resource.
    // Data comes in req.body (thanks to express.json()).
    
    const { name, age, email, balance } = req.body;
    // THINK: Destructure fields from request body.
    
    const user = { id: nextId++, name, age, email, balance };
    // THINK: nextId++ means "use current value, then increment".
    // First user gets id=1, second gets id=2, etc.
    
    users.push(user);
    // THINK: Add to our "database".
    
    res.status(201).json(user);
    // THINK: 201 = Created. Include the created user in response.
    // Client now knows the id assigned by the server.
});

// ============ REPLACE (PUT) ============
app.put("/users/:id", (req, res) => {
    // THINK: PUT replaces the ENTIRE resource.
    // Client must send ALL fields. Omitted fields get wiped!
    
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    // THINK: findIndex gives us the array index for splicing.
    
    if (index === -1) {
        // THINK: -1 means not found.
        return res.status(404).json({ error: "User not found" });
    }
    
    const { name, age, email, balance } = req.body;
    // THINK: Destructure ALL fields. If client omits 'balance',
    // it becomes undefined and wipes out the old value!
    
    users[index] = { id, name, age, email, balance };
    // THINK: Complete replacement. No old data preserved.
    // DEMO: Try PUT without 'balance' field → balance becomes undefined.
    
    res.json(users[index]);
});

// ============ UPDATE (PATCH) ============
app.patch("/users/:id", (req, res) => {
    // THINK: PATCH updates ONLY the fields sent.
    // This is the KEY DIFFERENCE from PUT.
    
    const id = Number(req.params.id);
    const user = users.find((u) => u.id === id);
    // THINK: find gives us the actual object reference.
    
    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }
    
    Object.assign(user, req.body);
    // THINK: Object.assign MERGES req.body onto existing user.
    // Only fields in req.body are updated. Others remain unchanged.
    // TRAP: What if client sends { id: 999 }?
    // Object.assign happily overwrites the id!
    
    res.json(user);
});

// ============ DELETE ============
app.delete("/users/:id", (req, res) => {
    // THINK: DELETE removes a resource.
    
    const id = Number(req.params.id);
    const index = users.findIndex((u) => u.id === id);
    
    if (index === -1) {
        return res.status(404).json({ error: "User not found" });
    }
    
    const [removed] = users.splice(index, 1);
    // THINK: splice removes 1 element at index.
    // Destructure to get the removed user.
    
    res.json(removed);
    // THINK: Send back what was deleted so client can confirm.
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
// THINK: Start the server. This is the LAST thing you do.
// Server now listens for requests on port 3000.