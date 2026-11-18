import express from "express";
const app = express();
const users = [
  {
    id: 1,
    name: "Raju ",
    email: "raju.kmr.rudra@gmail.com",
    profile: { age: 23, city: "Delhi" }
  },
  {
    id: 2,
    name: "Piyush ",
    email: "Piyush@gmail.com",
    profile: { age: 21, city: "Pune" }
  }
];
const PORT = 3000; 
// Middleware to parse JSON object into strng format 
app.use(express.json());

app.get('/',(req,res)=>{
    res.json({
        message:"Hello ji "
    })
})


// GET / user/:id/?include = profile 


app.get("/users/:id",(req,res)=>{
    // Think : what data does the client want :?
    // 1 User ID from URL (required ) => req.params 
    // 2 Additional optinls form query (optinal ) = > req.query 

    //  Exrtact User ID from URL 
    // Think : Route params are alwasys Strings converted to number if needed 

    const userId = Number(req.params.id); //"123" = 123 
    // Extract query parameter 
    // Think : Query param might be undefined if not provided 

    const includeProfile = req.query.include === "true";

    // Think : Always check if resource exists 
    // Don't Assume user with give ID exists 
    const user = users.find(u => u.id === userId);
    console.log(user)

    if(!user){
        // Think : Return early with 404 status 
        // Always include meaning ful message in response 
        return res.status(404)
        .json({
            message: "User is not found"
        })
    }
    // Think : Build response Based on what client requested 
    const response = { 
        id: user.id,
        name : user.name, 
        email : user.email
    }

    // Think Include additinal data only if requested 
    if(includeProfile){
        response.profile = user.profile;
    }
    // Think : 200 is default , but be explicit for clarity 
    res.status(200)
    .json(response);
})



app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})