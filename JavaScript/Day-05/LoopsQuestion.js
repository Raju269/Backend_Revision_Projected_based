for(let i=0;i<=10;i++){
    console.log("Hello java");
}

for(let i=5;i>=0;i++){
    console.log(i);
}


for(let i = 2; i <= 10; i += 2){
        console.log(i);
}
for(let i=0;i<=10;i++){
    console.log(i);
}


for(let i=10;i>=0;i++){
    console.log(i);
}


for(let i=2;i<=20;i+=2){
    console.log(i);
}

for(let i=1;i<=20;i+=2){
    console.log(i);
}

let sum = 0; 
for(let i=1;i<=5;i++){
    sum+=i;
}
console.log(sum);


for(let i=1;i<=10;i++){
    console.log(`7 x ${i} = ${7*i}`);
}

let str = "JavaScript";
let count = 0;
for(let i=0;i<str.length;i++){
    let ch = str[i];

    if("aeiou",includes(ch)){
        count++;
    }
}
console.log(count);


// working with arrays. 
let arr = [4,7,2,9,5];

let largest = arr[0];

for(let i=1;i<arr.length;i++){
    if(arr[i]>largest){
        largest = arr[i];
    }
}
console.log(largest);
