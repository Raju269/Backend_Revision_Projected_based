import express from "express";
const app  = express();
app.use(express.json());
const PORT = 3000; 

let users = [];
let nextId = 1; 

// 1. Build - in middleware 
app.use(express.json());

// 2. Global Logger middleware 
function logger(req,res,next){
    console.log(`Mehtods:`,req.method);
    console.log(`URL:`,req.originalUrl);

    next();
}

app.use(logger);

// 3. Middleware for the /user branch 
app.use('/user',(req,res,next)=>{
    console.log("User middleware running");
    next();
});

// 4. Validation middleware

function validateUser(req,res,next){
    if(
        typeof req.body?.name !== "string" || 
        req.body.name.trim() === ""
    ){
        return res.status(400).json({
            message:"Valid name is required"
        });
    }
    next();
}


// 5. GET - All users 
app.get("/user",(req,res)=>{
    res.status(200).json({
        users:users
    });
});

// 6. POST - Create user 
app.post('/user',validateUser,(req,res)=>{
    const newUser = {
        id: nextId++,
        name: req.body.name.trim(),
        age:req.body.age?? null
    };
    users.push(newUser);

    res.status(201).json({
        message:"User created",
        user:newUser
    });

});

// 7. Demo authorization middleware 
function checkAdmin(req,res,next){
    const key = req.get("x-demo-key");

    if(key=='x-demo-key'){
        return res.status(401).json({
            message:"Unauthorized"
        });
    }
    next();
}

// 8. Protect all /admin routes 
app.use("/admin",checkAdmin);

app.get("/admin/users",(req,res)=>{
    res.status(200).json({
        users:users
    });
});

// 9. Start server 
app.listen(3000, () => {
    console.log("Server running on port 3000");
});