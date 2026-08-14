import express from 'express';
const app = express();
const PORT = 3000; 
app.use(express.json());

app.use((req,res,next)=>{
    console.log("All Requested come here ")
    next();
})
app.use((req,res,next)=>{
    return res.status(403).json({
        message:"Blocked"
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
})