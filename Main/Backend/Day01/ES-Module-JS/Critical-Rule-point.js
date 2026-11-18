// ✅ VALID — import at top
import {add} from './Maths.js';
const result = add(2,4);
console.log(result);


// ❌ INVALID — import inside if statement
// if (someCondition) {
//     import { add } from './math.js'; // SyntaxError!
// }

// ❌ INVALID — import inside function
// function myFunction() {
//     import { add } from './math.js'; // SyntaxError!
// }

// WHY this rule exists:
// Because import is always at top, Node.js can:
// 1. Scan entire file BEFORE running anything
// 2. Find all imports upfront
// 3. Load them all SIMULTANEOUSLY in parallel
// This makes ESM FASTER than CommonJS.