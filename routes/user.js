const { verify } = require('jsonwebtoken');
const router = require('express').Router();
const User = require('../models/User');
const Doctor = require('../models/Doctor');
const Blood = require('../models/Blood');
const { verifyTokenAndAuthorization, verifyToken, verifyTokenAndAdmin } = require('./verifytoken');
router.get('/find/doctor', async function (req, res) {

    try {

        const foundDoctor = await Doctor.find({ type: req.body.type, location: req.body.location });
        res.status(201).json(foundDoctor);

    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.put('/rate/doctor/:id', verifyTokenAndAuthorization, async function (req, res) {
    const rating = req.body.rating;
    const review = req.body.review;
    const docid = req.body.docid;
    const id = req.params.id;
    try {
        const savedDoctor = await Doctor.findByIdAndUpdate(docid, { $addToSet: { "review":{userid:id,review:review,rating:rating} }});
        console.log(savedDoctor);
        res.status(200).json(savedDoctor);
    }
    catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});
router.post('/donate/:id', verifyTokenAndAuthorization, async function (req, res) {
    const newblood = {
        bloodtype: req.body.bloodtype,
        donatedby: req.params.id,
    }
    try {
        const savedBlood = await newblood.save();
        res.status(200).json(savedBlood);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/getblood/:id', async function (req, res) {
    try {
        const foundblood = Blood.find({ bloodtype: req.body.bloodtype });
        res.status(200).json(foundblood);

    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.put('/emptyblood/:id', verifyTokenAndAdmin, async function (req, res) {
    const bloodid = req.body.bloodid;
    try {
        const updatedblood = await Blood.findByIdAndUpdate(bloodid, { recievedby: id });
        res.status(200).json(updatedblood);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.put('/rate/nurse/:id', verifyTokenAndAuthorization, async function (req, res) {
    const review = req.body.review;
    const rating = req.body.rating;
    const id = req.body.id;
    try {
        const updatedNurse = await findByIdAndUpdate(id, { $addToSet: { "review": review, "rating": rating } });
        res.status(200).json(updatedNurse);

    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/allusers', verifyTokenAndAdmin, async function (req, res) {
    try {
        const allusers = await User.find();
        res.status(200).json(allusers);
    }
    catch (err) {

        res.status(500).json(err);
    }
});
router.get('/alldoctors', verifyTokenAndAdmin, async function (req, res) {
    try {
        const alldoctors = await Doctor.find();
        res.status(200).json(alldoctors);
    }
    catch (err) {
        res.status(500).json(err);
    }
});
router.get('/myprofile/:id/:username', verifyTokenAndAuthorization, async function () {
    try {
        const myprofile = await User.find({ username: req.params.username });
        res.status(200).json(myprofile);

    }
    catch (err) {
        res.status(500).json(err);
    }
});
module.exports = router;