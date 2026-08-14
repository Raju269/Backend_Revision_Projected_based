import express from "express";
import { products } from "./Data.js";

const app = express();
// app.use is a middle ware 
app.use(express.json());
// Take JSON data coming from the client and convert it into a JavaScript object.

app.get("/",(req,res)=>{
    res.send("Hello ji ");
})

app.post("/product",(req,res)=>{
    res.send("This is product related data ")
})

app.delete("/product",(req,res)=>{
    res.send("This is delete the product information ");
})
app.put('/products',(req,res)=>{
    res.send("this is replace the product number and price related information ");
})

app.patch("/products",(req,res)=>{
    res.send("This is update the new product information ");
})
app.listen(3000,(req,res)=>{
    console.log("Server listen at port 3000");
})