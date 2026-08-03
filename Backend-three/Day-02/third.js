const  http = require('http');
const { parse } = require('path');
const url = require('url');

const server = http.createServer((req,res)=>{
    // parsed =
// {
//     pathname: "/add",
//     query: {
//         num1: "10",
//         num2: "20"
//     }
// }
    const parsed = url.parse(req.url,true);
    const operation = parsed.pathname.slice(1);
    const number1 = Number(parsed.query.num1);
    const number2 = Number(parsed.query.num2);

    if(operation == 'add'){
        res.end(JSON.stringify(number1+number2));
    }
    else if(operation == 'sub'){
        res.end(JSON.stringify(number2-number1));
    }
    else if(operation == 'mul'){
        res.end(JSON.stringify(number1*number2));
    }
    else if(operation == 'div'){
        res.end(JSON.stringify(number2/number1));
    }
    else{
        res.end("Invalid operation ");
    }
})

server.listen(3000,()=>{
    console.log(`server is running at port 3000`)
})