const router = require('express').Router();
const authRouter = require('./auth');
const chatroomRouter = require('./chatroom');
const userRouter = require('./user')
const chatRouter = require('./chat')

router.use('/auth', authRouter)
router.use('/chatroom', chatroomRouter)
router.use('/user', userRouter);
router.use('/chat', chatRouter)

module.exports = router