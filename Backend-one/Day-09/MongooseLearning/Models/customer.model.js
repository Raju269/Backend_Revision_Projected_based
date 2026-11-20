import mongoose from "mongoose";
import { type } from "node:os";

const customerSchema = new mongoose.Schema({
    Name : {
        type: String,
        require:true,
        trim : true
    },
    AccountNumber :{
        type: Number,
        require:true,
        unique:true
    }, 
    City :{
        type :String,
        required : true, 
        tirm : true, 

    },
    Age : {
        type : Number,
        require : true, 
        min:10,
        max : 100
    },
    Balance :{
        type:Number,
        require:true,
        min : 0,
    },
    AccountType :{
        type:String,
        enum : ["saving","current"],
        default : "saving"
    }
},
{
    timestamps:true
});

const Customer = mongoose.model("Customer",customerSchema);

export default Customer;