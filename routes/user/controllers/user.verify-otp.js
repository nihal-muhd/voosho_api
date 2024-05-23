import { verifyOtp } from "../../../tools/otp.js"

const userVerify = async (req, res) => {
    try {
        const result = await verifyOtp(req.body.otp)
        if (result) {
            const userData = req.body.userData
            const salt = await bcrypt.genSalt(10)
            userData.password = await bcrypt.hash(userData.password, salt)
            userData.confirmPassword = await bcrypt.hash(userData.confirmPassword, salt)
            userData.Active = true
            await UserModel.create(userData)
            res.status(201).json({
                status: 'signup completed'
            })
        } else {
            res.status(401).json({
                status: 'otp verification failed'
            })
        }
    } catch (error) {
        res.status(500).send({ message: 'Internal server error' })
    }
}

export default userVerify
