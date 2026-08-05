import express from "express";
import { Server } from "node:http";

const app = express();

app.use(express.json());


app.get("/",(req,res)=>{
    console.log("Hello ji ");
    res.send("Hello Server is working now lets go to check ")
})

Server.listen(3000,(req,res)=>{
    console.log(`Server is running now at port 3000`)
});