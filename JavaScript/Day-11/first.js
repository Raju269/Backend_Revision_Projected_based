// // console.log("haa bhai kasie ho");

// const element = document.getElementById("first");
// console.log(element);
// element.textContent = "Raju bhai kasie  ho "
// // console.log(element.textContent);


// element.onclick = function handleClick(){
//         element.textContent = "Raju yaar kaise ho tum bhai "
//     }

// element.onclick = ()=>{
//     element.textContent = "Oh oh Raju ji ";
//     element.style.backgroundColor = "pink"; 
// }
// function handleClick(){
//     const element = document.getElementById("first");
//     element.textContent = "Raju bhai kaise hao "

    
// }


// Modern ways to write a code 
// EventListener ka 

// event hoga, execute the callback function: 

const element = document.getElementById("first");

element.addEventListener('dblclick',()=>{
    element.textContent = "I am best";
    element.style.backgroundColor = 'pink';
})
