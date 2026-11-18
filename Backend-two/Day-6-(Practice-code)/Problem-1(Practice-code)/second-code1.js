import express from "express";
const app = express();

app.use(express.json())

const PORT = 3000; 

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


app.get('/',(req,res)=>{
    res.json({
        message:"Hello ji "
    })
})

// Example 1 : Single Parameter 
// app.get('/users/:id',(req,res)=>{
//     // Think : ": id " means this part is dynamic 
//     // URL /movies/1 -> req.params. id = "1",
//     // URL / movies/abc -> req.params.id = " abc"

//     // Think : what type is the ID? Strings 
//     // converted to number for array find 

//     const id = Number(req.params.id);

//     // Think : check if ID is valid Number 
//     //  "abc" => NAN, which will not match any movie 

//     if(isNaN(id)){
//         return res.status(400)
//         .json({
//             message: " Invalid ID format"
//         });
//     }

//     const user = users.find(m=> m.id === id);

//     if(!user){
//         reutrn 
//         res.status(404).json({
//             message:"Movie is not founded "
//         })

//     }

//     res.json(user);
// });

// Exmaple 2: Multiple Paramaters 
app.get("/users/:id/:email",(req,res)=>{
    // Think : Multiple dyanamic segments 
    // users/ 1/ raju.kmr.rudra@gmail.com => id: 1 , email : raju.krm.rudra@gmail.com 
    const id = Number(req.params.id);
    const email = req.params.email;

    // Think :Validate rnates 
    if(!id  || !email){
        return
        res.status(400)
        .json({
            message:"Enter valid id and email "
        })
    }
// find User matching both id and email 

    const user = users.find(user =>{
        user.id === id && user.email === email
    });

    // check if user exists 
    if(!user){
        return res.status(404)
        .json({
            message:"User not founed with give id and email "
        })
    }
    // Return user data 
    res.status(200).json(
        {
            id:user.id,
            name:user.name,
            email:user.email
        }
    )
})





app.listen(PORT,()=>{
    console.log(`server is running at ${PORT}`)
})