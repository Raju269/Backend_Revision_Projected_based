const server = http.createServer((request, response) => {

    const number = Number(request.url.slice(1));

    // invalid url
    if(isNaN(number)) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: "Please provide a valid number" }));
        return;
    }

    // asking for more than available
    if(number > gitHub.length) {
        response.writeHead(400, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify({ error: `Maximum ${gitHub.length} profiles available` }));
        return;
    }

    const arr = gitHub.slice(0, number);

    response.writeHead(200, { 'Content-Type': 'application/json' });
    response.end(JSON.stringify(arr));
});

server.listen(3000, () => {
    console.log("Listening at port 3000");
});