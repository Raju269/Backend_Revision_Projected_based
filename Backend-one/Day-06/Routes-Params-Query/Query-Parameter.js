import express from 'express';
const app = express();
const PORT = 3000; 

app.use(express.json());

app.get("/product",(req,res)=>{
    res.send(`Category is ${req.query.category}`)
})

// Multiple Query parameter 
app.get("/products",(req,res)=>{
    const category = req.query.category;
    const price = req.query.price;
    const item = req.query.item;
    res.json({
        category,
        price,
        item
    })
})
app.listen(PORT,(req,res)=>{
    console.log(`server is running at ${PORT}`)
})