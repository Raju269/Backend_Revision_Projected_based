// math.js
export function add(a, b) {
    // THINK: 'export' keyword makes this function available outside.
    return a + b;
}

export function subtract(a, b) {
    return a - b;
}

export function multiply(a, b) {
    return a * b;
}

export const PI = 3.14;

export default function div(a,b){
    return b/a;
}
// THINK: You can export constants too!
// Total named exports: 4 (add, subtract, multiply, PI)