const http = require('http');
const server = http.createServer((req,res)=>{
    console.log(req.url);
    res.end(JSON.stringify({name:"Raju kumar"}));
    console.log(req)
})

server.listen(3000,()=>{
    console.log("Hi, I am listening the server ");
})