import express from "express";

const app = express();
const PORT = 3000;
app.use(express.json());

app.use((req,res,next)=>{
    console.log(req.method,req.url);
    next();
});

const  adminOnly = (req,res,next) =>{
    const role = req.headers.role;

    if(role !== "admin"){
        return res.status(403).json({
            message:"Only admin can delete movies"
        });
    }
    next();
};

const products = [
  {
    id: 1,
    name: "iPhone 15",
    price: 70000,
    rating: 4.5,
    category: "mobile",
    inStock: true
  },
  {
    id: 2,
    name: "MacBook Air",
    price: 95000,
    rating: 4.8,
    category: "laptop",
    inStock: true
  },
  {
    id: 3,
    name: "Samsung TV",
    price: 45000,
    rating: 4.2,
    category: "tv",
    inStock: false
  }
];


// TODO : Home Route 

app.get("/",(req,res)=>{
    res.send("Product API is running ");
});




// TODO : Filer , Products Using Query Parameter 
// Filter Products Using Query Parameters
app.get("/products", (req, res) => {
    const { category, inStock ,search} = req.query;
    
    let filteredProducts = products;
    
    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category=== category;
        });
    }
    
    // Filter by stock availability
    if (inStock !== undefined) {
        const stockValue = inStock === "true";
        
        filteredProducts = filteredProducts.filter((product) => {
            return product.inStock === stockValue;
        });
    }
    if(search){
        filteredProducts = filteredProducts.filter((product)=>{
            return product.name
            .toLowerCase()
            .includes(search.toLowerCase());
        })
    }
    
    return res.status(200).json({
        total: filteredProducts.length,
        filteredProducts
    });
});

// TODO : GET All products 
app.get("/products",(req,res)=>{
    res.json(products);
});

// TODO : GET Single Products Using Route Parameter 
app.get("/products/:id",(req,res)=>{
    const id  = Number(req.params.id);
    const product = products.find((product)=> product.id === id);

    if(!product){
        return res.status(404).json({
            message:"Product is not found "
        });
    }

    return res.json({
        product
    });
})
// TODO 6 Search Product by Name Using Query Parameter 

app.get("/products",(req,res)=>{
    const {category,inStock,search} = req.query;

    let filteredProducts = products;

    if(category){
        filteredProducts = filteredProducts.filter((product)=>{
            return product.category === category;
        });
    }

    if(inStock){
        filteredProducts = filteredProducts.filter((product)=>{
            return product.inStock === (inStock === "true");
        });
    }
    if(search){
        filteredProducts = filteredProducts.filter((product)=>{
            return product.name.toLowerCase().includes(search.toLowerCase());
        });
    }
    res.json({filteredProducts});
});


// TODO Create Product Using POST 
app.post("/products",(req,res)=>{
    const newProduct = {
        id: products.length + 1, 
        name: req.body.name, 
        price: req.body.price,
        rating:req.body.rating,
        category: req.body.category,
        inStock: req.body.inStock
    };

    products.push(newProduct);

    res.status(201).json({
        message:
        "Product create successfully",
        product : newProduct
    });
});

// TODO Update Product Using Patch 
app.patch("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const product = products.find((product)=> product.id === id);

    if(!product){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    if(req.body.name !== undefined){
        product.name = req.body.name;
    }
    if(req.body.price !== undefined){
        product.price = req.body.price;
    }
    if(req.body.rating !== undefined){
        product.rating = req.body.rating;
    }
    if(req.body.category !== undefined){
        product.category = req.body.category;
    }
    if(req.body.inStock !== undefined){
        product.inStock = req.body.inStock;
    }
    res.json({
        message:"Product update successfully",
        product
    });
});



// TODO 9. Replace Product USING PUT
app.put("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = products.findIndex((product)=>{
        product.id == id
    });

    if(index === -1){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    const updateProduct = {
        id:id,
        name:req.body.name,
        price:req.body.price,
        rating:req.body.rating,
        category:req.body.category,
        inStock:req.body.inStock
    };

    products[index] = updateProduct;
    res.json({
        message:"Product replace successfully",
        product : updateProduct
    });
});

// TODO 10. Delete Product Using Delete 

app.delete("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = products.findIndex((products)=> products.id === id);

    if(index === -1){
        return res.status(404).json({
            message:"Product not found"
        });
    }

    const deletedProduct = products.splice(index,1);

    res.json({
        message:"Product deleted successfully",
        products: deletedProduct[0]
    });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});