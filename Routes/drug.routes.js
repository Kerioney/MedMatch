const route = require("express").Router()
const drugController = require("../Controllers/drug.controllers")

route.get("/drugs", drugController.getAllDrugs)
route.get("/drug/:id", drugController.getDrug)

module.exports = route
