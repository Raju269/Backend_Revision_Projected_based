// This is your callback function. It's the "phone number" you'll leave behind. 
// It describes what to do once the pizza is ready. 

function pickUpPizza(){
    console.log("Pizza is ready ! Driving to the store to pick it up.");

}

function orderPizza(callback){
    console.log("Placing the pizza order...")
    console.log("Pizza is cooked!")
    callback();
}

// -- Let's run the program --- 
// we call orderpizza and give it our pickupPizza function as the callback arguments
orderPizza(pickUpPizza);

// This line will run immediately, while the pizza is still "cooking".

console.log("I'm not waiting at the store. I'm at home, coding");



// ! other use of Callback function 
function add(num1,num2){
    return num1+num2;
}

function sub(num1,num2){
    return num1-num2;
}

function mul(num1,num2){
    return num1*num2;
}

function calculator(num1,num2,operation){
    const ans = operation(num1,num2);
    console.log(ans);
}

calculator(10,2,function(x,y){
    return x/y;
});


const arr  = [10,7,3,15,8-2,-3];

arr.mySort = function(callback){
    for(let i=0;i<this.length;i++){
        for(let j = 0;j<this.length;j++){
            if(callback(this[j],this[j+1])){
                let num = this[j];
                this[j] = this[j+1];
                this[j+1] = num;
            }
        }
    }
    return this;
}
console.log(arr.mySort((a,b)=>a-b));