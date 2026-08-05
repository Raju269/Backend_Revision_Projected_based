import express from "express";
import { Server } from "node:http";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.end("Hello ji");

})

// Route Means Method + Path
app.get("/users",(req,res)=>{
    res.send("Raju kumar is change to Rudra ")
})


app.post("/users",(req,res)=>{
    res.send("Create a new user is done ")
})
Server.listen(3000,(req,res)=>{
    console.log(`Server is running now at port 30000`);
})