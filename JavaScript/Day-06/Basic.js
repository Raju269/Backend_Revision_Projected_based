// ! Base Array Modification (Muutating the Array)

let task = ["Wash dishes"];
task.push("Do laundry","Buy groceries");
console.log(task);// ["Wash dishes", "Do laundry", "Buy groceries"]
let a = [10,30,20,40,50];

let completedTask = a.pop();
console.log(completedTask); // "Buy groceries"
console.log(a);       // ["Wash dishes", "Do laundry"]

// ? Adding / Removing from the Beginning of the array 
let queue = ["Person B", "Person C"];
// ? Addining 
queue.unshift("Person A");
console.log(queue);


let firstInLine = queue.shift();
// ? Removing
console.log(firstInLine);
console.log(queue);


// Looping Over an Array (Iteration);

let scores = [98,85,100];
let total = 0; 
for(let i=0;i<scores.length;i++){
    console.log(`Processing score at index ${i} : ${scores[i]}`);
    total = total + scores[i];
}
console.log(`The total score is : ${total}`);

// ! for of loops 
let names = ['Raju','Tarun','Sumit','vikas'];
for(const name of names){
    console.log(`Hello, ${name}`)
}

// ? Advanced Array Manipulation 

let months = ["Jan","March","April","June"];
// Example 1: REMOVING "March"
// Start at index 1, delete 1 element.
months.splice(1,1);
console.log(months); // ["Jan", "April", "June"]

// Example 2: ADDING "Feb"
// Start at index 1, delete 0 elements, and add "Feb".
months.slice(1,0,"feb");
console.log(months);  // ["Jan", "Feb", "April", "June"]

// Example 3: REPLACING "April" with "May"
// Start at index 2, delete 1 element, and add "May".
months.splice(2,1,"May");
console.log(months);  // ["Jan", "Feb", "May", "June"]

let animals = ["ant", "bison", "camel", "duck", "elephant"];

// Copy the elements from index 2 up to (but not including) index 4
let middleAnimals = animals.slice(2,4);
console.log(middleAnimals);


// If you omit the end index, it copies to the end of the array
let allButFirstTwo = animals.slice(2);
console.log(allButFirstTwo);

// / A common way to make a full copy of an array:
let fullcopy = animals.slice();
console.log(animals);

// ! Spread Operator. 
//  The Spread Operator (...) (The Modern Way to Copy/Combine) This is the most popular way in modern JavaScript to create copies or merge arrays.

const arr1 = [1,2,3,4,5];
const arr2 = [6,7,8,9,10];
// Make a copy 
const copyOfArr1 = [...arr1];
console.log(copyOfArr1);

// combine two arrays.
const combine = [...arr1,...arr2]; 
console.log(combine);

const withMiddle = [...arr1,  10,20,30,...arr2];
console.log(withMiddle)


// ! Converting and Searching 

const Names = ["Alice","Bob","charlie"];
const NameList = names.join(",");
console.log(NameList);


// Simple Searching 

const Numbers =  [10,20,30,40,50];
console.log(Numbers.indexOf(20));
console.log(Numbers.lastIndexOf(20));
console.log(Numbers.indexOf(99));
console.log(Numbers.includes(30));
console.log(Numbers.includes(99));


// TODO Advanced Array Methods : Sorting, Flattening and Deleting. 

// ? Sorting Arrays: The .stor() Method 

let fruits = ["Cherry", "Apple", "Banana"];
fruits.sort();
console.log(fruits); // ["Apple","Banana","Cherry"] //(This works as expected)

// ! Critical Gotcha 

let numbers = [100,20,4,3,2,25,1];
numbers.sort();
// The numbers are converted to strings: "100", "2", "5", "25", "1"
// The sort then compares them character by character:
// "1" comes before "100"
// "100" comes before "2"
// "2" comes before "25"

console.log(numbers); // [1, 100, 2, 25, 5] (This is WRONG!)

numbers.sort((a,b) => a-b);
console.log(numbers); // [1,2,3,4,5,25,100] (Correct!)

//  To sort in descending order, just flip the subtraction.
numbers.sort((a, b) => b - a);
console.log(numbers); // [100, 25, 5, 2, 1] (Correct!)

// ! Flattening Arrays : The .flat() Method 

const nestedArray = [1,2,[3,4]];
const flattened = nestedArray.flat();

console.log(flattened);
console.log(nestedArray);

// Flattening Multiple levels 

const deeplyNested = [1,[2,[3],[4]]];

// Go two levels deep 
const flatTwoLevel = deeplyNested.flat(2);
console.log(flatTwoLevel);

//  To flatten completely, no matter how deep, you can use Infinity.
const completelyFlat = deeplyNested.flat(Infinity);
console.log(completelyFlat); // [1, 2, 3, 4]


let items = ['a','b','c','d'];
// Remove 'c' at index 2 
items.splice(2,1);
console.log(items);
console.log(items.length);


let letters = ["a", "b", "c"];
delete letters[1]; // "Delete" the element at index 1

console.log(letters);       // ["a", empty, "c"]
console.log(letters[1]);    // undefined
console.log(letters.length); // 3 (The length did NOT change!)

