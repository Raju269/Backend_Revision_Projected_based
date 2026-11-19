import express from "express";
import fs, { write } from "fs";

const app = express();

app.use(express.json());

const DB_FILE = "./database.txt";

// =========================
// TODO DATABASE FUNCTIONS
// =========================

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
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Databased write error :", error.message);
    throw new Error("Unable to save Databases");
  }
}

// ==================
// TODO Error Handler 
// ==================

app.use((err,req,res,next)=>{
    console.error(err);

    res.status(500).json({
        message:"Internal server error"
    });
});


// =============================
// TODO Home
// =============================

app.get("/", (req, res) => {
  res.json({
    message: "Bank API is running",
  });
});

app.post("/accounts", (req, res) => {
  const accounts = readDB();

  const { name, accountNumber, city, age, balance } = req.body;

  // Validate required fields
  if (
    !name ||
    !accountNumber ||
    !city ||
    age === undefined ||
    balance === undefined
  ) {
    return res.status(409).json({
      message: "All acount fields are required",
    });
  }
  // Validate age
  if (!Number.isInteger(age) || age < 18) {
    return res.status(400).json({
      message: "Age must be an integer and at least 18",
    });
  }

  // Validate balance
  if (typeof balance !== "number" || !Number.isFinite(balance) || balance < 0) {
    return res.status(400).json({
      message: "Balance must be a non- negative number",
    });
  }

  const cleanAccountNumber = String(accountNumber).trim();

  //  Check duplicate account number
  const existingAccount = accounts.find((account) => {
    return account.accountNumber === cleanAccountNumber;
  });

  if (existingAccount) {
    return res.status(409).json({
      message: "Account number already exists",
    });
  }

  // Create Account

  const newAccount = {
    name: String(name).trim(),
    accountNumber: cleanAccountNumber,
    city: String(city).trim(),
    age,
    balance,
  };

  accounts.push(newAccount);

  writeDB(accounts);

  res.status(201).json({
    message: "Account created successfully",
    account: newAccount,
  });
});

// TODO: Get All Accounts
app.get("/accounts", (req, res) => {

    const accounts = readDB();

    res.status(200).json({
        totalAccounts: accounts.length,
        accounts: accounts
    });
});
// =================
// TODO GET ONE Account and get /accounts/:accountNumber
// =================

app.get("/accounts/:accountNumber",(req,res)=>{
    const accounts = readDB();

    const accountNumber = req.params.accountNumber;

    const account = accounts.find((account)=>{
        return account.accountNumber === accountNumber;
    });

    if(!account){
        return res.status(404).json({
            message:"Account not found "
        });
    }

    res.json(account);
})

// ============================
// TODO Get Balance get /accounts/:accountNumber/balance
// ============================
// ! ans http://localhost:3000/accounts/1004/balance 
app.get("/accounts/:accountNumber/balance",(req,res)=>{
    const accounts = readDB();

    const account = accounts.find((account)=>{
        return account.accountNumber === req.params.accountNumber;
    });

    if(!account){
        return res.status(404).json({
            message:"Account not found"
        });
        
    };

    res.json({
        accountNumber : account.accountNumber,
        balance:account.balance
    });
    
})

// ========================
// TODO Deposit Patch /accounts/:accountNumber/deposit
// ========================
// Deposit Money into Account
app.patch("/accounts/:accountNumber/deposit", (req, res) => {

    const accounts = readDB();

    const account = accounts.find((acc) => {
        return acc.accountNumber === req.params.accountNumber;
    });

    if (!account) {
        return res.status(404).json({
            message: "Account not found"
        });
    }

    const { amount } = req.body;

    // Validate deposit amount
    if (typeof amount !== "number" || !Number.isFinite(amount) || amount <= 0) {
        return res.status(400).json({
            message: "Deposit amount must be greater than 0"
        });
    }

    // Update account balance
    account.balance += amount;

    // Save updated account data
    writeDB(accounts);

    res.status(200).json({
        message: "Deposit successful",
        accountNumber: account.accountNumber,
        depositedAmount: amount,
        newBalance: account.balance
    });
});
// =================== 
// TODO DELETE Account Delete /accounts/:accountNumber
// ===================

app.delete("/accounts/:accountNumber",(req,res)=>{
    const accounts = readDB();

    const accountNumber = req.params.accountNumber;

    const accountExists = accounts.some((account)=>{
        return account.accountNumber === accountNumber;
    });

    if(!accountExists){
        return res.status(404).json({
            message:"Account not found"
        });
    }
    const updatedAccounts = accounts.filter((account)=>{
        return account.accountNumber !== accountNumber;
    });

    writeDB(updatedAccounts);

    res.json({
        message:"Account delted successfully",
        accountNumber
    });
});



// =============
// TODO START SERVER 
// ==============

app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
});

