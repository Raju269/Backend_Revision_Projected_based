import express from "express";

const app = express();
const PORT = 3000; 
app.use(express.json());

app.get("/users",(req,res)=>{
    res.send("This get requested to fetch the data ")
})

app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})