import express from "express";
import {products} from './Data.js';

const app = express();

// app.use is a middleware
app.use(express.json());

// Take JSON data coming from the client and converted it into a JavaScript objects 

app.get("/",(req,res)=>{
    res.send("Hello ji");
})
app.get("/product",(req,res)=>{
    res.send(products);
})
app.post("/product",(req,res)=>{
    res.send("This is product related data ");
})

app.delete("/product",(req,res)=>{
    res.send("This is delete the prduct information ")
});

app.put("/product",(req,res)=>{
    res.send("This is replace the product number and price related information ");
})

app.patch("/product",(req,res)=>{
    res.send("This is update the new product information ");
})

app.listen(3000,(req,res)=>{
    console.log("Server listen at port 3000");
})