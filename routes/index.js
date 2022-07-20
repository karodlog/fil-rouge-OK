const categoryRouter = require('./category-router')
const userRouter = require('./user-router')
const authRouter = require('./auth-router')
const taskRouter = require('./task-router')
// création du routeur parent
const router = require('express').Router();


router.use('/category', categoryRouter)
router.use('/task', taskRouter);
router.use('/user', userRouter);
router.use('/auth', authRouter)


module.exports = router