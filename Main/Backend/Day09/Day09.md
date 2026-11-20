# Lecture 09 : MongoDB and Mongoose 

# MongoDB and Mongoose Notes — First Thought Principle

## 1. First Thought: Why do we need a database?

In backend, our server needs to store data permanently.

Example:

```jsx
{
  name: "Rohit",
  accountNumber: 101,
  city: "Dehradun",
  age: 25,
  balance: 5000
}
```

If we store this data only inside an array, the data will disappear when the server restarts.

So we need a database.

A database helps us:

```
store data permanently
fetch data when needed
update existing data
delete data
search/filter data
```

---

## 2. What is MongoDB?

MongoDB is a database where we store data in the form of documents.

A document looks like a JavaScript object:

```jsx
{
  name: "Rohit",
  age: 25,
  city: "Dehradun"
}
```

MongoDB stores records as BSON documents. BSON is a binary representation of JSON-like documents and supports more data types than JSON.

---

## 3. Database, Collection, Document

Think like this:

```
Database   = main container
Collection = group of similar documents
Document   = actual data object
```

Example:

```
Database: bankDB

Collection: customers

Document:
{
  name: "Rohit",
  accountNumber: 101,
  balance: 5000
}
```

Structure:

```
bankDB
└── customers
    ├── customer document 1
    ├── customer document 2
    └── customer document 3
```

---

## 4. What is BSON?

BSON full form:

```
Binary JSON
```

We write data in JSON-like format:

```jsx
{
  name: "Aman",
  age: 22,
  isActive: true
}
```

But MongoDB internally stores it as BSON.

Why?

Because MongoDB should understand:

```
name is string
age is number
isActive is boolean
createdAt is Date
_id is ObjectId
```

JSON is good for humans and APIs.

BSON is good for database storage and type understanding.

BSON supports extra types like:

```
ObjectId
Date
Int32
Int64
Decimal128
Binary data
Timestamp
```

---

## 5. What is `_id`?

Every MongoDB document needs a unique identity.

Example:

```jsx
{
  _id: ObjectId("6a588620783c80fbbcf26db8"),
  name: "Rohit",
  age: 25
}
```

If you do not provide `_id`, MongoDB automatically creates it.

Use of `_id`:

```
uniquely identify one document
update exact document
delete exact document
fetch exact document
```

Example:

```jsx
db.customers.findOne({
  _id: ObjectId("6a588620783c80fbbcf26db8")
})
```

For beginner projects, let MongoDB generate `_id` automatically.

---

## 6. What is Mongoose?

Mongoose is an ODM.

```
ODM = Object Data Modeling
```

Simple meaning:

```
Mongoose helps us work with MongoDB using structured JavaScript code.
```

Without Mongoose:

```jsx
db.collection("customers").findOne({ accountNumber: 101 })
```

With Mongoose:

```jsx
Customer.findOne({ accountNumber: 101 })
```

Mongoose helps with:

```
schema
model
validation
default values
timestamps
query methods
middleware/hooks
clean code structure
```

Mongoose says everything starts with a Schema, and a schema maps to a MongoDB collection and defines the shape of documents inside it.

---

## 7. Why do we need `mongoose.connect()`?

Before our backend can query MongoDB, it must connect to MongoDB.

```jsx
await mongoose.connect(process.env.MONGO_URI);
```

This creates a long-lived connection between:

```
Node.js server  <---->  MongoDB database
```

It is not a WebSocket connection.

It is a TCP-based database connection handled by MongoDB driver.

When connection happens:

```
MongoDB URI is read
MongoDB server is found
TCP connection is created
TLS/SSL secure channel is created
username/password authentication happens
connection pool is prepared
queries can now run
```

Correct flow:

```jsx
await mongoose.connect(process.env.MONGO_URI);

app.listen(3000, () => {
  console.log("Server started");
});
```

Meaning:

```
First connect database.
Then start accepting API requests.
```

---

## 8. Why not connect on every request?

Bad approach:

```jsx
app.get("/customers", async (req, res) => {
  await mongoose.connect(process.env.MONGO_URI);
  const customers = await Customer.find();
  res.json(customers);
});
```

Problem:

```
Every request opens DB connection
Every request authenticates again
More delay
More load
Bad performance
```

Good approach:

```
Server starts
DB connection is created once
All requests reuse existing connection
```

Mongoose/MongoDB driver maintains a connection pool.

Simple meaning:

```
Connection pool = multiple ready-made database connections
```

If 10 requests come together, they can use different available connections from the pool.

---

## 9. What is Schema?

Schema is the blueprint/rule of a document.

Example customer document:

```jsx
{
  name: "Rohit",
  accountNumber: 101,
  city: "Dehradun",
  age: 25,
  balance: 5000
}
```

Mongoose schema:

```jsx
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  accountNumber: Number,
  city: String,
  age: Number,
  balance: Number
});
```

This tells Mongoose:

```
name should be String
accountNumber should be Number
city should be String
age should be Number
balance should be Number
```

---

## 10. Better Schema with Rules

```jsx
const customerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },

  accountNumber: {
    type: Number,
    required: true,
    unique: true
  },

  city: {
    type: String,
    required: true,
    trim: true
  },

  age: {
    type: Number,
    required: true,
    min: 1
  },

  balance: {
    type: Number,
    required: true,
    min: 0
  },

  accountType: {
    type: String,
    enum: ["saving", "current"],
    default: "saving"
  }
});
```

Meaning:

```
required: true  -> field must be present
trim: true      -> remove extra spaces
unique: true    -> duplicate value not allowed
min: 1          -> value should be at least 1
enum            -> only selected values allowed
default         -> use default value if not provided
```

Mongoose SchemaTypes handle things like defaults, validation, getters, setters, and field behavior.

---

## 11. What is Model?

Schema only defines structure.

Model is used to actually perform database operations.

```jsx
const Customer = mongoose.model("Customer", customerSchema);
```

Now we can do:

```jsx
Customer.create()
Customer.find()
Customer.findOne()
Customer.findOneAndUpdate()
Customer.findOneAndDelete()
```

Mongoose defines a Model as the main tool for interacting with MongoDB, created from Schema definitions.

Mental model:

```
Schema = blueprint
Model = tool to talk to database
Document = actual stored data
```

---

## 12. Complete Model File

File:

```
models/customer.model.js
```

Code:

```jsx
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    accountNumber: {
      type: Number,
      required: true,
      unique: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 1
    },

    balance: {
      type: Number,
      required: true,
      min: 0
    },

    accountType: {
      type: String,
      enum: ["saving", "current"],
      default: "saving"
    }
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
```

---

## 13. What are timestamps?

If we write:

```jsx
{
  timestamps: true
}
```

Mongoose automatically adds:

```
createdAt
updatedAt
```

Example:

```jsx
{
  name: "Rohit",
  balance: 5000,
  createdAt: "2026-07-16T10:00:00Z",
  updatedAt: "2026-07-16T10:00:00Z"
}
```

Use:

```
createdAt -> when document was created
updatedAt -> when document was last changed
```

Mongoose docs state that `timestamps: true` adds `createdAt` and `updatedAt` Date properties to the schema.

---

## 14. Basic Express + MongoDB Setup

```jsx
import express from "express";
import mongoose from "mongoose";
import Customer from "./models/customer.model.js";

const app = express();

app.use(express.json());

await mongoose.connect(process.env.MONGO_URI);

console.log("MongoDB connected");

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
```

---

## 15. Create Customer

Route:

```jsx
app.post("/customers", async (req, res) => {
  const customer = await Customer.create(req.body);

  res.json({
    message: "Customer created successfully",
    customer: customer
  });
});
```

Postman body:

```json
{
  "name": "Rohit",
  "accountNumber": 101,
  "city": "Dehradun",
  "age": 25,
  "balance": 5000,
  "accountType": "saving"
}
```

---

## 16. Fetch All Customers

```jsx
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();

  res.json(customers);
});
```

---

## 17. Fetch Customer by Account Number

```jsx
app.get("/customers/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  const customer = await Customer.findOne({
    accountNumber: accountNumber
  });

  res.json(customer);
});
```

---

## 18. Update Balance

```jsx
app.patch("/customers/:accountNumber/balance", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { balance } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { accountNumber: accountNumber },
    { balance: balance },
    { new: true }
  );

  res.json({
    message: "Balance updated successfully",
    customer: customer
  });
});
```

`new: true` means:

```
return updated document
```

---

## 19. Deposit Money

```jsx
app.patch("/customers/:accountNumber/deposit", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { accountNumber: accountNumber },
    { $inc: { balance: amount } },
    { new: true }
  );

  res.json({
    message: "Amount deposited successfully",
    customer: customer
  });
});
```

`$inc` means increment.

Example:

```
current balance = 5000
amount = 2000
new balance = 7000
```

---

## 20. Withdraw Money

```jsx
app.patch("/customers/:accountNumber/withdraw", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const customer = await Customer.findOne({
    accountNumber: accountNumber
  });

  if (customer.balance < amount) {
    return res.json({
      message: "Insufficient balance"
    });
  }

  customer.balance = customer.balance - amount;

  await customer.save();

  res.json({
    message: "Amount withdrawn successfully",
    customer: customer
  });
});
```

---

## 21. Delete Customer

```jsx
app.delete("/customers/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  const customer = await Customer.findOneAndDelete({
    accountNumber: accountNumber
  });

  res.json({
    message: "Customer deleted successfully",
    customer: customer
  });
});
```

---

## 22. Filter Customers by Balance

URL:

```
/customers/filter/balance?minBalance=10000
```

Route:

```jsx
app.get("/customers/filter/balance", async (req, res) => {
  const { minBalance } = req.query;

  const customers = await Customer.find({
    balance: { $gt: minBalance }
  });

  res.json(customers);
});
```

`$gt` means greater than.

MongoDB query filters can use operators like this form: `{ field: { operator: value } }`.

---

## 23. Filter Customers by City

URL:

```
/customers/filter/city?city=Dehradun
```

Route:

```jsx
app.get("/customers/filter/city", async (req, res) => {
  const { city } = req.query;

  const customers = await Customer.find({
    city: city
  });

  res.json(customers);
});
```

---

## 24. Important Route Order

Write specific routes before dynamic routes.

Correct:

```jsx
app.get("/customers/filter/balance", ...)
app.get("/customers/filter/city", ...)
app.get("/customers/:accountNumber", ...)
```

Wrong:

```jsx
app.get("/customers/:accountNumber", ...)
app.get("/customers/filter/balance", ...)
```

Because Express may treat `filter` as `accountNumber`.

---

## 25. Final First Thought Summary

MongoDB stores data as documents.

Mongoose helps us create structure around those documents.

Flow:

```
Client sends request
        ↓
Express route receives request
        ↓
Mongoose model runs query
        ↓
MongoDB stores/fetches data
        ↓
Response goes back to client
```

Core mental model:

```
Database   -> stores data
Collection -> group of documents
Document   -> actual data object
BSON       -> internal storage format
_id        -> unique document identity
Schema     -> rules/shape of document
Model      -> tool to perform database operations
Connection -> reusable link between server and database
```

```jsx
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    accountNumber: {
      type: Number,
      required: true,
      unique: true
    },

    city: {
      type: String,
      required: true,
      trim: true
    },

    age: {
      type: Number,
      required: true,
      min: 1
    },

    balance: {
      type: Number,
      required: true,
      min: 0
    },

    accountType: {
      type: String,
      enum: ["saving", "current"],
      default: "saving"
    }
  },
  {
    timestamps: true
  }
);

const Customer = mongoose.model("Customer", customerSchema);

export default Customer;
```

```jsx
import express from "express";
import mongoose from "mongoose";
import Customer from "./models/customer.model.js";

const app = express();

app.use(express.json());

await mongoose.connect("mongodb+srv://<username>:<password>@cluster0.yy4lb8l.mongodb.net/bankDB");

console.log("MongoDB connected");

// 1. Create customer account
app.post("/customers", async (req, res) => {
  const customer = await Customer.create(req.body);

  res.json({
    message: "Customer account created successfully",
    customer: customer
  });
});

// 2. Fetch all customers
app.get("/customers", async (req, res) => {
  const customers = await Customer.find();

  res.json(customers);
});

// 3. Fetch customer by account number
app.get("/customers/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  const customer = await Customer.findOne({
    accountNumber: accountNumber
  });

  res.json(customer);
});

// 4. Delete customer account
app.delete("/customers/:accountNumber", async (req, res) => {
  const accountNumber = req.params.accountNumber;

  const customer = await Customer.findOneAndDelete({
    accountNumber: accountNumber
  });

  res.json({
    message: "Customer deleted successfully",
    customer: customer
  });
});

// 5. Update customer balance directly
app.patch("/customers/:accountNumber/balance", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { balance } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { accountNumber: accountNumber },
    { balance: balance },
    { new: true }
  );

  res.json({
    message: "Balance updated successfully",
    customer: customer
  });
});

// 6. Fetch customers whose balance is greater than given amount
app.get("/customers/filter/balance", async (req, res) => {
  const { minBalance } = req.query;

  const customers = await Customer.find({
    balance: { $gt: minBalance }
  });

  res.json(customers);
});

// 7. Fetch customers by city
app.get("/customers/filter/city", async (req, res) => {
  const { city } = req.query;

  const customers = await Customer.find({
    city: city
  });

  res.json(customers);
});

// 8. Fetch customers by account type
app.get("/customers/filter/account-type", async (req, res) => {
  const { accountType } = req.query;

  const customers = await Customer.find({
    accountType: accountType
  });

  res.json(customers);
});

// 9. Deposit money
app.patch("/customers/:accountNumber/deposit", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const customer = await Customer.findOneAndUpdate(
    { accountNumber: accountNumber },
    { $inc: { balance: amount } },
    { new: true }
  );

  res.json({
    message: "Amount deposited successfully",
    customer: customer
  });
});

// 10. Withdraw money
app.patch("/customers/:accountNumber/withdraw", async (req, res) => {
  const accountNumber = req.params.accountNumber;
  const { amount } = req.body;

  const customer = await Customer.findOne({
    accountNumber: accountNumber
  });

  if (customer.balance < amount) {
    return res.json({
      message: "Insufficient balance"
    });
  }

  customer.balance = customer.balance - amount;

  await customer.save();

  res.json({
    message: "Amount withdrawn successfully",
    customer: customer
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
```

## First thought

MongoDB query is mostly:

```jsx
Model.find({
  fieldName: condition
})
```

Now condition can be:

### 1. Direct value

Use direct value when you want exact match.

```jsx
Customer.find({
  city: "Delhi"
});
```

Meaning:

```
city == Delhi
```

Multiple fields directly inside object means **AND** by default:

```jsx
Customer.find({
  city: "Delhi",
  accountType: "saving"
});
```

Meaning:

```
city == Delhi AND accountType == saving
```

So remember:

```
same object with multiple fields = AND
```

---

## 2. Operator on one field

Use this format when condition is applied on **one field**:

```jsx
fieldName: { $operator: value }
```

Example:

```jsx
Customer.find({
  balance: { $gt: 10000 }
});
```

Meaning:

```
balance > 10000
```

More examples:

```jsx
Customer.find({
  age: { $gte: 18 }
});
```

```jsx
Customer.find({
  city: { $ne: "Delhi" }
});
```

```jsx
Customer.find({
  balance: { $gte: 10000, $lte: 50000 }
});
```

Pattern:

```
field: { condition }
```

Use when you are asking:

```
This field should be greater than?
This field should be less than?
This field should not equal?
This field should be inside list?
```

---

## 3. When to use array?

Use array when condition has **multiple possible choices**.

Example:

```
city should be Delhi OR Mumbai OR Pune
```

Use `$in`:

```jsx
Customer.find({
  city: { $in: ["Delhi", "Mumbai", "Pune"] }
});
```

Because one field has many allowed values.

So remember:

```
one field, multiple allowed values = $in array
```

Example:

```jsx
Customer.find({
  accountType: { $in: ["saving", "current"] }
});
```

---

## 4. When to use `$or` array?

Use `$or` when you have **multiple complete conditions**, and any one condition can match.

Example:

```
city is Delhi OR balance is greater than 50000
```

These are two different conditions:

```jsx
Customer.find({
  $or: [
    { city: "Delhi" },
    { balance: { $gt: 50000 } }
  ]
});
```

So remember:

```
$or takes array of condition objects
```

Why array?

Because each condition is separate:

```jsx
[
  { city: "Delhi" },
  { balance: { $gt: 50000 } }
]
```

---

## 5. `$and` also takes array, but usually you don’t need it

This:

```jsx
Customer.find({
  city: "Delhi",
  accountType: "saving"
});
```

Already means AND.

You can also write:

```jsx
Customer.find({
  $and: [
    { city: "Delhi" },
    { accountType: "saving" }
  ]
});
```

But for beginners, avoid this unless needed.

Use `$and` when conditions become more complex, especially on the same field in separate expressions.

---

## Main memory table

```
Exact match:
field: value

Comparison:
field: { $gt: value }
field: { $gte: value }
field: { $lt: value }
field: { $lte: value }

Not equal:
field: { $ne: value }

One field, many possible values:
field: { $in: [value1, value2, value3] }

Multiple fields must match:
{ field1: value1, field2: value2 }

Any one condition can match:
{ $or: [ { condition1 }, { condition2 } ] }
```

## Best mental model

There are only 3 shapes:

### Shape 1: Simple equality

```jsx
{
  city: "Delhi"
}
```

### Shape 2: Field with operator

```jsx
{
  balance: { $gt: 10000 }
}
```

### Shape 3: Logical operator with array

```jsx
{
  $or: [
    { city: "Delhi" },
    { balance: { $gt: 50000 } }
  ]
}
```

That’s it.

## Why `$or` uses array but normal AND does not?

Because object already naturally supports AND.

```jsx
{
  city: "Delhi",
  accountType: "saving"
}
```

MongoDB reads it as:

```
city must match
accountType must match
```

But OR cannot be represented directly like this:

```jsx
{
  city: "Delhi",
  city: "Mumbai"
}
```

This is invalid logically because same key cannot appear twice properly in JS object.

So MongoDB uses array:

```jsx
{
  $or: [
    { city: "Delhi" },
    { city: "Mumbai" }
  ]
}
```

But for same field, better:

```jsx
{
  city: { $in: ["Delhi", "Mumbai"] }
}
```

## Final rule

```
AND between fields:
put fields in same object

OR between conditions:
use $or with array

Multiple values for same field:
use $in with array

Greater/less/not equal:
use field with operator object
```

For teaching, give students this line:

```
MongoDB query is just an object.
If condition is simple, write value directly.
If condition needs logic, use $operator.
If there are multiple choices or conditions, use array.
```