import mongoose from "mongoose";
const customerSchema =new mongoose.Schema(
    {
        firstName:{
            type:String,
            required:true,
            trim:true,
        },
        lastName:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            uniquie:true,
            lowercase:true,   
        },
        phone:{
            type:String,
            required:true,
        },
        address:{
            type:String,
            required:true,
        },
    },
        {timestamps:true}
    
);
const Customer=mongoose.model("Customer",customerSchema);
export default Customer;