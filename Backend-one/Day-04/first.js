const http = require("http");
const url = require("url");
const Database = [
  { name: "Raju", age: 22, email: "rajukumar@gmail.com" },
  {
    name: "Piyush",
    age: 20,
    email: "vikas@gmail.com",
  },
];
const server = http.createServer((req, res) => {
  if (req.url == "/userInfo") {
    res.end(JSON.stringify(Database));

    res.end("User is created ");
  } else if (req.url == "/deleteuser") {
    Database.pop();
    res.end("User is Deleted");
  }

  //     console.log(req.url);
  //   res.end("Operation is done ");
});

server.listen(3000, () => {
  console.log("Serve at listening at Port 3000 ");
});
