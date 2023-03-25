const Drug = require("../Models/drug.model")

let getAllDrugs = async (req, res, next) => {
    const currentPage = req.query.page || 1 // if there is no page in the query it will be 1
    const perPage = req.query.perPage || 6 // number of drugs per page
    let totalDrugs // total number of drugs

    try {
        const count = await Drug.find().countDocuments() // count the number of drugs
        totalDrugs = count
        const drugs = await Drug.find()
            .select(" -category") // select the name and activeIngredient fields

            .skip((currentPage - 1) * perPage) // skip the number of drugs that we want to skip
            // so here in the skip we won't skip the first page
            .limit(perPage) // limit the number of drugs that we want to get

        if (!drugs) {
            const error = new Error("Could not find any post")
            error.statusCode = 404
            throw error
        }

        res.status(200).json({
            message: "Fetched drugs successfully.",
            drugs,
            totalDrugs,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
let getDrug = async (req, res, next) => {
    try {
        let drug = await Drug.findById(req.params.id)
        res.status(200).json({
            message: "Fetched drug successfully.",
            drug,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
let similarDrugs = async (req, res, next) => {
    try {
        const currentPage = req.query.page || 1
        const perPage = req.query.perPage || 6
        let totalDrugs
        let drug = await Drug.findById(req.params.id)
        const count = await Drug.find({
            activeIngredient: drug.activeIngredient,
        }).countDocuments()
        totalDrugs = count
        let similarDrugs = await Drug.find({
            activeIngredient: drug.activeIngredient,
        })
            .skip((currentPage - 1) * perPage)
            .limit(perPage)
            // .select(" -category") // select the name and activeIngredient fields
            .sort({ price: 1 })
        res.status(200).json({
            message: "Fetched similar drugs successfully.",
            similarDrugs,
            totalDrugs,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}

let drugSearch = async (req, res, next) => {
    const search = req.query.search
    const currentPage = req.query.page || 1
    const perPage = req.query.perPage || 6
    let totalDrugs
    try {
        const count = await Drug.find({
            name: { $regex: search, $options: "i" },
        }).countDocuments() // count the number of drugs
        totalDrugs = count

        const drugs = await Drug.find({
            name: { $regex: "^" + search, $options: "i" },
        })
            .select(" -category") // select the name and activeIngredient fields
            // pagination
            .skip((currentPage - 1) * perPage)
            .limit(perPage)

        if (!drugs || drugs.length === 0) {
            const error = new Error("The drug is not found")
            error.statusCode = 404
            throw error
        }
        res.status(200).json({
            message: "Fetched drugs successfully.",
            drugs,
            totalDrugs,
        })
    } catch (err) {
        if (!err.statusCode) {
            err.statusCode = 500
        }
        next(err)
    }
}
module.exports = {
    getAllDrugs,
    getDrug,
    similarDrugs,
    drugSearch,
}
