// ============ math.js ============
// THINK: This file has a job: math operations.
// It should ONLY contain math-related code.

let counter = 0;
// THINK: counter is private. It stays in this file.
// No one outside can access or modify it.

function add(a, b) {
    counter++; // THINK: counter can be modified inside this file
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

module.exports = { add, subtract };
// THINK: Only add and subtract cross the boundary.
// counter is private. No one outside knows it exists.


// ============ app.js ============
const math = require('../../../../Backend-two/Day-01(Practice-code)/Common-Module-js/Math.js');
// THINK: math = { add, subtract }
// counter is NOT accessible.

console.log(math.add(2,4));
console.log(math.substract(6,3));
console.log(math.counter);
// console.log(counter);