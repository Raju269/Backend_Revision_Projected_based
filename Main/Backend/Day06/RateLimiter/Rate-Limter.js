import express from "express";
import rateLimit from 'express-rate-limt';
const PORT = 3000;
const app = express();
app.use(express.json());

const limiter = rateLimit({
    windowMs : 1*60*1000,
    max:5,
    message:"Too many requests"
});

app.use(limiter);
app.get("/users",limiter,(req,res)=>{
    res.send("Hello Raju bhaiya")
})
app.post("/users",limiter,(req,res)=>{
    res.send("User is created successful now");
})

app.get("/users",limiter,(req,res)=>{
    res.json({
        name:"Raju",
        age:22
    });
});

app.post("/login",limiter,(req,res)=>{
    res.send("Login route");
});

app.use("/api",limiter);


// Sending Response 

app.get("/",(req,res)=>{
    res.send("Hello");
});


app.get("/user",(req,res)=>{
    res.json({
        name:"Raju",
        age:25
    });
});


app.get("/users/:id",(req,res)=>{
    const id = req.params.id;

    if(id !== "1"){
        return res.status(404).json({
            message:"User not found"
        });
    }
    res.status(200).json({
        id:1,
        name:"Raju"
    });
});

app.get("/test",(req,res)=>{
      res.send("Hellow");

});

app.get("/users/:id",(req,res)=>{
    if(req.params.id !=="1"){
        return res.status(404).send("User is not founded");
    }

    res.send("User found");
});



