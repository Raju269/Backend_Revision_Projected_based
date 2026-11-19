import express  from "express";
const app = express();

const PORT = 3000; 
app.use(express.json());

app.use((req,res,next)=>{
    console.log("All Requested come here ")
    next();
})
app.use((req,res,next)=>{
    return res.status(403).json({
        message:"Blocked"
    })
})
app.use("/",(req,res,next)=>{
    console.log("Root middleware");
    res.send("/ is working ");
    next();
});


app.use("/user",(req,res,next)=>{
    console.log("User middleware");
    res.send("Middleare is working now ");
    next();
});

app.listen(PORT,(req,res)=>{
    console.log("server is listening at port 3000")
})