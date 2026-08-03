const http = require('http');
const url = require('url');
const server = http.createServer((req,res)=>{
res.end("Hello ji kaise hai sab ")
})
server.listen(3000,()=>{
    console.log(`Server is Running at port 3000`);
})