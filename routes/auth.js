const { verify } = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const cryptoJS = require('crypto-js');
const { verifyToken } = require('./verifytoken');
router.post('/register', async function (req, res) {
    const newuser = new User({
        email: req.body.email,
        phone: req.body.phone,
        username: req.body.username,
        password:cryptoJS.AES.encrypt(req.body.password,process.env.PASS_KEY.toString()),
        city: req.body.city,
        age: req.body.age,
        gender: req.body.gender,
        bloodgroup: req.body.bloodgroup

    });
    try {
        const saveduser = await newuser.save();
        res.status(201).json(saveduser);
    }catch(err){
        res.status(401).json(err)
    }
});
router.post('/login',async function(req,res){
    try{
        const user=await User.findOne({username:req.body.username});
        if(!user){
            res.status(401).json("User not found");
        }
        const hashedpassword=cryptoJS.AES.decrypt(user.password,process.env.JWT_KEY);
        const password=hashedpassword.toString(cryptoJS.enc.Utf8)
        if(password===req.body.password)
        {
            const token=jwt.sign({username:user.username,id:user._id,isAdmin:user.isAdmin},process.env.JWT_KEY,{expiresIn:'3d'});
            const {password,...others}=user._doc;
            res.status(200).json({...others,token});
            
        }
        else{
            res.status(401).json("Wrong Password");
        }
    }catch(err){
        console.log(err);
        res.status(401).json(err);
    }
})
module.exports = router;