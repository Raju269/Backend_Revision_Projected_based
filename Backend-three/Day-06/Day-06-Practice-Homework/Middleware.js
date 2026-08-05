import express from "express";

const app = express;

app.use(express.json());

function logger(req,res,next){
    console.log(`Request came `);
    next();
}

app.get("/",(req,res)=>{
    res.send("Hello ji ");
})

app.use((req,res,next)=>{
    console.log("Middleware learning ");
    next();
})


app.use((req,res,next)=>{
    console.log("request come");
    next();
})

app.get("/student",(req,res,next)=>{
    res.send("All student information ")
})

app.use((req, res, next) => {
  console.log("Request came");
});

app.use((req, res, next) => {
  console.log("Request came");
  next();
});

app.use((req, res, next) => {
  return res.status(403).json({
    message: "Blocked"
  });
});


app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("User created");
});

app.use((req, res, next) => {
  // read JSON body
  // convert JSON string into JS object
  // store it in req.body

  next();
});

app.use((req, res, next) => {
  // read JSON body
  // convert JSON string into JS object
  // store it in req.body

  next();
});

app.use("/", (req, res, next) => {
  console.log("Root middleware");
  next();
});


app.use((req, res, next) => {
  console.log("Runs for all routes");
  next();
});

app.use("/user", (req, res, next) => {
  console.log("User middleware");
  next();
});


Server.listen(3000,(req,res)=>{
    console.log(`Server is Running at port 3000 `);
})