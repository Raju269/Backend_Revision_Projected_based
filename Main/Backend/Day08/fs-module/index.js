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
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// Home route
app.get("/", (req, res) => {
  res.send("Bank File Database is running");
});

// 1. Create account
app.post("/accounts", (req, res) => {
  const accounts = readDB();

  const newAccount = {
    name: req.body.name,
    accountNumber: req.body.accountNumber,
    city: req.body.city,
    age: req.body.age,
    balance: req.body.balance
  };

  accounts.push(newAccount);

  writeDB(accounts);

  res.json({
    message: "Account created successfully",
    account: newAccount
  });
});

// 2. Read all accounts
app.get("/accounts", (req, res) => {
  const accounts = readDB();

  res.json(accounts);
});

// 3. Read one account
app.get("/accounts/:accountNumber", (req, res) => {
  const accounts = readDB();

  const account = accounts.find((acc) => {
    return acc.accountNumber == req.params.accountNumber;
  });

  res.json(account);
});

// 4. Read balance
app.get("/accounts/:accountNumber/balance", (req, res) => {
  const accounts = readDB();

  const account = accounts.find((acc) => {
    return acc.accountNumber == req.params.accountNumber;
  });

  res.json({
    accountNumber: account.accountNumber,
    balance: account.balance
  });
});

// 5. Increase balance
app.patch("/accounts/:accountNumber/deposit", (req, res) => {
  const accounts = readDB();

  const account = accounts.find((acc) => {
    return acc.accountNumber == req.params.accountNumber;
  });

  account.balance = account.balance + req.body.amount;

  writeDB(accounts);

  res.json({
    message: "Balance increased successfully",
    account: account
  });
});

// 6. Delete account
app.delete("/accounts/:accountNumber", (req, res) => {
  let accounts = readDB();

  accounts = accounts.filter((acc) => {
    return acc.accountNumber != req.params.accountNumber;
  });

  writeDB(accounts);

  res.json({
    message: "Account deleted successfully"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
