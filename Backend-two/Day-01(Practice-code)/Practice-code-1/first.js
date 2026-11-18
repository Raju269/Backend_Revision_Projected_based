// ❌ WRONG APPROACH — This code lives in the BROWSER
// File: login.js (frontend)

const password = "password123";

function login(userInput) {
    // THINK: Where does this code RUN?
    // ANSWER: On user's machine. They can see this password.
    if (userInput === password) {
        return "Logged in!";
    }
    return "Wrong password!";
}

// User opens DevTools → Sources → sees "password123"
// Game over.

const password1 = "password123";

function login(userInput){
    // Think : Where does this code RUN? 
    // Answer : On user Machine. They can see this password 

    if(userInput == password1){
        return "Logged in!";
    }
    return "Wrong password!";
}

// User opne devTools => sources => sees "password123"
// Game Over 