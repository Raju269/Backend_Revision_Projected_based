// ! Route Parameter 
import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000; 


// TODO Get requested 
app.get('/user/:name',(req,res)=>{
    // console.log(url);
    res.send(`User name is ${req.params.name}`);
})

app.listen(PORT,(req,res)=>{
    console.log("Server is running ")
})