const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const Schema = mongoose.Schema

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    // dateOfBirth: {
    //     type: Date,
    //     required: true,
    // },
    // sex: {
    //     type: String,
    //     enum: ['male', 'female'],
    //     required: true,
    // },
    createdAt: {
        type: Date,
        default: Date.now,
    },
})

userSchema.pre("save", async function (next) {
    try {
        if (this.isNew || this.isModified("password")) {
            const salt = await bcrypt.genSalt(7)
            const hashedPassword = await bcrypt.hash(this.password, salt)
            this.password = hashedPassword
        }
        next()
    } catch (err) {
        next(err)
    }
})

userSchema.methods.isValidPassword = async function (password) {
    try {
        return await bcrypt.compare(password, this.password)
    } catch (err) {
        throw err
    }
}

const User = mongoose.model("User", userSchema)

module.exports = User
