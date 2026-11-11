// ! Lecture - 09 Callback , ForEach , mapfiler, reduce

const products = [
  { id: 1, name: "Laptop", category: "Electronics", price: 1200, inStock: true },
  { id: 2, name: "Book", category: "Books", price: 30, inStock: true },
  { id: 3, name: "Coffee Maker", category: "Appliances", price: 150, inStock: false },
  { id: 4, name: "Headphones", category: "Electronics", price: 200, inStock: true }
];

// ! .forEach() - The simple Looper 

console.log("--- Our Products --- ");
products.forEach(products => {
    console.log(`- ${products.name}`);
});

// When to Use: When you need to "do something" for each item but you don't need to create a new array from the results. Examples: logging, updating a UI, saving each item to a database.




// ! .map() - The Transformer 

const productNames = products.map(products =>{
    return products.name;
});
console.log(productNames);
// console.log(products); 

// When to Use: When you need a new array that is a modified version of the original. This is one of the most-used array methods.


// ! .filter() - The sieve / The Bouncer 

const availableElectronics = products.filter(product => {
  // The condition must evaluate to true or false.
  // We combine two conditions here.
  return product.inStock === true && product.category === "Electronics";
});

console.log(availableElectronics);
// [
//   { id: 1, name: "Laptop", ... },
//   { id: 4, name: "Headphones", ... }
// ]

// When to Use: Whenever you need to select a subset of data from an array based on one or more conditions.


// ! 4 .reduce() - The Accumalator / The Snowball

/*
4. .reduce() - The Accumulator / The Snowball
First Thought: "I want to roll up this entire list into a single final value." (e.g., Summing a list of numbers, counting items, etc.)

Core Purpose: To execute a "reducer" function on each element of the array, resulting in a single output value.

Key Characteristics:

It is the most powerful and flexible of the iteration methods.
It can return any type of value: a number, a string, an object, another array.
It is non-mutating.
Syntax:const finalValue = array.reduce((accumulator, currentValue, index) => {}
 return newAccumulator; }, initialValue);

accumulator: The value that is "accumulated" or carried over from the previous iteration. It's the snowball.
currentValue: The current element being processed.
initialValue: The starting value for the accumulator (the small snowball you start with). This is a crucial argument.
Detailed Example: Let's calculate the total value of all the items that are currently in stock.
*/

const totalStockValue = products.reduce((total, product) => {
  console.log(`Current Total: ${total}, Current Product: ${product.name}, Price: ${product.price}`);
  if(product.inStock){
    // The return value of this step becomes the 'total' for the NEXT step. 
    return total + product.price;
  }
//   If not in stock, just return the current total without adding anything. 
   return total;

},0); // Our initial Value for the total is 0.

console.log(`\\n Final Total Stock Value $${totalStockValue}`);

// Trace of the Output:

// Current Total: 0, Current Product: Laptop, Price: 1200
// Current Total: 1200, Current Product: Book, Price: 30
// Current Total: 1230, Current Product: Coffee Maker, Price: 150
// Current Total: 1230, Current Product: Headphones, Price: 200

// Final Total Stock Value: $1430


// When to Use: When you need to derive a single summary value from an array. Examples: sum, average, finding the most expensive item, grouping items into an object.

// ! Other Essential Methods for finding & Testing 
// .find(): Like .filter(), but it stops and returns the very first element that matches the condition. If nothing matches, it returns undefined.

const coffeMaker = products.find(products => products.name === "Coffee Maker");
console.log(coffeMaker);

// .some() :  Checks if at least one element in the array passes the test. Returns true or false. It stops as soon as it finds one.

const hasOutofStockItems = products.some(products => products.inStock === false);
console.log(hasOutofStockItems);

// .every() : Checks if all element in the array pass the test. Returns true or false. It stops as soon as it finds one that doesn't pass.

const areAllItemsInStock = products.every(products => products.inStock === true);
console.log(areAllItemsInStock);

// ! SET and MAP

// Create an empty Set 
const mySet = new Set();

// Create a Set from an array (duplicates are ignored)
const numbersArray = [1,2,3,3,4,2,5];
const numberSet = new Set(numbersArray);

console.log(numberSet);


// ! Core Methods (CRUD operation);
// .add(value): Adds a new element. If the element already exists, it does nothing. It returns the Set object, so you can chain .add() calls.
// .has(value): Checks if an element exists. Returns true or false.
// .delete(value): Removes a specific element.
// .clear(): Removes all elements from the Set.

const userRoles = new Set();

// Add elements (chaining)
userRoles.add("editor").add("viewer");
console.log(userRoles);

// Add a duplicate - nothing happens 
userRoles.add("editor");
console.log(userRoles);

// Check for an element 
console.log(userRoles.has("admin"));
console.log(userRoles.has("editor"));

// Delete an element 
userRoles. delete("viewer");
console.log(userRoles.has("viewer"));

// clear the entire Set 
userRoles.clear();
console.log(userRoles);

// 3. The .size Property Unlike arrays which have .length, a Set has a .size property to tell you how many items it contains.

console.log(numberSet.size);

// Iterating Over a Set 

// Sets are iterable. The best way to loop over a Set is with a for...of loop. The items are iterated in insertion order.


const permissions = new Set(['read','write','executed']);

for(const permission of permissions){
    console.log(permissions);
}

// ! Real world use Cases ( Why use a Set ? );

// Removing Duplicates form an Array 

const duplicatedEmail = ['raju@gmail.com','Ba@b.com','raju@gmail.com'];

// Convert  to a set to remove duplicates, then spread it back into a new array. 

const uniqueEmail = [...new Set(duplicatedEmail)];
console.log(uniqueEmail);

// Checking for Uniqueness / Existence 

// Imagine tracking unique visitors to a page 
const visitedUser = new Set();

function userVisits(userId){
    if(!visitedUser.has(userId)){
        console.log(`Welcome, new Visitor # ${userId}`);
        visitedUser.add(userId);
    }
    else{
        console.log(`Welcome back, visitor # ${userId}`);
    }
}

userVisits(101);  // Welcome, new visitor # 101! 
console.log(userVisits(102));
userVisits(101);

// ! Map 


// ? The Basic of Map 

let myObject = {};
let keyObject1 = {id:1};
let keyObject2 = {id:2};

// Both keyObject 1 and keyObject2 get converted to the same String : "[Object Object]"

myObject[keyObject1] = "Value for key 1";
myObject[keyObject2]  = "Value for key 2";

// The Second assignment overwrote the firs ! 
console.log(myObject);



// Creating a Map 

// Create an empty Map 
const myMap = new Map();

// Create a Map with initial Values 

const userMap = new Map([
    ["name", "Raju"],
    [true,"is-verified"],
    [100,"points"]
]);

 console.log(userMap);


 // Core Methods (CRUD) Operation 
//  .set(key, value): Adds or updates a key-value pair. Returns the Map, so you can chain it.
// .get(key): Retrieves the value for a given key. Returns undefined if the key doesn't exist.
// .has(key): Checks if a key exists. Returns true or false.
// .delete(key): Removes a key-value pair.
// .clear(): Removes all key-value pairs.

const metadata = new Map();
let user1 = {name:"Vikas"};
let user2 = {name:"Gurave"};

// set values using objects as key;
metadata.set(user1,{lastLogin:"2026-11-6"});
metadata.set(user1,{lastLogin:"2026-11-6"});


// Get a value using the exact same object reference 
console.log(metadata.get(user1));

console.log(metadata.has(user2)); 

console.log(metadata.size);

// ! B Iterating Over a Map 

const userMap1 = new Map ([
    ["name","Rudra"],
    ["age",23]
])

// Use destructing to unpack the [key, value] pair 

for(const [key,value] of userMap){
    console.log(`${key} -> ${value}`);
}


// ! Real world use case 
const elementData = new Map();
// const button1 = document.querySelector("#btn1");

// Associate some metadata with this specific button element
// elementData.set(button1, { clicks: 0, lastClickTime: null });

// Now you can store and retrieve data about `button1` without
// ever doing `button1.mydata = ...`, which pollutes the DOM object.

