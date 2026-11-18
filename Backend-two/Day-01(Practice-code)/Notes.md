# Lecture 01-05: Node.js Backend — Complete Visual Guide with Flowcharts, Code Walkthroughs & Reverse Engineering Prompts

---

# 📌 TOPIC 1: Why Backend Exists

## 🧠 The Core Problem Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                    FRONTEND (User's Browser)                    │
│                                                                 │
│  "I built a calculator — everything works in browser."         │
│                         ↓                                       │
│  "Now I built a LOGIN PAGE..."                                 │
│                         ↓                                       │
│  if (password === "password123") { let them in }               │
│                         ↓                                       │
│  ❌ PROBLEM: User opens DevTools → Sources → reads password     │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    THE BREAKING POINT                          │
│                                                                 │
│  "Where does this code live?"                                  │
│  → In the browser = PUBLIC = anyone can see it                 │
│  → Every line of JS is visible to everyone                     │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    SECOND BREAKING POINT                       │
│                                                                 │
│  Frontend → Database directly?                                 │
│  → DB credentials in frontend JS                               │
│  → User copies credentials, runs SELECT * FROM users           │
│  → All data exposed, modified, deleted                         │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      THE SOLUTION                              │
│                                                                 │
│         Browser ──────→ Backend ──────→ Database               │
│         (public)       (hidden)       (protected)              │
│                                                                 │
│  ✓ Credentials live on YOUR machine (server)                   │
│  ✓ Backend verifies who user is BEFORE touching database       │
│  ✓ User gets back ONLY what they're allowed to see            │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 Frontend vs Backend Comparison Table

```
┌─────────────────────┬─────────────────────┐
│     FRONTEND        │      BACKEND        │
├─────────────────────┼─────────────────────┤
│ Runs on user's      │ Runs on your        │
│ machine             │ machine             │
│                     │                     │
│ User can see        │ User sees           │
│ all code            │ NOTHING             │
│                     │                     │
│ Cannot trust it     │ You fully           │
│                     │ trust it            │
│                     │                     │
│ Cannot hide         │ Secrets live        │
│ secrets             │ here                │
│                     │                     │
│ Makes UI            │ Makes decisions     │
└─────────────────────┴─────────────────────┘
```

## 💻 Code Snippet — The Naive Login (What NOT to do)

```javascript
// ❌ WRONG APPROACH — This code lives in the BROWSER
// File: login.js (frontend)

const password = "password123";

function login(userInput) {
    // THINK: Where does this code RUN?
    // ANSWER: On user's machine. They can see this password.
    if (userInput === password) {
        return "Logged in!";
    }
    return "Wrong password!";
}

// User opens DevTools → Sources → sees "password123"
// Game over.
```

```javascript
// ✅ CORRECT APPROACH — Password check on BACKEND
// File: server.js (backend - runs on YOUR machine)

const express = require('express');
const app = express();

const REAL_PASSWORD = "password123"; // User can NEVER see this

app.post('/login', (req, res) => {
    const userAttempt = req.body.password;
    
    // THINK: This comparison happens on MY machine
    // User sends their attempt → I verify → I send only yes/no
    if (userAttempt === REAL_PASSWORD) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// User only sees: { success: true } or { success: false }
// They NEVER see the actual password
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask yourself: "What happens if I put my secret logic in the frontend?"
> **Answer:** User opens DevTools, sees everything. There's no such thing as a "secret" in the browser.

**Step 2:** Ask: "Where can I run code that the user CANNOT see?"
> **Answer:** On my own machine (server). That's the backend.

**Step 3:** Ask: "What should the user send me?"
> **Answer:** Only their attempt. Not the answer. Not my logic.

**Step 4:** Ask: "What should I send back?"
> **Answer:** Only yes/no. Never the actual password or validation logic.

**Step 5:** Ask: "Can the frontend connect directly to the database?"
> **Answer:** No! Credentials would be exposed. Backend must sit in the middle.

---

# 📌 TOPIC 2: TCP 3-Way Handshake

## 🧠 The Complete Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE PROBLEM                                 │
│                                                                 │
│  You have 100 packets to send.                                 │
│  Naive thought: "Just send them all right now!"                │
│                                                                 │
│  ❌ Problem 1: Is the server even ALIVE?                       │
│  ❌ Problem 2: Can the server reach ME back?                   │
│  ❌ Problem 3: Did my reply to server's reply arrive?          │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 THE 3-WAY HANDSHAKE                           │
│                                                                 │
│  STEP 1: SYN (You → Server)                                    │
│  ┌─────────────────────────────────────────┐                   │
│  │ "Are you there? I'll start numbering    │                   │
│  │  my packets from 1000."                 │                   │
│  └─────────────────────────────────────────┘                   │
│                         ↓                                       │
│  STEP 2: SYN-ACK (Server → You)                                │
│  ┌─────────────────────────────────────────┐                   │
│  │ "Yes I'm here. I received your 1000.    │                   │
│  │  Send 1001 next. I'll start numbering   │                   │
│  │  MY packets from 5000."                 │                   │
│  └─────────────────────────────────────────┘                   │
│                         ↓                                       │
│  STEP 3: ACK (You → Server)                                    │
│  ┌─────────────────────────────────────────┐                   │
│  │ "I heard you. I received your 5000.     │                   │
│  │  Send 5001 next. Let's talk."           │                   │
│  └─────────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              WHAT'S CONFIRMED AFTER 3 STEPS                    │
│                                                                 │
│  ✅ You → Server works (Server received your SYN)              │
│  ✅ Server → You works (You received SYN-ACK)                  │
│  ✅ Both directions confirmed → safe to send data              │
└─────────────────────────────────────────────────────────────────┘
```

## 🔢 Why NOT 2 Steps? Why NOT 4 Steps?

```
┌─────────────────────────────────────────────────────────────────┐
│                     2 STEPS (Insufficient)                     │
│                                                                 │
│  You    → "Are you there?"    (SYN)                            │
│  Server ← "Yes I'm here!"     (ACK)                            │
│                                                                 │
│  You know: Server is alive ✓                                   │
│  Server knows: ??? Did my reply reach you? ❓                 │
│                                                                 │
│  ❌ Only ONE direction is confirmed                            │
│  ❌ Server doesn't know if you received its reply              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     3 STEPS (Perfect)                          │
│                                                                 │
│  Step 1: You → Server (SYN)     — "Can you hear me?"          │
│  Step 2: Server → You (SYN-ACK) — "Yes! Can YOU hear me?"     │
│  Step 3: You → Server (ACK)     — "Yes! I can hear you!"      │
│                                                                 │
│  ✅ Direction 1: You → Server confirmed                        │
│  ✅ Direction 2: Server → You confirmed                        │
│  ✅ BOTH sides know BOTH directions work                       │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                     4 STEPS (Unnecessary)                      │
│                                                                 │
│  Step 4: Server → You (ACK-ACK) — "I heard your 'I heard you'"│
│                                                                 │
│  ❌ Redundant. Both directions already confirmed.              │
│  ❌ Would lead to infinite loop: ACK-ACK-ACK-ACK...            │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Simulating the Handshake

```javascript
// Simulating TCP 3-Way Handshake in JavaScript (for understanding)

// Sequence numbers for both sides
let yourSeq = 1000;    // Your packets will start from 1000
let serverSeq = 5000;  // Server's packets will start from 5000

// STEP 1: SYN (You → Server)
function sendSYN() {
    console.log("STEP 1: SYN");
    console.log(`  You → Server: "Are you there? I'll start from ${yourSeq}"`);
    console.log(`  Packet: { type: 'SYN', seq: ${yourSeq} }`);
    return true; // Server receives it
}

// STEP 2: SYN-ACK (Server → You)
function sendSYNACK() {
    console.log("\nSTEP 2: SYN-ACK");
    console.log(`  Server → You: "Yes! I got your ${yourSeq}. Send ${yourSeq + 1} next."`);
    console.log(`  Server → You: "I'll start from ${serverSeq}."`);
    console.log(`  Packet: { type: 'SYN-ACK', ack: ${yourSeq + 1}, seq: ${serverSeq} }`);
    return true; // You receive it
}

// STEP 3: ACK (You → Server)
function sendACK() {
    console.log("\nSTEP 3: ACK");
    console.log(`  You → Server: "I heard you! I got your ${serverSeq}. Send ${serverSeq + 1} next."`);
    console.log(`  Packet: { type: 'ACK', ack: ${serverSeq + 1} }`);
    return true; // Server receives it
}

// Execute the handshake
function tcpHandshake() {
    console.log("=== TCP 3-WAY HANDSHAKE ===\n");
    
    const synReceived = sendSYN();
    // THINK: We sent SYN. Server is alive? We'll know when we get a reply.
    
    const synAckReceived = sendSYNACK();
    // THINK: We got SYN-ACK. This proves:
    // 1. Server is alive (it replied)
    // 2. Server → You direction works (we received its reply)
    // 3. You → Server direction works (server received our SYN)
    
    const ackReceived = sendACK();
    // THINK: We sent ACK. Now server knows we received its SYN-ACK.
    // This confirms the Server → You direction works for the server too.
    
    console.log("\n✅ Both directions confirmed!");
    console.log("✅ Connection established!");
    console.log("✅ Ready to send 100 packets of data.");
}

tcpHandshake();
```

**Output:**
```
=== TCP 3-WAY HANDSHAKE ===

STEP 1: SYN
  You → Server: "Are you there? I'll start from 1000"
  Packet: { type: 'SYN', seq: 1000 }

STEP 2: SYN-ACK
  Server → You: "Yes! I got your 1000. Send 1001 next."
  Server → You: "I'll start from 5000."
  Packet: { type: 'SYN-ACK', ack: 1001, seq: 5000 }

STEP 3: ACK
  You → Server: "I heard you! I got your 5000. Send 5001 next."
  Packet: { type: 'ACK', ack: 5001 }

✅ Both directions confirmed!
✅ Connection established!
✅ Ready to send 100 packets of data.
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "What if I just send all 100 packets without checking anything?"
> **Answer:** They might all go into the void if the server is dead. Wasted bandwidth. No way to know.

**Step 2:** Ask: "Can I just check one direction?"
> **Answer:** No! The internet is TWO-WAY traffic. Just because I can reach the server doesn't mean the server can reach me back.

**Step 3:** Ask: "After 2 steps (SYN → ACK), what does the server know?"
> **Answer:** Server knows I'm alive. But it DOESN'T know if I received its reply. It's in the dark.

**Step 4:** Ask: "What's the minimum messages needed to confirm BOTH directions?"
> **Answer:** 
> - Message 1 (SYN): Confirms You → Server works (from server's perspective)
> - Message 2 (SYN-ACK): Confirms Server → You works (from your perspective)
> - Message 3 (ACK): Confirms Server → You works (from server's perspective)
> - **Total: 3 messages minimum**

**Step 5:** Ask: "Why not add a 4th message (ACK-ACK)?"
> **Answer:** All directions already confirmed. A 4th would confirm the ACK, but then who confirms the 4th? Infinite loop. 3 is optimal.

---

# 📌 TOPIC 3: Ports and Sockets

## 🧠 The Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE PROBLEM                                 │
│                                                                 │
│  You have IP address: 103.21.58.1                              │
│  But WHICH program on that machine?                            │
│                                                                 │
│  That machine runs:                                            │
│  - Browser (port 80/443)                                       │
│  - Spotify (port 4070)                                         │
│  - Your Node server (port 3000)                                │
│  - Many more...                                                │
│                                                                 │
│  IP = WHICH MACHINE                                            │
│  PORT = WHICH PROGRAM on that machine                          │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 THE COMPLETE ADDRESS                          │
│                                                                 │
│  Your Machine              Server                              │
│  ┌─────────────────┐      ┌─────────────────┐                 │
│  │ IP: 192.168.1.1 │ ───→ │ IP: 103.21.58.1 │                 │
│  │ Port: 54231     │      │ Port: 3000      │                 │
│  │ (randomly       │      │ (the server's   │                 │
│  │  assigned)      │      │  program port)  │                 │
│  └─────────────────┘      └─────────────────┘                 │
│                                                                 │
│  This PAIR is called a SOCKET:                                 │
│  192.168.1.1:54231 ↔ 103.21.58.1:3000                         │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                 WHY YOUR MACHINE NEEDS A PORT                 │
│                                                                 │
│  Server sends data BACK to you.                                │
│  Your machine needs to know WHERE to deliver it.               │
│                                                                 │
│  You have multiple programs running too:                       │
│  - Browser waiting for data on port 54321                     │
│  - Game waiting for data on port 54322                        │
│  - Your app waiting on port 54231                             │
│                                                                 │
│  OS assigns you a RANDOM port for this conversation           │
│  So replies don't go to the wrong program                      │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Understanding Ports in Node.js

```javascript
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
```

```javascript
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
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why can't I just use IP address alone?"
> **Answer:** IP tells you which MACHINE. But one machine runs many programs. You need to specify WHICH program.

**Step 2:** Ask: "How does the server know where to send the reply?"
> **Answer:** Your machine also needs a port. OS assigns a random one for this conversation. The reply goes to YOUR_IP:YOUR_RANDOM_PORT.

**Step 3:** Ask: "What is a Socket?"
> **Answer:** The complete pair: Your IP+Port ↔ Server IP+Port. Both sides know exactly where to send and receive.

**Step 4:** Ask: "Why random port for the client?"
> **Answer:** Client might have multiple connections simultaneously. Each gets a unique random port so replies don't get mixed up.

---

# 📌 TOPIC 4: Packet Flow — Sending 100 Packets

## 🧠 The Complete Packet Journey Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│               AFTER 3-WAY HANDSHAKE                           │
│               Connection established ✓                         │
│               Both sequence numbers known ✓                    │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              YOUR 100 PACKETS START MOVING                    │
│                                                                 │
│  Packet 1:  seq=1001, data="first chunk"                       │
│  Packet 2:  seq=1002, data="second chunk"                      │
│  Packet 3:  seq=1003, data="third chunk"                       │
│  ...                                                           │
│  Packet 100: seq=1100, data="last chunk"                       │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              SERVER ACKNOWLEDGES EACH PACKET                  │
│                                                                 │
│  Server: "Got 1001. Send 1002." (ACK 1002)                    │
│  Server: "Got 1002. Send 1003." (ACK 1003)                    │
│  Server: "Got 1003. Send 1004." (ACK 1004)                    │
│  ...                                                           │
│                                                                 │
│  Your machine has a TIMER on each sent packet:                │
│  ┌─────────────────────────────────────────┐                   │
│  │ Send Packet 1047                        │                   │
│  │ Start timer                             │                   │
│  │ Timer expires → No ACK received        │                   │
│  │ → RESEND Packet 1047                    │                   │
│  └─────────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│           WHAT IF PACKETS ARRIVE OUT OF ORDER?                │
│                                                                 │
│  Server receives:                                              │
│  Packet 1001 ✅                                                │
│  Packet 1003 ✅ (arrived before 1002!)                         │
│  Packet 1002 ✅ (arrived late)                                 │
│                                                                 │
│  Server BUFFERS out-of-order packets:                         │
│  Buffer: [1003] — waiting for 1002                             │
│                                                                 │
│  When 1002 arrives:                                            │
│  Reorder: 1001 → 1002 → 1003 → pass to application           │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              ALL 100 PACKETS DELIVERED                        │
│                                                                 │
│  ✅ In correct order                                           │
│  ✅ No missing pieces                                          │
│  ✅ Full message reassembled                                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              CONNECTION TERMINATION                            │
│                                                                 │
│  You → Server: FIN "I'm done sending"                          │
│  Server → You: ACK "Got it"                                    │
│  Server → You: FIN "I'm also done"                             │
│  You → Server: ACK "Got it. Goodbye."                          │
│                                                                 │
│  Connection closed. Memory freed on both sides.                │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Simulating Packet Flow

```javascript
// Simulating packet sending with acknowledgments

class PacketSender {
    constructor() {
        this.sequenceNumber = 1001; // Starting sequence number
        this.packetsSent = [];
        this.acknowledged = new Set();
        this.timerMap = new Map();
    }

    // Send a packet and start a timer
    sendPacket(data, seqNum) {
        console.log(`📤 Sending Packet ${seqNum}: "${data}"`);
        this.packetsSent.push(seqNum);
        
        // THINK: Every packet has a timer
        // If ACK doesn't come back before timer expires → resend
        this.startTimer(seqNum, data);
    }

    // Timer for each packet
    startTimer(seqNum, data) {
        // Simulate timer with setTimeout
        const timer = setTimeout(() => {
            // THINK: Timer expired without ACK
            if (!this.acknowledged.has(seqNum)) {
                console.log(`⏰ Timer expired for Packet ${seqNum}. NO ACK received.`);
                console.log(`🔄 RESENDING Packet ${seqNum}`);
                this.sendPacket(data, seqNum);
            }
        }, 1000); // 1 second timer
        
        this.timerMap.set(seqNum, timer);
    }

    // Server acknowledges a packet
    receiveACK(ackNum) {
        // THINK: ACK 1002 means "I got 1001, send 1002"
        const packetNum = ackNum - 1;
        console.log(`✅ ACK received: "Got ${packetNum}. Send ${ackNum}."`);
        this.acknowledged.add(packetNum);
        clearTimeout(this.timerMap.get(packetNum));
    }

    // Simulate out-of-order packets
    bufferAndReorder() {
        console.log("\n📦 Out-of-order handling:");
        console.log("  Server receives: 1001, 1003, 1002");
        console.log("  Buffer: [1003] — waiting for 1002");
        console.log("  When 1002 arrives: 1001 → 1002 → 1003 → correct order");
    }
}

// Demo
const sender = new PacketSender();
sender.sendPacket("first chunk", 1001);
sender.receiveACK(1002); // Server got 1001
sender.sendPacket("second chunk", 1002);
sender.receiveACK(1003); // Server got 1002
sender.sendPacket("third chunk", 1003);
sender.receiveACK(1004); // Server got 1003
sender.bufferAndReorder();
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do we need sequence numbers?"
> **Answer:** To detect missing packets and reorder out-of-order packets. Without them, we'd have no way to know if something is missing.

**Step 2:** Ask: "What happens if ACK never comes?"
> **Answer:** Timer expires → resend the packet. This is TCP's reliability guarantee.

**Step 3:** Ask: "Why buffer out-of-order packets?"
> **Answer:** Can't pass data to application until it's in correct order. Buffer holds packets until the missing one arrives.

**Step 4:** Ask: "Why do we need connection termination (FIN)?"
> **Answer:** To free up resources (memory, ports) on both sides. Without it, connections would leak.

---

# 📌 TOPIC 5: Your First HTTP Server (Raw Node.js)

## 🧠 The Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              http.createServer()                              │
│                                                                 │
│  What is it?                                                   │
│  A function that creates a server object                      │
│                                                                 │
│  What does it do?                                             │
│  - Listens for incoming requests                              │
│  - When a request comes, runs the callback function           │
│  - Callback receives (req, res) objects                      │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  req (Request Object)                         │
│                                                                 │
│  Contains information about the incoming request:             │
│  - req.url → the path user requested                          │
│  - req.method → GET, POST, PUT, DELETE, etc.                  │
│  - req.headers → metadata about the request                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  res (Response Object)                        │
│                                                                 │
│  Contains methods to send response back:                      │
│  - res.end() → end the response with data                    │
│  - res.writeHead() → set status code and headers             │
│  - res.write() → write data without ending                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              server.listen(3000)                              │
│                                                                 │
│  Tells the server:                                            │
│  "Start listening on port 3000"                               │
│                                                                 │
│  After this, the server is alive and waiting for requests.    │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet with Thinking Process

```javascript
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
```

## 🔧 Understanding the Flow

```
User types in browser: http://localhost:3000/user
                    ↓
Browser sends HTTP request to localhost:3000
                    ↓
Node.js server receives the request
                    ↓
Callback function runs with (req, res)
                    ↓
req.url = "/user"
                    ↓
Enters the "else if" branch
                    ↓
res.end(JSON.stringify({name:"Rohot"}))
                    ↓
Browser receives: {"name":"Rohot"}
                    ↓
Browser displays it
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "What happens when server.listen(3000) runs?"
> **Answer:** Server binds to port 3000. OS routes any request to localhost:3000 to this program.

**Step 2:** Ask: "How does the callback know what URL was requested?"
> **Answer:** The `req` object has `req.url` property. Node.js automatically parses the incoming HTTP request and fills this.

**Step 3:** Ask: "What if two requests come at the same time?"
> **Answer:** Node.js handles them one at a time (single-threaded event loop). Each gets its own `req` and `res` objects.

**Step 4:** Ask: "What happens if I don't call res.end()?"
> **Answer:** The request hangs forever. Browser keeps spinning. Server keeps the connection open.

---

# 📌 TOPIC 6: CommonJS Module System

## 🧠 The Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                  WHAT IS A MODULE?                            │
│                                                                 │
│  A file with a specific responsibility.                       │
│  Code in one file can be used by other files.                 │
│                                                                 │
│  user.js    → user related code only                          │
│  payment.js → payment related code only                       │
│  email.js   → email related code only                         │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              module.exports — THE KEY CONCEPT                │
│                                                                 │
│  Node.js creates this object for EVERY file:                 │
│                                                                 │
│  module = {                                                     │
│      exports: {}  // starts as EMPTY object                  │
│  }                                                             │
│                                                                 │
│  Whatever you put in module.exports is what require() returns.│
│  NOTHING else crosses the file boundary.                      │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              FOUR WAYS TO EXPORT                             │
│                                                                 │
│  1. Export single function:                                    │
│     module.exports = add;                                      │
│                                                                 │
│  2. Export multiple as object:                                 │
│     module.exports = { add, subtract, multiply };             │
│                                                                 │
│  3. Export inline using exports:                               │
│     exports.add = function() {}                                │
│                                                                 │
│  4. Mix default and named (NOT recommended):                   │
│     ❌ Never mix exports and module.exports                   │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippets for Each Export Type

### Method 1: Export a Single Function

```javascript
// math.js
function add(a, b) {
    // THINK: This function is private to this file by default.
    // Only module.exports makes it available outside.
    return a + b;
}

module.exports = add;
// THINK: Now add is the ONLY thing that leaves this file.
// require('./math') will return just this function.
```

```javascript
// app.js
const add = require('./math');
// THINK: require() returns whatever module.exports was set to.
// In this case, it's the add function directly.

console.log(add(2, 3)); // 5
// THINK: We can call it directly because we got the function itself.
```

### Method 2: Export Multiple as Object

```javascript
// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

module.exports = { add, subtract, multiply };
// THINK: We're putting multiple functions in one object.
// require('./math') will return this entire object.
```

```javascript
// app.js
const math = require('./math');
// THINK: math is now { add, subtract, multiply }

console.log(math.add(2, 3));        // 5
console.log(math.subtract(5, 2));   // 3
console.log(math.multiply(2, 3));   // 6
// THINK: Access each function as a property of the math object.
```

### Method 3: Destructure Only What You Need

```javascript
// app.js
const { add } = require('./math');
// THINK: Destructuring pulls out only the 'add' property.
// Same as: const math = require('./math'); const add = math.add;

console.log(add(2, 3)); // 5
// THINK: We only have access to add, not subtract or multiply.
```

### Method 4: Export Inline Using exports

```javascript
// math.js
exports.add = function(a, b) {
    // THINK: exports is a shorthand for module.exports.
    // Initially, exports === module.exports (same object reference).
    return a + b;
}

exports.subtract = function(a, b) {
    return a - b;
}

exports.multiply = function(a, b) {
    return a * b;
}

// THINK: Each line adds a property to the exports object.
// Final result: exports = { add, subtract, multiply }
// module.exports still points to the same object.
```

## ⚠️ THE CRITICAL TRAP — Never Mix exports and module.exports

```javascript
// ❌ WRONG — mulNumber is silently lost
exports.mulNumber = function() {}
module.exports = { add, subtract };

// WHY IT BREAKS:
// Step 1: exports.mulNumber = function() {}
//   → exports object now has: { mulNumber: fn }
//   → module.exports STILL points to same object: { mulNumber: fn }
//
// Step 2: module.exports = { add, subtract }
//   → module.exports now points to a NEW object: { add, subtract }
//   → exports still points to OLD object: { mulNumber: fn }
//
// Step 3: require() returns module.exports (the NEW object)
//   → Only { add, subtract } is returned
//   → mulNumber is LOST!

// Visual representation:
// Before: exports → { mulNumber } ← module.exports (same object)
// After:  exports → { mulNumber }     module.exports → { add, subtract }
//                                                  ↑ (new object, different!)
```

```javascript
// ✅ CORRECT — Pick ONE style and stick to it

// Style 1: Collect at bottom
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
module.exports = { add, subtract, multiply };

// OR

// Style 2: Export inline one by one
exports.add = function(a, b) { return a + b; }
exports.subtract = function(a, b) { return a - b; }
exports.multiply = function(a, b) { return a * b; }

// NEVER mix these two styles in the same file!
```

## 🔄 How require() Works Step by Step

```
┌─────────────────────────────────────────────────────────────────┐
│                  require() DECISION TREE                      │
│                                                                 │
│  Start: require('something')                                   │
│         ↓                                                       │
│  Is it a built-in module? (http, fs, path, etc.)              │
│  ├─ YES → Load from Node.js installation                      │
│  └─ NO  ↓                                                      │
│                                                                 │
│  Does it start with './'?                                      │
│  ├─ YES → Load from that file path                            │
│  └─ NO  ↓                                                      │
│                                                                 │
│  Neither → Look inside node_modules folder                    │
│                                                                 │
│  THEN:                                                         │
│  1. Run the file completely (execute all code in it)          │
│  2. Take whatever is in module.exports                        │
│  3. Return it to the caller                                   │
│  4. Cache it — next require() returns cached result instantly │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Complete Example with Thinking Process

```javascript
// ============ math.js ============
// THINK: This file has a job: math operations.
// It should ONLY contain math-related code.

let counter = 0;
// THINK: counter is private. It stays in this file.
// No one outside can access or modify it.

function add(a, b) {
    counter++; // THINK: counter can be modified inside this file
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
// THINK: Only add and subtract cross the boundary.
// counter is private. No one outside knows it exists.

// ============ app.js ============
const math = require('./math');
// THINK: math = { add, subtract }
// counter is NOT accessible.

console.log(math.add(2, 3));        // 5
console.log(math.subtract(5, 2));   // 3
// console.log(math.counter);       // undefined — counter is private!
// console.log(counter);            // ReferenceError — not defined!
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do we need modules at all?"
> **Answer:** To organize code. Separate concerns. Avoid one giant file. Reuse code across files.

**Step 2:** Ask: "What exactly does require() return?"
> **Answer:** Whatever is in module.exports of that file. Nothing more, nothing less.

**Step 3:** Ask: "Why does the second require() of the same file return cached result?"
> **Answer:** Performance. The file is only executed once. Subsequent requires just return the cached module.exports.

**Step 4:** Ask: "Why does mixing exports and module.exports break?"
> **Answer:** Because exports is just a reference to the original module.exports object. When you reassign module.exports, exports still points to the old object. require() always returns module.exports (the new object).

---

# 📌 TOPIC 7: ES Modules (ESM)

## 🧠 ESM vs CommonJS Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                   WHY ESM EXISTS                               │
│                                                                 │
│  2009: Node.js invents CommonJS (require/module.exports)       │
│  2015: TC39 creates official JS module system (import/export)  │
│                                                                 │
│  ESM is built INTO JavaScript itself.                         │
│  Works in both browser AND Node.js.                            │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              HOW TO ENABLE ESM IN NODE.JS                     │
│                                                                 │
│  Option 1: Add to package.json:                                │
│  { "type": "module" }                                          │
│                                                                 │
│  Option 2: Rename files to .mjs                               │
│  math.mjs, app.mjs                                             │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              NAMED EXPORTS (Unlimited)                        │
│                                                                 │
│  export function add() {}                                      │
│  export function subtract() {}                                 │
│  export function multiply() {}                                 │
│  export const PI = 3.14;                                       │
│                                                                 │
│  WHY unlimited?                                                │
│  → You pick them BY NAME when importing                       │
│  → No confusion about which one you want                      │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              DEFAULT EXPORT (Exactly One)                     │
│                                                                 │
│  export default function add() {}                              │
│                                                                 │
│  WHY only one?                                                 │
│  → You import it WITHOUT a name                               │
│  → import ??? from './math.js'                                │
│  → Two defaults would be ambiguous                            │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippets

### Named Exports

```javascript
// math.js
export function add(a, b) {
    // THINK: 'export' keyword makes this function available outside.
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14;
// THINK: You can export constants too!
// Total named exports: 4 (add, subtract, multiply, PI)
```

```javascript
// app.js
import { add, subtract } from './math.js';
// THINK: Curly braces for named imports.
// Note: .js extension is REQUIRED in ESM.

console.log(add(2, 3));        // 5
console.log(subtract(5, 2));   // 3
```

### Import Everything

```javascript
// app.js
import * as math from './math.js';
// THINK: * means "import everything as an object called 'math'"

console.log(math.add(2, 3));        // 5
console.log(math.subtract(5, 2));   // 3
console.log(math.multiply(2, 3));   // 6
console.log(math.PI);               // 3.14
```

### Rename While Importing

```javascript
// app.js
import { add as addNumbers } from './math.js';
// THINK: Sometimes two files export same name.
// Rename to avoid conflict.

console.log(addNumbers(2, 3)); // 5
```

### Default Export

```javascript
// math.js
export default function add(a, b) {
    // THINK: 'default' means this is the PRIMARY purpose of this file.
    return a + b;
}

export function subtract(a, b) {
    // THINK: Named exports can coexist with default.
    return a - b;
}
```

```javascript
// app.js
import add, { subtract } from './math.js';
// THINK: Default import comes FIRST (no curly braces).
// Then named imports in curly braces.

console.log(add(2, 3));        // 5
console.log(subtract(5, 2));   // 3
```

## ⚠️ Critical Rule: import Must Be at Top

```javascript
// ✅ VALID — import at top
import { add } from './math.js';

const result = add(2, 3);
console.log(result);

// ❌ INVALID — import inside if statement
if (someCondition) {
    import { add } from './math.js'; // SyntaxError!
}

// ❌ INVALID — import inside function
function myFunction() {
    import { add } from './math.js'; // SyntaxError!
}

// WHY this rule exists:
// Because import is always at top, Node.js can:
// 1. Scan entire file BEFORE running anything
// 2. Find all imports upfront
// 3. Load them all SIMULTANEOUSLY in parallel
// This makes ESM FASTER than CommonJS.
```

## 📊 CommonJS vs ESM Comparison

```
┌──────────────────────┬──────────────────────────┐
│     CommonJS         │         ESM              │
├──────────────────────┼──────────────────────────┤
│ require()            │ import                   │
│                      │                          │
│ module.exports       │ export                   │
│                      │                          │
│ Anywhere in file     │ Must be at top           │
│                      │                          │
│ Loads one by one     │ Loads in parallel        │
│ (synchronous)        │ (asynchronous)           │
│                      │                          │
│ No extension needed  │ .js extension required   │
│                      │                          │
│ Default in Node.js   │ Need "type":"module"     │
│                      │                          │
│ Dynamic require      │ Static import            │
│ possible             │ (no dynamic import)      │
└──────────────────────┴──────────────────────────┘
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why does ESM require .js extension but CommonJS doesn't?"
> **Answer:** ESM follows browser semantics. Browsers need exact file paths. CommonJS was Node.js-specific and did its own resolution.

**Step 2:** Ask: "Why must import be at the top?"
> **Answer:** Static analysis. Node.js can find all imports upfront and load them in parallel. This is faster than CommonJS's one-by-one loading.

**Step 3:** Ask: "Why unlimited named exports but only one default?"
> **Answer:** Named exports are identified by name (no confusion). Default export has no name (two would be ambiguous).

**Step 4:** Ask: "What happens if I use require() in an ESM file?"
> **Answer:** SyntaxError: require is not defined. You're in ESM world now. Use import instead.

---

# 📌 TOPIC 8: package.json, package-lock.json, node_modules

## 🧠 The Complete Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│                  THE PROBLEM                                  │
│                                                                 │
│  You built a project with 10 packages.                        │
│  You send code to Aditya.                                     │
│  He runs it. BREAKS IMMEDIATELY.                              │
│                                                                 │
│  Why? He doesn't have those 10 packages installed.            │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                  THE SOLUTION: package.json                   │
│                                                                 │
│  A list of every package your project needs.                  │
│  Anyone gets code → reads list → installs → works.           │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              VERSION NUMBERS EXPLAINED                        │
│                                                                 │
│  4  .  18  .  2                                                │
│  ↑      ↑      ↑                                               │
│  MAJOR  MINOR  PATCH                                           │
│                                                                 │
│  PATCH (4.18.2 → 4.18.3): Bug fix only. Safe.                │
│  MINOR (4.18.2 → 4.19.0): New features. Existing code works. │
│  MAJOR (4.18.2 → 5.0.0): Breaking changes. Code might break. │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              VERSION RANGE SYMBOLS                            │
│                                                                 │
│  ~4.18.2 (Tilde): Patch updates only                          │
│  → 4.18.3 ✅  4.18.9 ✅  4.19.0 ❌  5.0.0 ❌                 │
│                                                                 │
│  ^4.18.2 (Caret): Patch AND minor updates                     │
│  → 4.18.3 ✅  4.19.0 ✅  4.20.5 ✅  5.0.0 ❌                 │
│                                                                 │
│  4.18.2 (No symbol): Exact version                           │
│  → 4.18.2 ✅  Anything else ❌                               │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Creating package.json

```bash
# Step 1: Initialize project
mkdir myproject
cd myproject
npm init -y
# THINK: -y means "yes to all defaults"
# Creates package.json automatically
```

```json
// package.json (auto-generated by npm init -y)
{
    "name": "myproject",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {},
    "devDependencies": {}
}
```

## 💻 Understanding Each Field

```json
{
    "name": "myproject",
    // THINK: Name of your project. Must be lowercase, no spaces.

    "version": "1.0.0",
    // THINK: Your project's version. Follows semantic versioning.

    "description": "",
    // THINK: What your project does. Optional but helpful.

    "main": "index.js",
    // THINK: Entry point — which file runs when someone does npm start.

    "scripts": {
        "start": "node index.js",
        "dev": "nodemon index.js"
    },
    // THINK: Shortcuts for commands. Run with: npm run start, npm run dev

    "dependencies": {
        "express": "^4.18.2"
    },
    // THINK: Packages needed in PRODUCTION. App won't work without these.

    "devDependencies": {
        "nodemon": "^3.0.1"
    }
    // THINK: Packages only needed in DEVELOPMENT. Not in production.
}
```

## 💻 Installing Packages

```bash
# Install a production dependency
npm install express
# THINK: This adds express to "dependencies"

# Install a development dependency
npm install nodemon --save-dev
# THINK: This adds nodemon to "devDependencies"
# nodemon restarts server automatically during development
# Production server doesn't need it
```

## 📊 Why package-lock.json Exists

```
┌─────────────────────────────────────────────────────────────────┐
│              THE VERSION MISMATCH PROBLEM                     │
│                                                                 │
│  package.json says: "express": "^4.18.2"                      │
│                                                                 │
│  You run npm install TODAY:                                    │
│  → Gets express 4.18.2 (current version)                      │
│                                                                 │
│  Aditya clones 6 months later:                                 │
│  → Gets express 4.19.5 (latest version with ^4.18.2)          │
│                                                                 │
│  SAME codebase. DIFFERENT versions. DIFFERENT behavior.       │
│  Bugs that only happen on Aditya's machine!                   │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              package-lock.json TO THE RESCUE                  │
│                                                                 │
│  Records EXACT version that was actually installed:           │
│  {                                                             │
│      "express": {                                              │
│          "version": "4.18.2",                                 │
│          "resolved": "https://registry.npmjs.org/express/..." │
│      }                                                         │
│  }                                                             │
│                                                                 │
│  Everyone gets EXACTLY 4.18.2. No surprises.                  │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 npm install vs npm ci

```bash
# npm install — Development
# THINK: Tries to follow lock file but can UPDATE it.
# Use when: adding new packages, developing.

npm install

# npm ci — Production/CI
# THINK: Follows lock file STRICTLY. No updates. Fails if mismatch.
# Use when: deploying to production, CI pipelines.

npm ci
```

## 📁 What is node_modules?

```
myproject/
    app.js
    package.json         ← What packages you NEED (version ranges)
    package-lock.json    ← EXACT versions installed
    node_modules/        ← Actual downloaded code of every package
        express/
        lodash/
        nodemon/
        ... thousands of files

You COMMIT: package.json, package-lock.json
You NEVER commit: node_modules (too large, recreatable)
```

```bash
# .gitignore file
node_modules/
# THINK: Never commit node_modules to git.
# Anyone can recreate it with: npm install
# npm reads package.json and downloads everything fresh.
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do we need package.json at all?"
> **Answer:** To share a list of dependencies. Without it, everyone would have to manually install packages one by one.

**Step 2:** Ask: "Why does package-lock.json exist if package.json already lists dependencies?"
> **Answer:** package.json has version RANGES (^4.18.2). package-lock.json has EXACT versions (4.18.2). Lock file ensures everyone gets identical versions.

**Step 3:** Ask: "What's the difference between ~ and ^?"
> **Answer:** 
> - ~ allows only patch updates (bug fixes)
> - ^ allows patch AND minor updates (bug fixes + new features)
> - Both prevent major updates (breaking changes)

**Step 4:** Ask: "Why not commit node_modules to git?"
> **Answer:** It's huge (thousands of files). It can be recreated exactly with `npm ci`. Git is for YOUR code, not dependencies.

---

# 📌 TOPIC 9: HTTP Protocol

## 🧠 HTTP Request Structure Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              HTTP REQUEST STRUCTURE                           │
│                                                                 │
│  POST /users HTTP/1.1                                          │
│  Host: localhost:3000                                          │
│  Content-Type: application/json                                │
│  Authorization: Bearer token123                                │
│  Content-Length: 32                                            │
│                                                                 │
│  {"name":"Rohit","email":"rohit@gmail.com"}                    │
│                                                                 │
│  Four parts:                                                   │
│  1. REQUEST LINE: POST /users HTTP/1.1                        │
│     - Method (POST)                                            │
│     - URL (/users)                                             │
│     - HTTP Version (HTTP/1.1)                                  │
│                                                                 │
│  2. HEADERS: Metadata about the request                       │
│     - Host: which server                                       │
│     - Content-Type: format of body                            │
│     - Authorization: who are you                              │
│                                                                 │
│  3. BLANK LINE: \r\n\r\n (signals end of headers)            │
│                                                                 │
│  4. BODY: The actual data (only in POST, PUT, PATCH)          │
└─────────────────────────────────────────────────────────────────┘
```

## 🧠 HTTP Response Structure Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              HTTP RESPONSE STRUCTURE                          │
│                                                                 │
│  HTTP/1.1 200 OK                                               │
│  Content-Type: application/json                                │
│  Content-Length: 27                                            │
│                                                                 │
│  {"name":"Rohit","age":25}                                     │
│                                                                 │
│  Four parts:                                                   │
│  1. STATUS LINE: HTTP/1.1 200 OK                              │
│     - HTTP Version                                              │
│     - Status Code (200)                                        │
│     - Status Message (OK)                                     │
│                                                                 │
│  2. HEADERS: Metadata about the response                      │
│     - Content-Type: format of body                            │
│     - Content-Length: size of body                           │
│                                                                 │
│  3. BLANK LINE: \r\n\r\n (signals end of headers)            │
│                                                                 │
│  4. BODY: The actual response data                            │
└─────────────────────────────────────────────────────────────────┘
```

## 📊 HTTP Methods

```
┌──────────┬─────────────────────────────────────────────┐
│  METHOD  │               WHAT IT DOES                  │
├──────────┼─────────────────────────────────────────────┤
│  GET     │ Read data (no body)                        │
│          │ GET /users → get all users                 │
│          │ GET /users/1 → get user with id 1          │
│          │                                             │
│  POST    │ Create data (has body)                     │
│          │ POST /users → create new user              │
│          │ Body: {"name":"Rohit","age":25}            │
│          │                                             │
│  PUT     │ Replace entire data (has body)             │
│          │ PUT /users/1 → replace user 1 completely   │
│          │ Body: {"name":"New Name","age":30}         │
│          │ ⚠️ Omitted fields get WIPED OUT!          │
│          │                                             │
│  PATCH   │ Update part of data (has body)             │
│          │ PATCH /users/1 → update only age           │
│          │ Body: {"age":31}                           │
│          │ ✅ Other fields remain unchanged           │
│          │                                             │
│  DELETE  │ Delete data (no body)                      │
│          │ DELETE /users/1 → delete user with id 1    │
└──────────┴─────────────────────────────────────────────┘
```

## 📊 HTTP Status Codes

```
┌─────────────────────────────────────────────────────────────┐
│  2xx — SUCCESS                                             │
├─────────────────────────────────────────────────────────────┤
│  200 OK           : Request successful                    │
│  201 Created      : Resource created (POST)               │
│  204 No Content   : Success but nothing to return (DELETE)│
│                                                            │
│  3xx — REDIRECTION                                         │
├─────────────────────────────────────────────────────────────┤
│  301 Moved Permanently : URL changed forever              │
│  302 Found             : Temporary redirect              │
│                                                            │
│  4xx — CLIENT ERROR                                        │
├─────────────────────────────────────────────────────────────┤
│  400 Bad Request    : Invalid input from client          │
│  401 Unauthorized   : Not authenticated (no token)       │
│  403 Forbidden      : Authenticated but not allowed      │
│  404 Not Found      : Resource doesn't exist             │
│                                                            │
│  5xx — SERVER ERROR                                        │
├─────────────────────────────────────────────────────────────┤
│  500 Internal Server Error : Something broke on server    │
│  502 Bad Gateway           : Upstream server failed      │
│  503 Service Unavailable   : Server is down/overloaded   │
└─────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Making HTTP Requests

```javascript
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
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do GET and DELETE have no body but POST, PUT, PATCH do?"
> **Answer:** GET/DELETE identify a resource by URL alone. POST/PUT/PATCH need to send the data they're creating/updating.

**Step 2:** Ask: "What's the difference between PUT and PATCH?"
> **Answer:** 
> - PUT: Replace ENTIRE resource. Omitted fields get wiped.
> - PATCH: Update ONLY the fields sent. Other fields remain.

**Step 3:** Ask: "What's the difference between 401 and 403?"
> **Answer:** 
> - 401: "I don't know who you are" (not authenticated)
> - 403: "I know who you are, but you can't do this" (not authorized)

**Step 4:** Ask: "Why is HTTP called stateless?"
> **Answer:** Each request is independent. Server remembers nothing between requests. That's why we need tokens/cookies to carry identity.

---

# 📌 TOPIC 10: Express.js — The Solution to Raw Node Pain

## 🧠 The Pain-to-Cure Mapping Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              RAW NODE.JS PAIN                                 │
│                                                                 │
│  1. No routing — giant if-else on strings                     │
│  2. No dynamic routes — manual URL parsing                    │
│  3. Body doesn't exist — manual chunk collection             │
│  4. Manual response paperwork — writeHead + stringify         │
│  5. Forget res.end() → request hangs forever                  │
│  6. No middleware — copy-paste logging/auth everywhere        │
│  7. No organization — 250+ line monster callback             │
│  8. No static file serving — manual fs + MIME types          │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              EXPRESS.JS CURES                                 │
│                                                                 │
│  1. app.get('/users') — clean routing                         │
│  2. '/users/:id' → req.params.id — dynamic routes            │
│  3. express.json() → req.body just exists                    │
│  4. res.status(201).json(...) — one line response           │
│  5. Catch-all + error handler — no more hanging              │
│  6. app.use() — middleware for cross-cutting concerns        │
│  7. express.Router() — organize into separate files          │
│  8. express.static('public') — serve files automatically     │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Express CRUD — Complete Code with Thinking Process

```javascript
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
```

## 🔄 Complete Request Flow for Each Method

```
┌─────────────────────────────────────────────────────────────────┐
│                    GET /users                                  │
│  Client → "Show me all users"                                 │
│  Server → res.json(users) → sends array                       │
│  Status: 200 OK                                               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    POST /users                                 │
│  Client → Body: {"name":"Rohit","age":25}                     │
│  Server → Create user with id=1                              │
│  Server → 201 Created + the new user with id                  │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PUT /users/1                                │
│  Client → Body: {"name":"New Name","age":30,"email":"new@..."}│
│  Server → Replace ENTIRE user 1                               │
│  ⚠️ balance field GONE (client didn't send it)               │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    PATCH /users/1                              │
│  Client → Body: {"age":31} only                              │
│  Server → Update ONLY age. Name, email, balance preserved.    │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│                    DELETE /users/1                             │
│  Client → No body                                             │
│  Server → Remove user 1. Send back deleted user.              │
└─────────────────────────────────────────────────────────────────┘
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do we need express.json() before reading req.body?"
> **Answer:** Express doesn't parse JSON by default. express.json() is middleware that reads the request stream, parses JSON, and puts result in req.body.

**Step 2:** Ask: "Why can't we use array index as user ID?"
> **Answer:** After deleting user 2, user 3 becomes index 2. Old references break. A stable ID ensures consistent identification.

**Step 3:** Ask: "What happens if I don't use 'return' before res.status().json()?"
> **Answer:** Code continues executing. You might send TWO responses. Express throws an error: "Cannot set headers after they are sent to the client."

**Step 4:** Ask: "Why does PUT wipe out omitted fields but PATCH doesn't?"
> **Answer:** 
> - PUT: Complete replacement. Client sends ALL fields.
> - PATCH: Partial update. Object.assign only updates sent fields.

---

# 📌 TOPIC 11: Query Strings

## 🧠 The Flowchart

```
┌─────────────────────────────────────────────────────────────────┐
│              WHAT IS A QUERY STRING?                          │
│                                                                 │
│  URL: http://localhost:3000/add?num1=10&num2=20               │
│                                                                 │
│  /add          → PATH (which operation)                       │
│  ?             → Marks start of query string                  │
│  num1=10       → First parameter                               │
│  &             → Separates parameters                          │
│  num2=20       → Second parameter                              │
└─────────────────────────────────────────────────────────────────┘
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│              HOW TO PARSE IN NODE.JS                         │
│                                                                 │
│  Method 1: Use url.parse(req.url, true)                       │
│  → Returns { pathname: '/add', query: { num1: '10', num2: '20' }}│
│                                                                 │
│  Method 2: In Express, use req.query                          │
│  → req.query = { num1: '10', num2: '20' }                    │
│  → Much easier! Already parsed for you.                       │
└─────────────────────────────────────────────────────────────────┘
```

## 💻 Code Snippet — Query String in Express

```javascript
const express = require('express');
const app = express();

app.get('/add', (req, res) => {
    // THINK: Express automatically parses query strings.
    // GET /add?num1=10&num2=20 → req.query = { num1: '10', num2: '20' }
    
    const num1 = Number(req.query.num1);
    const num2 = Number(req.query.num2);
    // THINK: Query params are STRINGS. Convert to numbers.
    
    // THINK: Validate input. What if user sends /add?num1=abc?
    if (isNaN(num1) || isNaN(num2)) {
        return res.status(400).json({ error: "Please provide valid numbers" });
    }
    
    res.json({ result: num1 + num2 });
});

app.listen(3000);
```

## 🔄 Reverse Engineering Prompts

**Step 1:** Ask: "Why do we need query strings at all?"
> **Answer:** To pass data in GET requests (which don't have bodies). Query strings put data in the URL.

**Step 2:** Ask: "What happens if I access a query param that wasn't sent?"
> **Answer:** req.query.paramName returns undefined. Always validate!

**Step 3:** Ask: "Why are query params always strings?"
> **Answer:** URLs are text. Everything in a URL is a string. You must convert to the type you need.

---

# 🎯 SUMMARY: Complete Mental Model

```
┌─────────────────────────────────────────────────────────────────┐
│                    THE BIG PICTURE                            │
│                                                                 │
│  1. BACKEND exists because frontend is PUBLIC.                │
│     Secrets, validation, database access → backend.           │
│                                                                 │
│  2. TCP ensures RELIABLE communication.                       │
│     3-way handshake confirms both directions work.           │
│     Sequence numbers + ACKs ensure no data loss.              │
│                                                                 │
│  3. MODULES organize code.                                    │
│     CommonJS: require/module.exports (Node.js default)        │
│     ESM: import/export (official JS standard)                 │
│                                                                 │
│  4. package.json manages DEPENDENCIES.                        │
│     package-lock.json ensures IDENTICAL versions.             │
│     node_modules contains ACTUAL code.                        │
│                                                                 │
│  5. HTTP is the PROTOCOL.                                     │
│     Request: method + URL + headers + body                   │
│     Response: status + headers + body                        │
│                                                                 │
│  6. EXPRESS simplifies everything.                            │
│     Routing, middleware, JSON parsing, clean responses.       │
└─────────────────────────────────────────────────────────────────┘
```

## 🎯 The Key Thinking Patterns

```
Every time you write backend code, ask:

1. "Where does this code RUN?" (browser or server?)
2. "What can the user SEE?" (nothing on server)
3. "What is the user SENDING me?" (request)
4. "What am I sending BACK?" (response)
5. "Is this input VALID?" (validation)
6. "What STATUS should I return?" (200? 400? 404?)
7. "Did I set the Content-Type?" (JSON? HTML?)
8. "Did I END the response?" (res.end/res.json)
9. "What if this FAILS?" (error handling)
10. "Can I trust this data?" (never trust user input)
```

This is your complete guide. Every concept, every code pattern, every thinking process documented. The reverse engineering prompts help you understand WHY each decision is made, not just WHAT to type.