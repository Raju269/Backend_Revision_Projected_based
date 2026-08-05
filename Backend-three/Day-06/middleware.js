import express from 'express';
const app = express()


// app.use((req,res)=>{
//     res.send("Hello Raju bhai ")
// })

// app.use("/practice",(req,res)=>{
//     res.send("This is product data")
// })

const isVerfied = true;
const isAdmin = true;

app.use("/practices",(req,res,)=>{
    if(!isVerfied){
        res.send("kindly login");
        return;
    }
    next();
})
app.get("/articel",(req,res)=>{
    res.send("Welcome to the articles sectin ");
})

app.get("/practices",(req,res)=>{
    res.send("This is your problem page");
})

app.get("/practice/:id",(req,res)=>{
    res.send(`This is your problem number ${req.params.id}`);
})

app.post("/practice",(req,res)=>{
    // post related information 
    res.send("Your post is created successfull");
})

app.get("/admin",(req,res)=>{
    res.send("I am admin")
})

app.get("/admin/createProblme",(req,res)=>{
    res.send("I am admin created the problem ");
})

app.get("/admin/contest",(req,res)=>{
    res.send("I am admin contest");
})

app.get("/",(req,res)=>{
    res.send("Hello ji ");
})

app.listen(3000,(req,res)=>{
    console.log(`Server running at port 3000`);
})