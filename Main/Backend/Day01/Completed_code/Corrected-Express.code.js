// const express = require("express");
import express from "express";
const app = express();
app.use(express.json());
let users = [];
let nextId = 1;
app.get("/users", (req, res) => {
  res.json(users);
});


app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });
  res.json(user);
});

app.post("/users", (req, res) => {
  const { name, age, email, balance } = req.body;
  const user = { id: nextId++, name, age, email, balance };
  users.push(user);
  res.status(201).json(user); // 201 = Created
});

app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const { name, age, email, balance } = req.body;
  users[index] = { id, name, age, email, balance }; // full overwrite
  res.json(users[index]);
});

app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((u) => u.id === id);
  if (!user) return res.status(404).json({ error: "User not found" });

  Object.assign(user, req.body); // merge only the incoming fields
  res.json(user);

  // Trap to spring on students: what if the client sends { id: 999 }?
  // Object.assign happily overwrites the id. Ask them to fix it.
});


app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return res.status(404).json({ error: "User not found" });

  const [removed] = users.splice(index, 1);
  res.json(removed);
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));