// A server listens on a specific PORT
const http = require('http');

const server = http.createServer((req, res) => {
    res.end("Hello from port 3000!");
});

// THINK: Why port 3000?
// Port 3000 is just a convention for Node.js development.
// Common ports:
// - 80: HTTP (web servers)
// - 443: HTTPS (secure web servers)
// - 3000: Node.js development convention
// - 5000: Another common Node.js convention
// - 8080: Alternative HTTP port

server.listen(3000, () => {
    console.log("Server listening on port 3000");
    console.log("This means: IP address of this machine + port 3000");
});

// What happens in the background:
// 1. Server binds to port 3000 on this machine
// 2. OS knows: "Any packet arriving for port 3000 → send to this program"
// 3. Client connects to YOUR_IP:3000
// 4. Client's OS assigns them a random port (e.g., 54231)
// 5. Socket pair created: CLIENT_IP:54231 ↔ YOUR_IP:3000

// Client side — see the random port assignment
const net = require('net');

const client = net.createConnection({ port: 3000, host: 'localhost' }, () => {
    console.log("Connected!");
    console.log("Client's local port:", client.localPort); // Random, e.g., 54231
    console.log("Server's port:", client.remotePort); // 3000
});

// Output example:
// Client's local port: 54231 (randomly assigned by OS)
// Server's port: 3000 (the server's listening port)