const User = require("../Models/user.model")
// const nodemailer = require("nodemailer")
const jwt = require("jsonwebtoken")
const sgMail = require("@sendgrid/mail")

let signup = async (req, res) => {
    const { email, password, userName } = req.body

    try {
        let existingUser = await User.findOne({ email })

        if (existingUser) {
            res.status(409).json({ message: "User already exists" })
        } else {
            let token = jwt.sign(
                { email, userName, password },
                process.env.TOKEN_HASH
            )
            sgMail.setApiKey(process.env.SENDGRID_API_KEY)
            const msg = {
                to: `${email}`, // user email address
                from: ` ${process.env.EMAIL}`, // sender address
                subject: "Please verify your email address", // subject line
                html: `<!DOCTYPE html>
              <html>
              <head>
                <meta charset="utf-8">
                <title>Verify your email address</title>
              </head>
              <body>
                <div style="background-color: #f4f4f4; padding: 20px;">
                  <div style="background-color: #ffffff; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Verify your email address</h2>
                    <p>Hi ${userName},</p>
                    <p>Please click on the following link to verify your email address:</p>
                    <p style="text-align: center; margin-top: 30px;"><a href="http://localhost:3000/verify?token=${token}" style="background-color: #4CAF50; color: #ffffff; padding: 12px 20px; text-decoration: none; display: inline-block; border-radius: 5px;">Verify Email</a></p>
                    <p>If you did not create an account with us, please ignore this email.</p>
                  </div>
                </div>
              </body>
              </html>
              `,
            }
            await sgMail.send(msg).then(
                res.status(201).json({
                    message:
                        "Thank you for registering! Please check your email to verify your account.",
                })
            )
        }
    } catch (err) {
        const error = new Error(err)
        throw error
    }
}

let verify = async (req, res) => {
    const { token } = req.query
    try {
        let decoded = jwt.verify(token, process.env.TOKEN_HASH)
        const newUser = new User({
            email: decoded.email,
            password: decoded.password,
            userName: decoded.userName,
        })
        await newUser.save().then(
            res.status(201).json({
                message: "Thank you for verifying your email address.",
            })
        )
    } catch (err) {
        const error = new Error(err)
        throw error
    }
}

let login = async (req, res) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({ message: "User not found" })
        } else {
            let isMatch = await user.isValidPassword(password)
            if (!isMatch) {
                res.status(401).json({ message: "Incorrect password" })
            } else {
                let token = jwt.sign(
                    {
                        email: user.email,
                        userId: user._id,
                        userName: user.userName,
                    },
                    process.env.TOKEN_HASH,
                    { expiresIn: "1h" }
                )
                res.status(200).json({
                    token,
                    expiresIn: 3600,
                    message: "Login successful",
                    message: `Hello ${user.userName} `,
                })
            }
        }
    } catch (err) {
        const error = new Error(err)
        throw error
    }
}

let userProfile = async (req, res, next) => {
    try {
        let user = await User.findById(req.user.userId).select(
            "-password -_id -__v"
        )
        res.status(200).json({
            message: "User profile fetched successfully.",
            user,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let editUser = async (req, res, next) => {
    const { userName, email } = req.body
    try {
        await User.findByIdAndUpdate(
            { _id: req.user.userId },
            { userName, email }
        )

        res.status(200).json({
            message: "User updated successfully.",
            // user: { userName: user.userName, email: user.email },
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

module.exports = {
    signup,
    verify,
    login,
    editUser,
    userProfile,
}
