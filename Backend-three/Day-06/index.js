import express from "express";
import { products } from "./data.js";

const app = express();
app.use(express.json());

app.get('/',(req,res)=>{
    res.end("Hello ji kaise hai sab");
})

// app.get("/products",(req,res)=>{
//     res.json(products);
// }) 

// app.get("/products/3",(req,res)=>{
//     res.json(products[3]);
// })
//  products / 1 
//  products / 2 
//  products / 3 
//  products / 4 ka baar karan padha rha hai easy used 
// Route parameter:

app.get("/products/:id",(req,res)=>{
    // const index = req.params.id;
    // res.send(index); //last value of localhost :3000/ka baad print ho jha gha

    // res.send(products[index-1]); 

    // phale print karo leo page no.res.send(product[index-1]ko phir)
    const id = Number(req.params.id);
    const p = products.find((p1) =>  p1.id === id);

    if(p){
        res.json(p);
    }
    else{
        res.status(404).json({
            message: "Product not found"
        });    }
})

// Query : parameter : for filter the url /add?num1=15&num2=13
// only filter data to fetch single value 
// single information ka liya 
// app.get("/products",(req,res)=>{
//     console.log(req.query);
//     // res.send("Hello ji");
//     const price = req.query.price;
//     // filter data ka important sa smajh ok 
//     const filterData = products.filter((p)=>p.price>=price);
//     res.json(filterData);
// })

// Query: paramter : used for multiple filter apply the url ok 

app.get("/products",(req,res)=>{

    const {price,rating, category, brand, instock} = req.query;

    let filterData = products;

    if(price){
        filterData = filterData.filter((p)=>p.price>=price);
    }
    if(rating){
        filterData = filterData.filter((p)=>p.rating>=rating);
    }
   if(category){
        filterData = filterData.filter((p)=> p.category==category);
    }
    if(brand){
        filterData = filterData.filter((p)=> p.brand==brand);
    }
      if (instock) {
        const stock = instock === "true";
        filterData = filterData.filter((p) => p.instock === stock);
    }


    res.json(filterData);
    
})

// post the data and inserted the data form the database

app.post("/products",(req,res)=>{
    products.push(req.body);
    res.send(req.body);
})


// delete the data for and user information 

app.delete("/products/:id",(req,res)=>{
    const id = req.params.id;
    const index = products.findIndex((p1)=>p1.id==id);
    if(index>=0){
        const p = products.splice(index,1);
        res.json(p);
    }
    else{
        res.send("Product is not found ")
    }
})


app.patch("/product",(req,res)=>{
    const data = req.body;
    const fetchprdouct = products.find((p)=>p.id==data.id);
    if(fetchprdouct){
        Object.assign(fetchprdouct,data);
        res.send("Product is update successfully");
    }
    else{
        res.send("Product doesn't exits");
    }
})




app.listen(3000,()=>{
    console.log(`Server is Running at port 3000`);
})