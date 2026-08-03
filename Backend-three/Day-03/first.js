// sematic versioning 
// 1.0.0
// patch : Bug fixes karan ka liya hota 1.0.1 means last ka digit one means to fix 1 bugs
// minor : To add new features updates 1.1.1
// major :  

function add (num1,num2){
    if(typeof num1 == "number" && typeof num2 == "number" ){
        return num1+num2;
    }
}

function sub(num1,num2){
    if(typeof num1 == "number" && typeof num2 == "number" ){
        return num2-num1;
    }
}
function mul(num1,num2){
    if(typeof num1 == "number" && typeof num2 == "number" ){
        return num1*num2;
    }
}

function div(num1,num2){
    if(typeof num1 == "number" && typeof num2 == "number" ){
        return num2/num1;
    }
}

function square(num1){
    return num1*num1;
}

export {add,sub,mul,div,square};

// add(2,3) = 5


