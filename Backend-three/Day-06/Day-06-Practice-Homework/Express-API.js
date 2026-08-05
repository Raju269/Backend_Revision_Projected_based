// Express Product API Example for Beginners
import express from "express";
const app = express();

app.use(express.json());

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

app.get("/", (req, res) => {
  res.send("Product API is running");
}); 

// 4. Get Single Product Using Route Parameter
app.get("/products", (req, res) => {
  res.json(products);
});

app.get("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  res.json(product);
});

// 5. Filter Products Using Query Parameter
app.get("/products", (req, res) => {
  const { category, inStock } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === category;
    });
  }

  if (inStock) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.inStock === (inStock === "true");
    });
  }

  res.json(filteredProducts);
});

app.get("/products", (req, res) => {
  const { category, inStock } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === category;
    });
  }

  if (inStock) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.inStock === (inStock === "true");
    });
  }

  res.json(filteredProducts);
});


// 6. Search Product by Name Using Query Parameter
app.get("/products", (req, res) => {
  const { category, inStock, search } = req.query;

  let filteredProducts = products;

  if (category) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.category === category;
    });
  }

  if (inStock) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.inStock === (inStock === "true");
    });
  }

  if (search) {
    filteredProducts = filteredProducts.filter((product) => {
      return product.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  res.json(filteredProducts);
});

// POST 
app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
    category: req.body.category,
    inStock: req.body.inStock
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
});

// 7. Create Product Using POST

app.post("/products", (req, res) => {
  const newProduct = {
    id: products.length + 1,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
    category: req.body.category,
    inStock: req.body.inStock
  };

  products.push(newProduct);

  res.status(201).json({
    message: "Product created successfully",
    product: newProduct
  });
});


// 8. Update Product Using PATCH

app.patch("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const product = products.find((product) => product.id === id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  if (req.body.name !== undefined) {
    product.name = req.body.name;
  }

  if (req.body.price !== undefined) {
    product.price = req.body.price;
  }

  if (req.body.rating !== undefined) {
    product.rating = req.body.rating;
  }

  if (req.body.category !== undefined) {
    product.category = req.body.category;
  }

  if (req.body.inStock !== undefined) {
    product.inStock = req.body.inStock;
  }

  res.json({
    message: "Product updated successfully",
    product
  });
});  

// 9. Replace Product Using PUT
app.put("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const updatedProduct = {
    id: id,
    name: req.body.name,
    price: req.body.price,
    rating: req.body.rating,
    category: req.body.category,
    inStock: req.body.inStock
  };

  products[index] = updatedProduct;

  res.json({
    message: "Product replaced successfully",
    product: updatedProduct
  });
});

// 10. Delete Product Using DELETE
app.delete("/products/:id", (req, res) => {
  const id = Number(req.params.id);

  const index = products.findIndex((product) => product.id === id);

  if (index === -1) {
    return res.status(404).json({
      message: "Product not found"
    });
  }

  const deletedProduct = products.splice(index, 1);

  res.json({
    message: "Product deleted successfully",
    product: deletedProduct[0]
  });
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});