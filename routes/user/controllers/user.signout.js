import express from 'express'
import UserModel from "../../../models/userModel.js"

const userSignOut = express.Router()

userSignOut.post('/', async (req, res) => {
    try {
        const user = req.body;
        await UserModel.findByIdAndUpdate(user._id, { online: false });
        res.cookie('jwt', '', { maxAge: 1 });
        res.status(200).send({ message: 'User signed out successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
})
export default userSignOut