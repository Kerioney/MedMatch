const route = require("express").Router()
const userController = require("../Controllers/user.controllers")
const validator = require("../Middleware/validator")

const userSchema = require("../Validation/userValidator")

route.post("/signup", validator(userSchema.signupSchema), userController.signup)
route.get("/verify", userController.verify)
route.post("/login", validator(userSchema.loginSchema), userController.login)
route.get("/", (req, res) => {
    res.send("Hello World")
})

module.exports = route
