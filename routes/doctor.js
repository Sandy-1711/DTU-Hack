const Doctor = require('../models/Doctor');
const router = require('express').Router();
const cryptoJS = require('crypto-js')
router.post('/register', async function (req, res) {
    const doctor = new Doctor({
        username: req.body.username,
        email: req.body.email,
        location: req.body.location,
        password: cryptoJS.AES.encrypt(req.body.password, process.env.PASS_KEY),
        contact: req.body.contact,
        type: req.body.type,
        fees: req.body.fees
    })
    try {
        const saveddoctor = await doctor.save();
        res.status(201).json(saveddoctor);
    }
    catch (err) {
        res.status(500).json(err);
    }

});

module.exports = router;