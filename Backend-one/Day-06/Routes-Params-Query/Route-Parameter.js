import express from "express";

const app = express();

const PORT = 3000; 
app.use(express.json());

// Router params
// Route parameter 
app.get("/user/:name",(req,res)=>{
    res.send(`User name is ${req.params.name}`);
})

app.get("/student/:id",(req,res)=>{
    res.send(`Student id is ${req.params.id}`);
})


app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`)
})