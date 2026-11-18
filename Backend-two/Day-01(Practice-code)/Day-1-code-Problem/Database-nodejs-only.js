import http from 'http'

const Database = [];

const server = http.createServer((req,res)=>{
    
    if(req.method=="GET" && req.url=="/user"){
        res.end(JSON.stringify(Database));
    }

    if(req.method=="POST" && req.url == "/user"){
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            const user = JSON.parse(body);
            Database.push(user);
            res.end(JSON.stringify(user));
        })
    }

    if(req.method=="PATCH" && req.url == "/user"){
        let body = '';
        req.on('data',(chunk)=>{
            body+=chunk;
        })
        req.on('end',()=>{
            const user = JSON.parse(body);
            
            let fetchUser = null;
            for(let i=0;i<Database.length;i++){
                if(Database[i].email==user.email){
                    fetchUser = Database[i];
                    break;
                }
            }

            if(fetchUser==null)
                {
                    res.end("No user Found");
                    return;
                }

            for(const {keys,values} of Object.entries(user)){
                fetchUser[keys] = values;
            }

            res.end("User Info Updated successfully");
        })
    }
})

server.listen(3000,()=>{
    console.log("I am listening at port 3000")
})
