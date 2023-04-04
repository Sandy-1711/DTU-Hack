const mongoose=require('mongoose')
const NurseSchema=mongoose.Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true},
    phone:{type:Number,required:true},
    city:{type:String},
    gender:{type:String},
    age:{type:Number},
    rating:[],
    review:[]
})
module.exports=mongoose.model('Nurse',NurseSchema);
