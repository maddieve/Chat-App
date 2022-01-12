const User = require('../models/user');
const {registerValidation, loginValidation} = require('../validation');
const bcrypt = require ('bcryptjs')
const jwt = require ('jsonwebtoken')


// router.post('/register', async (req, res) => {
const controller = {

register: async (req, res) => {
    //validate
console.log(registerValidation(req.body))
const {error} = registerValidation(req.body)
if(error) return res.status(405).send(error.details[0].message);

//user is in the db
const emailExist = await User.findOne({email: req.body.email});
if(emailExist) return res.status(400).send('Email already exists!');

// //user is in the db
// const usernameExist = await User.findOne({username: req.body.username});
// if(usernameExist) return res.status(400).send('Username already exists!');

//hash passwords
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hashSync(req.body.password, salt);


    const user = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        username: req.body.username,
        password: hashedPassword,
        disability: req.body.disability
    })

    try{
        const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET)
        user.token = token
        const saved = await user.save()
        res.status(200).send({User: saved, password: req.body.password})
    }
    catch(err){
       res.status(400).send({error: err, message:"of"})
    }
},

//login
// router.post('/login', async (req, res) => {
login: async (req, res) => {

const {error} = loginValidation(req.body)
if(error) return res.status(400).send(error.details[0].message);

const user = await User.findOne({email: req.body.email});
if(!user) return res.status(400).send("Email doesn't exist!");
//password is correct
const validPass = await bcrypt.compare(req.body.password, user.password);
if(!validPass) return res.status(400).send('Invalid password!');

//create and assign a token
user.isOnline = true;
await user.save()
const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);

console.log('Logged in!');
res.header('auth-token', token).status(200).send({token:token, user: user});
}
}

module.exports = controller;