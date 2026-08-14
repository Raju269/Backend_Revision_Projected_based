import express from 'express';
const app = express();
const PORT = 3000;

app.use(express.json());

// app.get("/user/:name",(req,res)=>{
//     res.send(`User name is ${req.params.name}`);
// })
// app.get("/user",(req,res)=>{
//     res.send("User information ")
// })


app.get("/user/admin",(req,res)=>{
    res.send("This is admin");
})
app.get("/user/:name",(req,res)=>{
    res.send(`User name is ${req.params.name}`);
})
app.listen(PORT,(req,res)=>{
    console.log(`server is running at ${PORT}`)
})