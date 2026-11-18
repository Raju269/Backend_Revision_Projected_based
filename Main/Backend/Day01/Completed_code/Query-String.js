// req.url = "/add?num1=10&num2=20"
const https = require('http');
const url = require('url');

const  server = https.createServer((req,res)=>{
    const parsed = url.parse(req.url,true);
    const operation = parsed.pathname.slice(1); //'add'
    const num1 = Number(parsed.query.num1);
    const num2 = Number(parsed.query.num2);

    res.writeHead(200,{
        'content-type':'application/json'
    });

    if(operation === 'add'){
        res.end(JSON.stringify({
            result : num1 + num2
        }));
    }
    else if(operation === 'sub'){
        res.end(JSON.stringify({
            result: num1 - num2
        }));
    }
    else if(operation === 'mult'){
        res.end(JSON.stringify({
            result : num1*num2
        }));
    }
    else if(operation === 'divide'){
        res.end(
            JSON.stringify({
                result:num1/num2
            })
        )
    }
    else{
        res.end("Invalid Operation ");
    }
})

server.listen(3000,(req,res)=>{
    console.log("Server running on port 3000");
})


// http://localhost:3000/add?num1=10&num2=20
// http://localhost:3000/sub?num1=10&num2=5
// http://localhost:3000/mult?num1=10&num2=5
// http://localhost:3000/divide?num1=10&num2=2
