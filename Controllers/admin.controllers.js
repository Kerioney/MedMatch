const User = require("../models/user.model")
const Drug = require("../models/drug.model")

let getallUsers = async (req, res, next) => {
    try {
        const users = await User.find()
        if (!users) {
            const error = new Error("Could not find any user")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: "Fetched users successfully.",
            users,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let getUser = async (req, res) => {
    try {
        let user = await User.findById(req.params.id)
        res.status(200).json({
            message: "Fetched user successfully.",
            user,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let deleteUser = async (req, res) => {
    try {
        let user = await User.findByIdAndRemove(req.params.id)
        res.status(200).json({
            message: "User deleted successfully.",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let addDrug = async (req, res) => {
    const { name, activeIngredient, category, price } = req.body
    try {
        let drug = await Drug.insertMany({
            name,
            activeIngredient,
            category,
            price,
        })
        res.status(200).json({
            message: "Drug added successfully.",
            drug,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
