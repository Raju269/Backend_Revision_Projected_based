const http = require('http');

const server = http.createServer( (request,response)=>{
    console.log(`This is my first server `)
})

server.listen(3000,()=>{
    console.log("Server is Running at port 3000 ")
})