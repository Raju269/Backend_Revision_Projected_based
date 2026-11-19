import express from "express";
import fs, { readFileSync } from 'fs';

const PORT = 3000;
const app  = express();
app.use(express.json());


const DB_FILE = './database.txt';

function readDB1(){
    const data = fs.readFileSync(DB_FILE,'utf-8');
    return JSON.parse(data);
}

function writeDB1(){
    const data = fs.writeFileSync(DB_FILE,JSON.stringify(data,null,2));
}


// edage case to handle 
function readDB(){
    try{
        const data = fs.readFileSync(DB_FILE,'utf-8');

        if(!data.trim()){
            return[];
        }
        return JSON.parse(data)
    }catch(error){
        console.error("Database read error : "+error.message);
        throw new Error("Unable to read databases");
    }
}

function writeDB(){
    try{
        const data = fs.writeFileSync(DB_FILE,JSON.stringify(data,null,2));

    }catch(error){
        console.error("Database write error : "+error.message);
        throw new Error("Unable to save databases ")
    }
}

app.get('/',(req,res)=>{
    res.json({
        message:"Bank API is runnings now "
    });
});

app.post('/acconts',(req,res)=>{
    const account = readDB();
    const {
        name,
        accountNumber,
        city,
        age,
        balance
    } = req.body;

    // validation required filed 
    if(!name||!accountNumber||!city||!age===undefined||!balance===undefined){
        return res.status(404).json({
            message:"All account filed are required "
        });
    }
    // validate age 
    if(!Number.isInteger(age)||age<=18){
        return res.status(404).json({
            message:"Age must be an integer and  at least 18 to above"
        });
    }
    // balance 
    if(typeof balance !== "number" || balance<0){
        res.status(400).json({
            message:"Balance must be not a -ve number"
        })
    }

    // check if duplicate account number information 
    const existAccountNumber = account.find((account)=>{
        return accountNumber === String(accountNumber);
    })

    if(existAccountNumber){
        return res.status(409).json({
            message:'Account already exist '
        })
    }

    // create account 
    let newAccount = {
        name:String(name).trim(),
        accountNumber:String(accountNumber).trim(),
        city:String(city).trim,
        age,
        balance
    };

    // add accout 
    account.push(newAccount);

    // save database 
    writeDB(account);

    // Response 
    res.status(201).json({
        message:"Account created successfully",
        account:newAccount
    })
})

// app.get("/account",(req,res)=>{
//     res.json({
//         mes
//     })
// })
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})