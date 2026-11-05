// ! Math.randow();
console.log(Math.random());

// ! The Goal : A Random Integer Between min and max (inclusive)

//!  console.log(Math.floor(Math.random()*(max-min+1)))+min;
let min = 1; 
let max = 10;
console.log(Math.floor(Math.random(max-min+1)*10));
console.log(Math.floor(Math.random()*10)); // ?[0,9]
console.log(Math.floor(Math.random()*10)+1); ///?  [0,10]

function getRandomInt(min,max){
    const range = max-min +1;
    const scaled = Math.random()*range;
    const floored = Math.floor(scaled);
    const result = floored+min;
    return result;
}

console.log(getRandomInt(1,10))
console.log(getRandomInt(50,100))
console.log(getRandomInt(1,6))