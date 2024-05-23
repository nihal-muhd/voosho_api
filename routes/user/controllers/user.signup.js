import { doSms } from "../../../tools/otp.js"

const userSignUp = async (req, res) => {
    try {
        const userVerify = await UserModel.findOne({
            $or: [
                { email: req.body.email },
                { mobile: req.body.mobile }
            ]
        })
        if (userVerify) {
            res.status(401).json({
                status: 'Email or mobile number already exist'
            })
        } else {
            const data = await doSms(req.body)
            if (data) {
                res.status(201).json({
                    status: 'otp generated'
                })
            }
        }
    } catch (err) {
        res.status(500).send({ message: 'Internal server error' })
    }
}
export default userSignUp