const https = require('http');
const server = https.createServer((req,res)=>{
    if(req.url == "/"){
        res.end("Hello Raju ji kaise hai ");
    }
})

server.listen(3000,(req,res)=>{
    console.log("Server is running at PORT 3000");
})