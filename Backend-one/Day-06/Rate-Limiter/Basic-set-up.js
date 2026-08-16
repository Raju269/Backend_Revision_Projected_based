import express from "express";

const app = express();

app.use(express.json());
app.use((req, res, next) => {
    console.log(req.method, req.url);
    next();
});

const adminOnly = (req, res, next) => {
    const role = req.headers.role;

    if (role !== "admin") {
        return res.status(403).json({
            message: "Only admin can delete movies"
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
  ,
   {    id:4,
        name: "iPhone 15",
        price : 30000,
        rating:3.4,
        category: "electronics",
        inStock: true
    },
    {   id : 5,
        name: "Samsung Galaxy",
        price : 30000,
        rating:3.4,
        category: "electronics",
        inStock: false
    },
    {   id:6,
        name: "Nike Shoes",
        price : 30000,
        rating:3.4,
        category: "fashion",
        inStock: true
    },
    {   id : 7,
        name: "Laptop",
        price : 30000,
        rating:3.4,
        category: "electronics",
        inStock: true
    }
];

// HOme Route
app.get("/",(req,res)=>{
    res.send("Product API is running ");
})

// Get all products + query filtering

// Query parameter 
// app.get("/products", (req, res) => {
//     const { category, inStock } = req.query;
//     let filteredProduct = products;

//     if (category) {
//         filteredProduct = filteredProduct.filter((product) => {
//             return product.category === category;
//         });
//     }
    
//     if (inStock !== undefined) {
//         // Convert string to boolean
//         const inStockBoolean = inStock === 'true';
//         filteredProduct = filteredProduct.filter((product) => {
//             return product.inStock === inStockBoolean;
//         });
//     }
    
//     res.json(filteredProduct);
// });



// Search Query paramter 
app.get("/products", (req, res) => {
    const { category, inStock, search } = req.query;

    let filteredProducts = products;

    // Filter by category
    if (category) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category === category;
        });
    }

    // Filter by stock
    if (inStock !== undefined) {
        const inStockBoolean = inStock === "true";

        filteredProducts = filteredProducts.filter((product) => {
            return product.inStock === inStockBoolean;
        });
    }

    // Search by product name
   // Search
    if (search) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }

    res.json(filteredProducts);

});
app.get("/products",(req,res)=>{
    res.json(products);
})

// Route parameter and params
app.get("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const product = products.find((product)=>product.id === id);
    if(!product){
        return res.status(404).json({
            message:"Product is not found"
        })
    }
    res.json(product);
})

app.get("/products", (req, res) => {
    const { category, inStock, search } = req.query;

    let filteredProducts = products;

    // Category
    if (category) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category === category;
        });
    }

    // InStock
    if (inStock) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.inStock === (inStock === "true");
        });
    }

    // Search
    if (search) {
        filteredProducts = filteredProducts.filter((product) => {
            return product.name
                .toLowerCase()
                .includes(search.toLowerCase());
        });
    }

    res.json(filteredProducts);
});
// Create product using post method
app.post("/products",(req,res)=>{
    const newProducts = {
        id: products.length+1,
        name: req.body.name,
        price : req.body.price,
        category : req.body.category,
        inStock : req.body.inStock
    };
    products.push(newProducts);
    res.status(201).json({
        message:"Product is create successfully ",
        products:newProducts
    })
})

// Update Product using Patch 
app.patch("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const product = products.find((product)=>product.id === id);

    if(!product){
       return res.status(404).json({
            message:"User is not found",
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
        products
    });
});

// Replace Product using put method 
app.put("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = products.find((product)=>product.id==id);
    if(index === -1){
        return res.status(404).json({
            message:"User is not found"
        });
    }

    const updateProduct = {
        id:id,
        name:req.body.name,
        price:req.body.price,
        category:req.body.category,
        inStock:req.body.inStock,
        rating:req.body.rating
    }
    products[index] = updateProduct;
    res.json({
        message:"Product are update successfull",
        products:updateProduct
    })
})

// Delete Product using Delete method 
app.delete("/products/:id",(req,res)=>{
    const id = Number(req.params.id);

    const index = products.findIndex((product)=>product.id === id);
    if(index === -1){
        return res.status(404).json({
            message:"User is not found"
        })
    }
    const deleteProduct = products.splice(index,1);
    res.json({
        message:"Product deleted successfull",
        product:deleteProduct[0]
    });
});


// Bonus Task 1 
// Routes
app.get("/movies", (req, res) => {
    res.json(movies);
});

app.post("/movies", (req, res) => {
    res.json({
        message: "Movie created"
    });
});

app.patch("/movies/:id", (req, res) => {
    res.json({
        message: "Movie updated"
    });
});

app.delete("/movies/:id", (req, res) => {
    res.json({
        message: "Movie deleted"
    });
});

// Bonus task 2 


app.listen(3000, () => {
  console.log("Server started on port 3000");


// Protected route
app.delete("/movies/:id", adminOnly, (req, res) => {

    res.json({
        message: `Movie ${req.params.id} deleted`
    });

});
});
