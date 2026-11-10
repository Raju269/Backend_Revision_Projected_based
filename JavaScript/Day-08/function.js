// ! Function 
// 1. Declaration : writing the recipe 
//  - function is the keyword 
//  -greet is the name of our function. 
// - (name) is the parameter, a placeholder for the input. 

function greet(name){
  //  The code inside the {} is the "body" of the function. 
  const message = `Hello,${name}`;
  return message; // 3. RETURN VALUE : Giveing back the result. 
}

// 2. Calling : Using the recipe with a specific ingredinet ("RAJU")

const greetingforAlice = greet("Raju");
console.log(greetingforAlice); // output : "Hello,Raju"

const greetingforBhumika = greet("Bhumika");
console.log(greetingforBhumika); // output : "Hello, Bhumika"


// ! Part 2 Different Ways to Create Functions. 
// ? A function Declaration 


console.log(add(10,5));
function add(a,b){
  return a+b;
}



console.log(add(2,3));// 5 (This works!);

console.log("Function"); 


// ? Function Expression 

const substract = function(a,b){
    return a - b;
}

substract(10,5); // This would throw a Reference Error ! 

console.log(substract(10,4));



// TODO Arrow Functions (ES6 - The Modern Way)
// ? A function expression 
const multiply = function(a,b){
    return a*b;
}
// The same function as an arrow function 
const multiplyArrow = (a,b) =>{
    return a*b;
}

console.log(multiply(10,3));
console.log(multiplyArrow(10,2));


// Syntax Rules for Arrow Functions:

// Implicit Return: If the function body is just a single expression, you can remove the curly braces {} and the return keyword.

const multiplyShort = (a,b) => a*b ; // The result of a * b is automatically returned 
console.log(multiplyShort(4,2));

// Single Parameter : If there is only one parameter, you can remove the parentheses ().

const square = x => x*x ;
console.log(square(5));


// ! Advanced Parameter Concepts

//  ! A Default Parameter (ES6);
// The default value for `name` is "Guest"

function greet(name = "Guest"){
    console.log(`Hello ${name}`);
}
greet("Piyush");
greet();

// ! REST Parameters (...) (ES6)
// The '...numbers' gather all arguments passed into an array called 'numbers'.

function sumAll(...numbers){
    let total = 0; 
    for( const num of numbers){
        total +=num;
    }
    return total; 
}
console.log(sumAll(1,2))
console.log(sumAll(1,2,3,4,5))
console.log(sumAll(1,-3,2))

// ! Part 4 Scope : Where Do Variable Live ? 
let globarVar = "I am global";
function myFunction(){
    let localVar = "I am local";
    console.log(globarVar);// "I am global (can access global Variable)"
    console.log(localVar); // "I am local"
}
myFunction();

// console.log(localVar); 
// ReferenceError : LocalVar is not defined

// Rest vs Spread : The same syntax, Opposite purpose 
