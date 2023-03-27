const Drug = require("../Models/drug.model")
const User = require("../Models/user.model")

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
            users: users.map((users) => {
                return {
                    id: users._id,
                    username: users.userName,
                    email: users.email,
                    role: users.role,
                }
            }),
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
            user: {
                id: user._id,
                username: user.userName,
                email: user.email,
                role: user.role,
            },
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
        await User.findByIdAndRemove(req.params.id)
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

let deleteDrug = async (req, res) => {
    try {
        await Drug.findByIdAndRemove(req.params.id)
        res.status(200).json({
            message: "Drug deleted successfully.",
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let editDrug = async (req, res) => {
    const { name, activeIngredient, category, price } = req.body
    try {
        let drug = await Drug.findByIdAndUpdate(
            req.params.id,
            {
                name,
                activeIngredient,
                category,
                price,
            },
            { new: true }
        ).select("-__v")
        res.status(200).json({
            message: "Drug updated successfully.",
            drug,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

module.exports = {
    getallUsers,
    getUser,
    deleteUser,
    addDrug,
    deleteDrug,
    editDrug,
}
