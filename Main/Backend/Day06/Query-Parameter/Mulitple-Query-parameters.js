import express from "express";
import {products} from '../Data.js';
const app = express();
app.use(express.json());

const PORT = 3000; 

// TODO Route Order 

app.get('/products',(req,res)=>{
    res.send(`Category is ${req.query.category}`);

})

app.get('/products',(req,res)=>{
    const category = req.query.category;
    const sort = req.query.sort;
    const page = req.query.page;

    res.json({
        category,
        sort,
        page
    });
});



 app.listen(PORT,(req,res)=>{
    console.log(`Server is running at ${PORT}`);
    
 })