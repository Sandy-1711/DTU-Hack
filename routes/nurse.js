const Nurse = require('../models/Nurse');
const cryptoJS = require('crypto-js');
const { default: mongoose } = require('mongoose');
const router = require('express').Router();
router.post('/register', async function (req, res) {
    const newNurse = new Nurse({
        username: req.body.username,
        email: req.body.email,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY.toString()),
        phone: req.body.phone,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age
        
    })
    try{
        const savedNurse=await newNurse.save();
        res.status(200).json(savedNurse);
    }
    catch(err)
    {
        res.status(500).json(err);
    }
});
module.exports=router;
