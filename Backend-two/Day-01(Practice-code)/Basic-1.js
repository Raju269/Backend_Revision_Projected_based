const https = require('http');
const Server = https.createServer((req,res)=>{
   if(req.url == "/"){
    res.end(" Hello ji ")
   }
})

Server.listen(3000,(req,res)=>{
    console.log("Server is running at PORT 3000");
})