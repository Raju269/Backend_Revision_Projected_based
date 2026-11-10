
/*
The Key Difference
Spread = Unpack/Expand (takes one thing and breaks it apart)
Rest = Pack/Collect (takes many things and combines them into one)
Think of it like a suitcase:

Spread = Opening a suitcase and spreading clothes everywhere
Rest = Gathering scattered clothes and packing them into a suitcase
*/


// ! Spread Operator ( Expanding / Unpacking )

const numbers = [1,2,3];
// Spread: Unpack the array into individual elements 
console.log(...numbers); // Output : 1 2 3 (three separate values)
console.log(numbers); // ouput : [1,2,3](one array)

// Practical use: Combining arrays. 
const moreNumbers = [4,5,6];
const combined = [...numbers, ...moreNumbers];
console.log(combined); // [1,2,3,4,5,6,7,];

// Practical use : Copying an array
const copy = [...numbers];

// Practical use: Passing array elements as function argurment 
function add(a,b,c){
    return a+b+c;
}
console.log(...numbers); // Same as add(1,2,3);

console.log(copy);

console.log(add(...numbers));


// ! Objects 

const person = {name:"Raju", age : 24};

// Spread : Unpack object properties
const updatePerson = {...person, city:"NYC"};
console.log(updatePerson);
// {name:"Raju", age: 24, city: "NYC"}

// OverWriting properties 
const olderPerson = {...person, age: 30};
// {name: "Raju", age: 24};

/**
 REST Operator (Collecting/Packing)
Takes multiple individual elements and collects them into an array.

*/

// ! In Function Parameters
// Rest : collect all remaining arguments into an array 
function sum(...numbers){
    console.log(numbers);
    return numbers.reduce((total,num)=>total+num,0);
}
console.log(sum(1,2,3,4,5,6));
// Inside the function, numbers = [1,2,3,4,5];

// Mixing regular params with rest 
function introduce(greeting, ...names){
    console.log(greeting);// "Hello"
    console.log(names); //  
}
introduce("Hello","Raju","sneha","bhumika");


// ! In Destructuring (Arrays)

const Numbers = [1,2,3,4,5];

// Rest : Collect the 'rest' of the elements

const [first,second,...others] = numbers;

console.log(first)
console.log(second)
console.log(others) //[3,4,5] - Collected into an Array!

// In Destructuring (Object)

const persons = {
    name:"Anirudh Ravichander",
    age: 25, 
    city : "NYC",
    country : "India"
}
// Rest: Collect remaining properties 
const {name, ...othersInfo} = person;
console.log(name);
console.log(othersInfo);

//!  side by side comparsion 
// Spread : Taking an array and spreading it out
const arr = [1,2,3];
console.log(...arr);

// Rest : Taking separate values and collecting them 
function example(...params){
    console.log(params); //[1,2,3] (one array)
}
example (1,2,3);



// ! How to Remember which is which 
// ? Right side of assignment = SPREAD (expanding)
const origin = [1,2,3,4,5];
const copy123 = [...origin]; 
// Spreading origin 
console.log(copy123)
const Array = [10,20,30,40];

// ? Left side of assignment = REST (collecting)
const [first1,...rest] = Array; // collecting rest
console.log(first1,rest);

// ? Function call = SPREAD (unpacking arguments)

function myFunction(arr){
    let arr = ['Rau','va',wer];
}
myFunction(...array); // Spreading array into arguments

// ? Function definition = REST (collecting parameter)
function myFunction(...params){
    // collecting params
}


// ! Real World Example : Both Together 

function logDetails(name, age, ...hobbies){
    // REST : hobbies collects remaining arguments into array 
    console.log(`${name} is ${age} year old`);
    console.log("hobbies",hobbies);
}

const personinfo = ["Raju",23,"reading","coding","hiking"];
// SPREAD : Unpack array into individual argurments;
logDetails(...personinfo);
// output: 
// Alice is 25 year old
// Hobbies: ["reading", "coding","hiking"];


// Quick Rule
// Spread = ... takes ONE thing → makes it MANY
// Rest = ... takes MANY things → makes it ONE