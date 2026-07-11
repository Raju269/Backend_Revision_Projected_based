const http = require("http");
const { json } = require("stream/consumers");

const server = http.createServer((request, response) => {
  const path = request.url.split("/");
  //   path =  ["","add",10,20];
  const operation = path[1];
  const number1 = Number(path[2]);
  const number2 = Number(path[3]);

  if (operation === "add") {
    console.log(JSON.stringify(number1 + number2));
  } else if (operation === "sub") {
    console.log(JSON.stringify(number1 - number2));
  } else if (operation === "mul") {
    console.log(JSON.stringify(number1 * number2));
  } else if (operation === "div") {
    console.log(JSON.stringify(number1 / number2));
  } else {
    console.log(`Invalid Operation `);
  }
});

server.listen(3000, () => {
  console.log(`Server listen at PORT 3000`);
});
