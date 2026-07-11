const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(req.url);
    // console.log(req);
    // console.log(res);
    //  res.end(JSON.stringify({Name:"Raju kumar",Age:22,Email:"rajukumar@gmial.com"}));
    if(req.url == "/users"){
        res.end("Hello Coder Army and Hello Raju sir ");
    }
    else if(req.url == "/user"){
        res.end(JSON.stringify({Name:"Raju kumar",Age:22,Email:"rajukumar@gmial.com"}));
    }
    else if(req.url == "/contact"){
        res.end("You cannot connected with me ");
    }
    else{
        res.end("Some thing is invalied Operation ");
    }
});

server.listen(3000,()=>{
    console.log("Server is running at port 3000");
})