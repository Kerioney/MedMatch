//Global Modules:
const express = require("express")
const connection = require("./Configuration/config.js")
const app = express()
const helmet = require("helmet")
const mongoSanitize = require("express-mongo-sanitize")
const cors = require("cors")
const errorHandling = require("./Middleware/error-handling.js")
require("dotenv").config()

//Routes:

const userRoutes = require("./Routes/user.routes")

//Middleware:
app.use(express.json())
app.use(helmet())
app.use(mongoSanitize())
app.use(cors())
app.use(errorHandling)

app.use(userRoutes)
connection(app)
