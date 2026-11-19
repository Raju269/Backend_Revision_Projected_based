import express from 'express'

const app = express();
const PORT = 3000;
app.use(express.json());

// ? app.used registers middleware 

app.use((req,res,next)=>{
    console.log("Middleware running");
    next();
});

app.use('user',(req,res,next)=>{
    return res.status(404).json({
        message:"Your Blocked"
    });
});
app.get("/users",(req,res)=>{
    res.send("All Users");
});

app.use((req,res,next)=>{
    console.log("Request came");
    next();
});



app.listen(PORT,(req,res)=>{
    console.log("Server is running ");
});
