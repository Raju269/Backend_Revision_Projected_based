 // ============ math.js ============
// THINK: This file has a job: math operations.
// It should ONLY contain math-related code.

let counter = 0; 
// THINK: counter is private. It stays in this file.
// No one outside can access or modify it.

function add(a,b){
    counter++; // Think counter can be modified inside this file 
    return a+b;
}

function substract(a,b){
    return a-b;
}

module.exports = { add, substract };
// THINK: Only add and subtract cross the boundary.
// counter is private. No one outside knows it exists.