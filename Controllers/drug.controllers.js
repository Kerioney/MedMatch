const Drug = require("../models/drugs")

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

// let getAllSimilarDrugs = (req, res) => {
//     Drug.find({ activeIngredient: req.params.activeIngredient })
//         .then((drugs) => res.send(drugs))
//         .catch((err) => console.log(err))
// }

module.exports = {
    getAllDrugs,
    getDrug,
}
