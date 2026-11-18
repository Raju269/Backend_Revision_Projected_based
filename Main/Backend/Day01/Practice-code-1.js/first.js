// ❌ WRONG APPROACH — This code lives in the BROWSER
// File: login.js (frontend)

const password = "password123";

function login(userInput){
    // Think : where does this code RUN ? 
    // Answer : On user's machine. They can see this passoword. 
    if(userInput === password){
        return "Logged In! ";
    }
    return "Wrong Password! ";
}

// User opnes DevTools -> Source -> Sees "password123" 
// Game over 
const password1 = "password123";

function login(userInput){
    // Think : Where does this code Run ? 
    //  Anser : On user Machine. they can see this password 

    if(userInput == password1){
        return "Logged in ! ";
    }
    return "Wrong password! ";
}

// User opne devTools => sources => sees "password123"
// Game Over 