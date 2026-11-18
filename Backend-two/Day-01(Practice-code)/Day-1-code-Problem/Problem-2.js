// Problem 2 — What if User Hits an Invalid URL? 
// Edge case problem to understand 
// User hits `http://localhost:3000/abc`


let number = Number("abc");    // NaN


// Now you loop `NaN` times. Your `arr` is empty. No error message. User gets `[]` back confused.

// You need to handle this —


if(isNaN(number)) {
    response.writeHead(400);
    response.end(JSON.stringify({ error: "Please provide a valid number" }));
    return;
}
