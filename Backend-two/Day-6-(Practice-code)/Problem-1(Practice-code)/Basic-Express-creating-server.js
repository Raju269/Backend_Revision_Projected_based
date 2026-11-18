// Import Express library
// THINK: What tool am I using? Express for creating web server
const express = require("express");

// Create Express application instance
// THINK: I need a server object to configure routes and middleware
const app = express();

// Middleware to parse JSON request bodies
// THINK: When client sends POST/PATCH with JSON body, I need to read it
// Without this, req.body will be undefined
app.use(express.json());

// Define a GET route for root path "/"
// THINK: What happens when user visits my API home page?
app.get("/", (req, res) => {
  // THINK: What response should I send for home route?
  // Simple text message is enough for testing
  res.send("Movie API is running");
});

// Start the server on port 3000
// THINK: Which port? 3000 is standard for development
app.listen(3000, () => {
  // THINK: How do I know server started? Log a message
  console.log("Server started on port 3000");
});