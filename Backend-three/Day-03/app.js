import { isValidEmail } from "./validator.js";
import { isValidPhone } from "./validator.js";
import { isStrongPassword } from "./validator.js";

console.log(isValidEmail('rajuk631149@gmail.com '))
console.log(isValidEmail('rajuk63114'))
console.log(isValidPhone('8750263761'));
console.log(isValidPhone('234234'));
console.log(isStrongPassword('Rajukmr269'));
console.log(isStrongPassword('Raju'));