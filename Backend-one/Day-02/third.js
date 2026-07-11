const http = require("http");
const { parse } = require("path");
const { json } = require("stream/consumers");
const url = require("url");

const server = http.createServer((req, res) => {
  const parsed = url.parse(request.url, true);
  const operation = parsed.pathname.slice(1);
  const number1 = Number(parsed.query.num1);
  const number2 = Number(parsed.query.num2);

  if (operation === "add") {
    res.end(JSON.stringify(number1 + number2));
  } else if (operation === "sub") {
    res.end(JSON.stringify(number1 - number2));
  } else if (operation === "mul") {
    res.end(JSON.stringify(number1 * number2));
  } else if (operation === "div") {
    res.end(JSON.stringify(number1 / number2));
  } else {
    res.end("Invalid Operation ");
  }
  //   res.end("Hello ji kaise hai sab log ");
});

server.listen(3000, () => {
  console.log("Server is running at port 3000");
});
