import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000; 

// TODO Route Order 
app.get('/users/admin',(req,res)=>{
   res.send("Admin user");
});
 app.get('/users/:id',(req,res)=>{
    res.send(`User id is ${req.params.id}`);
 })



 app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
    
 })