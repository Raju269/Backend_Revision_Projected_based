const https = require('http');
// Think : require () loads the built-in http module. 
// This is module has everything needed to create a web server. 

const server = https.createServer((req,res)=>{
    // Think : This callback run every time a request comes in. 
    // req = request object (what the client sent to us)
    // res = response object (what we send back to client)
    
    
    console.log(req.url);

    // Think : req.url tells us what path the user requested 
    // for https://localhost:3000/user -> req.url = "/user"
    // for https://localhost:3000/ -> req.url = "/"

    if(req.url == "/"){
        // Think : User hit the home page 
        res.end("Hello Coder Raju");
        // Think : res.end() sends the respnse and ens it. 
        // no more code should run after res.end() for this request.
    }
    else if(req.url == '/user'){
        // Think : User hit the /user path 
        res.end(JSON.stringify({
            name:"raju",
            age:23,
            isStudent : true,

        },null,2));
        // Think : we can send JSON too! 
        //! JSON.Stringify converts JS Object to JSON String
        // client receives: {"name":"Raju"}
     
    }
    else {
        // Think : User h it some other path (like / random)
        res.end("I am best");
        // Think : Catch-all for any path we didn't handle. 
    }
});

server.listen(3000,(req,res)=>{
    console.log("Hi , I am listening ");
    // Think : this is callbacks run after server starts listening 
    // it confirms the server is ready to accepts requests. 
})