const http = require('http')

const server = http.createServer((req,res)=>{
        console.log(req.url);

        if(req.url == '/'){
            res.end("Hello Raju kumar");
        }
        else if(req.url == '/user'){
            res.end("This is my User iNformation ");
        }
        else{
            res.end("Invalid Operation ")
        }
})

server.listen(3000,(req,res)=>{
    console.log(`Server is running at port 3000`)
})