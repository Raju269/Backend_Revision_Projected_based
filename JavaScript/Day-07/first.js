// ? Moder Way (Recommended) : Object.keys, values, entries 

const user = {
    name : "Raju",
    forklift : "Linkde",
    age : 23,
    isStudent : true
}

// Object.keys(obj) - Looping Over Just the keys. 

//  This methods gives you an array of the object's Keys (the property Names)

const keys = Object.keys(user);

// keys is now : ["name", "age","isStudent"];

// Now we can use a simple for ...of loop on this new array 
for(const key of keys){
    const value = user[key];
    console.log(`The value is ${key} and the value is ${value}`)
}

// ! Object.values(obj) - Looping Over just the values 

const values = Object.values(user);
// Values is now : ["Raju", 20,true];

for(const value of values){
    console.log(`The value is : ${value}`)
}


// ! Object.entrites (obj) - The Best of Both worlds 
const entries = Object.entries(user);
//  entries is now : 
// [
// ["name","raju"],
// ["age","30"], 
// ["isStudent","true"], 
// ]

//  ! Destructuring 
// This is the cleanest and most common moder pattern 
for(const [key,value] of Object.entries(user)){
    console.log(`key:${key},Value : ${value}`)
}

// The Traditional Ways : for...in Loop 
// for(const key in Object){
     // code to run
// }

// Example 

const User = {
    name : "Rajukumar",
    age: 25,
    isStudent : true,
}

for(const key in user){
    // 'key' will be "name", then "age", then "isStudent"
    const value = user[key];
    console.log(`key:${key},Value:${value}`);
}

// ! Why for...in  is Usually Avoided
// ! The for...in  loop has a major "gotcha" that makes it less safe than the Object
// ! methods. It will also loop over properties that the object inherits from itsprototype chain.

// ? This is an Advanced concepts 
// let's modify the master Object prototype (Never do this in real code! );

Object.prototype.isInherited = true;

const person  = {name : "sumit"};

console.log("---Using for ...in---");
for(const key in person){
    console.log(key);
}
console.log("\n---Using Object.keys---");
console.log(Object.keys(person));
// Because for...in  sees the inherited isInherited  property, it can causeunexpected behavior. The Object.keys()  method correctly ignores it. To make 
// for...in  safe, you have to add an extra check, which makes it clumsy.

for(const key in person){
    if(person.hasOwnProperty(key)){
        // Now it's safe, but it's more work
    }
}; 
