#   Lecture 06 : Express and Middleware
# Routes, Middleware, `app.use`, `app.get`, Route Params, Query Params

Express is a backend framework for Node.js.

It helps us create APIs like:

```jsx
GET /users
POST /users
GET /users/10
GET /products?category=mobile
```

At the core, Express does this:

```
Request comes from client
↓
Express checks middleware/routes
↓
Matched function runs
↓
Response goes back to client
```

---

# 1. Basic Express Server

```jsx
const express = require("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

When we open:

```
GET /
```

Response:

```
Server is running
```

---

# 2. What is `req` and `res`?

Every route handler gets two important objects:

```jsx
(req, res) => {

}
```

## `req`

`req` means request.

It contains data coming from client.

Examples:

```jsx
req.params
req.query
req.body
req.headers
```

## `res`

`res` means response.

It is used to send data back to client.

Examples:

```jsx
res.send("Hello");
res.json({ message: "Success" });
res.status(404).json({ message: "Not found" });
```

---

# 3. What is `app.get()`?

`app.get()` is used to handle GET request.

GET request is usually used to fetch/read data.

Example:

```jsx
app.get("/users", (req, res) => {
  res.send("All users");
});
```

Meaning:

```
If request method is GET
and URL path is /users
then run this function
```

So:

```
GET /users
```

Response:

```
All users
```

---

# 4. Route Means Method + Path

A route is not only URL.

A route is:

```
HTTP Method + URL Path
```

Example:

```jsx
app.get("/users", (req, res) => {
  res.send("Get all users");
});

app.post("/users", (req, res) => {
  res.send("Create new user");
});
```

Both have same path:

```
/users
```

But different methods:

```
GET /users   → fetch users
POST /users  → create user
```

So they are different routes.

---

# 5. `app.get("/user")` vs `/user/rohit`

This route:

```jsx
app.get("/user", (req, res) => {
  res.send("User route");
});
```

will handle:

```
GET /user
```

But it will not handle:

```
GET /user/rohit
```

Because `/user` and `/user/rohit` are different paths.

To handle `/user/rohit`, we need route parameter.

---

# 6. Route Parameter

Route parameter makes one part of the URL dynamic.

Example:

```jsx
app.get("/user/:name", (req, res) => {
  res.send(`User name is ${req.params.name}`);
});
```

Here:

```
:name
```

is dynamic.

So this one route can handle:

```
/user/rohit
/user/aman
/user/raj
```

For request:

```
GET /user/rohit
```

Express stores:

```jsx
req.params.name
```

as:

```
rohit
```

Response:

```
User name is rohit
```

---

# 7. Route Parameter Example with ID

```jsx
app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});
```

Requests:

```
GET /users/1    → User id is 1
GET /users/10   → User id is 10
GET /users/abc  → User id is abc
```

Here `:id` means:

```
This part can be anything
```

But only one path segment.

This matches:

```
/users/10
```

But not:

```
/users/10/profile
```

For that, we need:

```jsx
app.get("/users/:id/profile", (req, res) => {
  res.send(`Profile of user ${req.params.id}`);
});
```

---

# 8. Route Order

Express checks routes from top to bottom.

Example:

```jsx
app.get("/users", (req, res) => {
  res.send("All users");
});

app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});
```

For:

```
GET /users
```

Response:

```
All users
```

For:

```
GET /users/10
```

Response:

```
User id is 10
```

Even if we reverse these two, it still works:

```jsx
app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});

app.get("/users", (req, res) => {
  res.send("All users");
});
```

Because `/users/:id` does not match `/users`.

But order matters in cases like this:

```jsx
app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});

app.get("/users/admin", (req, res) => {
  res.send("Admin user");
});
```

Request:

```
GET /users/admin
```

Express matches first route:

```
/users/:id
```

So:

```jsx
req.params.id
```

becomes:

```
admin
```

The `/users/admin` route will not run.

Correct order:

```jsx
app.get("/users/admin", (req, res) => {
  res.send("Admin user");
});

app.get("/users/:id", (req, res) => {
  res.send(`User id is ${req.params.id}`);
});
```

Rule:

```
Specific routes first
Dynamic routes later
```

---

# 9. Query Parameter

Query parameter is extra data after `?` in URL.

Example:

```
/products?category=mobile
```

Break it:

```
/products          → path
?                  → query starts
category=mobile    → query parameter
```

In Express:

```jsx
app.get("/products", (req, res) => {
  res.send(`Category is ${req.query.category}`);
});
```

Request:

```
GET /products?category=mobile
```

Response:

```
Category is mobile
```

---

# 10. Multiple Query Parameters

URL:

```
/products?category=mobile&sort=price&page=2
```

Here:

```
category = mobile
sort = price
page = 2
```

Express code:

```jsx
app.get("/products", (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;
  const page = req.query.page;

  res.json({
    category,
    sort,
    page
  });
});
```

Response:

```json
{
  "category": "mobile",
  "sort": "price",
  "page": "2"
}
```

Important:

```
? starts query
& separates multiple query parameters
```

---

# 11. Route Parameter vs Query Parameter

This is the most important difference.

## Route Parameter

Use route parameter when you want one exact resource.

```
/users/10
/products/5
/videos/abc123
/orders/99
```

Meaning:

```
Give me this exact user/product/video/order
```

Example:

```jsx
app.get("/users/:id", (req, res) => {
  res.send(`Exact user id is ${req.params.id}`);
});
```

## Query Parameter

Use query parameter when you want filter, search, sort, or pagination.

```
/users?city=delhi
/products?category=mobile
/videos?search=dp
/products?page=2&limit=10
```

Meaning:

```
Give me a list, but apply this condition
```

Example:

```jsx
app.get("/users", (req, res) => {
  res.send(`Users from city ${req.query.city}`);
});
```

---

# 12. Simple Rule

```
Route param = main identity
Query param = extra condition
```

Example:

```
/users/10
```

Means:

```
Give me exact user 10
```

So use route param.

```
/users?city=delhi
```

Means:

```
Give me users, but only from Delhi
```

So use query param.

Another rule:

```
If removing the value makes the URL lose its main meaning → route param
If removing the value still gives a valid list/page → query param
```

Example:

```
/products/10
```

Remove `10`:

```
/products
```

Meaning changes from exact product to all products.

So `10` should be route param.

Example:

```
/products?category=mobile
```

Remove query:

```
/products
```

Still valid. It just means all products.

So `category=mobile` should be query param.

---

# 13. What is Middleware?

Middleware is a function that runs between request and final route handler.

Flow:

```
Request
↓
Middleware
↓
Route Handler
↓
Response
```

Middleware has three parameters:

```jsx
(req, res, next) => {

}
```

Example:

```jsx
function logger(req, res, next) {
  console.log("Request came");
  next();
}
```

`next()` means:

```
My work is done, move to next middleware or route
```

---

# 14. What is `app.use()`?

`app.use()` is used to register middleware.

Important:

```
app.use is not middleware
app.use registers middleware
```

Example:

```jsx
app.use((req, res, next) => {
  console.log("Middleware running");
  next();
});
```

Here:

```
app.use       → registers middleware
function      → actual middleware
```

This middleware runs before routes.

```jsx
app.use((req, res, next) => {
  console.log("Request came");
  next();
});

app.get("/users", (req, res) => {
  res.send("All users");
});
```

Request:

```
GET /users
```

Flow:

```
Middleware runs
↓
GET /users route runs
↓
Response sent
```

---

# 15. Why `next()` is important

Wrong:

```jsx
app.use((req, res, next) => {
  console.log("Request came");
});
```

Here we did not call `next()` and did not send response.

So request gets stuck.

Correct:

```jsx
app.use((req, res, next) => {
  console.log("Request came");
  next();
});
```

Or middleware can stop request by sending response:

```jsx
app.use((req, res, next) => {
  return res.status(403).json({
    message: "Blocked"
  });
});
```

In this case, route handler will not run.

---

# 16. `app.use(express.json())`

This is common:

```jsx
app.use(express.json());
```

It means:

```
Before routes run, parse JSON request body
and put it inside req.body
```

Example:

```jsx
app.use(express.json());

app.post("/users", (req, res) => {
  console.log(req.body);
  res.send("User created");
});
```

Client sends:

```json
{
  "name": "Rohit",
  "age": 25
}
```

Express gives:

```jsx
req.body
```

as:

```jsx
{
  name: "Rohit",
  age: 25
}
```

So we can write:

```jsx
req.body.name
```

Output:

```
Rohit
```

We do not write `next()` here because `express.json()` already has `next()` internally.

Conceptually, it is like this:

```jsx
app.use((req, res, next) => {
  // read JSON body
  // convert JSON string into JS object
  // store it in req.body

  next();
});
```

---

# 17. `app.use("/")`

This:

```jsx
app.use("/", (req, res, next) => {
  console.log("Root middleware");
  next();
});
```

runs for all paths:

```
/
 /users
 /products
 /users/10
```

Because `/` is the root path.

Usually we write:

```jsx
app.use((req, res, next) => {
  console.log("Runs for all routes");
  next();
});
```

This is same as mounting middleware from root.

---

# 18. `app.use("/user")`

This:

```jsx
app.use("/user", (req, res, next) => {
  console.log("User middleware");
  next();
});
```

runs for:

```
/user
/user/rohit
/user/123/profile
```

But not for:

```
/
 /products
 /users
 /usersji
 /user123
```

Important:

```
app.use("/user") does not mean normal string startsWith("/user")
```

It means:

```
Match /user as a path segment
```

So:

```
/user/rohit  ✅ match
/usersji     ❌ no match
/user123     ❌ no match
```

Tree view:

```
/
├── user
│   ├── rohit
│   └── settings
├── users
├── usersji
├── user123
└── products
```

`app.use("/user")` only works inside the `/user` branch.

---

# 19. `app.get()` vs `app.use()`

## `app.get()`

```jsx
app.get("/user", handler);
```

Handles only:

```
GET /user
```

It does not handle:

```
GET /user/rohit
```

## `app.use()`

```jsx
app.use("/user", middleware);
```

Runs for:

```
/user
/user/rohit
/user/settings
```

And it works for all methods:

```
GET /user
POST /user
PATCH /user
DELETE /user
```

Simple difference:

```
app.get("/user")  → exact GET route
app.use("/user")  → middleware for /user branch
```

---

# 20. Protected Routes Using Middleware

Middleware can protect routes.

Example:

```jsx
function checkLogin(req, res, next) {
  const isLoggedIn = true;

  if (!isLoggedIn) {
    return res.status(401).json({
      message: "Please login first"
    });
  }

  next();
}
```

Use it on one route:

```jsx
app.get("/profile", checkLogin, (req, res) => {
  res.send("Profile page");
});
```

Flow:

```
GET /profile
↓
checkLogin middleware runs
↓
If not logged in → response sent
↓
If logged in → next()
↓
profile route runs
```

Use it on a group:

```jsx
app.use("/admin", checkLogin);

app.get("/admin/dashboard", (req, res) => {
  res.send("Admin dashboard");
});

app.get("/admin/users", (req, res) => {
  res.send("Admin users");
});
```

Now every `/admin` route is protected.

---

# 21. Rate Limiter Middleware

Rate limiter is also middleware.

It controls how many requests a user can send in a fixed time.

Example:

```jsx
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000,
  max: 100,
  message: "Too many requests"
});
```

Use globally:

```jsx
app.use(limiter);
```

Now it runs for every route.

Use for one route:

```jsx
app.post("/login", limiter, (req, res) => {
  res.send("Login route");
});
```

Use for a group:

```jsx
app.use("/api", limiter);
```

Now it runs for:

```
/api/users
/api/products
/api/orders
```

Simple rule:

```
Common protection for all routes → app.use(limiter)
Protection for one route → app.post("/login", limiter, handler)
Protection for group → app.use("/admin", limiter)
```

---

# 22. Sending Response

We use `res` to send response.

## Text response

```jsx
app.get("/", (req, res) => {
  res.send("Hello");
});
```

## JSON response

```jsx
app.get("/user", (req, res) => {
  res.json({
    name: "Rohit",
    age: 25
  });
});
```

## Status code with JSON

```jsx
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  if (id !== "1") {
    return res.status(404).json({
      message: "User not found"
    });
  }

  res.status(200).json({
    id: 1,
    name: "Rohit"
  });
});
```

Important:

```
Send only one response per request
```

Wrong:

```jsx
app.get("/test", (req, res) => {
  res.send("Hello");
  res.send("World");
});
```

Correct:

```jsx
app.get("/test", (req, res) => {
  res.send("Hello");
});
```

Use `return` when stopping early:

```jsx
app.get("/users/:id", (req, res) => {
  if (req.params.id !== "1") {
    return res.status(404).send("User not found");
  }

  res.send("User found");
});
```

---

# 23. Complete Example

```jsx
const express = require("express");

const app = express();

// Middleware to parse JSON body
app.use(express.json());

// Global middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Home route
app.get("/", (req, res) => {
  res.send("Server is running");
});

// Query parameter example
app.get("/products", (req, res) => {
  const category = req.query.category;
  const sort = req.query.sort;

  res.json({
    message: "Products fetched",
    category,
    sort
  });
});

// Route parameter example
app.get("/users/:id", (req, res) => {
  const id = req.params.id;

  res.json({
    message: "User fetched",
    id
  });
});

// POST request with body
app.post("/users", (req, res) => {
  const name = req.body.name;

  res.status(201).json({
    message: "User created",
    name
  });
});

// Middleware for admin routes
function checkAdmin(req, res, next) {
  const isAdmin = true;

  if (!isAdmin) {
    return res.status(403).json({
      message: "Only admin allowed"
    });
  }

  next();
}

app.use("/admin", checkAdmin);

app.get("/admin/dashboard", (req, res) => {
  res.send("Admin dashboard");
});

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

---

# 24. Final Mental Model

Express is a pipeline.

```
Request comes
↓
Global middleware
↓
Path-specific middleware
↓
Route handler
↓
Response goes back
```

`app.get()` handles GET routes.

`app.post()` handles POST routes.

`app.patch()` handles PATCH routes.

`app.delete()` handles DELETE routes.

`app.use()` registers middleware.

Route params are used for exact resource identity.

Query params are used for filters/search/sort/pagination.

Middleware is used for common work like:

```
JSON parsing
logging
authentication
authorization
rate limiting
CORS
error handling
```

Core line:

```
Route handler sends final response.
Middleware does work before route handler and decides whether request should continue or stop.
```

Example

# Express Product API Example for Beginners

## Goal

We will create a simple Product API using Express.

For now, we will not use MongoDB or database.

We will store products inside an array.

This array is our temporary/fake database.

---

# 1. Basic Setup

```jsx
const express = require("express");

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

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
```

Important line:

```jsx
app.use(express.json());
```

This allows Express to read JSON body from POST, PUT, and PATCH requests.

---

# 2. Home Route

```jsx
app.get("/", (req, res) => {
  res.send("Product API is running");
});
```

Request:

```
GET /
```

Response:

```
Product API is running
```

---

# 3. Get All Products

```jsx
app.get("/products", (req, res) => {
  res.json(products);
});
```

Request:

```
GET /products
```

Response:

```json
[
  {
    "id": 1,
    "name": "iPhone 15",
    "price": 70000,
    "rating": 4.5,
    "category": "mobile",
    "inStock": true
  },
  {
    "id": 2,
    "name": "MacBook Air",
    "price": 95000,
    "rating": 4.8,
    "category": "laptop",
    "inStock": true
  }
]
```

Teaching point:

```
/products means give me all products.
```

---

# 4. Get Single Product Using Route Parameter

Now suppose user wants only one product.

Example:

```
/products/1
/products/2
/products/3
```

Here `1`, `2`, `3` are dynamic values.

So we use route parameter.

```jsx
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
```

Request:

```
GET /products/1
```

Response:

```json
{
  "id": 1,
  "name": "iPhone 15",
  "price": 70000,
  "rating": 4.5,
  "category": "mobile",
  "inStock": true
}
```

Teaching point:

```
/products/:id means get one exact product.
```

Here:

```jsx
req.params.id
```

gets value from URL.

For:

```
/products/1
```

`req.params.id` is:

```
"1"
```

Since route params come as string, we convert it:

```jsx
const id = Number(req.params.id);
```

---

# 5. Filter Products Using Query Parameter

Now suppose user does not want one exact product.

They want products with some condition.

Example:

```
/products?category=mobile
/products?rating=4.5
/products?inStock=true
```

This is query parameter.

```jsx
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
```

Request:

```
GET /products?category=mobile
```

Meaning:

```
Give me products, but only mobile category.
```

Request:

```
GET /products?inStock=true
```

Meaning:

```
Give me products which are in stock.
```

Important teaching point:

```
Route parameter = exact product
Query parameter = filter/search/sort products
```

But note: now we already have one `GET /products` route earlier.

So replace the old one with this improved version:

```jsx
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
```

---

# 6. Search Product by Name Using Query Parameter

We can also search by product name.

URL:

```
/products?search=iphone
```

Code:

```jsx
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
```

Request:

```
GET /products?search=iphone
```

Meaning:

```
Search products whose name contains iphone.
```

---

# 7. Create Product Using POST

To create a new product, use POST.

```jsx
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
```

Request:

```
POST /products
```

Body:

```json
{
  "name": "AirPods",
  "price": 20000,
  "rating": 4.4,
  "category": "earbuds",
  "inStock": true
}
```

Response:

```json
{
  "message": "Product created successfully",
  "product": {
    "id": 4,
    "name": "AirPods",
    "price": 20000,
    "rating": 4.4,
    "category": "earbuds",
    "inStock": true
  }
}
```

Teaching point:

```
POST is used to create new data.
```

---

# 8. Update Product Using PATCH

PATCH means update only selected fields.

Suppose current product is:

```json
{
  "id": 1,
  "name": "iPhone 15",
  "price": 70000,
  "rating": 4.5,
  "category": "mobile",
  "inStock": true
}
```

Request:

```
PATCH /products/1
```

Body:

```json
{
  "price": 65000
}
```

Only price should update.

Code:

```jsx
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
```

Teaching point:

```
PATCH updates only fields sent by client.
```

---

# 9. Replace Product Using PUT

PUT means replace the full product.

In PUT, client should send complete product data.

```jsx
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
```

Request:

```
PUT /products/1
```

Body:

```json
{
  "name": "iPhone 15 Pro",
  "price": 120000,
  "rating": 4.9,
  "category": "mobile",
  "inStock": true
}
```

Teaching point:

```
PUT replaces the full object.
PATCH updates only selected fields.
```

---

# 10. Delete Product Using DELETE

```jsx
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
```

Request:

```
DELETE /products/1
```

Response:

```json
{
  "message": "Product deleted successfully",
  "product": {
    "id": 1,
    "name": "iPhone 15",
    "price": 70000,
    "rating": 4.5,
    "category": "mobile",
    "inStock": true
  }
}
```

Teaching point:

```
DELETE is used to remove data.
```

---

# 11. Final Complete Code

```jsx
const express = require("express");

const app = express();

app.use(express.json());

let products = [
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
```

---

# 12. Teaching Order

Teach it in this order:

## Step 1

Create Express server.

## Step 2

Create products array.

## Step 3

Teach:

```
GET /products
```

to fetch all products.

## Step 4

Teach route parameter:

```
GET /products/:id
```

to fetch one product.

## Step 5

Teach query parameter:

```
GET /products?category=mobile
GET /products?search=iphone
```

to filter/search products.

## Step 6

Teach POST:

```
POST /products
```

to create product.

## Step 7

Teach PATCH:

```
PATCH /products/:id
```

to partially update product.

## Step 8

Teach PUT:

```
PUT /products/:id
```

to replace full product.

## Step 9

Teach DELETE:

```
DELETE /products/:id
```

to delete product.

---

# 13. Final Mapping

```
GET /products
Get all products

GET /products/1
Get product with id 1

GET /products?category=mobile
Get all mobile products

GET /products?search=iphone
Search products by name

POST /products
Create new product

PATCH /products/1
Update some fields of product 1

PUT /products/1
Replace full product 1

DELETE /products/1
Delete product 1
```

---

# 14. Final Teaching Line

For beginners, say this:

```
Right now, our array is acting like a database.
Every API is just reading, adding, updating, or deleting objects from this array.

Later, when we learn MongoDB, we will replace array operations with database operations.
But Express routing will stay almost the same.
```

# Express Assignment: Movie API

## Goal

Create a simple Movie API using Express.

You will not use any database.

Store all movies inside an array.

This array will act like a temporary database.

---

# Movie Data Format

Each movie should be an object like this:

```jsx
export let movies = [
  {
    id: 1,
    title: "3 Idiots",
    genre: "comedy",
    language: "hindi",
    rating: 4.8,
    releaseYear: 2009,
    duration: 170,
    availableOnOTT: true
  },
  {
    id: 2,
    title: "Dangal",
    genre: "sports",
    language: "hindi",
    rating: 4.7,
    releaseYear: 2016,
    duration: 161,
    availableOnOTT: true
  },
  {
    id: 3,
    title: "Lagaan",
    genre: "sports",
    language: "hindi",
    rating: 4.6,
    releaseYear: 2001,
    duration: 224,
    availableOnOTT: true
  },
  {
    id: 4,
    title: "Sholay",
    genre: "action",
    language: "hindi",
    rating: 4.8,
    releaseYear: 1975,
    duration: 204,
    availableOnOTT: true
  },
  {
    id: 5,
    title: "Gully Boy",
    genre: "drama",
    language: "hindi",
    rating: 4.2,
    releaseYear: 2019,
    duration: 153,
    availableOnOTT: true
  },
  {
    id: 6,
    title: "Queen",
    genre: "drama",
    language: "hindi",
    rating: 4.4,
    releaseYear: 2013,
    duration: 146,
    availableOnOTT: true
  },
  {
    id: 7,
    title: "Andhadhun",
    genre: "thriller",
    language: "hindi",
    rating: 4.5,
    releaseYear: 2018,
    duration: 139,
    availableOnOTT: true
  },
  {
    id: 8,
    title: "Drishyam",
    genre: "thriller",
    language: "hindi",
    rating: 4.4,
    releaseYear: 2015,
    duration: 163,
    availableOnOTT: true
  },
  {
    id: 9,
    title: "Drishyam 2",
    genre: "thriller",
    language: "hindi",
    rating: 4.3,
    releaseYear: 2022,
    duration: 140,
    availableOnOTT: true
  },
  {
    id: 10,
    title: "Swades",
    genre: "drama",
    language: "hindi",
    rating: 4.6,
    releaseYear: 2004,
    duration: 189,
    availableOnOTT: true
  },
  {
    id: 11,
    title: "Chak De India",
    genre: "sports",
    language: "hindi",
    rating: 4.5,
    releaseYear: 2007,
    duration: 153,
    availableOnOTT: true
  },
  {
    id: 12,
    title: "Taare Zameen Par",
    genre: "drama",
    language: "hindi",
    rating: 4.7,
    releaseYear: 2007,
    duration: 165,
    availableOnOTT: true
  },
  {
    id: 13,
    title: "PK",
    genre: "comedy",
    language: "hindi",
    rating: 4.3,
    releaseYear: 2014,
    duration: 153,
    availableOnOTT: true
  },
  {
    id: 14,
    title: "Barfi",
    genre: "romance",
    language: "hindi",
    rating: 4.2,
    releaseYear: 2012,
    duration: 151,
    availableOnOTT: true
  },
  {
    id: 15,
    title: "Zindagi Na Milegi Dobara",
    genre: "drama",
    language: "hindi",
    rating: 4.4,
    releaseYear: 2011,
    duration: 155,
    availableOnOTT: true
  },
  {
    id: 16,
    title: "Dil Chahta Hai",
    genre: "drama",
    language: "hindi",
    rating: 4.3,
    releaseYear: 2001,
    duration: 183,
    availableOnOTT: true
  },
  {
    id: 17,
    title: "Rockstar",
    genre: "romance",
    language: "hindi",
    rating: 4.1,
    releaseYear: 2011,
    duration: 159,
    availableOnOTT: true
  },
  {
    id: 18,
    title: "Kabir Singh",
    genre: "romance",
    language: "hindi",
    rating: 3.8,
    releaseYear: 2019,
    duration: 172,
    availableOnOTT: true
  },
  {
    id: 19,
    title: "War",
    genre: "action",
    language: "hindi",
    rating: 4.0,
    releaseYear: 2019,
    duration: 154,
    availableOnOTT: true
  },
  {
    id: 20,
    title: "Pathaan",
    genre: "action",
    language: "hindi",
    rating: 4.0,
    releaseYear: 2023,
    duration: 146,
    availableOnOTT: true
  },
  {
    id: 21,
    title: "Jawan",
    genre: "action",
    language: "hindi",
    rating: 4.2,
    releaseYear: 2023,
    duration: 169,
    availableOnOTT: true
  },
  {
    id: 22,
    title: "Animal",
    genre: "action",
    language: "hindi",
    rating: 3.9,
    releaseYear: 2023,
    duration: 201,
    availableOnOTT: true
  },
  {
    id: 23,
    title: "Stree",
    genre: "horror-comedy",
    language: "hindi",
    rating: 4.1,
    releaseYear: 2018,
    duration: 128,
    availableOnOTT: true
  },
  {
    id: 24,
    title: "Bhediya",
    genre: "horror-comedy",
    language: "hindi",
    rating: 3.8,
    releaseYear: 2022,
    duration: 156,
    availableOnOTT: true
  },
  {
    id: 25,
    title: "Kantara",
    genre: "thriller",
    language: "kannada",
    rating: 4.5,
    releaseYear: 2022,
    duration: 148,
    availableOnOTT: true
  },
  {
    id: 26,
    title: "KGF Chapter 1",
    genre: "action",
    language: "kannada",
    rating: 4.3,
    releaseYear: 2018,
    duration: 156,
    availableOnOTT: true
  },
  {
    id: 27,
    title: "KGF Chapter 2",
    genre: "action",
    language: "kannada",
    rating: 4.4,
    releaseYear: 2022,
    duration: 168,
    availableOnOTT: true
  },
  {
    id: 28,
    title: "RRR",
    genre: "action",
    language: "telugu",
    rating: 4.6,
    releaseYear: 2022,
    duration: 187,
    availableOnOTT: true
  },
  {
    id: 29,
    title: "Baahubali The Beginning",
    genre: "action",
    language: "telugu",
    rating: 4.5,
    releaseYear: 2015,
    duration: 159,
    availableOnOTT: true
  },
  {
    id: 30,
    title: "Baahubali The Conclusion",
    genre: "action",
    language: "telugu",
    rating: 4.7,
    releaseYear: 2017,
    duration: 167,
    availableOnOTT: true
  },
  {
    id: 31,
    title: "Pushpa",
    genre: "action",
    language: "telugu",
    rating: 4.1,
    releaseYear: 2021,
    duration: 179,
    availableOnOTT: true
  },
  {
    id: 32,
    title: "Arjun Reddy",
    genre: "romance",
    language: "telugu",
    rating: 4.0,
    releaseYear: 2017,
    duration: 182,
    availableOnOTT: true
  },
  {
    id: 33,
    title: "Vikram",
    genre: "action",
    language: "tamil",
    rating: 4.5,
    releaseYear: 2022,
    duration: 174,
    availableOnOTT: true
  },
  {
    id: 34,
    title: "Master",
    genre: "action",
    language: "tamil",
    rating: 4.0,
    releaseYear: 2021,
    duration: 179,
    availableOnOTT: true
  },
  {
    id: 35,
    title: "Super Deluxe",
    genre: "drama",
    language: "tamil",
    rating: 4.4,
    releaseYear: 2019,
    duration: 176,
    availableOnOTT: true
  },
  {
    id: 36,
    title: "Jai Bhim",
    genre: "drama",
    language: "tamil",
    rating: 4.8,
    releaseYear: 2021,
    duration: 164,
    availableOnOTT: true
  },
  {
    id: 37,
    title: "Asuran",
    genre: "action",
    language: "tamil",
    rating: 4.6,
    releaseYear: 2019,
    duration: 141,
    availableOnOTT: true
  },
  {
    id: 38,
    title: "Premam",
    genre: "romance",
    language: "malayalam",
    rating: 4.4,
    releaseYear: 2015,
    duration: 156,
    availableOnOTT: true
  },
  {
    id: 39,
    title: "Kumbalangi Nights",
    genre: "drama",
    language: "malayalam",
    rating: 4.6,
    releaseYear: 2019,
    duration: 135,
    availableOnOTT: true
  },
  {
    id: 40,
    title: "Drishyam Malayalam",
    genre: "thriller",
    language: "malayalam",
    rating: 4.7,
    releaseYear: 2013,
    duration: 160,
    availableOnOTT: true
  },
  {
    id: 41,
    title: "The Dark Knight",
    genre: "action",
    language: "english",
    rating: 4.9,
    releaseYear: 2008,
    duration: 152,
    availableOnOTT: true
  },
  {
    id: 42,
    title: "Inception",
    genre: "sci-fi",
    language: "english",
    rating: 4.8,
    releaseYear: 2010,
    duration: 148,
    availableOnOTT: true
  },
  {
    id: 43,
    title: "Interstellar",
    genre: "sci-fi",
    language: "english",
    rating: 4.9,
    releaseYear: 2014,
    duration: 169,
    availableOnOTT: true
  },
  {
    id: 44,
    title: "Avatar",
    genre: "sci-fi",
    language: "english",
    rating: 4.5,
    releaseYear: 2009,
    duration: 162,
    availableOnOTT: true
  },
  {
    id: 45,
    title: "Titanic",
    genre: "romance",
    language: "english",
    rating: 4.6,
    releaseYear: 1997,
    duration: 195,
    availableOnOTT: true
  },
  {
    id: 46,
    title: "The Matrix",
    genre: "sci-fi",
    language: "english",
    rating: 4.7,
    releaseYear: 1999,
    duration: 136,
    availableOnOTT: true
  },
  {
    id: 47,
    title: "John Wick",
    genre: "action",
    language: "english",
    rating: 4.3,
    releaseYear: 2014,
    duration: 101,
    availableOnOTT: true
  },
  {
    id: 48,
    title: "The Hangover",
    genre: "comedy",
    language: "english",
    rating: 4.1,
    releaseYear: 2009,
    duration: 100,
    availableOnOTT: true
  },
  {
    id: 49,
    title: "Parasite",
    genre: "thriller",
    language: "korean",
    rating: 4.8,
    releaseYear: 2019,
    duration: 132,
    availableOnOTT: true
  },
  {
    id: 50,
    title: "Train to Busan",
    genre: "thriller",
    language: "korean",
    rating: 4.5,
    releaseYear: 2016,
    duration: 118,
    availableOnOTT: false
  }
];
```

Create at least **20 movies** inside an array.

---

# Required APIs

## 1. Home Route

Create a route:

```
GET /
```

Response:

```
Movie API is running
```

---

## 2. Get All Movies

Create a route:

```
GET /movies
```

It should return all movies.

---

## 3. Get Single Movie by ID

Create a route:

```
GET /movies/:id
```

Example:

```
GET /movies/1
```

It should return the movie whose id is `1`.

If movie is not found, return:

```json
{
  "message": "Movie not found"
}
```

with status code `404`.

---

## 4. Filter Movies Using Query Parameters

Create filtering on this route:

```
GET /movies
```

Support these query parameters:

```
genre
language
rating
releaseYear
availableOnOTT
```

Examples:

```
GET /movies?genre=comedy
GET /movies?language=hindi
GET /movies?rating=4.5
GET /movies?releaseYear=2020
GET /movies?availableOnOTT=true
```

Meaning:

```
/movies?genre=comedy
```

Return all comedy movies.

```
/movies?rating=4.5
```

Return all movies whose rating is greater than or equal to 4.5.

```
/movies?availableOnOTT=true
```

Return all movies available on OTT.

Also support multiple filters together:

```
GET /movies?genre=action&language=hindi&rating=4
```

---

## 5. Search Movies by Title

Add search query:

```
GET /movies?search=idiots
```

It should return movies whose title contains `idiots`.

Search should be case-insensitive.

So these should work:

```
GET /movies?search=idiots
GET /movies?search=IDIOTS
GET /movies?search=IdIoTs
```

---

## 6. Create New Movie

Create a route:

```
POST /movies
```

Body:

```json
{
  "title": "Dangal",
  "genre": "sports",
  "language": "hindi",
  "rating": 4.7,
  "releaseYear": 2016,
  "duration": 161,
  "availableOnOTT": true
}
```

It should add the new movie into the movies array.

Response:

```json
{
  "message": "Movie created successfully",
  "movie": {
    "id": 21,
    "title": "Dangal",
    "genre": "sports",
    "language": "hindi",
    "rating": 4.7,
    "releaseYear": 2016,
    "duration": 161,
    "availableOnOTT": true
  }
}
```

Use status code `201`.

---

## 7. Update Movie Using PATCH

Create a route:

```
PATCH /movies/:id
```

PATCH should update only the fields sent in body.

Example:

```
PATCH /movies/1
```

Body:

```json
{
  "rating": 4.9
}
```

Only rating should update.

Response:

```json
{
  "message": "Movie updated successfully",
  "movie": {
    "id": 1,
    "title": "3 Idiots",
    "genre": "comedy",
    "language": "hindi",
    "rating": 4.9,
    "releaseYear": 2009,
    "duration": 170,
    "availableOnOTT": true
  }
}
```

If movie is not found, return `404`.

---

## 8. Replace Movie Using PUT

Create a route:

```
PUT /movies/:id
```

PUT should replace the full movie object.

Example:

```
PUT /movies/1
```

Body:

```json
{
  "title": "3 Idiots Updated",
  "genre": "comedy",
  "language": "hindi",
  "rating": 4.9,
  "releaseYear": 2009,
  "duration": 171,
  "availableOnOTT": true
}
```

Response:

```json
{
  "message": "Movie replaced successfully",
  "movie": {
    "id": 1,
    "title": "3 Idiots Updated",
    "genre": "comedy",
    "language": "hindi",
    "rating": 4.9,
    "releaseYear": 2009,
    "duration": 171,
    "availableOnOTT": true
  }
}
```

If movie is not found, return `404`.

---

## 9. Delete Movie

Create a route:

```
DELETE /movies/:id
```

Example:

```
DELETE /movies/1
```

It should delete movie with id `1`.

Response:

```json
{
  "message": "Movie deleted successfully",
  "movie": {
    "id": 1,
    "title": "3 Idiots",
    "genre": "comedy",
    "language": "hindi",
    "rating": 4.8,
    "releaseYear": 2009,
    "duration": 170,
    "availableOnOTT": true
  }
}
```

If movie is not found, return `404`.

---

# Bonus Task

Create a middleware that logs every request.

Example log:

```
GET /movies
POST /movies
PATCH /movies/2
DELETE /movies/5
```

Hint:

```jsx
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});
```

---

# Bonus Task 2

Create one middleware to protect admin routes.

Only allow request if this header exists:

```
role: admin
```

Protected route example:

```
DELETE /movies/:id
```

If role is not admin, return:

```json
{
  "message": "Only admin can delete movies"
}
```

with status code `403`.

---

# Final API List

```
GET /                         Home route

GET /movies                   Get all movies

GET /movies/:id               Get movie by id

GET /movies?genre=comedy      Filter by genre

GET /movies?language=hindi    Filter by language

GET /movies?rating=4.5        Filter by minimum rating

GET /movies?releaseYear=2020  Filter by release year

GET /movies?availableOnOTT=true
Filter by OTT availability

GET /movies?search=idiots     Search by title

POST /movies                  Create movie

PATCH /movies/:id             Update selected fields

PUT /movies/:id               Replace full movie

DELETE /movies/:id            Delete movie
```

---

# Submission Requirement

Students should submit:

1. `index.js` or `app.js`
2. `data.js`
3. Screenshot of API testing from Postman or Thunder Client
4. At least 20 movie objects
5. All routes working properly

---

# Main Concepts Practiced

```
Express server
app.get
app.post
app.patch
app.put
app.delete
app.use
middleware
route parameter
query parameter
req.params
req.query
req.body
status codes
JSON response
```