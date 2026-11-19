// ! Routes means methods + Path 
import express from "express";

const app = express();

app.use(express.json());
const PORT = 3000;

// ? get requested 

app.get("/users",(req,res)=>{
     res.send("Get all users information");
})

app.post('/users',(req,res)=>{
    res.send("Create new User");
});

app.listen(PORT,(req,res)=>{
    console.log("Server is runnings")
});