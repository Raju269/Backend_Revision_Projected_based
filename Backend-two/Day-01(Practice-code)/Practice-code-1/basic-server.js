const http = require('http');
// THINK: require() loads the built-in http module.
// This module has everything needed to create a web server.

const server = http.createServer((req, res) => {
    // THINK: This callback runs EVERY time a request comes in.
    // req = request object (what the client sent to us)
    // res = response object (what we send back to client)
    
    console.log(req.url);
    // THINK: req.url tells us what path the user requested.
    // For http://localhost:3000/user → req.url = "/user"
    // For http://localhost:3000/ → req.url = "/"
    
    if (req.url == "/") {
        // THINK: User hit the home page
        res.end("Hello Coder Army");
        // THINK: res.end() sends the response AND ends it.
        // No more code should run after res.end() for this request.
    }
    else if (req.url == "/user") {
        // THINK: User hit the /user path
        res.end(JSON.stringify({ name: "Rohot" }));
        // THINK: We can send JSON too!
        // JSON.stringify converts JS object to JSON string.
        // Client receives: {"name":"Rohot"}
    }
    else {
        // THINK: User hit some other path (like /random)
        res.end("I am best");
        // THINK: Catch-all for any path we didn't handle.
    }
});

server.listen(3000, () => {
    console.log("Hi, I am listening");
    // THINK: This callback runs AFTER server starts listening.
    // It confirms the server is ready to accept requests.
});