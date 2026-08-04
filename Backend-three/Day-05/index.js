import express from "express";


const app = express();
const database = [];
// app ek object , get ek method hai 
// 2 argument : url match kara aat hai 
// call ko implement kar deta hai
// saare path ko accept karan hai : 
// get , post, patch, put , delete;

app.use(express.json());
// authentication 
// RateLimiter

app.get("/",(req,res)=>{
    res.send("Welcome to Home Page of the websites ");
})

app.get("/user",(req,res)=>{
    res.send("Mere toh Maja hai bhai ");
});


app.post("/",(req,res)=>{
    res.send("Post create kar diya hai ")
})


app.patch("/",(req,res)=>{
    res.send("Patch the user information is successfulll");
})

app.delete("/",(req,res)=>{
    res.send("I have deleted the data ")
})

app.put("/",(req,res)=>{
    res.send("I have update the User field the data");
})

app.listen(3000,()=>{
    console.log(`Server is lisening at port 3000`);
})