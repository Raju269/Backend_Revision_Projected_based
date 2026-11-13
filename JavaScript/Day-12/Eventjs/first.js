// 4 event Listener 

// const child1 = document.getElementById('child1');
// const child2 = document.getElementById('child2');
// const child3 = document.getElementById('child3');
// const child4 = document.getElementById('child4');

// const parent = document.getElementById('parent');
// parent.addEventListener('click',(e)=>{
//     e.target.textContent = "I am clicked now ";
//     // console.log(e) 
//     // console.log("Parent is clicked ");
// });

// child1.addEventListener('click',()=>{
//     child1.textContent = "I am clicked";
// })

// child2.addEventListener('click',()=>{
//     child2.textContent = "I am clicked";
// })

// child3.addEventListener('click',()=>{
//     child3.textContent = " I am clicked";
// })

// child4.addEventListener('click',()=>{
//     child4.textContent = " I am clicked "
// })


// const grandParent = document.getElementById('grandParent');
// const parent = document.getElementById("Parent");
// const child = document.getElementById("child");

// grandParent.addEventListener('click',()=>{
//     console.log("Grand parent is clicked ");
// },true)

// parent.addEventListener('click',()=>{
//     console.log("parent is clicked ");
// },false)

// child.addEventListener('click',()=>{
//     console.log('child is clicked ');
// },true)


// Event bubbling 
// capture phase

const button = document.querySelector('button');

function handle(){
    button.textContent = 'Clicked';
    button.removeEventListener('click',handle);
}


button.addEventListener('click',handle)



// event listerer remover 

// button.removeEventListener('click',()=>{
//     button.textContent = "Button clicked ";
// })