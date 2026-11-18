const https = require('http');

const Server = https.createServer((req,res)=>{
    console.log(req.url);
    
    if(req.url == '/'){
        res.end("Hello Backend ");
    }
    else if(req.url == "/user"){
        res.end("This is my User information ");
    }
    else { 
        res.end("Invalide operation ");
    }
});


Server.listen(3000,(req,res)=>{
        console.log(`Server is running at port 3000`)
})