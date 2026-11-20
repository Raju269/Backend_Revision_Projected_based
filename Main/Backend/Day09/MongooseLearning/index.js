import express from "express";
import mongoose from "mongoose";
import Customer from './buildSchema.js';
import dns from 'dns';
import dotenv from 'dotenv'
// This is important for connect to internet if ip addres phasing 
dns.setServers(['8.8.8.8','1.1.1.1'])
const app  = express();
dotenv.config();

app.use(express.json());

await mongoose.connect("mongodb+srv://rajuk631149_db_user:OCU25enbn9nL5LGz@cluster0.e7qnwqr.mongodb.net/home");

console.log("MongoDB conncected ");

app.get('/',(req,res)=>{
    res.send("Hello ji ");
})

// TODO Create a Customer information inserted 
app.post("/customers",async(req,res)=>{
    const customer = await Customer.create(req.body);

    res.json({
        message:"Customer created successfully",
        customer :customer
    });
});

// TODO Fetch all customers 
app.get("/customers",async(req,res)=>{
    const customer = await Customer.find();
    res.json({
        message:"All customer information ",
        customer
    })
})


// TODO Fectch customer by Account Number 
app.get("/customers/:accountNumber",async(req,res)=>{
    const accountNumber = req.params.accountNumber;

    const customer = await Customer.findOne({
        accountNumber : accountNumber
    });
    res.json(
        customer
    );
});

// TODO Update Balance: 
app.patch("/customers/:accountNumber/balance",async(req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {balance} = req.body;

    const  customer = await Customer.findOneAndUpdate(
        {accountNumber:accountNumber},
        {balance:balance},
        {new:true}
    );
    res.json({
        message:"Balance update Successfully",
        customer:customer
    })
})

//TODO Deposite Money 

app.patch("/customers/:accountNumber/deposit",async(req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {amount} = req.body;

    const customer = await Customer.findOneAndUpdate(
        {accountNumber : accountNumber},
        {$inc:{balance:amount}},
        {new:true}
    );

    res.json({
        message:"Amount depoisted successfully",
        customer : customer
    });
});

// TODO Withdraw Money 

app.patch("/customers/:accountNumber/withdraw",async(req,res)=>{
    const accountNumber = req.params.accountNumber;
    const {amount} = req.body;

    const customer = await Customer.findOne({
        accountNumber:accountNumber
    });

    if(customer.balance < amount){
        return res.json({
            message:"Insufficient balance"
        });
    }

    customer.balance = customer.balance - amount ; 
    await customer.save();

    res.json({
        message:"Amount withdrawn successfully",
        customer : customer 
    });
});


// TODO Delete Customer 
app.delete("/customers/:accountNumber",async(req,res)=>{
    const accountNumber = req.params.accountNumber;

    const customer = await Customer.findOneAndDelete({
        accountNumber:accountNumber
    });

    res.json({
        message:"Customer deleted successfully",
        customer : customer
    });
});

// TODO Filter Customer by balance 
// ! http://localhost:3000/customers/filter/balance?minBalance=500
app.get("/customers/filter/balance",async(req,res)=>{
    const minBalance = Number(req.query.minBalance);

    const customer = await Customer.find({
        balance : {$gt:minBalance}
    });
    res.json(customer);
});


//TODO  Filter customers by city 
// ! http://localhost:3000/customers/filter/city?city=Delhi
app.get("/customers/filter/city",async(req,res)=>{
    const {city} = req.query;

    const customers = await Customer.find({
        city:city
    });
    res.json(customers)
});

app.listen(3000,(req,res)=>{
    console.log(`Server running on port 3000`);
})
