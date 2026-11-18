// Problem 3 — What if User Asks for More Than 100?

// You only have 100 profiles. User hits `/500`.

// Your loop runs 500 times. `gitHub[i]` returns `undefined` for indexes beyond 100.

// You send 400 undefined values back.

// You need to handle this —

if(number > gitHub.length) {
    response.writeHead(400);
    response.end(JSON.stringify({ error: `Maximum ${gitHub.length} profiles available` }));
    return;
}