import express from "express";
import fs from 'fs';

const app = express();
const PORT = 3000;

app.use(express.json());

const DB_FILE = "./database1.txt"

function readDB(data){
    try{
        const data = fs.readFileSync(DB_FILE,'utf8')
        
        if(!data.trim()){
            return [];
        }

        return JSON.parse(data);
    }catch(error){
        console.error("Database read error "+error.message);
        throw new Error("Unable to read Database");
    }
}

function writeDB(data){
    try{
        fs.writeFileSync(DB_FILE,JSON.stringify(data,null,2))
    }catch(error){
        console.error("Database write error"+error);
        throw new Error("Unable to save database")
    }
}


app.get("/",(req,res)=>{
    res.status(200).json({
        message:"Bank API server is connected successfully",

    })
});

// app.post("/accounts",(req,res)=>{
//     const accounts = readDB();
//     const {name,accountNumber,age,balance,city}=req.body;

//     // 1 validate required fields 
//     if(!name || !accountNumber || !city || age === undefined || balance === undefined){

//         return res.status(400).json({
//             message:"All account fields are required "
//         });
//     }

//     // 2 Validage age 
//     if(!Number.isInteger(age) || age<=18){
//         return res.status(400).json({
//             message:"Age must be an integer and at least 18"
//         });
//     }

//     // 3 validate balance 
//     if(typeof balance !== "number" || !Number.isFinite(balance) || balance<0){
//         return res.status(400).json({
//             message:"Balance must be a non - negative number"
//         });
//     }
//      const cleanAccountNumber = String(accountNumber).trim();
//    // Check duplicate account number
//   const existingAccount = accounts.find((account) => {
//     return account.accountNumber === cleanAccountNumber;
//   });

//   if (existingAccount) {
//     return res.status(409).json({
//       message: "Account number already exists"
//     });
//   }

//     // creat account 
//     const newAccount = {
//         name : String(name).trim(),
//         accountNumber:cleanAccountNumber,
//         city:String(city).trim(),
//         // age:Number(age).trim(),
//         // balance:Number(balance).trim()
//         age,
//         balance
//     }
//     // add account 
//     accounts.push(newAccount)

//     // save database
//     writeDB(accountNumber);

//     // Response 
//     res.status(201).json({
//         message:"Account created succcessful",
//         accountNumber:newAccount
//     });
// });


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


app.get("/accounts",(req,res)=>{
    const accounts = readDB();
    res.json({
        count:accounts.length,
        accounts
    })
})




app.get("/accounts/:accountNumber",(req,res)=>{
    const accounts = readDB();

    const accountNumber = req.params.accountNumber;

    const account = accounts.find((account)=>{
        return account.accountNumber === accountNumber;
    });
    if(!account){
        return res.status(404).json({
            message:"Account not found"
        })
    }
    res.json(account);
})

// get Balance 

// app.get("/accounts/:accountNumber/balance",(req,res)=>{
//     const accounts = readDB();

//     const account = accounts.find((account)=>{
//         return account.accountNumber === req.params.accountNumber;
//     });

//     if(!account){
//         return res.status(404).json({
//             message:"Accout not found"
//         });
//     }

//     res.json({
//         accountNumber:account.accountNumber,
//         balance:account.balance
//     });
// });

app.patch("/accounts/:accountNumber/deposit",(req,res)=>{
    const accounts = readDB();
     const account = accounts.find((account) => {
      return account.accountNumber === req.params.accountNumber;
    });
    if(!account){
        return res.status(404).json({
            message:"Account not found"
        });
    }

    const {amount} = req.body;

    if(typeof amount !== "number"){
        return res.status(400).json({
            message:"Deposite amount must be a number"
        });
    }

    if(!Number.isFinite(amount)||amount<=0){
        return res.status(400).json({
            message:"Deposite amount must be greater than 0"
        });
    }
    account.balance += amount;
    writeDB(account);
    res.json({
        message:"Deposite successfull",
        accountNumber : account.accountNumber,
        newBalance: account.balance
    });
});

app.delete("/accounts/:accountNumber",(req,res)=>{
    const accounts = readDB();

    const accountNumber = req.params.accountNumber;
    const accountExists = accounts.some((account)=>{
        return account.accountNumber === accountNumber;
    })

    if(!accountExists){
        return res.status(404).json({
            message:"Account not found"
        });
    }

    const updatedAccounts = account.filter((account)=>{
        return account.accountNumber !== accountNumber;
    });
})

// Error Handler 
app.use((err,req,res,next)=>{
    console.error(err);

    res.status(500).json({
        message:"INternal server error"
    });
});

app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`)
})