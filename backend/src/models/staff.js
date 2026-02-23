import mongoose from "mongoose";
const staffSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,

    },
    email:{
        type:String,
        required:true,
        unique:true,
        lowercase:true
    },
    role:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        enum:["Active","Inactive"],
        default:"Active",
    },
    photo:{
        type:String,
    },
},
{timestamps:true}
);
const Staff=mongoose.model("Staff",staffSchema);
export default Staff;