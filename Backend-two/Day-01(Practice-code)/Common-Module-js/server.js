
// app.js
const handle = require('./Operation-1');
// THINK: require() returns whatever module.exports was set to.
// In this case, it's the add function directly.

console.log(handle(2, 39)); // 5
// THINK: We can call it directly because we got the function itself.





// const add = require('./Operation-1');
// console.log(add(2,3));
