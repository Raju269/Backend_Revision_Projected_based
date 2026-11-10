// ! Arrow Function in depth 
// ToDo Syntax Breakdown 
const add = function(a,b){
    return a+b;

};


const add2 = (a,b) => {
    return a+b;
}

const add3 = (a,b) => a+b;


// Traditional 
const square = function(x){
    return x * x;
}
// Arrow function with one parameter 
const squareArrow = x => x *x ; 
console.log(squareArrow(5));

const sayHello = () => "Hello ji "; // zero parameters
const sum = (a,b,c) => a + b + c; // Three parameters
 console.log(sayHello())
 console.log(sum(10,20,30))

//  Important Gotcha: Returning an Object Literal If you want to implicitly return an object literal, you must wrap it in parentheses to distinguish it from a function body's curly braces.

// ? Wrong : this is interpreted as a function body with a label , returning undefined. 
const createUser = name => {name:name};

// Correct : wrap the object in paratheses. 
const createUserCorrect = name = ({name: name});
console.log(createUser("Piyush"));
console.log(createUserCorrect);


