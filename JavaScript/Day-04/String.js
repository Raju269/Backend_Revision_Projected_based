// ! String 
// ? Single Quotes 
let singleQuoted = 'Hello, world';
console.log(singleQuoted);

let doubleQuotes = "He said, 'Hello!' ";
console.log(doubleQuotes);

let singleQuotedWithDouble = 'She repled , "Hi!" ';
console.log(singleQuotedWithDouble);

let templatedLiteral = `This is a templated literals`;
console.log(templatedLiteral);

let greeting = "hello";
console.log(greeting.length);
let emptyString = "";
console.log(emptyString.length);

// ! Access Indivisdual Characters 
let message = "JavaScript";
console.log(message[0])
console.log(message[1])
console.log(message[2])
console.log(message[3])
console.log(message[4])
console.log(message[5])
console.log(message[6])
console.log(message[7])
console.log(message[8])
console.log(message[9])
console.log(message[message.length-1]);

// !C. The Golden Rule: Strings are Immutable 

let name = 'Raju';
name[0] = 'K';
console.log(name);

let upperName = name.toUpperCase();
console.log(upperName);
let lowName  = name.toLowerCase();
console.log(lowName);

// ? Common and Essential String Methods

let whisper = "please be quiet";
let shout = whisper.toUpperCase();
console.log(shout);

let a = "Rajukumar is a good boy";
console.log(a.indexOf("is"));
console.log(a.lastIndexOf("boy"));
console.log(a.indexOf("good"));

console.log(a.includes("Rajukumar"));
console.log(a.slice(0,7));
console.log(a.slice(5));
console.log(a.slice(-7));
// console.log(a.subStr(0,9));
console.log(a.replace("boy","Men"));

console.log(a.trim())

let csvData = "item1,item2,item3";
let items = csvData.split(","); // ["item1", "item2", "item3"]
let words = "The quick brown fox";
let word_array = words.split(" "); // ["The", "quick", "brown", "fox"]
let letters = "abc";
let letter_array = letters.split("");