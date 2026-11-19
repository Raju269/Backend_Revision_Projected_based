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

// app.get("/accounts/:accountNumber", (req, res) => {
//   const accounts = readDB();

//   const accountNumber = req.params.accountNumber;

//   const account = accounts.find((account) => {
//     return account.accountNumber === accountNumber;
//   });

//   if (!account) {
//     return res.status(404).json({
//       message: "Account not found"
//     });
//   }

//   res.json(account);
// });

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