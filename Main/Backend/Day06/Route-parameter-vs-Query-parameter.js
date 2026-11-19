import express from "express";
const app = express();
app.use(express.json());

const PORT = 3000; 

// TODO Route Parameter 

app.get('/users/:id',(req,res)=>{
    res.send(`Exact user id is ${req.params.id}`);

})

// TODO Query Parameter

app.get("/users",(req,res)=>{
    res.send(`Users from city ${req.query.city}`);
})


 app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
    
 })