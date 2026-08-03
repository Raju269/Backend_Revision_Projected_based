const githubProfile = [{},{},{}];
// 1 Lakhs size array hai 
// phele sa present hai 


let number = 50 ; // 50 value 
const arr = [];
for(let i =0 ; i<=number;i++){  // 50 times run hoga 
    arr.push(githubProfile[i]); // 3 time {}, then undefined print hoga 
}
console.log(arr); // print result ya show  hoga hai 
