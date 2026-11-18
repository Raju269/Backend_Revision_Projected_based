// ❌ WRONG — mulNumber is silently lost
exports.mulNumber = function() {}
module.exports = { add, subtract };

// WHY IT BREAKS:
// Step 1: exports.mulNumber = function() {}
//   → exports object now has: { mulNumber: fn }
//   → module.exports STILL points to same object: { mulNumber: fn }
//
// Step 2: module.exports = { add, subtract }
//   → module.exports now points to a NEW object: { add, subtract }
//   → exports still points to OLD object: { mulNumber: fn }
//
// Step 3: require() returns module.exports (the NEW object)
//   → Only { add, subtract } is returned
//   → mulNumber is LOST!

// Visual representation:
// Before: exports → { mulNumber } ← module.exports (same object)
// After:  exports → { mulNumber }     module.exports → { add, subtract }
//                                                  ↑ (new object, different!)

// solution 
// ✅ CORRECT — Pick ONE style and stick to it

// Style 1: Collect at bottom
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
module.exports = { add, subtract, multiply };

// OR

// Style 2: Export inline one by one
exports.add = function(a, b) { return a + b; }
exports.subtract = function(a, b) { return a - b; }
exports.multiply = function(a, b) { return a * b; }

// NEVER mix these two styles in the same file!