import express from "express";
const app = express();
const PORT = 3000; 


app.use(express.json());
app.post('/user',(req,res)=>{
    console.log(req.body);
    console.log(req.body.name);
    res.send("User created Successfully ");
})

app.use("/user",(req,res,next)=>{
    console.log(`Root middleware details information`);
    res.send("Hello ji")
    next();
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})
