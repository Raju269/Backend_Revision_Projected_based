const express = require("express");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Query parameter example
app.get("/products", (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;

  res.json({
    message: "Products fetched",
    category,
    sort
  });
});

// Route parameter example
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "User fetched",
    id
  });
});

// POST request with body
app.post("/users", (req, res) => {
  const name = req.body.name;

  res.status(201).json({
    message: "User created",
    name
  });
});

// Middleware for admin routes
function checkAdmin(req, res, next) {
  const isAdmin = true;

  if (!isAdmin) {
    return res.status(403).json({
      message: "Only admin allowed"
    });
  }

  next();
}

app.use("/admin", checkAdmin);

app.get("/admin/dashboard", (req, res) => {
  res.send("Admin dashboard");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});