const route = require("express").Router()
const drugController = require("../Controllers/drug.controllers")
const isAuth = require("../Middleware/isAuth")

route.get("/drugs", isAuth, drugController.getAllDrugs)
route.get("/drug/:id", isAuth, drugController.getDrug)
route.get("/similarDrugs/:id", drugController.similarDrugs)
route.get("/search", drugController.drugSearch)
route.delete("/deleteHistory/:id", isAuth, drugController.deleteHistory)
module.exports = route
