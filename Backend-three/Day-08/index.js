import express from 'express';
import fs, { read } from 'fs';
import { Server } from 'http';
const app = express();

app.use(express.json());

const DBPath = "./Database.txt";

function readDB(){
    const data = fs.readFileSync(DBPath,"utf-8");
    // Whole database data is avaiable to you string format : JSON 
    return JSON.parse(data);
    // convert string into JavaScript Objects
}

function writeDB(data){
    // data is an array of object 
    // convert in into JSON : String
    fs.writeFileSync(DBPath,JSON.stringify(data,null, 2));
}

app.get("/",(req,res)=>{
    res.send("Hello ji server is working now ");
})

// fetch Customer details using account Number 
app.get("/user/:accountNumber",(req,res)=>{
    
    const accountId = req.params.accountNumber;
    const account = readDB();
    const user = account.find((a)=>a.accountNumber == accountId)

    res.json(user);
})

// account creation 
app.post("/user",(req,res)=>{
    const user = req.body;
    const account = readDB();

    account.push(user);
    writeDB(account);

    res.json(user);
})

// delete the user 
app.delete("/user",(req,res)=>{
    const accountId = req.body.accountNumber;
    const account = readDB();

    const newAccount = account.filter((a)=>a.accountId==accountId);

    writeDB(newAccount);

    res.send("Information delete successfull");
})

// Balance updatae 

app.patch("/user",(req,res)=>{
    const balanceUpdate = req.body.balance;
    const accountId = req.body.accountNumber;
    const account = readDB();
    const user = account.find((a)=>a.accountNumber == accountId);
    user.balance+=balanceUpdate;
    writeDB(account);
    res.send("Balance update successsfull");
})
app.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000 `);
})