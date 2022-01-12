const mongoose = require("mongoose");
const User = require('../models/user');
const bcrypt = require('bcryptjs')

exports.logout = async(req, res) => {
 const user = await User.findOne({email: req.body.email})
 if (user) {
    user.isOnline = false;
    await user.save();
    console.log('Logged out!')
    res.status(202).send(user)
 } else {
     res.status(404).send()
 }
}

exports.update = async (req, res) => {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(req.body.password, salt)

    console.log(req.body)
    User.findOneAndUpdate({ email: `${req.body.email}`}, { $set: {
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: hashPassword,
        disability: req.body.disability
    }}).then(async () => {
        const user = await User.findOne({email: req.body.email})
        res.status(201).send({user: user})
    }).catch((err) => {
        res.status(404).send('user not found', {error: err})
    })
}

