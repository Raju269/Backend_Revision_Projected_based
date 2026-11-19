# Lecture16: Memory management and How JS code works

## From First Thought Principles

These notes cover the deep mechanics of JavaScript: where memory lives, how the engine executes code, and how the browser extends the language through Web APIs. Every concept is derived from first principles — no memorization.

---

# Part 1: Memory Architecture

## 1.1 The Original Problem — Why Two Memory Regions?

When a program runs, it needs memory. But memory isn't one thing — programs have **two very different needs**:

**Need 1:** "I need a small box for a moment, then throw it away."

- Example: a loop counter, a function's local variable.
- Size: known in advance.
- Lifetime: short, predictable (dies when the function ends).

**Need 2:** "I need a container, I don't know how big it'll get, and I don't know when I'll be done with it."

- Example: an array that grows, an object passed around.
- Size: unknown, can grow.
- Lifetime: unpredictable.

**One memory strategy cannot serve both needs.** That's why every modern runtime has two regions: **stack** and **heap**.

## 1.2 The Stack — Designed for Predictable Lifetimes

If lifetime follows the pattern "function starts → variables born, function ends → variables die," memory can follow the same pattern: **last in, first out (LIFO)**.

Function A calls B calls C:

- C finishes first → C's memory removed first.
- Then B, then A.

**Stack superpowers:**

- Allocation = move a pointer down (one CPU instruction).
- Deallocation = move pointer back (one CPU instruction).
- No fragmentation — memory is packed tightly.
- No garbage collector needed.

**Trade-off:** size must be known in advance, and variables die when their function ends.

## 1.3 The Heap — Designed for Flexibility

For things that grow, get shared, or outlive a function, we need a different region. The heap is a large pool where you can grab any-size chunks anywhere and keep them as long as needed.

**Trade-offs (opposite of stack):**

- Allocation is slower (must find a free chunk).
- Memory gets fragmented over time.
- Someone must clean up — the **Garbage Collector** does this when nothing references the data.

---

# Part 2: How JavaScript Maps Data to Memory

## 2.1 The Misconception

The textbook line says: **"Primitives go on the stack, objects go on the heap."**

This is wrong for JavaScript. Here's the disproof:

```jsx
let x = 10;        // 8 bytes
x = "Rohitfaks";   // needs more bytes
x = "an even longer string...";  // needs even more
```

If `x` were a fixed slot on the stack, where would the extra bytes come from? The stack slot can't grow — there's another variable above it. So the simple "primitives on stack" model is broken.

## 2.2 The Real Architecture — Tagged Slots

Every variable in JavaScript gets a **fixed-size 8-byte slot** (on 64-bit systems). That slot must somehow hold:

- Small numbers
- Huge numbers
- Strings of any length
- Objects of any shape
- `true`, `false`, `null`, `undefined`

**The trick:** the slot either **inlines a small value** OR **stores a pointer to the heap** where the real value lives.

But then a new problem: when the CPU reads the slot, **how does it know if it's looking at a number or a pointer?**

## 2.3 Tagged Pointers (Smi)

V8 uses the **lowest bit** as a tag:

```
Last bit = 0  →  Smi (Small Integer). The other 31 bits ARE the number.
Last bit = 1  →  Pointer to a heap object. Clear the bit to get real address.
```

**Why this works:** memory addresses on 64-bit systems are aligned, so real pointers always end in `00`. Those wasted bits become free real estate for the tag.

**Example: `let x = 10`**

```
Number 10 in binary:        ...00001010
Shift left by 1, tag = 0:   ...000010100
                                       ^
                                  tag bit = 0 → Smi
```

The slot literally contains `20` in raw bits. Engine reads "tag is 0, shift right by 1, value is 10." **No heap access. Number lives inside the slot.**

**Example: `let x = "Rohit"`**

```
Heap allocates string at address 0x7F8A3C0014A0
That address ends in: ...10100000  (last bit = 0)
V8 sets tag bit to 1:  ...10100001
                                  ^
                          tag bit = 1 → it's a pointer
```

Engine reads slot, sees tag = 1, masks off the bit, follows pointer to heap.

## 2.4 Where Each Data Type Actually Lives

### Smi (Small Integers, −2³¹ to 2³¹−1)

```jsx
let a = 10;
let b = -500;
```

**Location:** Inlined directly in the slot. No heap. Fast path.

### HeapNumber (Doubles and large integers)

```jsx
let pi = 3.14;
let big = 9999999999;
```

**Location:** Heap. Slot holds a pointer.
**Why:** A double is 8 bytes by itself — no room for both value and tag in one slot. So V8 boxes it on the heap.

This is why `3.14` is slower than `3` in tight loops — the engine must dereference a pointer.

### String

```jsx
let s = "Rohit";
```

**Location:** Always heap. Slot holds a pointer.
**Why:** Variable length.

### Boolean, null, undefined

```jsx
let t = true;
let n = null;
```

**Location:** Heap, but with a beautiful optimization — **singletons**.

V8 creates exactly **one** `true` object, **one** `false`, **one** `null`, **one** `undefined`. Every variable holding `true` points to the same shared object.

### Object, Array, Function

```jsx
let o = { name: "Rohit" };
```

**Location:** Heap. Slot holds a pointer.

### BigInt, Symbol

**Location:** Heap. Slot holds a pointer.

## 2.5 Complete Memory Picture

```jsx
let a = 10;
let b = 3.14;
let c = "Rohit";
let d = true;
let e = { x: 1 };
```

```
STACK                                    HEAP
┌─────────────────────────────┐
│ a: [00010100 | tag=0]       │  ← Smi, value inlined
├─────────────────────────────┤
│ b: [ptr────────┐  | tag=1]  │      ┌──────────────┐
│                │            │ ───► │ HeapNumber   │
│                │            │      │ value: 3.14  │
│                │            │      └──────────────┘
├─────────────────────────────┤
│ c: [ptr────┐      | tag=1]  │      ┌──────────────┐
│            │                │ ───► │ String       │
│            │                │      │ "Rohit"      │
│            │                │      └──────────────┘
├─────────────────────────────┤
│ d: [ptr──┐        | tag=1]  │      ┌──────────────┐
│          │                  │ ───► │ True         │
│          │                  │      │ (singleton)  │
│          │                  │      └──────────────┘
├─────────────────────────────┤
│ e: [ptr────────────┐ |tag=1]│      ┌──────────────┐
│                    │        │ ───► │ Object       │
│                    │        │      │ x → [Smi 1]  │
└─────────────────────────────┘      └──────────────┘
```

## 2.6 Revisiting the Original Question

```jsx
let x = 10;          // Slot: [10<<1 | 0]  inline, no heap
x = "Rohitfaks";     // Heap allocates string. Slot: [ptr | 1]
x = 3.14;            // Heap allocates HeapNumber. Slot: [new ptr | 1]
x = 42;              // Slot: [42<<1 | 0]  back to inline
```

**The slot itself never resizes.** What changes is what the 8 bytes encode — sometimes a value, sometimes an address. The tag bit tells the engine which.

The "extra memory" a string needs comes from the **heap**, allocated fresh on assignment. The stack slot just gets a new pointer written into it.

---

# Part 3: Objects in the Heap

## 3.1 The Problem — How to Access Properties in O(1)?

When you write `user.age`, we want this to be **fast** — same time whether the object has 2 or 2000 properties.

What does O(1) actually demand? **No searching.** We must know the exact offset of `age` before we start looking.

## 3.2 Failed Attempt 1 — Array of Key-Value Addresses

Store object as an array of (key_address, value_address) pairs:

```
[0] → ("name",  "Rohit")
[1] → ("age",   30)
[2] → ("city",  "Delhi")
```

To find `age`: walk array, compare each key string. For 1000 properties, 1000 comparisons. **O(n). Rejected.**

## 3.3 Failed Attempt 2 — Hash Table

Store object as a hash table:

```
hash("age") → 30
```

To access `obj.age`:

1. Compute `hash("age")` — costs CPU cycles every time.
2. Go to bucket — one memory read.
3. Handle collisions — compare actual keys.
4. Return value.

This is O(1) on average, but with a **fat constant**. Hashing strings and comparing keys on every property access — the most frequent operation in JavaScript — is too expensive.

## 3.4 The Winning Insight — Separate Shape from Data

Look at two objects:

```jsx
let user1 = { name: "Rohit", age: 30 };
let user2 = { name: "Aditya", age: 25 };
```

The **shape** is identical: both have `name` and `age` in the same order. Only the data differs.

**Why store the shape twice?** Pull it out, store it once, let every object of that shape point to the shared description.

This shared shape description is called a **Map** (or **HiddenClass**) in V8.

## 3.5 Caching the Result — Inline Caches

Even with a Map, finding `age` in the Map's descriptor list is still a search. We need to skip that too.

**Insight:** when you write `user.age`, the property name `"age"` is fixed at that specific line of code. The same line, run again, asks the same question. **We can cache the answer.**

But where? Not in the object (defeats the purpose). Not in the Map (would still need search). **Attach the cache directly to the line of code** that performs the access.

This is the **inline cache** — literally inlined into the compiled machine code, sitting next to the access instruction.

The cache stores:

> **"If the object's Map is M, then `age` is at offset 4."**
> 

Two pieces: a map pointer to verify, and an offset to use.

## 3.6 The Final Access Mechanism

```
At the compiled line user.age:
1. Read Map pointer from user.
2. Compare to cached Map → if match, use cached offset.
3. Read user[offset 4].
```

**Three CPU operations.** No hashing. No searching. Just pointer compare + offset read.

If the Map doesn't match (different shape), fall back to the slow path: search the Map, update the cache for next time.

## 3.7 Verified from V8's Official Documentation

From the V8 blog:

> "HiddenClasses serve as an identifier for the shape of an object... stores meta information about an object, including the number of properties on the object and a reference to the object's prototype."
> 

> "V8 supports so-called in-object properties which are stored directly on the object themselves. These are the fastest properties available in V8 as they are accessible without any indirection."
> 

> "On subsequent executions, V8 checks if the incoming object's hidden class matches the cached one; if it matches, V8 bypasses any further lookup and directly accesses the property using the remembered offset."
> 

This is V8's actual documented design.

---

# Part 4: How JavaScript Code Executes

## 4.1 The Translation Problem

You write a `.js` file — just text. The CPU runs binary machine code. Something must translate.

That something is the **JavaScript engine** (V8 in Chrome/Node).

## 4.2 Why JavaScript Can't Pre-Compile Like C

In C, the compiler reads code once, produces machine code, done. JavaScript can't do this because:

1. **Types are not known ahead of time** — engine can't generate optimal machine code.
2. **Code can be added at runtime** (eval, dynamic imports).
3. **The same function may receive different types over time.**

So the engine starts as an **interpreter** (flexible, but slow), and only later compiles **hot code** to machine code. This is **JIT (Just-In-Time) compilation**.

## 4.3 The Execution Pipeline

```
Source Text → Parsing → AST → Bytecode → Execution
                                  │
                                  ▼ (if hot)
                              Optimized Machine Code
```

**Stage 1 — Parsing (Text → AST):**
The engine breaks text into tokens, builds an **Abstract Syntax Tree** (AST) — a tree representing nested code structure.

**Stage 2 — Bytecode Generation (V8's Ignition):**
AST converted into flat sequence of simple instructions (bytecode). Easier to execute than walking a tree.

**Stage 3 — Execution:**
The interpreter runs bytecode. While running, it **profiles** — which functions are called often? What types do they receive?

**Stage 4 — Optimization (V8's TurboFan):**
Hot functions get compiled to optimized machine code, type-specialized based on profiling data.

**Stage 5 — Deoptimization:**
If assumptions break (function suddenly receives different types), optimized code is thrown away. Fall back to interpreter.

## 4.4 Two-Phase Execution Within a Scope

When the engine enters a scope (a function call, or global scope), it does **two phases**:

**Phase 1 — Creation:**

- Scan the entire scope for declarations.
- Pre-create memory slots for `var`, `let`, `const`, `class`, and function declarations.
- `var` slots get `undefined`.
- `let`/`const`/`class` slots get an "uninitialized" marker.
- Function declarations get fully built (function object created on heap, slot pointed at it).

**Phase 2 — Execution:**

- Run the code line by line.
- Each assignment fills/updates a slot.
- Each function call pushes a new frame and recurses into Phase 1 for that function.

## 4.5 Hoisting — What It Actually Is

"Hoisting" is the **visible consequence** of Phase 1. Nothing moves in your code. The engine pre-creates slots before any line runs, so references to those names don't crash with "name not found."

The differences between declaration types fall out of one question:

> **"In Phase 1, how much of this declaration can we complete, and how do we behave if someone reads the name before Phase 2 finishes the rest?"**
> 

| Declaration | Phase 1 behavior | Behavior if read early |
| --- | --- | --- |
| `function` | Fully built | Works — already callable |
| `var` | Slot created, set to `undefined` | Returns `undefined` |
| `let` / `const` | Slot created, marked uninitialized | **ReferenceError** (TDZ) |
| `class` | Slot created, marked uninitialized | **ReferenceError** (TDZ) |

The **Temporal Dead Zone (TDZ)** is the window between Phase 1 (slot exists) and Phase 2 reaching the declaration line.

### Example:

```jsx
greet();              // Works — function fully built in Phase 1
console.log(x);       // undefined — slot exists, value not assigned
console.log(y);       // ReferenceError — TDZ
console.log(z);       // ReferenceError — TDZ

var x = 10;
let y = 20;
const z = 30;
function greet() { console.log("Hi"); }
```

### Function Expression vs Function Declaration:

```jsx
const a = function() { ... };
```

This is **NOT** a function declaration. It's a `const` declaration whose **value happens to be a function**. So it follows `const` rules — slot created in Phase 1 but marked uninitialized. Calling `a()` before the line throws ReferenceError (TDZ).

```jsx
function a() { ... }
```

This IS a function declaration. Fully built in Phase 1. Callable anywhere.

## 4.6 The Call Stack — How Function Calls Work

```jsx
function a() { b(); }
function b() { c(); }
function c() { return 42; }
a();
```

Each function call pushes a **stack frame** containing:

- Local variable slots
- Return address (where to resume after returning)
- Pointer to function's scope (for closures)

```
When c() is called:
│ frame for c() │
│ frame for b() │
│ frame for a() │
│ global frame  │
└───────────────┘
```

When `c` returns, its frame pops. Then `b`. Then `a`. **Last in, first out** — the exact pattern that makes stack memory ideal.

## 4.7 Single-Threaded — How Async Works

JavaScript has **one call stack**. One thread. Yet it can fetch data, set timers, respond to clicks — seemingly all at once. How?

**The trick:** JavaScript doesn't do these things itself. It hands them off.

When you call `setTimeout(fn, 1000)` or `fetch(url)`:

- Engine doesn't sit waiting.
- It hands the task to the **runtime environment** (browser or Node).
- The browser uses its own threads (C++ code) to handle it.
- The engine moves on.

When the task is done, the browser puts the callback into a **queue**. The **event loop** picks up callbacks from the queue when the call stack is empty.

```
┌─────────────────┐
│   Call Stack    │
└─────────────────┘
        ▲
        │ pushes ready tasks
        │
┌─────────────────┐    ┌──────────────────────────┐
│   Event Loop    │◄───│   Callback Queues        │
└─────────────────┘    │   (macrotasks/microtasks)│
        ▲              └──────────────────────────┘
        │                          ▲
        │                          │
        │              ┌──────────────────────────┐
        └──────────────│   Browser / Node APIs    │
                       │  (timers, network, DOM)  │
                       └──────────────────────────┘
```

## 4.8 Microtasks vs Macrotasks

Two queues with priority:

- **Microtask queue** — Promise resolutions, `queueMicrotask`. Higher priority.
- **Macrotask queue** — `setTimeout`, `setInterval`, I/O, DOM events.

Rule: **after every synchronous block, the event loop drains the entire microtask queue before picking up the next macrotask.**

```jsx
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);

// Output: 1, 4, 3, 2
```

Why? `1` and `4` run synchronously. Then microtask queue is drained (`3`). Then macrotask queue (`2`).

This is why Promise chains feel "atomic" — they run back-to-back without other tasks slipping in.

---

# Part 5: Web APIs

## 5.1 What Can Pure JavaScript Actually Do?

Pure JavaScript (ECMAScript) can:

- Do arithmetic, manipulate strings.
- Work with objects, arrays.
- Define and call functions.
- Throw and catch errors.

**That's it.** Pure JavaScript has no way to:

- Read a file.
- Make a network request.
- Display anything on screen.
- Know what time it is.
- Wait for a click.

If you ran pure JS in a vacuum, it could compute the millionth prime, but you'd never see the result.

## 5.2 Where the Capabilities Come From

The capabilities come from the **environment** JavaScript runs in:

- **Browser** → adds DOM, fetch, localStorage, geolocation, etc.
- **Node.js** → adds file system, networking sockets, processes.
- **Embedded device** → adds whatever capabilities that device has.

The language stays the same. The capabilities differ wildly.

## 5.3 How the Environment Hands Capabilities to JS

The environment injects **functions and objects** into the JavaScript global scope that look like normal JS but are actually bridges into the environment's underlying code (usually C++).

**These bridges are Web APIs.**

When you write:

```jsx
fetch("https://example.com/data")
```

You're calling a function that *looks* like JavaScript, but inside, it's a doorway into the browser's networking code.

## 5.4 The Definition

**A Web API is a capability the browser exposes to JavaScript — a function or object that looks like normal JS but is actually implemented by the browser, giving JS access to something the language itself cannot do.**

## 5.5 Categories of Web APIs

- **DOM:** `document`, `document.querySelector`, `element.addEventListener`
- **Networking:** `fetch`, `XMLHttpRequest`, `WebSocket`
- **Time:** `setTimeout`, `setInterval`, `requestAnimationFrame`
- **Storage:** `localStorage`, `sessionStorage`, `IndexedDB`
- **Device:** `navigator.geolocation`, `navigator.mediaDevices`, `navigator.clipboard`
- **Graphics:** `Canvas`, `WebGL`, `Audio`, `Video`
- **Concurrency:** `Web Workers`, `Service Workers`

## 5.6 Web API vs REST API — Don't Confuse Them

- **Web API** = browser-provided functions exposed to JavaScript. Lives **inside the browser**. Example: `fetch`, `document`.
- **REST API / HTTP API** = a server you talk to over the network. Lives **on someone else's computer**. Example: `https://api.github.com/users/rohit`.

You **use** `fetch` (Web API) **to talk to** a REST API.

## 5.7 The `window` Object — How Web APIs Are Delivered

The browser needs to deliver capabilities to JS. JS's only universal delivery mechanism is the **global scope**. The global scope is backed by a real object — in browsers, that object is named **`window`**.

Every Web API is attached as a property of `window`:

```
window
├── fetch              ← networking
├── setTimeout         ← timers
├── document           ← the DOM
├── localStorage       ← storage
├── navigator          ← device info
├── location           ← URL
├── console            ← logging
├── ... (hundreds more)
└── window             ← yes, window.window === window
```

When you write `fetch(...)`, the engine looks up `fetch` in scope, walks up to global, finds it on `window`. Same as writing `window.fetch(...)`.

`window` does three jobs at once:

1. **Global object** — container for all global variables and Web APIs.
2. **Browser window representation** — `window.innerWidth`, `window.close()`.
3. **DOM gateway** — `window.document`, `window.location`.

In other environments:

- **Node.js** → `global`
- **Web Worker** → `self`
- **Universal** → `globalThis` (ES2020)

---

# Part 6: How `fetch` and `await` Actually Work Together

## 6.1 The Setup

```jsx
async function getData() {
  const res = await fetch("https://api.example.com/users");
  const data = await res.json();
  console.log(data);
}

getData();
```

**Question:** How does the browser, running on a different C++ thread, tell your `await` to continue when the response arrives?

## 6.2 Why `fetch` Returns a Promise

When `fetch(url)` is called, the response doesn't exist yet — won't exist for hundreds of milliseconds. But the function must return *something* immediately, or the engine will block.

So `fetch` returns a **placeholder for the future answer** — a **Promise**.

A Promise has three states: **pending**, **fulfilled**, **rejected**.

The Promise is the **bridge** between the browser's network thread and the JS engine. It's the agreed meeting point.

## 6.3 Where the Suspended `getData` Lives

When `getData` hits `await`, the function suspends. The stack frame is popped (otherwise the stack would be blocked).

**Where does the suspended function go?**

**On the heap.** V8 implements async functions as **resumable state machines** (internally similar to generators). When V8 compiles an async function, it knows it might suspend — so it allocates the function's locals on the heap from the very start.

```
STACK                       HEAP
│                  │        ┌──────────────────────────┐
│   (empty)        │        │ Suspended getData State  │
│                  │        │  resume point: line 2    │
│                  │        │  locals: { res, data }   │
└──────────────────┘        │  waiting on: ──────────┐ │
                            └─────────────────────────┼┘
                                                      │
                                                      ▼
                            ┌──────────────────────────┐
                            │ Promise P                │
                            │  state: pending          │
                            │  callbacks: [resume fn]  │
                            └──────────────────────────┘
```

**Verified from V8's official blog:**

> "When V8 compiles an async function, the locals don't live on the normal stack in the way a synchronous function's locals do. They are part of this heap-allocated object from the beginning."
> 

> "When await fetch(...) is encountered, V8 suspends the function's execution context, storing it in the v8::Isolate's heap."
> 

## 6.4 What `await` Actually Does

`await` is sugar. Underneath it does:

1. Take the Promise on its right (returned by `fetch`).
2. Pause the current async function.
3. Attach a callback to the Promise: "when you resolve, wake me up with your value."

That third step is the key. Mechanically, `await p` is roughly:

```jsx
p.then(value => { /* resume the async function with value */ });
```

So `await` registers a **resume callback** on the Promise. The async function is now suspended, with its continuation parked inside the Promise's callback list.

## 6.5 The Reference Chain — Who Keeps the Suspended Function Alive?

If nothing referenced the suspended `getData`, the garbage collector would sweep it. So who holds the reference?

```
Browser's Web API (alive in C++ memory)
   │
   │ holds reference to
   ▼
Promise P (heap)
   │
   │ in its callback list
   ▼
Resume Callback (closure)
   │
   │ captures
   ▼
Suspended getData State (heap)
```

**Chain explained:**

1. The **Web API** holds Promise P (it was handed the Promise so it could resolve it later). The Web API is a **GC root** — it's living memory outside the JS heap.
2. **Promise P** holds the resume callback (registered by `await` via `.then`).
3. The **resume callback** is a closure that captures the suspended `getData` state.
4. The **suspended state** has all the function's locals and its resume point.

Break any link → things downstream become garbage. As long as the fetch is in flight, the chain stays alive.

## 6.6 The Full Async Flow — Step by Step

1. `getData()` called. Pushed onto stack.
2. `fetch(url)` called. Tells Web API: "start network request, resolve Promise P when done." Returns Promise P immediately.
3. `await` takes Promise P. Registers resume callback on it. Pauses `getData`.
4. `getData`'s state moves to heap. Stack frame pops. **Stack is empty.**
5. Engine continues with other code (or sits idle).
6. Time passes. Browser's network thread finishes downloading. Has Response object.
7. Browser does NOT touch `getData`. It pushes a **microtask**: "resolve Promise P with this Response."
8. Event loop sees stack is empty. Drains microtask queue.
9. Microtask runs: Promise P flips to fulfilled with Response as value.
10. P fires its registered callbacks. The resume callback runs.
11. Resume callback finds the suspended `getData` state via its captured reference.
12. Engine reconstructs `getData`'s frame on the stack. Restores locals. Jumps to line 2.
13. Response is assigned to `res`. Execution continues.
14. Next line is `await res.json()` — same dance repeats.

## 6.7 Why Microtask, Not Macrotask?

Microtasks run before the next macrotask. This makes Promise chains feel **atomic** — multiple `.then` or `await` steps run as a tight burst without other tasks slipping in. If Promises used the macrotask queue, every `.then` could be interrupted by `setTimeout` or a click event. The semantics would be messier.

---

# Part 7: Summary — The Three Big Pictures

## Picture 1: Memory

JavaScript variables are **tagged 8-byte slots**. The last bit is a tag:

- Tag 0 → value is inlined (Smi).
- Tag 1 → it's a pointer to the heap.

Everything except small integers and shared singletons (true/false/null/undefined) lives on the heap.

## Picture 2: Execution

The engine runs in **two phases** within every scope:

- **Phase 1 (Creation):** Pre-create slots for all declarations. This is what causes hoisting.
- **Phase 2 (Execution):** Run code line by line.

Async work is handed off to the environment (browser/Node) via Web APIs. The engine continues without blocking. The event loop picks up callbacks when the stack is empty.

## Picture 3: Async via Promises

The browser and the JS engine communicate through **Promises**.

- Web API does the work on its own thread.
- When done, pushes a microtask to resolve the Promise.
- The Promise holds resume callbacks registered by `await`.
- Microtask runs → Promise resolves → callback runs → suspended async function resumes from the heap.

**Three actors, one shared object.** That shared object is the Promise.

---

# Final Note — The First Thought Method

Every concept in these notes was derived, not memorized:

- **Two memory regions** because two different lifetime patterns exist.
- **Tagged slots** because one 8-byte slot must encode many value types.
- **Maps + inline caches** because O(1) with smallest constant beats O(1) with fat constant.
- **Two-phase execution** because functions must be callable before their textual definition.
- **Web APIs** because JS-the-language has no built-in I/O.
- **`window`** because the global scope needed to be a real object.
- **Promises** because two threads need a shared rendezvous point.
- **Heap-allocated async state** because suspended functions can't sit on the stack.