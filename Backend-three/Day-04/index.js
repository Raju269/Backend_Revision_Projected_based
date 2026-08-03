const http = require('http');
const url = require('url');

const DataBase = [{name:"Rajukumar",
    age:23,
    email:'rajuk631149@gmail.com'
},{
    name:"piyushkumar", age:21,email:'piyushkumar@gmail.com'
}]
function deleteUser(User){
// user.email
for(let i=0;i<DataBase.length;i++){
    if(DataBase[i].email == user.email){
        DataBase.splice(i,1);
        break;
    }
}
}

function CreatedUser(){

}
function GetUser(){

}


// function patchUpdate(user){
//     for(let i=0;i<Database.length;i++){
//         if(Database[i].email == user.email){

//         }
//     }
// }

const server = http.createServer((req,res)=>{


    console.log(req.url);
    const parsed = url.parse(req.url,true);
    const operation =  parsed.pathname.slice(1);

    if(operation === "deleteUser"){
        deleteUser(parsed.query);
        res.end("I have delete the user");
        return;
    }
    else if(operation == 'CreatedUser'){
        CreatedUser(parsed.query);
        res.end("User is created ");
        return ;
    }

    else if(operation == 'GetUser'){
        GetUser(parsed.query);
        res.send(JSON.stringify(DataBase));
        return;
    }

    else{
        res.end("I am avaible");
    }
})

server.listen(3000,()=>{
    console.log(`Server is running at port 3000 `);
})