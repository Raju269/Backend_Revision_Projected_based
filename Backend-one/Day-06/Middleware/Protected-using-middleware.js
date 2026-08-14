import express from "express";
const PORT = 3000;
const app = express();

app.use(express.json());

function checkLoggin(req,res,next){
    const isLoggined = true;
    if(!isLoggined){
        return res.status(403).json({
            message:"Please login first"
        });
    }
    next();
}

app.get("/user", checkLoggin ,(req,res,next)=>{
    res.send(`Profile pages `)
})
app.get("/user",(req,res)=>{
    res.send("Hello Raju bhaiya ");
})

app.get('/admin',checkLoggin,(req,res)=>{
    res.send("your are admin ")
})

app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin Dashboard");
})

app.get("/admin/user",(req,res)=>{
    res.send("Admin users");
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})