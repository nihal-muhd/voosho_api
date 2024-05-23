import express from 'express'
import userSignUp from './controllers/user.signup.js'
import userVerify from './controllers/user.verify-otp.js'
import userLogin from './controllers/user.login.js'
import userSignOut from './controllers/user.signout.js'

const userRouter = express.Router()

userRouter.use('/signup', userSignUp)
userRouter.use('/verify-otp', userVerify)
userRouter.use('/login', userLogin)
userRouter.use('/signout', userSignOut)

export default userRouter