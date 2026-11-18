// Correct Approach - Password check on Backend 
// file : Server.js (backend -runs on Your machine)

const express = require('express');
const app = express();


const REAL_PASSWORD =  "password 123" ; // User can Never see this 

app.post('login',(req,res)=>{
    const userAttempt = req.body.password;

    // Think : This comparsion happens on MY machine 
    // User sends their Attempts -> I verify -> I send only yes / no
    if(userAttempt === REAL_PASSWORD){
        res.json({
            success:true
        });
    }   
    else{
        res.json({
            success:false
        });
    };
});

// User only sees : {Success : true} or {success: false}
// They  Never see the actual Password

app.listen(3000,(req,res)=>{
    console.log("server is listening ");
})