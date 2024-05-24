import Joi from 'joi'
import UserModel from '../../../models/userModel.js'

const authJoi = Joi.object().keys({
    email: Joi.string().trim().required(),
    password: Joi.string().trim().required(),
})

// Middleware for validating the request body
export const validate = async (req, res, next) => {
    const result = authJoi.validate(req.body)
    if (result.error) {
        return res.status(400).send({ message: result.error.message })
    } else {
        next()
    }
}

// Middleware for verifying if the user exists and is active
export const verify = async (req, res, next) => {
    const user = await UserModel.findOne({ email })
    if (!user) {
        res.send(401).send({ message: 'User not found' })
    } else {
        if (!user.active) {
            res.send(400).send({ message: 'User has been blocked' })
        } else {
            next()
        }
    }
}

// Middleware for authenticating the user's password
export const authenticate = async (req, res, next) => {
    const user = req.body;
    const passwordCheck = await bcrypt.compare(password, user.password);
    if (!passwordCheck) {
        res.send(401).send({ message: 'incorrect passoword' })
    } else {
        next()

    }
}

// Middleware for creating a JWT token and setting it as a cookie
export const createToken = async (req, res, next) => {
    const user = req.body;
    const maxAge = 60 * 60 * 24
    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_KEY, { expiresIn: maxAge })
    res.cookie('jwt', token, {
        httpOnly: true,
        maxAge: maxAge * 1000
    })
    next()
}