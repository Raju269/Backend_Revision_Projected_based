const http = require('http');

const server = http.createServer((req,res)=>{
    // console.log(req.url);
    // console.log(req);
    // console.log(res);
    // res.end(JSON.stringify({name:"Rajukumar"}));

    if(req.url == "/"){
        res.end("This is my Home page ok");
    }
    else if(req.url == "/user"){
        res.end("THis is User data information ");
    }
    else{
        res.end("Invalid Operation hua hai ")
    }

})

server.listen(3000,()=>{
    console.log(`Server is Listening at 3000 port`);
})