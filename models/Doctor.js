const mongoose = require('mongoose')
const DoctorSchema = mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true,unique:true},
    location: { type: String, required: true },
    password: { type: String, required: true },
    fees: { type: Number, required: true },
    contact: [],
    type: { type: String, required: true },
    review:[{
        userid:{type:String,required:true,unique:true},
        rating:{type:Number},
        review:{type:String}
},{unique:true}]
})
module.exports = mongoose.model('Doctor', DoctorSchema);