let x1 = 10;        // 8 bytes
x1 = "Rohitfaks";   // needs more bytes
x1 = "an even longer string...";  // needs even more
let a = 10;
let b = 3.14;
let c = "Rohit";
let d = true;
let e = { x1: 1 };
let x = 10;        // 8 bytes
x = "Rohitfaks";   // needs more bytes
x = "an even longer string...";  // needs even more



greet();              // Works — function fully built in Phase 1
console.log(x2);       // undefined — slot exists, value not assigned
console.log(y);       // ReferenceError — TDZ
console.log(z);       // ReferenceError — TDZ

var x2 = 10;
let y = 20;
const z = 30;
function greet() { console.log("Hi"); }
