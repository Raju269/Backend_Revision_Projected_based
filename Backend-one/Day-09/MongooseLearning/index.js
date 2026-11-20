import express from "express";
import mongoose from "mongoose";
import Customer from "./buildSchema.js";
import dns from "dns";
import dotenv from 'dotenv'
// this is important for connect to internet if ip address phasing problem issue 
dns.setServers(["8.8.8.8", "1.1.1.1"])
const app = express();
dotenv.config();
app.use(express.json());

await mongoose.connect(process.env.MONGO_URL);

console.log("MongoDB connected");

app.get("/",(req,res)=>{
res.send("Hello ji ");
})

// Create a customers information inserted 
app.post("/customers", async (req,res)=>{
    const customer = await Customer.create(req.body);

    res.json({
        message:"Customer created successfully",
        customer : customer
    });
});


// fetch all customers 
app.get("/customers",async(req,res)=>{
    const customer = await Customer.find();

    res.json({
        message:"all customer information ",
        customer
    })
})
// fecth customer by account Number

app.get("/customers/:accountNumber", async (req,res)=>{
    const accountNumber = req.params.accountNumber;

    const customer = await Customer.findOne({
        accountNumber : accountNumber
    });

    res.json(
        customer
    );
});

// Update Balance : 
app.patch("/customers/:accountNumber/balance", async (req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {balance} = req.body;

    const customer = await Customer.findOneAndUpdate(
        {accountNumber:accountNumber},
        {balance:balance},
        {new:true} 
    );

    res.json({
        message:"Balance update successfully",
        customer : customer
    })
})


// Deposite Money 

app.patch("/customer/:accountNumber/deposit", async(req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {amount} = req.body;

    const customer = await Customer.findOneAndUpdate(
        {accountNumber:accountNumber},
        {$inc:{balance:amount}},
        {new:true}
    );

    res.json({
        message:"Amount deposited successfully",
        customer :customer
    });
});

// withdraw Money 

app.patch("/customer/:accountNumber/withdraw",async (req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {amount} = req.body;

    const customer = await Customer.findOne({
        accountNumber : accountNumber
    });

    if(customer.balance < amount){
        return res.json({
            message: "Insufficient balance "
        });
    }
    
    customer.balance = customer.balance - amount ;
    await customer.save();

    res.json({
        message: "Amount withdrawn sucesssfully",
        customer : customer
    });
});

// Delete Customer 
app.delete("/customers/:accountNumber",async (req,res) =>{
    const accountNumber = req.params.accountNumber;

    const customer = await Customer.findOneAndDelete({
        accountNumber:accountNumber
    });

    res.json({
        message:"Customer deleted successfully",
        customer : customer 
    });
});

// Filter Customers by balance 

app.get("/customers/filter/balance",async (req,res)=>{
    const minBalance = Number(req.query.minBalance);

    const customer = await Customer.find({
        balance : {$gt:minBalance}
    });

    res.json(customer);
});

// filter Customers by city 

app.get("/customers/filter/city",async (req,res) =>{
    const {city} = req.query;

    const customers = await Customer.find({
        city:city
    });
    res.json(customers)
});


app.listen(3000,()=>{
    console.log(`Server running on port 3000`);
})