const mongoose=require('mongoose');
const { boolean } = require('webidl-conversions');
const router=require('express').Router();
const UserSchema=mongoose.Schema({
    email:{type:String,required:true},
    phone:{type:Number,required:true,unique:true},
    username:{type:String,required:true},
    password:{type:String,required:true},
    city:{type:String},
    age:{type:Number},
    gender:{type:String},
    bloodgroup:{type:String},
    isAdmin:{type:Boolean,default:false}
})
module.exports=mongoose.model('User',UserSchema);