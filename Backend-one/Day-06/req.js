import express from "express";

const app = express();
const PORT = 3000; 
app.use(express.json());

app.get("/student",(req,res)=>{
    console.log(req);
    res.send("This is me bro ")
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`)
})
