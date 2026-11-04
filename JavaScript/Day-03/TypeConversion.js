// ! Type Conversion and Type casting 
let a  = 234234234234n; 
let b = a; 
console.log(b);

//? Explicit Conversion 

// TODO What a Numer(use Number[])
// TODO What a String(use String())
// TODO What a Boolean(use Boolean)

// ? Converting to a String 
let num = 123;
let strNum = String(num); // '123';
console.log(strNum);

let bool = true;
let strBool = String(bool); // true;
console.log(strBool);

let value = null;
let strValue = String(value);
console.log(strValue);

let arr = [10,20,30,40,50];
let strArr = String(arr);
console.log(strArr);

let longNum = 234234234234n;
let StrLongNum = String(longNum);
console.log(StrLongNum);


// ! Converting to a Number 
let strNumber  = '12345';
let number = Number(strNumber);
console.log(number);


let strFloatNumber  = '12345.6789';
let floatnumber = Number(strFloatNumber);
console.log(floatnumber);

let boolean = true;
let isLogginedIn = false;
let loggedNumber = Number(isLogginedIn);
let boolNumber = Number(boolean);
console.log(boolNumber);
console.log(isLogginedIn);

let nothing = null; 
let nothingNumber = Number(nothing);
console.log(nothingNumber);

let name = "Rajukumar";
let nameNumber = Number(name);
console.log(nameNumber);


let strspace = "            399             ";
let strspaceNumber = Number(strspace);
console.log(strspaceNumber);

// ! Method 2 ParseInt() and ParseFloat();
parseInt("100px");
parseInt("3.14em");
parseFloat("chapter2")
parseFloat("234 78399 4.234234");
parseFloat(NaN);
parseFloat(true);
parseFloat(false);
parseFloat(undefined);
parseFloat(null);

// ? easy trick 
let string1 = '50';
let num2 =+string1;
console.log(num2)

// ! Converting to a Boolean 
Boolean(0)
Boolean("")
Boolean(null)
Boolean(undefined)
Boolean(NaN)
Boolean(100)
Boolean(100.342)
Boolean("Hello ji ")
Boolean("false")
Boolean([])
Boolean({})
