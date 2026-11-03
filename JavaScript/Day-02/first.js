console.log("Hello javaScript");

// variable 
let a = 10;
console.log(a);
var b = 20;
console.log(b)
const c = 23;
console.log(c);


// ! Type of Vairable in JavaScript 
//  ? var
//  ? let 
//  ? const


// TODO Block Scope 
if(true){
    let PI = 3.14159;
    console.log(PI);
}
console.log(PI);  //? Reference Error : PI is not defined 

// ? Reassignment 
let greeting = "Hello ji ";
greeting = "Hi";
console.log(greeting);

// ? Mutability 
let Config = {port:8080};
Config.port = 3000;  // this is allowed . Config still points to the same object. 

//?  Temporal Dead Zone 
//?  console.log(my_let); // ReferenceError : Cannot access 'MY_CONST' before initializationcon
let my_let = 100;


// Block Scope
if (true) 
{  const PI = 3.14159;}// console.log(PI); // ReferenceError: PI is not defined
// Reassignment
const GREETING = "Hello";
// GREETING = "Hi"; // TypeError: Assignment to constant variable
// Mutability
const CONFIG = { port: 8080 };CONFIG.port = 3000; // This is allowed. CONFIG still points to the same object

// Temporal Dead Zone
// console.log(MY_CONST);
 // ReferenceError: Cannot access 'MY_CONST' before initialization
 const MY_CONST = 100