let integer = 100;
let float = 99.5;

console.log(integer);
console.log(float);

console.log(typeof integer);
console.log(typeof float);

// ? Creating Number 
// ! Standard Literal 
let a = 25;
let b = 12.34;
console.log(a)
console.log(b)

// ! Exponential Notation.
let billion = 1e9;
let tiny = 5e-6;
console.log(billion);
console.log(tiny);

// ! OtherBases (Hex, Binary , Octal)
let hex = 0xFF;
let binary = 0b1010;
let octal = 0o77;
console.log(hex);
console.log(binary);
console.log(octal);

// ! The Gotcha : Floating point inacuracy 
console.log(0.1+0.2);
console.log(0.1+0.2 === 0.3);

// ! Special Numeric Values 
console.log(1/0);
console.log(-1/0);
console.log(typeof Infinity);
console.log("hello"/2);
console.log(Math.sqrt(-1));
console.log(typeof NaN);
console.log(NaN === NaN);

console.log(Number.MAX_VALUE());
console.log(Number.MAX_SAFE_INTEGER());
console.log(Number.MIN_VALUE());
console.log(Number.MIN_SAFE_INTEGER());
console.log(Number.EPSILON());

// ? Checking Number Types 
console.log(isNaN(234));
console.log(isNaN('asdfsaldfjsd'));
console.log(Number.isNaN('asdfsaldfjsd'));

let result = 0/0; 
isNaN(result);
Number.isNaN(result);

console.log(Number.isFinite(Infinity));
console.log(Number.isFinite(234));
console.log(Number.isInteger(234.23423));

// ! Converting Nuumbers 

let num = 255; 
console.log(num.toString());
console.log(num.toString(16));
console.log(num.toString(2));

let price = 234.234234234;
console.log(price.toFixed(2));

let n = 123.2343;
console.log(n.toPrecision(4));


// TODO Math Object 
console.log(Math.round(23.23));
console.log(Math.floor(2.54));
console.log(Math.ceil(3.23));
console.log(Math.trunc(234.234234324234));


// Common Function 
console.log(Math.abs(-242342));
console.log(Math.pow(2,4));
console.log(Math.sqrt(4,4));
console.log(Math.max(20 , 23, 32));
console.log(Math.min(20 , 23, 32));
console.log(Math.random());