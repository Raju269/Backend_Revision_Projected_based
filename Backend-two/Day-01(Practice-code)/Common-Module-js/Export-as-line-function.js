// math.js
exports.add = function(a, b) {
    // THINK: exports is a shorthand for module.exports.
    // Initially, exports === module.exports (same object reference).
    return a + b;
}

exports.subtract = function(a, b) {
    return a - b;
}

exports.multiply = function(a, b) {
    return a * b;
}

// THINK: Each line adds a property to the exports object.
// Final result: exports = { add, subtract, multiply }
// module.exports still points to the same object.