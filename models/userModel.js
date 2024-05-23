import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide a name']
    },
    email: {
        type: String,
        required: [true, 'Please provide email'],
        unique: true
    },
    mobile: {
        type: Number,
        required: [true, 'Please provide mobile number'],
        unique: true
    },
    profilePicture: {
        type: String
    },
    // Add bio for example like, work, college, school etc
    bio: {},
    password: {
        type: String,
        required: [true, 'Please provide password']
    },
    confirmPassword: {
        type: String,
        required: [true, 'Please provide confirm password']
    },
    Active: {
        type: Boolean,
        default: true
    },
    // To get know which user is online or offline
    online: {
        type: Boolean,
        default: false
    }
},
    {
        timestamps: true
    })

const UserModel = mongoose.model('user', userSchema)
export default UserModel
