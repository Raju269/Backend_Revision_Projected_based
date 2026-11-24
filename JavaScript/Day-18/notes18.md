# Lecture18: Callback Hell and Promises

### What is JavaScript's Core Nature?

JavaScript is **single-threaded** - imagine a single worker who can only do ONE task at a time.

```jsx
console.log("Task 1");
console.log("Task 2");
console.log("Task 3");
// Executes line by line, top to bottom

```

### The Problem: Blocking Operations

Some operations take time:

- Making API calls (network requests)
- Reading files
- Database queries
- Timers

If JavaScript **waits** for these, everything freezes:

```jsx
// ❌ BAD - Everything stops here
let data = waitForAPI();  // Blocks for 3 seconds
console.log(data);
console.log("This waits 3 seconds too!");

```

### The Solution: Asynchronous Programming

Don't wait - instead, say "Call me back when you're done":

```jsx
// ✅ GOOD - Non-blocking
fetchAPI(function() {
    console.log("Data received!");
});
console.log("I run immediately!");

// Output:
// I run immediately!
// Data received!  (after delay)

```

This "call me back" function is a **CALLBACK**.

---

## 📦 Real-World Analogy

Think of ordering food online:

1. **Place order** → Wait → Get order ID
2. **Prepare food** → Wait → Food ready
3. **Pickup order** → Wait → Driver has it
4. **Deliver order** → Wait → Food delivered

Each step:

- Takes time (asynchronous)
- Depends on the previous step finishing
- Produces data needed by the next step

You can't prepare food before placing the order!
You can't pick up food before it's prepared!

This is **sequential async operations** - the root of callback hell.

---

## 🔥 Your Code Explained - Step by Step

### The Order Object

```jsx
const orderDetail = {
    cost: 520,
    items: ["biryani", 'pani puri', 'pizza'],
    customer_name: "Rohit",
    customer_location: "Dwarka",
    restaurant_name: "Dominos",
};

```

This holds all order information that flows through each step.

### Step 1: Place Order

```jsx
function placeOrder(orderDetail, Callback) {
    console.log(`Processing the payment of ${orderDetail.cost}`);

    setTimeout(() => {
        console.log("Payment completed and Order is placed");
        orderDetail.paymetStatus = true;  // ✅ Add new data
        Callback(orderDetail);  // 👉 Pass to next step
    }, 3000);
}

```

**What happens:**

1. Starts payment processing
2. Waits 3 seconds (simulating payment time)
3. Adds `paymetStatus: true` to orderDetail
4. Calls the callback with updated orderDetail

### Step 2: Prepare Order

```jsx
function preparingOrder(orderDetail, Callback) {
    console.log(`Your Order is getting Prepared ${orderDetail.items}`);

    setTimeout(() => {
        console.log("Your Order is prepared");
        orderDetail.token = "10";  // ✅ Add token number
        Callback(orderDetail);  // 👉 Pass to next step
    }, 3000);
}

```

**Key point:** This function receives the orderDetail WITH `paymetStatus` from previous step!

### Step 3: Pickup Order

```jsx
function pickupOrder(orderDetail, Callback) {
    console.log(`Delivery partner is on the way to pickup the order from ${orderDetail.restaurant_name}`);

    setTimeout(() => {
        console.log("I have picked up your order");
        orderDetail.pickup = true;  // ✅ Mark as picked up
        Callback(orderDetail);  // 👉 Pass to next step
    }, 3000);
}

```

Now orderDetail has: `paymetStatus`, `token`, AND `pickup`!

### Step 4: Deliver Order

```jsx
function deleiverOrder(orderDetail) {
    console.log(`I am on my way to deliver the order ${orderDetail.customer_location}`);

    setTimeout(() => {
        console.log("Your order is delivered successfully");
        orderDetail.delivery = true;  // ✅ Final status
    }, 1000);
}

```

Last step - no callback needed because nothing comes after.

### The Callback Hell Structure

```jsx
placeOrder(orderDetail, (orderDetail) => {
    // ⬇️ Level 1: After order placed

    preparingOrder(orderDetail, (orderDetail) => {
        // ⬇️ Level 2: After preparation

        pickupOrder(orderDetail, (orderDetail) => {
            // ⬇️ Level 3: After pickup

            deleiverOrder(orderDetail);
            // ⬇️ Level 4: Final delivery
        });
    });
});

```

**See the pattern?** Each step is **nested inside** the previous step's callback.

---

## 🧠 The Intuition Behind Nesting

### Why Can't We Do This?

```jsx
placeOrder(orderDetail, preparingOrder);
preparingOrder(orderDetail, pickupOrder);
pickupOrder(orderDetail, deleiverOrder);

```

**Problem:** These all execute IMMEDIATELY, one after another, without waiting!

JavaScript doesn't know to wait for `placeOrder` to finish before calling `preparingOrder`.

### Why Nesting Works

```jsx
placeOrder(orderDetail, (orderDetail) => {
    // This function doesn't run immediately
    // It WAITS for placeOrder to finish
    // THEN it runs with the updated orderDetail

    preparingOrder(orderDetail, (orderDetail) => {
        // This WAITS for preparingOrder to finish
        // Then runs with the updated orderDetail

        pickupOrder(orderDetail, (orderDetail) => {
            // And so on...
            deleiverOrder(orderDetail);
        });
    });
});

```

**The intuition:**

- Each callback is like a "**What to do NEXT**" instruction
- It's wrapped INSIDE the previous step so it waits
- It's a chain of "when you're done, do this"

Think of it like **Russian nesting dolls** 🪆:

- Open doll 1 → find doll 2 inside
- Open doll 2 → find doll 3 inside
- Open doll 3 → find doll 4 inside

Each step reveals the next step!

---

## ⚠️ Problems with Callback Hell

### 1. **Readability - The Pyramid of Doom**

```jsx
step1((data) => {
    step2(data, (data) => {
        step3(data, (data) => {
            step4(data, (data) => {
                step5(data, (data) => {
                    step6(data, (data) => {
                        // Code keeps moving right →→→
                    });
                });
            });
        });
    });
});

```

**Problem:**

- Code doesn't read naturally top-to-bottom
- Hard to see the flow
- Indentation grows unmanageable

### 2. **Error Handling Nightmare**

What if payment fails? What if kitchen is closed? What if driver cancels?

```jsx
placeOrder(orderDetail, (orderDetail, error) => {
    if (error) {
        console.log("Payment failed:", error);
        return;  // ❌ But what about refund? Notification?
    }

    preparingOrder(orderDetail, (orderDetail, error) => {
        if (error) {
            console.log("Kitchen error:", error);
            return;  // ❌ Need to cancel order, refund payment
        }

        pickupOrder(orderDetail, (orderDetail, error) => {
            if (error) {
                console.log("Pickup failed:", error);
                return;  // ❌ Food is ready but stuck!
            }

            deleiverOrder(orderDetail, (error) => {
                if (error) {
                    console.log("Delivery failed:", error);
                    // ❌ Customer charged, food gone, no delivery
                }
            });
        });
    });
});

```

**Problems:**

- Error handling at EVERY level
- Repetitive code
- Hard to implement proper error recovery
- One error can leave system in inconsistent state

### 3. **Hard to Modify**

Want to add "Send SMS notification" between pickup and delivery?

```jsx
placeOrder(orderDetail, (orderDetail) => {
    preparingOrder(orderDetail, (orderDetail) => {
        pickupOrder(orderDetail, (orderDetail) => {

            // 🆕 NEW STEP - Must break and re-nest everything
            sendSMS(orderDetail, (orderDetail) => {

                deleiverOrder(orderDetail);

            });

        });
    });
});

```

**Problems:**

- Have to break the chain
- Re-indent everything
- Easy to introduce bugs
- Touching old code is risky

### 4. **Can't Use Normal Control Flow**

### try-catch doesn't work:

```jsx
try {
    placeOrder(orderDetail, (orderDetail) => {
        throw new Error("Payment failed");
        // ❌ This error is thrown LATER, after try-catch is done
    });
} catch (error) {
    console.log("Won't catch it!");  // This never runs
}

```

Why? Because the callback runs **asynchronously**, after the try-catch block has finished!

### return doesn't work as expected:

```jsx
function processOrder() {
    placeOrder(orderDetail, (orderDetail) => {
        if (orderDetail.cost > 1000) {
            return "Too expensive";
            // ❌ This only exits the callback, not processOrder
        }

        preparingOrder(orderDetail, (orderDetail) => {
            // This STILL runs even though we "returned"!
        });
    });

    return "Order processed";
    // ❌ This returns IMMEDIATELY, before order even starts
}

```

### 5. **Variable Scope Confusion**

```jsx
let finalStatus;

placeOrder(orderDetail, (orderDetail) => {
    preparingOrder(orderDetail, (orderDetail) => {
        pickupOrder(orderDetail, (orderDetail) => {
            deleiverOrder(orderDetail);
            finalStatus = "Delivered";  // Set it here
        });
    });
});

console.log(finalStatus);  // ❌ undefined! Callback hasn't run yet

```

**Problem:** Can't easily get data OUT of callback chain.

### 6. **Debugging is Painful**

When an error occurs deep in the chain:

```
Error: Delivery failed
    at anonymous (line 45)
    at anonymous (line 38)
    at anonymous (line 31)
    at anonymous (line 24)

```

**Problems:**

- All functions show as "anonymous"
- Hard to trace which step failed
- Stack trace doesn't clearly show the flow

### 7. **Testing is Difficult**

How do you test individual steps?

```jsx
// Can't easily test preparingOrder alone
// It's buried inside placeOrder's callback
// Can't mock just one step
// Can't test error scenarios easily

```

### 8. **Can't Handle Parallel Operations**

What if you want to:

- Prepare food AND assign driver at the SAME time?
- Wait for BOTH to complete before moving forward?

```jsx
// With callbacks, you need manual coordination:
let foodReady = false;
let driverAssigned = false;

prepareFood(() => {
    foodReady = true;
    if (driverAssigned) startDelivery();
});

assignDriver(() => {
    driverAssigned = true;
    if (foodReady) startDelivery();
});

// ❌ Messy! Race conditions! Duplicate code!

```

---

## 📊 Summary Table

| Aspect | Problem | Impact |
| --- | --- | --- |
| **Readability** | Pyramid shape, deep nesting | Hard to understand flow |
| **Error Handling** | Must repeat at every level | Repetitive, easy to miss |
| **Maintainability** | Hard to add/remove steps | Risky to modify |
| **Control Flow** | Can't use try-catch, return | Can't write normal code |
| **Debugging** | Anonymous function traces | Hard to find bugs |
| **Testing** | Steps are tightly coupled | Can't test in isolation |
| **Parallelism** | Manual coordination needed | Complex, error-prone |
| **Scope** | Variables trapped in closures | Data access issues |

---

## 🎓 Key Takeaways for Students

1. **Callback hell exists because:**
    - Sequential async operations need to wait for each other
    - Each step needs data from the previous step
    - Callbacks are the only way to say "do this next"
2. **The nesting happens because:**
    - JavaScript doesn't wait for async operations
    - We wrap the next step inside the previous step's callback
    - This ensures proper sequencing
3. **Why it's called "hell":**
    - Creates unreadable, unmaintainable code
    - Error handling becomes a nightmare
    - Normal JavaScript features don't work
    - Makes debugging and testing very hard
4. **The fundamental insight:**
    - We're trying to express SEQUENTIAL logic (A → B → C → D)
    - Using NESTED functions (which represent scope, not sequence)
    - This mismatch creates all the problems

# **Promises in Js**

The **`Promise`** object represents the eventual completion (or failure) of an asynchronous operation and its resulting value.

### First Principle: A Promise is a Placeholder

### Promise Characteristics:

1. **A Promise is an object** - You can store it in a variable
2. **Represents future value** - The value isn't available yet, but will be
3. **Has states** - It changes state over time
4. **One-time use** - Once settled, it never changes

---

## Promise States (First Principles)

A Promise can be in **exactly ONE** of three states at any time:

```jsx
┌─────────────────────────────────────────┐
│           PROMISE STATES                │
└─────────────────────────────────────────┘

1. PENDING (Initial state)
   ↓
   "I'm working on it..."
   ↓
   ├── Success → 2. FULFILLED (Resolved)
   │             "I got the result!"
   │
   └── Failure → 3. REJECTED
                 "Something went wrong!"

Once FULFILLED or REJECTED, the promise is SETTLED (final)

```

### Visual Example:

```jsx
// Create a promise
const myPromise = new Promise((resolve, reject) => {
    // At this moment: Promise is PENDING

    setTimeout(() => {
        const success = true;

        if (success) {
            resolve("Success!"); // → Promise becomes FULFILLED
        } else {
            reject("Failed!");   // → Promise becomes REJECTED
        }
    }, 2000);
});

// myPromise is PENDING for 2 seconds
// Then becomes FULFILLED with value "Success!"

```

### State Transitions:

```jsx
const promise = new Promise((resolve, reject) => {
    console.log("State: PENDING");

    setTimeout(() => {
        resolve("Done");
        console.log("State: FULFILLED");

        // ❌ This does nothing - promise is already settled!
        reject("Error"); // Ignored!
        resolve("Again"); // Ignored!
    }, 1000);
});

// Key Point: A promise can only settle ONCE

```

---

## Creating Promises

### Basic Syntax:

```jsx
const promise = new Promise((resolve, reject) => {
    // executor function
    // This runs IMMEDIATELY when promise is created
});

```

### The Executor Function:

```jsx
new Promise((resolve, reject) => {
    // Two parameters:
    // - resolve: function to call when operation succeeds
    // - reject: function to call when operation fails

    // Your async operation here
});

```

### Example 1: Simple Promise

```jsx
const simplePromise = new Promise((resolve, reject) => {
    resolve("Hello!");
});

// This promise immediately resolves with "Hello!"

```

### Example 2: Promise with setTimeout

```jsx
const delayedPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve("Done after 2 seconds");
    }, 2000);
});

```

### Example 3: Promise with Conditional Logic

```jsx
function checkAge(age) {
    return new Promise((resolve, reject) => {
        if (age >= 18) {
            resolve("Access granted");
        } else {
            reject("Access denied - Too young");
        }
    });
}

// Usage:
const ageCheck = checkAge(20); // Returns a promise

```

### Example 4: Real-World - Simulating API Call

```jsx
function fetchUserData(userId) {
    return new Promise((resolve, reject) => {
        console.log(`Fetching user ${userId}...`);

        setTimeout(() => {
            // Simulate successful API response
            const user = {
                id: userId,
                name: "John Doe",
                email: "john@example.com"
            };

            resolve(user);
        }, 2000);
    });
}

```

### Example 5: Promise with Error Handling

```jsx
function divideNumbers(a, b) {
    return new Promise((resolve, reject) => {
        if (b === 0) {
            reject("Cannot divide by zero!");
        } else {
            resolve(a / b);
        }
    });
}

```

---

## Consuming Promises

Once you have a promise, you need to **consume** it to get the result.

### Method 1: Using .then()

```jsx
promise.then((result) => {
    // This function runs when promise is FULFILLED
    console.log(result);
});

```

### Method 2: Using .catch()

```jsx
promise.catch((error) => {
    // This function runs when promise is REJECTED
    console.error(error);
});

```

### Method 3: Using .finally()

```jsx
promise.finally(() => {
    // This runs ALWAYS, whether fulfilled or rejected
    console.log("Promise settled");
});

```

```jsx
fetch("https://api.github.com/users?per_page=20")
.then((response)=>{
    if(!response.ok)
        throw new Error("Data is not persent");
    return response.json();
})
.then((data)=>{
    console.log(data);
})
.catch((error)=>{
    console.log(error.message);
})
.finally(()=>{
    console.log("Everything is cleaned up");
})
```

## Async / Await in JavaScript

### 1. First understand the problem

JavaScript normally runs line by line.

```jsx
console.log("Start");

console.log("Middle");

console.log("End");
```

Output:

```jsx
Start
Middle
End
```

But some tasks take time, like:

```jsx
fetch data from server
read file
timer
API call
database request
```

JavaScript does not want to stop the whole program for these slow tasks.

That is why we use **asynchronous programming**.

---

## 2. What is async?

`async` is used before a function.

```jsx
async function getData() {
  console.log("Hello");
}
```

When we write `async`, the function always returns a **Promise**.

Example:

```jsx
async function getData() {
  return "Hello";
}

console.log(getData());
```

It does not directly return `"Hello"`.

It returns a Promise:

```jsx
Promise { "Hello" }
```

---

## 3. What is await?

`await` means:

> Wait here until the Promise gives the final result.
> 

But `await` can only be used inside an `async` function.

```jsx
async function getData() {
  let result = await fetch("https://api.example.com/data");
  console.log(result);
}
```

Here JavaScript waits for `fetch()` to complete before moving to the next line inside this function.

---

## 4. Simple example

```jsx
function getPromise() {
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("Data received");
    }, 2000);
  });
}

async function showData() {
  console.log("Fetching data...");

  let data = await getPromise();

  console.log(data);
}

showData();
```

Output:

```jsx
Fetching data...
Data received
```

After 2 seconds, `"Data received"` is printed.

---

## 5. Why do we need async/await?

Before async/await, we used `.then()`:

```jsx
fetch("https://api.example.com/data")
  .then(function(response) {
    return response.json();
  })
  .then(function(data) {
    console.log(data);
  });
```

With async/await, the same code looks cleaner:

```jsx
async function getData() {
  let response = await fetch("https://api.example.com/data");
  let data = await response.json();

  console.log(data);
}

getData();
```

This looks more like normal line-by-line code.

---

## 6. Important point: await does not stop the whole JavaScript

This is very important.

```jsx
console.log("Start");

async function getData() {
  console.log("Inside function");

  await new Promise(function(resolve) {
    setTimeout(resolve, 2000);
  });

  console.log("After await");
}

getData();

console.log("End");
```

Output:

```jsx
Start
Inside function
End
After await
```

Why?

Because `await` pauses only the `async` function, not the whole JavaScript program.

---

## 7. Real example with fetch

```jsx
async function getUser() {
  let response = await fetch("https://jsonplaceholder.typicode.com/users/1");

  let data = await response.json();

  console.log(data);
}

getUser();
```

Explanation:

```jsx
let response = await fetch(...)
```

This waits for server response.

```jsx
let data = await response.json()
```

This converts JSON data into JavaScript object.

---

## 8. Handling errors using try/catch

Sometimes API can fail.

Example:

```jsx
async function getUser() {
  try {
    let response = await fetch("https://jsonplaceholder.typicode.com/users/1");

    let data = await response.json();

    console.log(data);
  } catch (error) {
    console.log("Something went wrong");
  }
}

getUser();
```

`try` block contains code that may fail.

`catch` block runs when an error happens.

---

## 9. Common mistake

### Wrong:

```jsx
function getData() {
  let response = await fetch("https://api.example.com/data");
}
```

This is wrong because `await` is used inside a normal function.

### Correct:

```jsx
async function getData() {
  let response = await fetch("https://api.example.com/data");
}
```

Function must be `async`.

---

## 10. One-line definition

**Async/await is a clean way to handle Promises in JavaScript.**

`async` makes a function return a Promise.

`await` waits for a Promise result inside an async function.

---

## Simple classroom explanation

Imagine you order food online.

You do not freeze your life until food arrives.

You can still watch YouTube, talk to friends, or do other work.

When food arrives, you receive it.

That is asynchronous behavior.

In JavaScript:

```jsx
await
```

means:

> Wait for this task result, then continue this function.
> 

!Untitled-2026-03-20-1936.svg