import express from 'express'
import { authenticate, createToken, validate, verify } from '../middlewares/login.auth.js'
import UserModel from '../../../models/userModel.js';

const userLogin = express.Router()

userLogin.post('/', validate, verify, authenticate, createToken, async (req, res) => {
    try {
        const user = req.body;
        await UserModel.findByIdAndUpdate(user._id, { online: true });
        res.status(200).send({ message: 'User logged successfully', data: req.body })
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
})

export default userLogin