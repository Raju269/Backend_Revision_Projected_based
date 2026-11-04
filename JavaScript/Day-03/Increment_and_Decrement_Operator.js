let postfix = 5; 
let prefix = 5;
console.log(postfix++); // Prints 5. `postfix` is now 6
console.log(postfix);
console.log(++prefix);// Print 6. prefix is now 6
console.log(prefix);


let a = 10; 
a = ++a - a++ - --a + a++ - --a - a--;
console.log(a);