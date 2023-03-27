module.exports = (req, res, next) => {
    try {
        if (req.user.role !== "admin") {
            const error = new Error("Not authorized.")
            error.statusCode = 403
            throw error
        }
        next()
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
