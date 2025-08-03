import mongoose from "mongoose";
const employeeSchema=new mongoose.Schema({
    email:{type:String,required:true},
    role:{type:String,required:true},
    mobile:{type:Number,required:true}
})

export default mongoose.model('employee',employeeSchema)  