import express from "express";

const app  = express();
const PORT = 3000;
app.use(express.json());

app.get("/users",(req,res)=>{
    res.send("Get all user information ");
})

app.post("/users",(req,res)=>{
    res.send("Creat a new User ")
})

app.get("/user/raju",(req,res)=>{
    res.send("This is Raju kumar information ");
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`)
})