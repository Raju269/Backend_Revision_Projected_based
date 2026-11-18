# Lecture01 to 05: Introduction to NodeJs

# Introduction to Backend — Why Does It Exist?

* * *

## Start From What You Already Know

You know JavaScript. You built frontend applications.

Button clicks. DOM manipulation. Fetching data. Showing UI.

Everything works. No problem.

* * *

## The First Breaking Point — Calculator

You built a calculator.

User clicks buttons → JavaScript runs → answer shows on screen.

Everything happens in the browser. On the user's machine.

**No backend needed. Frontend is enough.**

* * *

## Now Change the App — Login Page

User types `rohit@gmail.com` and `password123` → clicks Login.

Naively you write —

```jsx
if (password === "password123") {
    // let them in
}
```

Your student immediately thinks this works.

**Ask them one question —**

> *"Where does this code live?"*

In the browser. Which means — open DevTools → Sources tab → your entire JavaScript file is visible.

Anyone can open DevTools and read the password directly.

**The frontend is public. Every line of JavaScript you write is visible to everyone.**

* * *

## This One Problem Forces You to Invent Backend

You need a place to run code that the user cannot see or touch.

Not in their browser. On **your machine.**

A place where you can say —

> *"I will check the password here. User sends me the attempt. I verify it secretly. I send back only yes or no."*

That hidden place — running your secret logic — is the **backend.**

* * *

## Second Breaking Point — Database

Your app needs to store user data permanently.

You connect directly from frontend to database —

```plaintext
Browser ──────────────────→ Database
         "give me all users"
```

**What is the problem?**

Database connection string, username, password — all sitting in frontend JavaScript.

User opens DevTools. Copies your database credentials. Connects directly.

Runs —

```sql
SELECT * FROM users;
```

Every user's data. Exposed. Not just read — they can delete and modify everything.

* * *

## Backend Solves This Completely

Backend sits in the middle —

```plaintext
Browser ──→ Backend (your machine) ──→ Database
```

Now —

*   Database credentials live on your server. User never sees them.
    
*   Backend verifies who the user is before touching database.
    
*   Backend fetches only that user's data — not everyone's.
    
*   User gets back exactly what they are allowed to see. Nothing more.
    

* * *

## So What is Backend?

Backend is just a program running on your machine — not the user's machine.

The user cannot see its code. Cannot touch it. Cannot control it.

It sits between the user and your data. Acting as a trusted middleman.

* * *

## Frontend vs Backend — The Real Difference

```plaintext
Frontend                        Backend
────────────────────            ────────────────────
Runs on user's machine          Runs on your machine
User can see all code           User sees nothing
Cannot trust it                 You fully trust it
Cannot hide secrets             Secrets live here
Makes UI                        Makes decisions
```

* * *

## Every Backend Concept Comes From This

Every single thing they will learn in backend —

```plaintext
Authentication    →   proving who you are
Authorization     →   what you are allowed to do
APIs              →   how frontend talks to backend
Middleware        →   checks that run before every request
JWT tokens        →   proving identity without passwords
Database queries  →   fetching only what you are allowed to see
```

**Every single one is just a different answer to this same problem —**

> *"How do we verify who you are and control what you can access?"*

* * *

## One Line First Thought

> *"The moment you have logic that must be hidden from the user — you need a backend. It exists for one reason — the frontend belongs to the user, the backend belongs to you."*

TCP: How do I reliably send data between two machines, making sure nothing is lost, nothing is out of order?

## You Have a Message. You Want to Send it to the Server.

Naive thought —

> *"I have the IP and Port. Let me just send the message directly."*

You send your 100 packets straight away.

**What is the problem?**

* * *

## Problem 1 — Is the Server Even Alive?

You sent 100 packets.

Maybe the server crashed 5 minutes ago. Nobody is there.

Your 100 packets went into the void. You wasted time and bandwidth sending everything. You have no idea if anyone received it.

**Obvious solution —**

> *"Before sending anything, let me first ask — are you there?"*

```plaintext
You  →  "Are you there?"
```

That's it. That single question is **SYN.**

* * *

## Problem 2 — The Server Replied. But Did You Receive the Reply?

Server is alive. It heard your question. It sends back —

```plaintext
Server  →  "Yes I am here."
```

But what if **that reply got lost** on the way back to you?

You are sitting waiting. Server is sitting thinking you heard it.

Nobody knows the line back to you is broken.

**This is the real problem.**

> *"Just because I can reach the server doesn't mean the server can reach me back."*

The internet is two way traffic. Both directions are independent. One direction working does not guarantee the other direction works.

**Obvious solution —**

> *"Server must ask me to confirm I received its reply."*

```plaintext
Server  →  "Yes I am here. Did you hear me?"
```

That is **SYN-ACK.**

* * *

## Problem 3 — You Must Confirm You Heard the Server

Server asked — *"did you hear me?"*

You send back —

```plaintext
You  →  "Yes I heard you."
```

That is **ACK.**

* * *

## Now Both Sides Have Confirmed One Critical Thing

```plaintext
You  →  Server     ✅  This direction works
Server  →  You     ✅  This direction works
```

**Both directions confirmed. Both sides know the line is reliable in both ways.**

Now it is safe to send real data.

* * *

## Why Exactly 3 Steps? Why Not 2?

This is the real question.

Can you do it in 2 steps?

```plaintext
You     →  "Are you there?"
Server  ←  "Yes I am here."
```

You know the server is alive. But **does the server know you received its reply?**

No.

Server sent its reply into the unknown. Maybe it got lost. Maybe you never got it. Server has no idea.

So if you now send 100 packets — server is confused.

> *"Wait, did they even receive my reply? Are we even connected properly? What is happening?"*

**2 steps only confirms one direction.**

3 steps is the **minimum** to confirm both directions independently.

* * *

## One Line First Thought

> *"The internet is two independent directions. One direction working does not mean both work. 3 handshake is the minimum number of messages needed to confirm both directions are alive and working — before trusting real data on them."*

That is the only reason. Nothing more.

## You have a message. It will become 100 packets. You have the IP address of the server.

* * *

## Step 1 — You Need a Port Too

IP address tells you **which machine.**

But that machine is running many programs simultaneously — browser, spotify, your node server, etc.

You need to know **which program** on that machine to talk to.

That is the **Port number.**

So your destination is now complete —

```jsx
IP Address  :  Port
103.21.58.1 :  3000
```

* * *

## Step 2 — Your Machine Also Needs a Port

The server will send data back to you.

So your machine also needs a port — so the server knows where to send the reply back.

Your OS **randomly assigns** you a port for this conversation.

```jsx
Your Machine          Server
IP: 192.168.1.1   →   IP: 103.21.58.1
Port: 54231       →   Port: 3000
```

Now both sides have a complete address. This pair is called a **Socket.**

* * *

## Step 3 — TCP Handshake Begins. SYN.

Your machine sends the first packet to the server.

This is not your actual message. This is a **special control packet.**

It contains —

```jsx
From  : 192.168.1.1 : 54231
To    : 103.21.58.1 : 3000
Type  : SYN
Sequence Number : 1000     ← "I will start numbering my packets from 1000"
```

> *"Hey server. I want to connect. I will number my packets starting from 1000. Are you ready?"*

This SYN packet travels through routers, cables, reaches the server.

* * *

## Step 4 — Server Replies. SYN-ACK.

Server receives your SYN packet.

It sends back a **SYN-ACK packet** —

```jsx
From  : 103.21.58.1 : 3000
To    : 192.168.1.1 : 54231
Type  : SYN-ACK
Acknowledgement Number : 1001    ← "I received your 1000. Send 1001 next."
Sequence Number : 5000           ← "I will number MY packets starting from 5000"
```

Two things happening here —

*   Server confirms it received your SYN — **ACK part**
    
*   Server tells you its own starting sequence number — **SYN part**
    

* * *

## Step 5 — You Reply. ACK.

You receive the SYN-ACK.

You send back —

```jsx
From  : 192.168.1.1 : 54231
To    : 103.21.58.1 : 3000
Type  : ACK
Acknowledgement Number : 5001    ← "I received your 5000. Send 5001 next."
```

Now both sides have confirmed —

*   ✅ My packets can reach you
    
*   ✅ Your packets can reach me
    
*   ✅ We both have each other's starting sequence numbers
    
*   ✅ We both know what packet number to expect next
    

**Connection is established. Now real data can flow.**

* * *

## Step 6 — Your 100 Packets Start Moving

Now your actual message starts sending. Broken into 100 packets.

Each packet looks like —

```jsx
Packet 1
─────────────────────────────
From  : 192.168.1.1 : 54231
To    : 103.21.58.1 : 3000
Sequence Number : 1001
Data  : [first chunk of your message]

Packet 2
─────────────────────────────
Sequence Number : 1002
Data  : [second chunk]

Packet 3
─────────────────────────────
Sequence Number : 1003
Data  : [third chunk]

... all the way to packet 100
Sequence Number : 1100
```

* * *

## Step 7 — Server Acknowledges Every Packet

As packets arrive, server sends back ACKs —

```jsx
ACK 1002   ← "Got 1001. Send 1002 next."
ACK 1003   ← "Got 1002. Send 1003 next."
ACK 1004   ← "Got 1003. Send 1004 next."
```

Your machine keeps a **timer on every sent packet.**

If ACK doesn't come back before timer expires —

```jsx
Packet 1047 sent...
Timer started...
Timer expired. No ACK received.
→ Resend packet 1047.
```

* * *

## Step 8 — What if a Packet Arrives Out of Order?

Packets take different routes. So they can arrive out of order.

```plaintext
Server receives:
Packet 1001 ✅
Packet 1003 ✅   ← arrived before 1002
Packet 1002 ✅   ← arrived late
```

Server **buffers** out of order packets. Waits for the missing one.

Once 1002 arrives — it reorders everything correctly —

```plaintext
1001 + 1002 + 1003 → correct order → passed to application
```

* * *

## Step 9 — All 100 Packets Delivered

Server has received all 100 packets. In correct order. With no missing pieces.

It reassembles your original message from all 100 packets.

**Your full message is now on the server. Successfully.**

* * *

## Step 10 — Connection Termination

Now the conversation is done. Both sides release their resources.

```jsx
Your Machine  →  FIN         "I am done sending"
Server        ←  ACK         "Got it"

Server        →  FIN         "I am also done sending"
Your Machine  ←  ACK         "Got it. Goodbye."

Connection closed.
Memory freed on both sides.
```

* * *

## The Complete Picture

```jsx
1.  Find IP + Port of server
2.  OS assigns you a random port
3.  SYN         → tell server your sequence number, ask if ready
4.  SYN-ACK     ← server confirms, gives its own sequence number
5.  ACK         → you confirm, connection established
6.  Send 100 packets, each numbered sequentially
7.  Server ACKs every packet received
8.  Lost packets → timer expires → resend
9.  Out of order → buffer → reorder → reassemble
10. FIN → ACK → FIN → ACK → connection closed
```

Not a single step is arbitrary. Every step is the **obvious solution to a specific problem** that comes before it.

## **Your First Server**

```jsx
const http = require('http');

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // res.end(JSON.stringify({name:"Rohot"}));
    // console.log(req);
    if(req.url == "/"){
        res.end("Hello Coder Army");
    }
    else if(req.url == "/user")
        res.end(JSON.stringify({name:"Rohot"}));
    else
        res.end("I am best");
});

server.listen(3000,()=>{
    console.log("Hi, I am listening");
})
```

# CommonJS Module System — require and exports

* * *

## What is a Module?

A file with a specific responsibility whose code can be used by other files.

```jsx
user.js        →   only user related code
payment.js     →   only payment related code
email.js       →   only email related code
```

* * *

## module.exports

`module` is a plain object Node.js creates for every file —

```jsx
module = {
    exports: {}    // starts as empty object
}
```

Whatever you put in `module.exports` — that is what `require()` returns. Nothing else crosses the boundary.

* * *

## Ways to Export

### 1 — Export a Single Function

```jsx
// math.js
function add(a, b) {
    return a + b;
}

module.exports = add;
```

```jsx
// app.js
const add = require('./math');
add(2, 3);    // 5
```

* * *

### 2 — Export Multiple Functions as Object

```jsx
// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

module.exports = { add, subtract, multiply };
```

```jsx
// app.js
const math = require('./math');
math.add(2, 3);         // 5
math.subtract(5, 2);    // 3
math.multiply(2, 3);    // 6
```

* * *

### 3 — Destructure Only What You Need

```jsx
// app.js
const { add } = require('./math');
add(2, 3);    // 5
```

* * *

### 4 — Export Inline Using exports

`exports` is just a shorthand reference to `module.exports`. You can add properties one by one —

```jsx
// math.js
exports.add = function(a, b) {
    return a + b;
}

exports.subtract = function(a, b) {
    return a - b;
}

exports.multiply = function(a, b) {
    return a * b;
}
```

* * *

## How require() Works Step by Step

```jsx
1.  Is it a built in module?   →   load from Node.js installation
2.  Does it start with ./ ?    →   load from that file path
3.  Neither?                   →   look inside node_modules folder

4.  Run the file completely
5.  Take whatever is in module.exports
6.  Return it
7.  Cache it — second require() of same file returns cached result instantly
```

* * *

## The Critical Trap — Never Mix exports and module.exports

```jsx
// ❌ WRONG — mulNumber is silently lost
exports.mulNumber = function() {}
module.exports = { add, subtract };
```

Why it breaks —

```plaintext
exports        ──→  { mulNumber: fn }

module.exports  ──→  { add, subtract }   // new object, connection broken
```

Node.js always returns `module.exports`. Not `exports`. So `mulNumber` is gone.

```jsx
// ✅ CORRECT — pick one style, stick to it

// Style 1 — collect at bottom
module.exports = { add, subtract, multiply };

// Style 2 — export inline one by one
exports.add = function() {}
exports.subtract = function() {}
exports.multiply = function() {}
```

* * *

## What Crosses the Boundary

Only `module.exports` crosses from one file to another. Nothing else.

```plaintext
math.js                           app.js
──────────────────                ──────────────────
let counter = 0;
function add() {}
module.exports = add   ────→      const add = [this only]

counter stays here.
Only add crosses.
```

* * *

## One Line First Thought

> *"module.exports is just an object. You put whatever you want to share inside it. require() returns exactly that object. Everything else stays private. That is the entire CommonJS module system."*

# ES Modules (ESM) — import and export

* * *

## Why ESM Exists

JavaScript had no official module system for years.

Node.js invented CommonJS in 2009 to solve their own problem. Browser had its own hacks. Everyone was doing different things.

TC39 — the people who decide official JavaScript standards — said in 2015 —

> *"JavaScript needs one official module system. That works everywhere. Browser and Node.js both."*

That is ES Modules. Built into JavaScript itself.

* * *

## How to Enable ESM in Node.js

Node.js assumes CommonJS by default.

To switch to ESM — add this to `package.json` —

```json
{
    "type": "module"
}
```

Or rename your file to `.mjs` —

```plaintext
math.mjs
app.mjs
```

* * *

## Named Export

You have multiple things to share from a file. Each one has a name. That name is how others import it.

```jsx
// math.js
function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

export { add, subtract, multiply };
```

Or export inline —

```jsx
// math.js
export function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}
```

Both are identical. Just different style.

* * *

## Named Import

You pick exactly what you need by name —

```jsx
// app.js
import { add, subtract } from './math.js';

add(2, 3);         // 5
subtract(5, 2);    // 3
```

Note — file extension `.js` is required in ESM. Unlike CommonJS where you could skip it.

* * *

## Import Everything

```jsx
// app.js
import * as math from './math.js';

math.add(2, 3);         // 5
math.subtract(5, 2);    // 3
math.multiply(2, 3);    // 6
```

* * *

## Rename While Importing

Two different files export something with the same name —

```jsx
import { add as addNumbers } from './math.js';

addNumbers(2, 3);    // 5
```

* * *

## How Many Named Exports Can You Have?

Unlimited. Every function, variable, constant you want to share —

```jsx
export const PI = 3.14;
export const E = 2.71;
export function add() {}
export function subtract() {}
export function multiply() {}
```

All five are named exports. No limit.

* * *

## Default Export

Every file has one primary purpose. One main thing it does.

That main thing is the default export —

```jsx
// math.js
export default function add(a, b) {
    return a + b;
}
```

```jsx
// app.js
import add from './math.js';    // no curly braces

add(2, 3);    // 5
```

No curly braces when importing default. You are saying —

> *"Give me the main thing from this file."*

* * *

## How Many Default Exports Can You Have?

Exactly one. Per file. No exceptions.

```jsx
// ❌ throws error immediately
export default function add() {}
export default function subtract() {}
```

Why? Because when you import default —

```jsx
import ??? from './math.js';
```

There is no name. No curly braces. JavaScript has no way to know which one you want if there are two.

One file. One default. No ambiguity.

* * *

## Default + Named Together

```jsx
// math.js
export default function add(a, b) {
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14;
```

```jsx
// app.js
import add, { subtract, multiply, PI } from './math.js';
```

Default comes first. Named come in curly braces after.

Default — the primary purpose of the file. Named — everything supporting around it.

* * *

## The Critical Rule — import Must Always Be at the Top

```jsx
// ✅ valid
import { add } from './math.js';

// ❌ not valid — anywhere inside conditions or functions
if (something) {
    import { add } from './math.js';
}
```

This feels like a restriction. But it is actually what makes ESM faster.

Because import is always at the top — Node.js can scan the entire file before running anything, find all imports upfront, and load them all simultaneously in parallel.

* * *

## require Does Not Exist in ESM

Once you add `"type": "module"` to package.json —

```jsx
const http = require('http');    // ❌ require is not defined

import http from 'node:http';    // ✅ correct
```

You are fully in ESM world. CommonJS syntax does not work anymore.

* * *

## CommonJS vs ESM

```plaintext
CommonJS                     ESM
────────────────             ────────────────
require()                    import
module.exports               export
Anywhere in file             Must be at top
Loads one by one             Loads all in parallel
No extension needed          .js extension required
Default in Node.js           Need "type":"module"
```

* * *

## One Line First Thought

> *"Named exports are unlimited because you pick them by name — no confusion. Default export is exactly one because you pick it without a name — two would be ambiguous. import must be at the top — that single restriction is what makes parallel loading possible."*

Here are the complete notes.

* * *

# package.json, package-lock.json, node\_modules, Caret and Tilde

* * *

## Why Does package.json Exist?

You built a Node.js project. You used 10 external packages.

You want to share this project with Aditya.

You send him your code. He runs it. It breaks immediately.

**Why?**

He does not have those 10 packages installed on his machine.

**Obvious solution —**

> *"Keep a list of every package your project needs. Anyone who gets your code — reads the list — installs everything — project works."*

That list is `package.json`.

* * *

## How to Create It

```bash
npm init -y
```

This creates `package.json` automatically —

```json
{
    "name": "myproject",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "start": "node index.js"
    },
    "dependencies": {}
}
```

* * *

## What Each Field Means

```json
{
    "name": "myproject",        // name of your project
    "version": "1.0.0",         // version of your project
    "main": "index.js",         // entry point — which file runs first
    "scripts": {
        "start": "node index.js"    // shortcuts for commands
    },
    "dependencies": {           // packages needed in production
        "express": "^4.18.2"
    },
    "devDependencies": {        // packages needed only in development
        "nodemon": "^3.0.1"
    }
}
```

* * *

## dependencies vs devDependencies

**dependencies** — packages your app needs to actually run.

```bash
npm install express
```

**devDependencies** — packages you only need while developing. Not in production.

```bash
npm install nodemon --save-dev
```

> *"nodemon restarts your server automatically during development. Production server does not need it. So it goes in devDependencies."*

* * *

## What is a Version Number?

Software packages keep updating. Every version has three numbers —

```plaintext
4  .  18  .  2
↑      ↑      ↑
MAJOR  MINOR  PATCH
```

**PATCH** — bug fix only. Nothing new. Nothing changed.

```plaintext
4.18.2 → 4.18.3
```

**MINOR** — new features added. Existing code still works. Nothing broke.

```plaintext
4.18.2 → 4.19.0
```

**MAJOR** — everything changed. Existing code will probably break.

```plaintext
4.18.2 → 5.0.0
```

This standard is called **Semantic Versioning.**

* * *

## Tilde ~ — Patch Updates Only

```json
"express": "~4.18.2"
```

You are saying —

> *"Install 4.18.2. But patch updates are safe — bug fixes only. Install those too."*

```plaintext
4.18.2  ✅
4.18.3  ✅   patch — safe
4.18.9  ✅   patch — safe
4.19.0  ❌   minor — not allowed
5.0.0   ❌   major — not allowed
```

Only the last number can change.

* * *

## Caret ^ — Minor Updates Also Fine

```json
"express": "^4.18.2"
```

You are saying —

> *"Install 4.18.2. Patch updates are safe. Minor updates are also safe — they only add features, nothing breaks."*

```plaintext
4.18.2  ✅
4.18.3  ✅   patch — safe
4.19.0  ✅   minor — safe
4.20.5  ✅   minor — safe
5.0.0   ❌   major — not allowed
```

First number cannot change.

* * *

## No Symbol — Exact Version

```json
"express": "4.18.2"
```

```plaintext
4.18.2  ✅
4.18.3  ❌
4.19.0  ❌
5.0.0   ❌
```

Install exactly this. Nothing else. Ever.

* * *

## Why Does package-lock.json Exist?

You have this in package.json —

```json
"express": "^4.18.2"
```

You run `npm install` today — gets 4.18.2.

Aditya clones your project 6 months later — express is now at 4.19.5. He gets 4.19.5.

Same codebase. Different versions. Different behavior. Bugs that only happen on his machine.

**Obvious solution —**

> *"Record the exact version that was actually installed. Everyone always gets that exact version."*

That record is `package-lock.json` —

```json
{
    "dependencies": {
        "express": {
            "version": "4.18.2",
            "resolved": "https://registry.npmjs.org/express/-/express-4.18.2.tgz"
        }
    }
}
```

* * *

## npm install vs npm ci

**npm install** — tries to follow lock file but can update it when you add new packages or mismatches exist.

**npm ci** — follows lock file strictly. No exceptions. No updates. Fails if package.json and lock file conflict.

```plaintext
npm install   →   development. flexible.
npm ci        →   production and CI pipelines. strictly locked.
```

* * *

## What is node\_modules?

When you run `npm install` —

npm reads package.json, downloads every package, and puts them all inside a folder called `node_modules`.

```plaintext
myproject/
    app.js
    package.json
    package-lock.json
    node_modules/
        express/
        lodash/
        nodemon/
        ... all packages live here
```

This folder can be extremely large — thousands of files.

**Always add it to** `.gitignore` **—**

```plaintext
node_modules/
```

Never commit it to git. Anyone who clones your project just runs —

```bash
npm install
```

npm reads package.json and recreates node\_modules from scratch.

* * *

## The Complete Picture

```plaintext
package.json          →   what packages you need and version ranges
package-lock.json     →   exact versions actually installed
node_modules          →   the actual downloaded code of every package
```

```plaintext
You commit          →   package.json and package-lock.json
You never commit    →   node_modules
```

* * *

## One Line First Thought

> *"package.json is your wishlist with flexible versions. package-lock.json locks the exact reality. node\_modules is where the actual code lives. Tilde allows only bug fixes. Caret allows bug fixes and new features. No symbol means exact version. Together they ensure every machine gets identical packages."*

# How to create the project

## Step 1 — Initialize the Project

```bash
mkdir myproject
cd myproject
npm init -y
npm i validator
```

This creates `package.json` automatically.

* * *

## Step 2 — Enable ESM

Open `package.json` and add one line —

```json
{
    "name": "myproject",
    "version": "1.0.0",
    "type": "module"
}
```

Without this — Node.js will throw an error the moment it sees `import`.

* * *

## Step 3 — Create Your Validator File

```jsx
// validator.js

function isValidEmail(email) {
    return email.includes('@') && email.includes('.');
}

function isValidPhone(phone) {
    return phone.length === 10 && !isNaN(phone);
}

function isStrongPassword(password) {
    return password.length >= 8;
}

export { isValidEmail, isValidPhone, isStrongPassword };
```

* * *

## Step 4 — Create app.js and Import It

```jsx
// app.js
import { isValidEmail, isValidPhone, isStrongPassword } from './validator.js';

console.log(isValidEmail('rohit@gmail.com'));    // true
console.log(isValidEmail('rohitgmail.com'));     // false

console.log(isValidPhone('9876543210'));         // true
console.log(isValidPhone('98765'));              // false

console.log(isStrongPassword('12345678'));       // true
console.log(isStrongPassword('123'));            // false
```

**Note —** `.js` **extension is mandatory in ESM.** Without it Node.js will throw —

```plaintext
Error: Cannot find module './validator'
```

* * *

## Step 5 — Run It

```bash
node app.js
```

Output —

```plaintext
true
false
true
false
true
false
```

* * *

## Your Project Structure

```plaintext
myproject/
    validator.js
    app.js
    package.json
```

* * *

## One Line First Thought

> *"Three things required for ESM to work —* `"type": "module"` *in package.json,* `export` *in the file sharing code,* `import` *with* `.js` *extension in the file using it. Miss any one — it breaks."*

!Untitled-2026-03-20-1936.svg

# HTTP — HyperText Transfer Protocol

* * *

## What is HTTP

A protocol — a written contract that defines exactly how every request and response must be structured between two programs communicating over the internet.

* * *

## HTTP Request Structure

```jsx
POST /users HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Authorization: Bearer token123
Content-Length: 32

{"name":"Rohit","email":"rohit@gmail.com"}
```

Four parts —

**Request Line**

```jsx
POST        →   method
/users      →   URL
HTTP/1.1    →   version
```

**Headers**

```jsx
Host              →   which server
Content-Type      →   what format is the body
Content-Length    →   how many bytes is the body
Authorization     →   who are you
Accept            →   what format do you want back
```

**Blank Line**

```jsx
\r\n\r\n    →   signals end of headers
```

**Body**

```plaintext
{"name":"Rohit","email":"rohit@gmail.com"}
```

Only present in POST, PUT, PATCH. GET and DELETE have no body.

* * *

## HTTP Response Structure

```jsx
HTTP/1.1 200 OK
Content-Type: application/json
Content-Length: 27

{"name":"Rohit","age":25}
```

**Status Line**

```plaintext
HTTP/1.1    →   version
200         →   status code
OK          →   human readable message
```

**Headers**

```plaintext
Content-Type      →   what format is the body
Content-Length    →   how many bytes is the body
```

**Blank Line**

```plaintext
\r\n\r\n    →   signals end of headers
```

**Body**

```plaintext
{"name":"Rohit","age":25}
```

* * *

## HTTP Methods

```jsx
GET     →   read data        no body
POST    →   create data      has body
PUT     →   replace data     has body
PATCH   →   update part      has body
DELETE  →   delete data      no body
```

* * *

## HTTP Status Codes

```jsx
2xx     success
────────────────────────────
200     OK
201     Created
204     No Content

3xx     redirection
────────────────────────────
301     Moved Permanently
302     Found

4xx     client error
────────────────────────────
400     Bad Request
401     Unauthorized
403     Forbidden
404     Not Found

5xx     server error
────────────────────────────
500     Internal Server Error
502     Bad Gateway
503     Service Unavailable
```

* * *

## HTTP is Stateless

Every request is completely independent. Server remembers nothing between requests.

```plaintext
Request 1 — login        Server: okay
Request 2 — get profile  Server: who are you?
```

Tokens and cookies exist to carry identity on every request manually.

* * *

## HTTP Versions

```plaintext
HTTP/1.1    text based        one request at a time per connection
HTTP/2      binary framing    multiple requests simultaneously
HTTP/3      QUIC over UDP     faster on mobile and unstable networks
```

## Problem 1 — You Are Parsing the URL Manually

You wrote this to extract the number from `/30` —

```jsx
const str = request.url;
let str1 = "";
for(let i = 1; i < str.length; i++)
    str1 += str[i];
let number = Number(str1);
```

This works. But JavaScript already has a built in way to do this —

```jsx
const number = Number(request.url.slice(1));
```

`slice(1)` removes the first character which is `/`. Same result. One line.

* * *

## Problem 2 — What if User Hits an Invalid URL?

User hits `http://localhost:3000/abc`

```jsx
let number = Number("abc");    // NaN
```

Now you loop `NaN` times. Your `arr` is empty. No error message. User gets `[]` back confused.

You need to handle this —

```jsx
if(isNaN(number)) {
    response.writeHead(400);
    response.end(JSON.stringify({ error: "Please provide a valid number" }));
    return;
}
```

* * *

## Problem 3 — What if User Asks for More Than 100?

You only have 100 profiles. User hits `/500`.

Your loop runs 500 times. `gitHub[i]` returns `undefined` for indexes beyond 100.

You send 400 undefined values back.

You need to handle this —

```jsx
if(number > gitHub.length) {
    response.writeHead(400);
    response.end(JSON.stringify({ error: `Maximum ${gitHub.length} profiles available` }));
    return;
}
```

* * *

## The Clean Version of Your Code

```jsx
const server = http.createServer((request, response) => {

    const number = Number(request.url.slice(1));

    // invalid url
    if(isNaN(number)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: "Please provide a valid number" }));
        return;
    }

    // asking for more than available
    if(number > gitHub.length) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: `Maximum ${gitHub.length} profiles available` }));
        return;
    }

    const arr = gitHub.slice(0, number);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(arr));
});

server.listen(3000, () => {
    console.log("Listening at port 3000");
});
```

* * *

## One More Thing — You Used a Loop to Build the Array

```jsx
const arr = []
for(let i = 0; i < number; i++){
    arr.push(gitHub[i]);
}
```

JavaScript already has `slice` for this —

```jsx
const arr = gitHub.slice(0, number);
```

Same result. No loop needed.

* * *

## What You Learned From This

Every time a request comes in — three questions to always ask —

```plaintext
1. Is the input valid?         → handle invalid input
2. Is the input in range?      → handle edge cases
3. What am I sending back?     → always set Content-Type
```

These three checks will save you from 90% of bugs in any backend you build.

## What is a Query String

When user hits —

```plaintext
http://localhost:3000/add?num1=10&num2=20
```

Two parts in this URL —

```plaintext
/add          →   path — which operation
?num1=10&num2=20  →   query string — the data
```

`?` marks where the path ends and query string begins.

`&` separates multiple values.

* * *

## How to Read This in Node.js

`req.url` gives you the entire thing —

```jsx
req.url = "/add?num1=10&num2=20"
```

Node.js has a built in module called `url` to parse this —

```jsx
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {

    const parsed = url.parse(req.url, true);

    const operation = parsed.pathname.slice(1);  // 'add'
    const num1 = Number(parsed.query.num1);      // 10
    const num2 = Number(parsed.query.num2);      // 20

    res.writeHead(200, { 'Content-Type': 'application/json' });

    if(operation === 'add') {
        res.end(JSON.stringify({ result: num1 + num2 }));
    }
    else if(operation === 'sub') {
        res.end(JSON.stringify({ result: num1 - num2 }));
    }
    else if(operation === 'mult') {
        res.end(JSON.stringify({ result: num1 * num2 }));
    }
    else if(operation === 'divide') {
        res.end(JSON.stringify({ result: num1 / num2 }));
    }
});

server.listen(3000, () => {
    console.log("Server running on port 3000");
});
```

* * *

## What url.parse Does

```jsx
url.parse("/add?num1=10&num2=20", true)
```

Returns an object —

```jsx
{
    pathname: '/add',           // path part
    query: {
        num1: '10',             // query params as object
        num2: '20'
    }
}
```

The second argument `true` tells it — convert query string into a JavaScript object automatically. Without `true` — query stays as a raw string `"num1=10&num2=20"`.

* * *

## How to Hit

```plaintext
http://localhost:3000/add?num1=10&num2=20
http://localhost:3000/sub?num1=10&num2=5
http://localhost:3000/mult?num1=10&num2=5
http://localhost:3000/divide?num1=10&num2=2
```

```jsx
import http from 'http'

const Database = [];

const server = http.createServer((req,res)=>{
    
    if(req.method=="GET" && req.url=="/user"){
        res.end(JSON.stringify(Database));
    }

    if(req.method=="POST" && req.url == "/user"){
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            const user = JSON.parse(body);
            Database.push(user);
            res.end(JSON.stringify(user));
        })
    }

    if(req.method=="PATCH" && req.url == "/user"){
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            const user = JSON.parse(body);
            
            let fetchUser = null;
            for(let i=0;i<Database.length;i++){
                if(Database[i].email==user.email){
                    fetchUser = Database[i];
                    break;
                }
            }

            if(fetchUser==null)
                {
                    res.end("No user Found");
                    return;
                }

            for(const {keys,values} of Object.entries(user)){
                fetchUser[keys] = values;
            }

            res.end("User Info Updated successfully");
        })
    }
})

server.listen(3000,()=>{
    console.log("I am listening at port 3000")
})

```

## The limitations, in order of how badly they hurt

**1\. No routing — just if-else on strings**`req.url` and `req.method` are raw strings. Routing is a giant if-else chain you hand-write. Ten resources × five methods = 50 branches in one function.

**2\. No dynamic routes**`/users/123` means `req.url.split('/')` — manual string surgery. Add a query (`?role=admin`) and your split breaks. Trailing slash breaks it. You're parsing URLs by hand on every request.

**3\. Body doesn't exist — it's a stream**`req.body` is `undefined`. You collect chunks with `req.on('data')` + `req.on('end')`, then `JSON.parse` in a try-catch. **You write this same block for every POST, PUT, PATCH.**

**4\. Every response is manual paperwork**`res.writeHead(200, {'Content-Type': 'application/json'})` + `res.end(JSON.stringify(data))`. Two lines, every single time. Forget the header → browser guesses wrong.

**5\. Forget** `res.end()` **→ the request hangs forever** No catch-all, no automatic 404. Miss one branch and the browser tab spins silently. *You* are responsible for finishing every request.

**6\. Nowhere to put "run this for everyone"** Logging, auth, CORS — cross-cutting concerns have no home. You copy-paste them into every branch and pray you didn't miss one.

**7\. No way to organize** One giant `createServer` callback, 250+ lines. Routing logic and business logic fused together. Can't split into files cleanly. New teammate has no entry point.

**8\. No static file serving** Want to serve an HTML/CSS file? Read it with `fs`, guess its MIME type, set the header, stream it. Manually.

## The direct mapping (this is the reveal)

| Raw Node pain | Express cure |
| --- | --- |
| if-else on url + method | `app.get('/users')`, `app.post('/users')` |
| `req.url.split('/')` | `/users/:id` → `req.params.id` |
| manual URL parsing | `req.query.role` |
| `req.on('data')` + `JSON.parse` + try-catch | `express.json()` → `req.body` just exists |
| `writeHead` + `stringify` | `res.status(201).json(...)` |
| copy-pasted logging/auth | `app.use()` middleware |
| hanging requests | catch-all + error handler |
| 250-line monster | `express.Router()`, routes in separate files |
| manual `fs` + MIME types | `express.static('public')` |

## The line that ties it together

> *"Express didn't invent anything. Every feature is the helper you'd have written yourself after feeling that pain. The 250 lines you suffered through become 25 — and not one of them is magic."*

Then rebuild the same Users API in Express, side by side. The contrast delivers the lesson in one glance.

Express

```jsx
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
```
