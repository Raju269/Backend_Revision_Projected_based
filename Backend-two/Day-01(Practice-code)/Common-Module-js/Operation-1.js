
function add(a, b) {
    // THINK: This function is private to this file by default.
    // Only module.exports makes it available outside.
    return a + b;
}

module.exports = add;
// THINK: Now add is the ONLY thing that leaves this file.
// require('./math') will return just this function.