// TODO Basic Operation of array to push in loop to github data url fetch from the api and send to array and show to display 

const gitHubProfiles = [
    {1:"one"},
    {2:"two"},
    {3:"three"}
];
// 1 lakh size array ka hai 
// pehle se presen hai 
let number = 50 ; 
const arr = [];
for(let i = 0; i<number; i++){
    arr.push(gitHubProfiles[i]);
}
console.log(arr);
 