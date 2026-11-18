# Lecture15: JSON vs JS Object

## Frontend and backend are usually **different systems**.

Frontend may be JavaScript. Backend may be Java, Go, Python, Node.js, PHP, etc.

Now question is:

> If backend wants to send data to frontend, in which format should it send?
> 

It cannot send a JavaScript object directly, because other languages do not understand JavaScript objects. So we need one **common data format**.

That common format is **JSON**.

---

## What is JSON?

JSON means:

```
JavaScript Object Notation
```

Simple meaning:

> JSON is a text format used to represent data.
> 

Example JSON:

```json
{
  "name": "Rohit",
  "age": 25,
  "isTeacher": true
}
```

It looks like a JavaScript object, but JSON is actually **text/string format**.

In JavaScript, it may look like this:

```jsx
const jsonData = '{"name":"Rohit","age":25,"isTeacher":true}';
```

So JSON is not the final object. It is a **data format**.

---

## Why do we need JSON?

Suppose backend has this data:

```
name = Rohit
age = 25
isTeacher = true
```

It needs to send this data to frontend.

But internet mainly transfers data as **text/bytes**.

So backend converts the data into JSON:

```json
{
  "name": "Rohit",
  "age": 25,
  "isTeacher": true
}
```

Then frontend receives it.

In JavaScript, we convert JSON into JS object:

```jsx
const user = JSON.parse(jsonData);

console.log(user.name); // Rohit
```

Now frontend can use it easily.

---

## Why not send normal string?

We can send normal string:

```
Rohit 25 true
```

But this is confusing.

Which one is name? Which one is age? Which one is teacher status?

JSON gives structure:

```json
{
  "name": "Rohit",
  "age": 25,
  "isTeacher": true
}
```

Now data is clear because it has **key-value pairs**.

---

## Real API example

Weather API may send:

```json
{
  "location": {
    "name": "London"
  },
  "current": {
    "temp_c": 18.5
  }
}
```

Frontend receives this JSON.

Then we do:

```jsx
const response = await fetch(url);
const data = await response.json();

console.log(data.location.name);
console.log(data.current.temp_c);
```

`response.json()` converts JSON text into a JavaScript object.

---

## Main purpose of JSON

JSON is used for:

```
sending data between frontend and backend
storing structured data
sharing data between different programming languages
```

Because almost every language can understand JSON.

JavaScript can parse it.

C++ can parse it using a library.

Python can parse it.

Java can parse it.

Go can parse it.

---

## Final simple line

```
JSON is a common text format to send structured data between different systems.
```

Without JSON, data transfer would be messy.

With JSON, data becomes clear:

```json
{
  "city": "Delhi",
  "temperature": 35
}
```

Then JavaScript can convert it into an object and use:

```jsx
data.city
data.temperature
```

## **Now talk about conversion**

### 1. JS object → JSON string

Use:

```jsx
JSON.stringify()
```

Example:

```jsx
const user = {
  name: "Rohit",
  age: 25,
  isTeacher: true
};

const jsonData = JSON.stringify(user);

console.log(jsonData);
console.log(typeof jsonData);
```

Output:

```jsx
'{"name":"Rohit","age":25,"isTeacher":true}'
"string"
```

So:

```
JS object → JSON string
```

---

### 2. JSON string → JS object

Use:

```jsx
JSON.parse()
```

Example:

```jsx
const jsonData = '{"name":"Rohit","age":25,"isTeacher":true}';

const user = JSON.parse(jsonData);

console.log(user.name);
console.log(user.age);
console.log(typeof user);
```

Output:

```jsx
Rohit
25
"object"
```

So:

```
JSON string → JS object
```

---

## Simple rule

```jsx
JSON.stringify()
```

converts **JS object to JSON string**.

```jsx
JSON.parse()
```

converts **JSON string to JS object**.

---

## What data types are allowed inside JSON?

JSON allows only these:

```
string
number
boolean
null
array
object
```

Example valid JSON:

```json
{
  "name": "Rohit",
  "age": 25,
  "price": 99.5,
  "isTeacher": true,
  "skills": ["C++", "JavaScript", "React"],
  "address": {
    "city": "Delhi",
    "pincode": 110001
  },
  "salary": null
}
```

---

## Not allowed inside JSON

JSON does **not** allow:

```
function
undefined
Symbol
Date object directly
comments
single quotes
trailing comma
```

Invalid JSON:

```json
{
  "name": "Rohit",
  "age": undefined
}
```

Invalid JSON:

```json
{
  "name": "Rohit",
}
```

Invalid JSON:

```json
{
  'name': 'Rohit'
}
```

Clean mental model:

```
JSON = data only
No logic, no functions
```

!Untitled-2026-03-20-1936.svg