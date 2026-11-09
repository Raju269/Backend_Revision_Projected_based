/*
1. How to Copy an Object (Shallow vs. Deep)
This is a critical concept because objects are reference types. A simpleassignment (let b = a ) does not create a copy; it just makes a second variablepoint to the same object.
First Thought: "I don't want to change my original object. I need a brand new,
separate copy to work with."
There are two kinds of copies: shallow and deep.
A. Shallow Copy (The 99% Use Case)
A shallow copy creates a new top-level object, but if any of the properties ofthe original object are themselves objects, it only copies the references tothose nested objects.
The Modern Way: Spread Syntax (... ) ES2018
This is the most common, readable, and preferred way to make a shallow copy.
*/

const originalUser = {
    name: "Raju",
    age:24,
    address : {  // A nested object 
        city : "New Delhi"

    }
};

// Use the spread syntax to create a new object 
const shallowCopy = {...originalUser};

// ---- Let's test the copy ---- 
// 1. Change a top-level primtive property in the copy 

shallowCopy.age = 31;
console.log(originalUser)
console.log(shallowCopy)

// 2. Now, change a property in the NESTED object 
shallowCopy.address.city = "London";

// The "gotcha" of a shallow copy: 
console.log(originalUser.address.city);
console.log(originalUser)

/*
B. Deep Copy (For Complex, Nested Objects)
A deep copy creates a new object and recursively creates new copies of allnested objects as well. This ensures that the new object is completelyindependent of the original.
First Thought: "I need a perfect, independent clone of my object, including allits nested parts."
There is now a modern, built-in global function specifically for creating a deepcopy: structuredClone() .
Let's correct the record and explain it in detail.Lecture 07: Objects in JS12
The Modern, Built-in Solution: structuredClone()
First Thought: "Finally, a proper 'Clone' button for my objects."
The structuredClone()  global function was introduced to solve this exactproblem. It is designed to create a deep copy of a given value using the
"structured clone algorithm," which is the same powerful algorithm thatbrowsers use internally to copy data for features like postMessage  (sending databetween windows).
How it works:
It recursively traverses the entire object, creating brand new copies of everyobject and array it finds, resulting in a completely independent clone
*/

const OriginalUser = {
    name : "bhumika",
    age: 20,
    joined : new Date("2026-11-15"),
    address:{
        // A nested object
        city : "New Delhi"
    },
    roles : ["editor","viewer"]// an array
};

// use the built in function to create a deep copy 
const deepClone = structuredClone(originalUser);

// ----Let's prove it's a deep copy ---- 
//  1. Change a top-level primtive in the clone 
//  1. change a top-level primtive in the clone 
deepClone.age = 32;
// 2. Change a property in the NESTED object 
deepClone.address.city = "PUNE";

// 3. Mutate the nested Array 
// deepClone.roles.push("Admin");
// 4. Mutate the nested Date object 

// deepClone.joined.setFullYear(2026);

// --- Check the original object --- 
// Everything is completelty uuntouched! 
console.log(originalUser.age);
console.log(originalUser.address.city);
console.log(originalUser.roles);
// console.log(originalUser.joined.getFullYear());


const original = { 
     name: "Alice",
       sayHi: function() { console.log("Hi"); }
    };
    try {  
        const clone = structuredClone(original);
    } 
    catch (error) { 
             console.error(error.name); // "DataCloneError" 
              console.error(error.message); // "() => { console.log("Hi"); } could not be cloned."
    }

