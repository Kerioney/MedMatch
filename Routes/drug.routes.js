const route = require("express").Router()
const drugController = require("../Controllers/drug.controllers")

route.get("/drugs", drugController.getAllDrugs)
route.get("/drug/:id", drugController.getDrug)
route.get("/similarDrugs/:id", drugController.similarDrugs)
route.get("/search", drugController.drugSearch)

module.exports = route
