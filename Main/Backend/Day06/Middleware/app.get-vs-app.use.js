import express  from "express";
const app = express();

const PORT = 3000; 
app.use(express.json());

// app.get('/users',handler);
// app.use('/users',middleware);

function checkLogin(req,res,next){
    const isLoggedIn = true;

    if(!isLoggedIn){
        return res.status(401).json({
            message:"Please login first"
        });
    }
    next();
}

app.get("/profile",checkLogin,(req,res)=>{
    res.send("Profile pager")
});

app.get("/user",(req,res)=>{
    res.send("Hello Raju bhaiya ");
})

app.get('/admin',checkLogin,(req,res)=>{
    res.send("your are admin ")
})

app.use("/admin",checkLogin);

app.get("/admin/dashboard",(req,res)=>{
    res.send("Admin Dashboard");
});

app.get("/admin/users",(req,res)=>{
    res.send("Admin users");
});

app.listen(PORT,(req,res)=>{
    console.log("server is listening at port 3000")
})