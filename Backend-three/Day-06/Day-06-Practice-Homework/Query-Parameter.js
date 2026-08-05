import express from "express";

const app = express;

app.use(express.json());

app.get('/product',(req,res)=>{
    res.send(`Product informaton ${req.query.category}`);
})

// 10. Multiple Query Parameters

app.get("/product",(req,res)=>{
    const category = req.query.category;
    const price = req.query.price;
    const page = req.query.page;

    res.json({
        category,
        price,
        page
    });
})

Server.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000`);
})