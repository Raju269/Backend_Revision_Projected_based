import express from "express";
const app  = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.json({
        message:"Hello ji "
    })
})

app.listen(3000,(req,res)=>{
    console.log(`server is running at port 3000`);
})