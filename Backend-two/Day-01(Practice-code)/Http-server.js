// Express server that demonstrates different methods
const express = require('express');
const app = express();
app.use(express.json());

// GET — Read data
app.get('/users', (req, res) => {
    // THINK: GET has no body.
    // We just read and return data.
    res.status(200).json({ users: [] });
});

// POST — Create data
app.post('/users', (req, res) => {
    // THINK: POST has a body with the new user's data.
    const newUser = req.body;
    // THINK: We create the resource and return 201 (Created).
    res.status(201).json(newUser);
});

// PUT — Replace entire data
app.put('/users/:id', (req, res) => {
    // THINK: PUT replaces the ENTIRE resource.
    // If client omits a field, it gets WIPED OUT.
    const id = req.params.id;
    const updatedUser = { id, ...req.body };
    // THINK: No old data preserved. Complete replacement.
    res.json(updatedUser);
});

// PATCH — Update part of data
app.patch('/users/:id', (req, res) => {
    // THINK: PATCH only updates the FIELDS SENT.
    // Other fields remain unchanged.
    const id = req.params.id;
    const existingUser = users.find(u => u.id === id);
    Object.assign(existingUser, req.body); // Merge only sent fields
    res.json(existingUser);
});

// DELETE — Delete data
app.delete('/users/:id', (req, res) => {
    // THINK: DELETE removes the resource.
    // Return 204 No Content (success, nothing to return).
    const id = req.params.id;
    users = users.filter(u => u.id !== id);
    res.status(204).send();
});