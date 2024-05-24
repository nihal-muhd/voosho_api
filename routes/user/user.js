import express from 'express'
import userSignUp from './controllers/user.signup.js'
import userVerify from './controllers/user.verify-otp.js'
import userLogin from './controllers/user.login.js'
import userSignOut from './controllers/user.signout.js'
import userUpdateInfo from './controllers/user.profile.js'
import userViewProfile from './controllers/user.view-profile.js'

const userRouter = express.Router()

userRouter.use('/signup', userSignUp)
userRouter.use('/verify-otp', userVerify)
userRouter.use('/login', userLogin)
userRouter.use('/signout', userSignOut)

// Profile updates
userRouter.use('/profile', userUpdateInfo)

//Seen other profiles
userRouter.use('/view-profile', userViewProfile)

export default userRouter