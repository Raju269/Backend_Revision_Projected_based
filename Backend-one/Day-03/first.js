const http = require("http");
const server = http.createServer((req, res) => {
  res.end("Mewo mewo");
});

server.listen(3000, () => {
  console.log("Server is listen at 3000 port ");
});
