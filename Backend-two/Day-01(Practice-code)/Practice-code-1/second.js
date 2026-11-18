// // ✅ CORRECT APPROACH — Password check on BACKEND
// // File: server.js (backend - runs on YOUR machine)

// const express = require('express');
// const app = express();

// const REAL_PASSWORD = "password123"; // User can NEVER see this

// app.post('/login', (req, res) => {
//     const userAttempt = req.body.password;
    
//     // THINK: This comparison happens on MY machine
//     // User sends their attempt → I verify → I send only yes/no
//     if (userAttempt === REAL_PASSWORD) {
//         res.json({ success: true });
//     } else {
//         res.json({ success: false });
//     }
// });

// User only sees: { success: true } or { success: false }
// They NEVER see the actual password


const express = require('express');

const app = express();

const REAL_PASSWORD = "Raju@123"; // User can Never see this 

app.login("/login",(req,res)=>{
    const userAttempt = req.body.password;

    // Think : This comparsion happens on My machine 
    // User sends their attempst =>  I verify  => I send only yes / no 
    if(userAttempt === REAL_PASSWORD){
        res.json({
            success:true,
            message: "You are Login successfully"
        })
    }
    else{
        res.json({
            success:false,
            message:"Invalid credintal "
        })
    }
})

// User Only see : (Success : true) or (Success : False)
// They NEVER see the actual password 