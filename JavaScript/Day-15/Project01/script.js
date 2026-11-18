console.log("Star")
const reponse =  await fetch("https://api.github.com/users?per_pages=20");
const data = await reponse.json();
console.log("End");

// console.log(reponse);
console.log(data);

const jsObject = {
    name:"Raju",
    age: 23,
    logIn : true,
}

const jSon =  `{
    "name" :"Raju",
    "age":20,
    "logIn":true
}`  // String hai 
