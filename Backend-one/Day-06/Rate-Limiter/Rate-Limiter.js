import express from "express";
import rateLimit from 'express-rate-limit';
const PORT = 3000;
const app = express();

app.use(express.json());

const limiter = rateLimit({
    windowMs: 1*60*1000,
    max:4,
    message:"Too many requested"
});

app.get("/user",limiter, (req,res)=>{
    res.send("Hello Raju bhaiya ");
})
app.post("/users",limiter,(req,res)=>{
    res.send("User is created successfull now ")
})

app.get("/users",limiter, (req, res) => {
  res.json({
    name: "Raju",
    age: 22
  });
});

app.get("/users/:id", limiter,(req, res) => {
  const id = req.params.id;

  if (id !== "1") {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    id: 1,
    name: "Rohit"
  });
});


app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})