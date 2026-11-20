import mongoose, {mongo} from "mongoose";

//?  const customerSchema = new mongoose.Schema({
//?      name:String,
//?      accountNumber : Number,
//?      city:String,
//?      age:Number,
//?      balance : Number,
//?  })


/*
name should be String 
accountNumber should be Number 
city should be String 
age should be Number 
balance should be Number 
*/


// TODO Better Schema with Rules 

const customerSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim : true,
    },
    accountNumber:{
        type:Number,
        required:true,
        unique:true,
    },
    city:{
        type:String,
        required:true,
        trim:true,
    },
    age:{
        type:Number,
        requiured:true,
        min:1
    },
    balance : {
        type:Number,
        required:true,
        min:0,
    },
    accountType:{
        type:String,
        enum:["saving","current"],
        default : "saving"
    }
});

/*
required :true --> field must be present 
trim : true --> remove extra spaces
unique: true ---> duplicate value not allowed 
min : 1 --> value should be at least 1 
enum  --> only selected values allowed 
default --> use default value if not provided 
*/

const Customer = mongoose.model("Customer",customerSchema);

export default Customer;


