import express from 'express';
import UserModel from '../../../models/userModel.js';
import { auth } from '../middlewares/auth.js';

const userUpdateInfo = express.Router();

// Updating Bio of user
userUpdateInfo.post('/updateInfo', auth, async (req, res) => {
    try {
        const { _id, bio } = req.body;
        await UserModel.updateOne({ _id }, { $set: { bio } });
        res.status(201).send({ status: 'Profile info updated' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Uploading profile picture
userUpdateInfo.post('/profile-picture', auth, async (req, res) => {
    try {
        const { profileURL, _id } = req.body;
        await UserModel.updateOne({ _id }, { $set: { profilePicture: profileURL } });
        res.status(201).send({ status: 'Profile updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Profile of current user
userUpdateInfo.get('/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const userData = await UserModel.findById(id);
        if (!userData) {
            return res.status(404).send({ message: 'User not found' });
        }
        res.status(200).send({ data: userData });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

// Changing privacy
userUpdateInfo.post('/privacy/:id', auth, async (req, res) => {
    try {
        const { id } = req.params;
        const { privacy } = req.body;
        await UserModel.updateOne({ _id: id }, { $set: { private: privacy } });
        res.status(201).send({ message: 'Account visibility updated' });
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' });
    }
});

export default userUpdateInfo;
