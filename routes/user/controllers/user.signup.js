import express from 'express'
import { doSms } from "../../../tools/otp.js"

const userSignUp = express.Router()
userSignUp.post('/', async (req, res) => {
    try {
        const userVerify = await UserModel.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        })
        if (userVerify) {
            res.status(401).send({
                status: 'Email or mobile number already exist'
            })
        } else {
            const data = await doSms(req.body)
            if (data) {
                res.status(201).send({
                    status: 'otp generated'
                })
            }
        }
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' })
    }
})
export default userSignUp