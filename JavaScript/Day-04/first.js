let wheather = "sunny";
if(wheather == "raining"){
    console.log("Put on a raincoat ");
}
else if(wheather == "sunny"){
    console.log("Put on the next question");
}
else{
    console.log("Just wear a regular sweater. ");
}


//! Base if statement 
if(true){
    console.log("It will run ")
}

if(false){
    console.log("It will not run");
}

let temperature = 30; 
if(temperature>25){
    console.log("It's a hot day! Wear shorts");
}


let age = 16;
if(age>=18){
    console.log("you are old enough to vote");
}
else{
    console.log("your are not old enough to vote yet");
}


// ! if else if else chain 

let score = 95;
let grade;
if(score>=90){
    grade = "A";
}
else if (score>=80){
    grade = "B";
}
else if(score>=70){
    grade = "C";
}
else if(score>=60){
    grade = "D";
}
else{
    grade = "F";
}
console.log(`Your grade is ${grade}`);