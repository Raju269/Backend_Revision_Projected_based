import express from "express";

const app = express();

const PORT = 3000;

app.use(express.json());

app.get("/student1",(req,res)=>{
    console.log(res);
    res.send("You can show me ");
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})