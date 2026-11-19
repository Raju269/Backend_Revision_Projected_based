Yes. Now we'll build the **same Bank REST API properly**, but still keep it simple enough that you understand every decision.

The goal is **not** just to get working code. Your thought process should become:

```text
Requirement
   ↓
Data
   ↓
Route
   ↓
Input
   ↓
Validation
   ↓
Find existing data
   ↓
Business operation
   ↓
Save data
   ↓
Response
   ↓
Edge cases
```

We'll use `database.txt` as our temporary database.

---

# 1. Project structure

Keep it simple:

```text
bank-api/
│
├── server.js
├── database.txt
├── package.json
└── node_modules/
```

Your `database.txt` should initially contain:

```json
[]
```

---

# 2. Before writing code: define our data

We need one account to look like:

```js
{
  name: "Raju",
  accountNumber: "1001",
  city: "Delhi",
  age: 20,
  balance: 5000
}
```

### Important design decision

We'll store `accountNumber` as a **string**.

Why?

Account numbers are identifiers, not numbers we calculate with.

For example:

```text
"001001"
```

If you treat that as a number:

```js
Number("001001")
```

you get:

```text
1001
```

and lose the leading zeros.

So:

```js
accountNumber: "001001"
```

is better.

---

# 3. First think about our `fs` layer

We need two basic operations:

```text
readDB()
    ↓
database.txt → JavaScript array
```

and:

```text
writeDB()
    ↓
JavaScript array → database.txt
```

So let's create those first.

```js
import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

const DB_FILE = "./database.txt";

function readDB() {
  const data = fs.readFileSync(DB_FILE, "utf-8");
  return JSON.parse(data);
}

function writeDB(data) {
  fs.writeFileSync(
    DB_FILE,
    JSON.stringify(data, null, 2)
  );
}
```

### Mental model

```text
READ

database.txt
     ↓
readFileSync()
     ↓
JSON string
     ↓
JSON.parse()
     ↓
JavaScript array
```

And:

```text
WRITE

JavaScript array
     ↓
JSON.stringify()
     ↓
JSON string
     ↓
writeFileSync()
     ↓
database.txt
```

---

# 4. But there is an edge case with `readDB()`

What if:

### Case 1

`database.txt` doesn't exist?

```text
ENOENT
```

### Case 2

The file contains invalid JSON?

```text
hello world
```

Then:

```js
JSON.parse(data)
```

will crash.

For a learning project, we can handle that.

```js
function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Database read error:", error.message);
    throw new Error("Unable to read database");
  }
}
```

Now our thinking is:

```text
Read database
    ↓
Did reading work?
    ↓
Did JSON parsing work?
    ↓
Return array
```

---

# 5. `writeDB()` also needs protection

```js
function writeDB(data) {
  try {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Database write error:", error.message);
    throw new Error("Unable to save database");
  }
}
```

Again:

```text
JavaScript data
      ↓
JSON.stringify()
      ↓
write file
      ↓
success?
   ↙       ↘
 YES       NO
 ↓          ↓
continue   error
```

---

# 6. Home route

Requirement:

> I want to know whether the server is running.

Thinking:

```text
GET /
   ↓
return simple message
```

```js
app.get("/", (req, res) => {
  res.json({
    message: "Bank API is running"
  });
});
```

---

# 7. CREATE ACCOUNT

## First think — don't code

Requirement:

> User wants to create a bank account.

### Method

```text
POST
```

### Route

```text
/accounts
```

### Input

From:

```text
req.body
```

Expected:

```json
{
  "name": "Raju",
  "accountNumber": "1001",
  "city": "Delhi",
  "age": 20,
  "balance": 5000
}
```

### Algorithm

```text
POST /accounts
       ↓
Read database
       ↓
Validate body
       ↓
Check duplicate account number
       ↓
Create account
       ↓
Add account
       ↓
Save database
       ↓
Return response
```

Now code:

```js
app.post("/accounts", (req, res) => {
  const accounts = readDB();

  const {
    name,
    accountNumber,
    city,
    age,
    balance
  } = req.body;

  // 1. Validate required fields
  if (
    !name ||
    !accountNumber ||
    !city ||
    age === undefined ||
    balance === undefined
  ) {
    return res.status(400).json({
      message: "All account fields are required"
    });
  }

  // 2. Validate age
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: "Age must be an integer and at least 18"
    });
  }

  // 3. Validate balance
  if (typeof balance !== "number" || balance < 0) {
    return res.status(400).json({
      message: "Balance must be a non-negative number"
    });
  }

  // 4. Check duplicate account number
  const existingAccount = accounts.find((account) => {
    return account.accountNumber === String(accountNumber);
  });

  if (existingAccount) {
    return res.status(409).json({
      message: "Account number already exists"
    });
  }

  // 5. Create account
  const newAccount = {
    name: String(name).trim(),
    accountNumber: String(accountNumber).trim(),
    city: String(city).trim(),
    age,
    balance
  };

  // 6. Add account
  accounts.push(newAccount);

  // 7. Save database
  writeDB(accounts);

  // 8. Response
  res.status(201).json({
    message: "Account created successfully",
    account: newAccount
  });
});
```

---

# 🧠 Look at the thinking behind CREATE

Don't memorize this:

```js
accounts.push(newAccount);
```

Instead remember:

```text
Create requirement
       ↓
Need existing data
       ↓
readDB()
       ↓
Validate input
       ↓
Check uniqueness
       ↓
Create object
       ↓
Add object
       ↓
Persist
       ↓
Response
```

That's the development skill you're trying to build.

---

# 8. GET ALL ACCOUNTS

Requirement:

> Give me all accounts.

Thinking:

```text
GET /accounts
     ↓
read database
     ↓
return accounts
```

Code:

```js
app.get("/accounts", (req, res) => {
  const accounts = readDB();

  res.json({
    count: accounts.length,
    accounts
  });
});
```

### Edge cases

What if there are no accounts?

That's not necessarily an error.

Return:

```json
{
  "count": 0,
  "accounts": []
}
```

That's perfectly valid.

---

# 9. GET ONE ACCOUNT

Requirement:

> Find account `1001`.

Request:

```text
GET /accounts/1001
```

### Thinking

```text
URL parameter
      ↓
accountNumber
      ↓
read database
      ↓
find account
      ↓
found?
 ↙       ↘
YES      NO
 ↓        ↓
return   404
```

Code:

```js
app.get("/accounts/:accountNumber", (req, res) => {
  const accounts = readDB();

  const accountNumber = req.params.accountNumber;

  const account = accounts.find((account) => {
    return account.accountNumber === accountNumber;
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  res.json(account);
});
```

---

# 10. GET BALANCE

Requirement:

```text
GET /accounts/1001/balance
```

Thinking:

```text
Get account number
       ↓
Find account
       ↓
Doesn't exist?
       ↓
404
       ↓
Otherwise return balance
```

Code:

```js
app.get("/accounts/:accountNumber/balance", (req, res) => {
  const accounts = readDB();

  const account = accounts.find((account) => {
    return account.accountNumber === req.params.accountNumber;
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  res.json({
    accountNumber: account.accountNumber,
    balance: account.balance
  });
});
```

Notice something important.

We don't return:

```json
{
  "name": "...",
  "city": "...",
  "age": "...",
  "balance": 5000
}
```

We return only what this endpoint needs.

---

# 11. DEPOSIT MONEY

Now we have a real update operation.

Requirement:

```text
Deposit ₹500 into account 1001
```

Request:

```text
PATCH /accounts/1001/deposit
```

Body:

```json
{
  "amount": 500
}
```

---

## Think before coding

```text
PATCH /accounts/:accountNumber/deposit
                ↓
Get account number
                ↓
Get amount
                ↓
Read database
                ↓
Find account
                ↓
Account exists?
       ↙               ↘
     NO                YES
      ↓                 ↓
    404            Validate amount
                        ↓
                  Add amount
                        ↓
                  Save database
                        ↓
                     Response
```

Now code:

```js
app.patch("/accounts/:accountNumber/deposit", (req, res) => {
  const accounts = readDB();

  const account = accounts.find((account) => {
    return account.accountNumber === req.params.accountNumber;
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  const { amount } = req.body;

  if (typeof amount !== "number") {
    return res.status(400).json({
      message: "Deposit amount must be a number"
    });
  }

  if (!Number.isFinite(amount) || amount <= 0) {
    return res.status(400).json({
      message: "Deposit amount must be greater than 0"
    });
  }

  account.balance += amount;

  writeDB(accounts);

  res.json({
    message: "Deposit successful",
    accountNumber: account.accountNumber,
    newBalance: account.balance
  });
});
```

---

# 🧠 Notice the edge cases

We handled:

```text
Account doesn't exist
        ↓
       404
```

```text
amount missing
        ↓
       400
```

```text
amount = "500"
        ↓
       400
```

```text
amount = -500
        ↓
       400
```

```text
amount = 0
        ↓
       400
```

This is what you should start doing naturally.

---

# 12. DELETE ACCOUNT

Requirement:

```text
DELETE /accounts/1001
```

### Thinking

```text
Get account number
       ↓
Read database
       ↓
Does account exist?
     ↙        ↘
   NO         YES
   ↓           ↓
  404        remove
               ↓
          save database
               ↓
            response
```

Code:

```js
app.delete("/accounts/:accountNumber", (req, res) => {
  const accounts = readDB();

  const accountNumber = req.params.accountNumber;

  const accountExists = accounts.some((account) => {
    return account.accountNumber === accountNumber;
  });

  if (!accountExists) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  const updatedAccounts = accounts.filter((account) => {
    return account.accountNumber !== accountNumber;
  });

  writeDB(updatedAccounts);

  res.json({
    message: "Account deleted successfully",
    accountNumber
  });
});
```

---

# 13. Why did I use `some()` before `filter()`?

This is an important thinking exercise.

`filter()` alone can do:

```js
const updatedAccounts = accounts.filter(...)
```

But then how do you know whether the account actually existed?

Suppose:

```text
DELETE /accounts/9999
```

If 9999 doesn't exist:

```js
filter()
```

simply gives you the same array.

You might accidentally respond:

```text
Account deleted
```

even though nothing was deleted.

So:

```text
some()
 ↓
Does it exist?
```

Then:

```text
filter()
 ↓
Remove it
```

This is much better API behavior.

---

# 14. Add global error handling

Our `readDB()` and `writeDB()` can throw errors.

Express should have a final error middleware.

Put this **before `app.listen()`**:

```js
app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});
```

Now:

```text
Route
 ↓
something fails
 ↓
throw error
 ↓
error middleware
 ↓
500 response
```

---

# 15. Final `server.js`

Here is the complete version we've designed:

```js
import express from "express";
import fs from "fs";

const app = express();

app.use(express.json());

const DB_FILE = "./database.txt";

// ==============================
// DATABASE FUNCTIONS
// ==============================

function readDB() {
  try {
    const data = fs.readFileSync(DB_FILE, "utf-8");

    if (!data.trim()) {
      return [];
    }

    return JSON.parse(data);
  } catch (error) {
    console.error("Database read error:", error.message);
    throw new Error("Unable to read database");
  }
}

function writeDB(data) {
  try {
    fs.writeFileSync(
      DB_FILE,
      JSON.stringify(data, null, 2)
    );
  } catch (error) {
    console.error("Database write error:", error.message);
    throw new Error("Unable to save database");
  }
}

// ==============================
// HOME
// ==============================

app.get("/", (req, res) => {
  res.json({
    message: "Bank API is running"
  });
});

// ==============================
// CREATE ACCOUNT
// POST /accounts
// ==============================

app.post("/accounts", (req, res) => {
  const accounts = readDB();

  const {
    name,
    accountNumber,
    city,
    age,
    balance
  } = req.body;

  // Validate required fields
  if (
    !name ||
    !accountNumber ||
    !city ||
    age === undefined ||
    balance === undefined
  ) {
    return res.status(400).json({
      message: "All account fields are required"
    });
  }

  // Validate age
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: "Age must be an integer and at least 18"
    });
  }

  // Validate balance
  if (
    typeof balance !== "number" ||
    !Number.isFinite(balance) ||
    balance < 0
  ) {
    return res.status(400).json({
      message: "Balance must be a non-negative number"
    });
  }

  const cleanAccountNumber = String(accountNumber).trim();

  // Check duplicate account number
  const existingAccount = accounts.find((account) => {
    return account.accountNumber === cleanAccountNumber;
  });

  if (existingAccount) {
    return res.status(409).json({
      message: "Account number already exists"
    });
  }

  // Create account
  const newAccount = {
    name: String(name).trim(),
    accountNumber: cleanAccountNumber,
    city: String(city).trim(),
    age,
    balance
  };

  accounts.push(newAccount);

  writeDB(accounts);

  res.status(201).json({
    message: "Account created successfully",
    account: newAccount
  });
});

// ==============================
// GET ALL ACCOUNTS
// GET /accounts
// ==============================

app.get("/accounts", (req, res) => {
  const accounts = readDB();

  res.json({
    count: accounts.length,
    accounts
  });
});

// ==============================
// GET ONE ACCOUNT
// GET /accounts/:accountNumber
// ==============================

app.get("/accounts/:accountNumber", (req, res) => {
  const accounts = readDB();

  const accountNumber = req.params.accountNumber;

  const account = accounts.find((account) => {
    return account.accountNumber === accountNumber;
  });

  if (!account) {
    return res.status(404).json({
      message: "Account not found"
    });
  }

  res.json(account);
});

// ==============================
// GET BALANCE
// GET /accounts/:accountNumber/balance
// ==============================

app.get(
  "/accounts/:accountNumber/balance",
  (req, res) => {
    const accounts = readDB();

    const account = accounts.find((account) => {
      return account.accountNumber === req.params.accountNumber;
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    res.json({
      accountNumber: account.accountNumber,
      balance: account.balance
    });
  }
);

// ==============================
// DEPOSIT
// PATCH /accounts/:accountNumber/deposit
// ==============================

app.patch(
  "/accounts/:accountNumber/deposit",
  (req, res) => {
    const accounts = readDB();

    const account = accounts.find((account) => {
      return account.accountNumber === req.params.accountNumber;
    });

    if (!account) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const { amount } = req.body;

    if (typeof amount !== "number") {
      return res.status(400).json({
        message: "Deposit amount must be a number"
      });
    }

    if (!Number.isFinite(amount) || amount <= 0) {
      return res.status(400).json({
        message: "Deposit amount must be greater than 0"
      });
    }

    account.balance += amount;

    writeDB(accounts);

    res.json({
      message: "Deposit successful",
      accountNumber: account.accountNumber,
      newBalance: account.balance
    });
  }
);

// ==============================
// DELETE ACCOUNT
// DELETE /accounts/:accountNumber
// ==============================

app.delete(
  "/accounts/:accountNumber",
  (req, res) => {
    const accounts = readDB();

    const accountNumber = req.params.accountNumber;

    const accountExists = accounts.some((account) => {
      return account.accountNumber === accountNumber;
    });

    if (!accountExists) {
      return res.status(404).json({
        message: "Account not found"
      });
    }

    const updatedAccounts = accounts.filter((account) => {
      return account.accountNumber !== accountNumber;
    });

    writeDB(updatedAccounts);

    res.json({
      message: "Account deleted successfully",
      accountNumber
    });
  }
);

// ==============================
// ERROR HANDLER
// ==============================

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    message: "Internal server error"
  });
});

// ==============================
// START SERVER
// ==============================

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

# 16. `database.txt`

Initially:

```json
[]
```

After creating two accounts, it might become:

```json
[
  {
    "name": "Raju",
    "accountNumber": "1001",
    "city": "Delhi",
    "age": 20,
    "balance": 5000
  },
  {
    "name": "Aman",
    "accountNumber": "1002",
    "city": "Faridabad",
    "age": 21,
    "balance": 8000
  }
]
```

---

# 🧠 Now don't just run it — test your thinking

You should test these cases yourself.

### Test 1 — Normal create

```http
POST /accounts
```

```json
{
  "name": "Raju",
  "accountNumber": "1001",
  "city": "Delhi",
  "age": 20,
  "balance": 5000
}
```

Expected:

```text
201 Created
```

---

### Test 2 — Duplicate account

Send the same account again.

Expected:

```text
409 Conflict
```

Why?

```text
accountNumber already exists
```

---

### Test 3 — Missing field

```json
{
  "name": "Raju",
  "accountNumber": "1002"
}
```

Expected:

```text
400 Bad Request
```

---

### Test 4 — Invalid age

```json
{
  "name": "Raju",
  "accountNumber": "1002",
  "city": "Delhi",
  "age": 15,
  "balance": 5000
}
```

Expected:

```text
400
```

---

### Test 5 — Account doesn't exist

```http
GET /accounts/9999
```

Expected:

```text
404
```

---

### Test 6 — Invalid deposit

```json
{
  "amount": -500
}
```

Expected:

```text
400
```

---

### Test 7 — Valid deposit

```json
{
  "amount": 500
}
```

If balance was:

```text
5000
```

new balance should be:

```text
5500
```

---

### Test 8 — Delete nonexistent account

```http
DELETE /accounts/9999
```

Expected:

```text
404
```

---

# 🔥 The development process I want you to practice

For **every new endpoint**, don't start by writing Express syntax.

Take a piece of paper and write:

```text
REQUIREMENT
↓
What should this endpoint do?

DATA
↓
What data do I need?

INPUT
↓
body / params / query?

ROUTE
↓
What URL?

METHOD
↓
GET / POST / PATCH / DELETE?

LOGIC
↓
What are the exact steps?

VALIDATION
↓
What input is invalid?

EDGE CASES
↓
What if data doesn't exist?
What if duplicate?
What if wrong type?
What if missing?
What if invalid value?

DATABASE
↓
Do I need to read?
Do I need to modify?
Do I need to write?

RESPONSE
↓
What status code?
What JSON?
```

### And the most important rule:

**Don't write the code until you can explain the algorithm in plain English.**

For example, before writing deposit code, you should be able to say:

> "I receive an account number from the URL and an amount from the body. I read the database, find the account, return 404 if it doesn't exist, validate that the amount is a positive finite number, add it to the balance, save the updated accounts, and return the new balance."

Once you can say that, the code becomes much easier.

That's the actual backend skill we're trying to build—not memorizing `app.patch()` or `.find()`. 🚀
