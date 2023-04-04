const mongoose = require('mongoose');
const dotenv = require('dotenv')
const express = require('express');
dotenv.config();
const app = express();
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const nurseRoute = require('./routes/nurse');
const doctorRoute = require('./routes/doctor');

mongoose.connect(process.env.MONGO_URL).then(function () {
    console.log("connnected to mongodb server");
}).catch(function (err) {
    console.log(err);
})
app.use(express.json());
app.use('/auth', authRoute);
app.use('/doctor', doctorRoute);
app.use('/user', userRoute);
app.use('/nurse', nurseRoute);

app.listen(process.env.PORT || 5000, function () {
    console.log("server running");
});
