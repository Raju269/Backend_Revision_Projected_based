// Primtive data types
// String 
let name = "Raju kumar";
console.log(name);
let greeting = "Hello, JavaScript";
console.log(greeting);
let collegeName = 'YMCA';
console.log(collegeName);
let template = `User ${name} is and college is name is : ${collegeName}`;
console.log(template);


// Number 
let integerValuue = 1000;
console.log(integerValuue);
let floatValue = 3.14;
console.log(floatValue);
let notAtNumber = NaN;
console.log(notAtNumber);
let infinity = Infinity;
console.log(infinity);
const fixedValued = 1234567789;
console.log(fixedValued);
const fixedFloatingValue = 7843.32423;
console.log(fixedFloatingValue);
const notNumber = NaN;
console.log(notAtNumber);
const negativeInfinity = -Infinity;
console.log(negativeInfinity);


// boolean 
let isLoggedIn = true;
console.log(isLoggedIn);
let isStudent = false;
console.log(isStudent);
const isPaymentSuccessful = true;
console.log(isPaymentSuccessful)
const isBatchEnrolled = false;
console.log(isBatchEnrolled);

// undefined. 
let userIsLoggedIn ;
console.log(userIsLoggedIn);

// null 
let isPaymentDeclined = null ; // Intentionally set to have no value
console.log(isPaymentDeclined);

// bigint 
const distanceSunwithEarth = 9992398423423423484234n;
console.log(distanceSunwithEarth);
const lightSpeed = BigInt(239487209857249732485n);
console.log(lightSpeed);


// Symbol
const id1 = Symbol('id');
const id2 = Symbol('id');
console.log(id1===id2); // output is false (every symbols is a unique)

// Non Primitive or Object type. 

let Student = { 
    firstName : "Raju",
    lastName : "kumar",
    isAge : 23
}

console.log(Student);


// Array 
let isMarks = [10,20,30,40,50,60,70,80,90,100];
console.log(isMarks);

// function 
function sayHello(){
    console.log("Hello everyone to enjoy Learn JavaScript concepts");
}

sayHello();


//! Primitives are Passed Valuuue and Assigned by Value 
let a = 10; 
let b = a; // The value of 10 is coped into b 
b = 20; // This only change b 
console.log(a); // output : 10 (a is unaffected)
console.log(b); // output : 20 


//! Object are Passed / Assigned by Reference 
let obj1 = {value : 10 };
let obj2 = obj1; // The reference to the object is copied into obj2 ; 
// Both obj1 and obj2 now point to the exact same object in memory 
obj2.value = 400; // we are modiying the object through obj2 
console.log(obj1.value);// Outputs : 400 (Obj1 is affected because it points to the same objects);

console.log(obj2.value); // outputs : 400