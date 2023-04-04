const mongoose=require('mongoose');
const BloodSchema=mongoose.Schema({
    donatedby:{type:String,required:true},
    bloodtype:{type:String,required:true},
    recievedby:{type:String}
},{timestamps:true})
module.exports=mongoose.model('Blood',BloodSchema);