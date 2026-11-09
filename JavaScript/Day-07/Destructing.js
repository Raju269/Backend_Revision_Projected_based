// ! Object Destructing 

const user = {
    id: 101,
    name : "Raju",
    email : "raju.kmr.rudra@gmail.com",
    profile:{
        isAdmin : true
    }
};

// --- Basic Destructuring ---
// Old way:
// const name = user.name;
// const age = user.age;
// New way with destructuring
const {name, age } = user; // Create variable 'name' and 'age' from user object

console.log(name);
console.log(age)

// --- Renaming Variables ---
// What if you already have a variable named 'name'? You can rename it.

const {name:UserName, email} = user;
console.log(UserName)

// ---- Setting Default Values ---- 

// What if a property might not exit? you can provide a default. 

const {name: personName , role = "User"} = user;
console.log(personName);
console.log(role);


// --- Nested Destructing --- 
//   you can even pull from nested objects. 
const {profile:{isAdmin}} = user;
console.log(isAdmin);


// ! Array Destructing 

const scores = [98,85,100,92];


// Get the first two Scores 
const [firstscore, secnodscore] = scores;
console.log(firstscore)
console.log(secnodscore)

const [a,b] = scores;
console.log(a)
console.log(b);

// Skip item with a comma 
const [winner, ,thirdplace] = scores;
console.log(winner)
console.log(thirdplace)



/*
. How to Use Symbol
First Thought: "I need a secret key for my object that will never, ever clashwith anyone else's key."
A Symbol  is a unique and immutable primitive data type. Its purpose is to beused as a unique property key for an object. This is useful for preventing namecollisions when you add properties to an object that you don't control, or fordefining "meta" properties.
A. Creating a Symbol
You create a symbol by calling the Symbol()  factory function. Every symbol is unique.
*/

const sym1 = Symbol("description");
const sym2 = Symbol("description");

console.log(sym1 === sym2);

// ! B Using a symbol as an Object key 

const user1 = {
    name: "Hero"
};

// Let's Create a "Secret" ID for this  user.

const secretID = Symbol("userID");

// Add the proeprty using the symbols as the key 
user[secretID] = "xyz-987-abc";
console.log(user1);

// To Access it, you must use the original symbol variable 
console.log(user[secretID])

// You cannot access it with a string 
console.log(user["secretID"]);


// ! Symbols are "Hidden" from Normal Iteration 
for(const key in user1){
    console.log(key);
}

console.log(Object.keys(user1));

// to get the symbol properties you must use a special method 
const symbolkeys = Object.getOwnPropertyDescriptor(user);
console.log(symbolkeys);
// console.log(user[symbolkeys[0]])