import { isValidEmail, isStrongPassword , isValidPhone } from "./validator.js";

console.log(isValidEmail('rajukumar@gmail.com'));
console.log(isValidEmail('rajukumar@gmailcom'));

console.log(isValidPhone('8750263761'));
console.log(isValidPhone('875761'));

console.log(isStrongPassword('Rajukumar1234'));
console.log(isStrongPassword('Raju'));