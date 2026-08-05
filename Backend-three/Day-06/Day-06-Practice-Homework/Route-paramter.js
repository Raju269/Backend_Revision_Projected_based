import express from "express";

const app = express();

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Hello ji")
})

app.get("/users/:name",(req,res)=>{
    res.send(`User name is ${req.params.name}`);
})

// 7. Route Parameter Example with ID

app.get("/users/:id",(req,res)=>{
    res.send(`User id is ${req.params.id}`);
});

app.get("/users/:id/profile",(req,res)=>{
    res.send(`Profile User is ${req.params.id}`);
})

// 8. Route Order


app.get("/product",(req,res)=>{
    res.send(`All user`);
})

app.get("/product/:id",(req,res)=>{
    res.send(`Specific User is ${req.params.id}`);
})

// Reverse order is not working 
app.get("/student/:id",(req,res)=>{
    res.send(`Student specfic User is ${req.params.id}`)
})

app.get("/student",(req,res)=>{
    res.send(`All sudentent`)
})


// But order matters in cases like this:
app.get("/people/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});

app.get("/people/admin", (req, res) => {
  res.send("Admin user");
});

Server.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000`)
})