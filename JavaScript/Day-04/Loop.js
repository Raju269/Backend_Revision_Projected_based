
for(let i=0;i<=5;i++){
    console.log("This is repetition number is : "+i);
}

// ! While Loops 
let i =0;
while(i<=5){
    console.log("Hello java");
    i++;
}

let playerHealth = 10; 
while(playerHealth>0){
    console.log(`Player health is ${playerHealth}. Attacking monster!`);
    playerHealth -=3;
    if(playerHealth<=0){
        console.log(`Player has been defeated`);
    }
}

// ! do while loop 

let useResponse;
do{
    useResponse = prompt("please type 'yes' to continue: ");
}while(useResponse!==yes){
    console.log("You typed yes . thank you! ")
}