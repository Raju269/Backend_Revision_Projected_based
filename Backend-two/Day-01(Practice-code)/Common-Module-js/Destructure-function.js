// math.js
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }

module.exports = { add, subtract, multiply };
// THINK: We're putting multiple functions in one object.
// require('./math') will return this entire object.