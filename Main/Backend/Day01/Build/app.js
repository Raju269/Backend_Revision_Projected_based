import { isValidEmail,isStrongPassword,isValidePhone } from "./Validator.js";

console.log(isValidEmail('raju.kmr.rudra@gmail.com'))
console.log(isValidEmail('raju.kmr.rudragmail.com'))
console.log(isValidEmail('rajukmrrudragmailcom'))


console.log(isValidePhone('8851538016'))
console.log(isValidePhone('875026'))


console.log(isStrongPassword('rajukmr2342'))
console.log(isStrongPassword('rajukm'))