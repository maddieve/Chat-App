const router = require('express').Router();
const {catchErrors} = require("../handlers/errorHandler");
const userController = require('../controllers/auth');

router.post ('/register', userController.register)
router.post('/login', userController.login)

module.exports = router;