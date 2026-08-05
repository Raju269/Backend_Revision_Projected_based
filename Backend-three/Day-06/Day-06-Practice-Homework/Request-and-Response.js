import express from "express";
import { Server } from "node:http";

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    res.send("Hello ji ");
    res.json({message:"Successsfull work on response "});
    res.status(404).json({message:"Not found"});
    console.log(req);
    console.log(res);
})

Server.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000 `);
})