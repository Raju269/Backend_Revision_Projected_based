import express from "express";
const app = express();
app.use(express.json());
const user = {
    
}
app.get("/",(req,res)=>{
    res.end("Hello ji ");
})

// Example 1 : Single Route Parameter 
app.get("/user/:id",(req,res)=>{
    // Think : User want One specfific move 
    // URL : /Users/4
    // req.params.id = "5" (string) hum phale string ko converted karan hoga number mai 

    // Think : Display What's in req.params 
    console.log(req.params);
    // output : {id: " 5"}
    // Think : converted to number becuase our IDs are Numbers 
    const UserId = Number(req.params.id);
    // UserId = 5 (Number);

    const user = user.find(u=>u.id === UserId);

    // if nhi hu tu edge case likha 
    if(!move){
        return 
        res.status(404)
        .json({
            message:"User is not founed "
        });
    }
    res.status(200).json({
        message:"You are learn succcessfully "
    })
})

// Example 2 :  Multiple Route Parameters 
app.get("/Users/:year/months",(req,res)=>{
// Think : Filter movies by year and months 
// URL : / Users/2025/09

console.log(req.params);
// output : {Year : 2025, months 09};
// Think Both are strings, converted as needed 
const year = Number(req.params.year);
const months = Number(req.params.months);

const filteredUsers = users.filter(user => {
    return user.releasYear === year;
    // could also filter by month if we had that data 
    res.json(filteredUsers);
})

})

// Example 3 : Optimal Parameter Pattern 
// URL : /movies/:id ? (opitianl params - not native Express, needs workaroun)

// Real example with mulitple parmas 
// app.get("/compare/:user1/:user2",(req,res)=>{
//     // Think : compare two movies 
//     // URL : / compare / 1/5 
//     const {UserId1, UserId2} = req.params;
//     // UserID1 : "1" , UserID2 = " 5"

//     const user1 = user.filter(m=>m.id === Number(UserId1));
//     const user2 = user.filter(m=>m.id === Number(user2))
// });

// if(!user1 || !user2){
//     return res.status(404).json({
//         messsage:"One or both movies not found"
//     });
// }

// res.json({
//     user1,
//     user2, 
//     comparison:{
//         ratingDifference: user1-user2.rat
//     }
// })


app.listen(3000,(req,res)=>{
    console.log(`server is running at PORT 3000`)
})