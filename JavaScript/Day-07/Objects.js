// ! Lecture 7 Objects in js 

// This is an object representing a person 
let person = {
    name : 'Raju',  // key is "name" , Value is "Raju"
    age : 23,
    isStudent : true
};


// Basic CRUD Operation in objects. 

// An empty object 
const cars = {};

//  An object with properties  

const users = {
    username : "Piyush",
    loginCount : 27,
    "is-premium-member" : true // Keys with special characters must be in quotes
};

// B Accessing (Reading) properties 
// Dot Notation (.);

console.log(users.name);
console.log(users.loginCount);

// Bracket Notation []
console.log(users["loginCount"]);
// You must use bracket notation for keys with special characters.
console.log(users["is-premium-member"]);

// Critical use case :
let propertyToAccess  = "username";
console.log(users[propertyToAccess]); 
// Piyush (This is impossible with dot notation);
console.log(users);

// Updating and Adding (Creating) Properties 

const book = {
    title : "The Hobbit"
}; 

//  Update an existing property 
book.title = "The Lord of the Rings";

// Add a new property 
book.author = "RJ Thanous";
book.pages = 1178;

console.log(book); // { title: "The Lord of the Rings", author: "J.R.R. Tolkien", pages: 1178 }

// Deleting Properties 

delete book.pages;
console.log(book); 


// ! Part 3 Object with Methods (Behavior)

const user = {
    name : "Monu",
    greeting  : function (){
        // Here , `this` refers to the `user` object. 
        console.log(`Hello, my name is : ${this.name}`);
    }
}

user.greeting(); 
console.log(user.greeting());

// ! part 4 Looping Over an Object's Properties (Iteration);

const  car = {
    make : "Honda", 
    model : "Civic",
    year : 2021
};

for(const key in car){
    console.log(`key: ${key} : Value is ${car[key]}`)
}

// ! (Advanced Gotcha:for...in  also iterates over properties from the object's prototype chain, which can be unexpected. For this reason, the modern methods below are usually preferred.)

// ? The Modern Object Methods. 

const carInformation = { 
    make : "Honda", 
    model : "Civic",
    year : 2021
};

console.log(Object.keys(carInformation));
console.log(Object.values(carInformation));
console.log(Object.entries(carInformation));


for(const [key,value] of Object.entries(carInformation)){
    console.log(`${key}:${value}`)
}

for(const [key,value] of Object.entries(car)){
    console.log(`${key} : ${value}`)
}

//  ! Advanced Concepts 
// ! OBjects are a Reference types 

let obj1 = {values : 10};
let obj2 = obj1; // same address point due Reference ;
obj2.values = 100;
console.log(obj1);

// ! How to Copy an Object (Shallow Copy );
// ! to create a true copy of an Object's top - level properties , use the spread syntax (...) or Object.assign()

const original = {name : "Rajukuamr", age : 23};

// Using spread syntax ( Most common on modern );
const copy = {...original};
copy.age = 21;

console.log(original.age);
console.log(copy.age);

// !(Note: This is a "shallow" copy. If the object contains other objects, thosenested objects will still be references, not copies.)

const makecopyOriginal = {productName :"Mouse" , type  : "bluetooth"};
// const copy2 = Object.assign(makecopyOriginal);
// Object.assign({},variableName)
const copy2 = Object.assign({}, makecopyOriginal);
copy2.type = "type C"
console.log(makecopyOriginal.type)
console.log(copy2.type)


// TODO Modern ES6+ Syntax (Syntactic Sugar);

// Property Value Shorthand : 
const name = "Varun";
const age = 24;

// old way 
const userOld  = {name:name, age:age};
console.log(userOld);

// Much clearner
const newNew = {name,age};
console.log(newNew);

// Method Shorthand : You can omit the function keyword when defining methods. 

// old Ways: 
const userOld1 = {
    sayHi : function(){
        console.log("hi")
    }
}
console.log(userOld1)
// New way : 
const UserNew = {
    sayHi(){
        console.log("Hi")
    }
}
console.log(UserNew)

// ? Computed Property Names : 
let propertyName = "email";
const user123 = {
    name : "Vikas",
    [propertyName] : "Vikas@gmail.com"
};
console.log(user123);


