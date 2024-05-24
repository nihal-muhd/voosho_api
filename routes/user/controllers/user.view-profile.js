import express from 'express'
import UserModel from '../../../models/userModel.js';
import { auth, authorizeViewProfile } from '../middlewares/auth.js';

const userViewProfile = express.Router()

userViewProfile.post('/:id', auth, authorizeViewProfile, async (req, res) => {
    try {
        const profile = req.profile;
        res.status(200).send({ data: profile });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
})

export default userViewProfile