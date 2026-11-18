// app.js
import add, { subtract } from './Default-Export-.js';
// THINK: Default import comes FIRST (no curly braces).
// Then named imports in curly braces.

console.log(add(2, 3));        // 5
console.log(subtract(5, 2));   // 3