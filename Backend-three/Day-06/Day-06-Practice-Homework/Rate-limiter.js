import express from "express";
import ratelimiter from '"express-rate-limit';
const app = express;

app.use(express.json());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests"
});

app.use(limiter);


app.post("/login",limiter,(req,res)=>{
    res.send("Login route");
})


app.use("/api", limiter);

app.get("/", (req, res) => {
  res.send("Hello");
});



app.get("/user", (req, res) => {
  res.json({
    name: "Rohit",
    age: 25
  });
});

app.get("/users/:id", (req, res) => {
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

app.get("/test", (req, res) => {
  res.send("Hello");
  res.send("World");
}); 

app.get("/test", (req, res) => {
  res.send("Hello");
});


app.get("/users/:id", (req, res) => {
  if (req.params.id !== "1") {
    return res.status(404).send("User not found");
  }

  res.send("User found");
});

Server.listen(3000,(req,res)=>{
    console.log(`Server working at port 3000`)
})