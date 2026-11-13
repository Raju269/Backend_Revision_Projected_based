// // class keyword : var, let  ,const 
// // resword keyword hai class name 

// const newElement = document.createElement('h2');
// newElement.textContent = "I am Raju kumar ";

// console.log(newElement);

// // select the  first element 
// const element = document.getElementById("first");
// element.before(newElement);

// const newElement2 = document.createElement('h3');
// newElement2.textContent = "Chamak gaya bhaiya ";
// newElement2.id = "third";
// newElement2.classList.add("Rohit");
// newElement2.classList.add("Mohit");

// // console.log(newElement2.getAttribute('class'));
// newElement2.setAttribute('piyush',"mohan");


// console.log(newElement2);
// element.after(newElement2);

// first I have to select unoderedlist 
// const ul = document.querySelector()

// const ul = document.getElementById('ul');
// const li = document.createElement('li');
// li.textContent = "Wed Development";
// const li2 = document.createElement('li');
// li2.textContent = "Security";
// const li3 = document.createElement('li');
// li3.textContent = "DevOps";
// const li4 = document.createElement('li');
// li4.textContent = "System Design";
// const li5 = document.createElement('li');
// li5.textContent = "DSA";
// ul.append(li);
// ul.append(li2);
// ul.append(li3);
// ul.prepend(li4);
// li.after(li5);


const foods = ["Milk","fish","eggs","soya","paneer","chicken"];

const ul = document.getElementById('ul');

// const fra = document.createDocumentFragment();

const arr = []

for(const food of foods){
    // console.log(food)
    const li = document.createElement("li");
    li.textContent = food;
    // fra.append(li);
    // ul.append(li);
    arr.push(li);

}
ul.append(...arr);
// ul.append(fra); 

