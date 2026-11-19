import express from "express";
const app =  express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Server is running ");
});

app.get('/users',(req,res)=>{
    res.send("Hello ji Raju ");
})
app.listen(3000,(req,res)=>{
    console.log("Server started on port 3000");
})