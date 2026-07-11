const http = require("http");
const url = require("url");
const Database = [
  { name: "Raju", age: 22, email: "rajukumarW@gmail.com" },
  { name: "vikas", age: 44, email: "vikas@gmail.com" },
];

function createUser(user) {
  Database.push(user);
}
// user  =
function DeleteUser(user) {
  // user.email
  let index = 0;
  for (let i = 0; i < Database.length; i++) {
    if (Database[i].email == user.email) {
      ~(
        // index = i;
        Database.splice(i, 1)
      );
      break;
    }
  }
}
const server = http.createServer((req, res) => {
  //   console.log(req.url);
  const parsed = url.parse(req.url, true);
  const operation = parsed.pathname.slice(1);

  if (operation == "deleteUser") {
  } else if (operation == "createUser") {
    createUser(parsed.query);
    res.end("User is created ");
  } else if (operation == "getUser") {
  }
});

server.listen(3000, () => {
  console.log("server at listening at port 3000");
});
