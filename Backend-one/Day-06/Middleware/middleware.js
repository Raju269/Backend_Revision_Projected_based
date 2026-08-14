import express from "express";

const app = express();
const PORT = 3000; 

app.use(express.json());

function logger(req,res,next){
    console.log("Request came")
    // next();
}
// console.log(logger());

app.use((req,res,next)=>{
    console.log("Middleware is runnng now")
    next();
})
app.get("/user",(req,res)=>{
    res.send("Request come here");
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})