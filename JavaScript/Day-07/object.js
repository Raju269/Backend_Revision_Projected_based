// This is an Object representing a person 
let person = {
    name : "Alice",
    age : 20,
    isStudent : true
}

console.log(person);

// Part 2 The Basic CRUD Operation Create, Read , update , and Delete 

// An empty object 
const car = {};
console.log(car);


// An object with properties 
const user = { 
    username : "Raju kumar",
    loginCount : 52,
    "is-premium-member":true
}

console.log(user);

// ? Accessing (Reading) Properties 
// Dot Notation
console.log(user.username);

// Bracket Notation 
console.log(user["loginCount"]);

// You MUST use bracket notation for keys with special characters.console.log(user["is-premium-member"]); // true

let propertyToAccess = "username";
console.log(user[propertyToAccess]); // "js_dev" (This is impossible with dot notation)

// ? Updating and Adding (Creating) Properties 

const book = {
    title : "The Hobbit"
};

// Update an existing property 
book.title = "The Lord of the Rings ";

// Add a new Property 
book.author = "J.R.R Tolkien";
book.pages = 1178;

console.log(book); // { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178 }

// Deleting Properties 

delete book.pages;
console.log(book);


// ! Objects with Methods (Behavior)

const users = {
    name : "Piyush",
    greeting: function(){
        // Here `this` refers to the "user" Object 
        console.log(`Hello, my name is ${this.name}`);
        user.greeting(); // Output: "Hello, my name is Alice."

    }
}


// ! Looping Over an Object's Properties (Iteration);

const Car = {
    make: "Honda",
    model : "Civic",
    year : 2021
};

for(const key in Car){
    console.log(`key : ${key} , Value : ${car[key]}`);
    
}
