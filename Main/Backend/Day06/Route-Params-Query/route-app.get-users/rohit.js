import express from "express";
const app  = express();

app.use(express.json());
const PORT = 3000;

app.get('/',(req,res)=>{
    res.send("This is me ");
});

app.get('/user',(req,res)=>{
    res.send("This is user route and information");
})

app.get('/user/raju',(req,res)=>{
    res.send("Hello Raju this is route to calling you ");
})

app.listen(PORT,(req,res)=>{
    console.log("Server is listing at 3000")
})