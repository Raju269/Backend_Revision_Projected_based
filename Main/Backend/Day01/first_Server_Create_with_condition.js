const http = require('http')
const server = http.createServer((req,res)=>{
    console.log(req.url);
    //?  res.end(JSON.stringify({Name:"Rajukumar",
    //?      Age:22, 
    //?      Email:"rajuk631149@gmail.com",
    //?      isStudent : true
    //?  }));
    //?  console.log(res);
    //?  console.log(req);
// TODO [TEST case to the url ]
// ? If test case if passed 
if(req.url == "/users"){
    res.end("Hello Backend lets to start completed backend ");
}
else if(req.url == "/profile"){
    res.end(JSON.stringify({
          Name:"Rajukumar",
          Age:22, 
          Email:"rajuk631149@gmail.com",
          isStudent : true
        }))
}
// ! if test case is == conctact they show the data 
else if (req.url == "/contact"){
    res.end("You cannot connected with me ");
}
// ! if test case if fail beacuase of invalid url 
else{
    res.end("some thing is invalid Operation ");
}
});

server.listen(3000,(req,res)=>{
    console.log("Server is running at port 3000");
})