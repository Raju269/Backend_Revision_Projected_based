import express from "express";

const app = express();


app.use(express.json());

function checkLogin(req,res,next){
    const isLoggedIn = true;

    if(!isLoggedIn){
        return res.status(401).json({
            message:"Please login first"
        })
    }
    next();
}

app.get("/profile",checkLogin ,(req,res)=>{
    res.send("Profile Page");
})

app.use("/admin",checkLogin);

app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin dashboard");
})

app.get("/admin/users",(req,res)=>{
    res.send("Admin Users");
})

Server.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000`)
})