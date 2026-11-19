import express  from "express";
const app = express();

const PORT = 3000; 
app.use(express.json());

app.use((req,res,next)=>{
    console.log("Middleware is 1 ");
    next();
})

app.use((req,res,next)=>{
    console.log("Middleware is 2");
    next();
})

app.get("/users",(req,res)=>{
    console.log("Router handler")
    res.json({
        message:"Hello User Everything is good now . "
    })
});

app.listen(PORT,(req,res)=>{
    console.log("Server is running now ");
})