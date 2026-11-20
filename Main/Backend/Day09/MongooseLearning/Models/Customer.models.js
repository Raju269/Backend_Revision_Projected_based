import mongoose from "mongoose";

const customerSchema = new  mongoose.Schema({
    Name:{
        type:String,
        require:true,
        trim:true,
    },
    AccountNumber :{
        type:Number,
        require:true,
        unique:true
    },
    City:{
        type : String,
        require :true,
        tirm : true,
    },
     Age : {
        type : Number,
        require : true,
        min : 10,
        max : 100
     },
     Balance :{
        type:Number,
        require:true,
        min :0,
     },
    AccountType:{
        type:String,
        enum : ["Saving","Current"],
        default:"Saving"
    }

},{
    timestamps:true
});

const Customer = mongoose.model("Customer",customerSchema);

export default Customer;