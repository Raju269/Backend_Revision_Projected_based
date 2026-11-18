const {add} = require('./Destructure-only-what-you-need');
console.log(add(5,2));

// app.js
// THINK: Destructuring pulls out only the 'add' property.
// Same as: const math = require('./math'); const add = math.add;

console.log(add(2, 3)); // 5
// THINK: We only have access to add, not subtract or multiply.