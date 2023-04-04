const route = require("express").Router()
const adminController = require("../Controllers/admin.controllers")
const isAdmin = require("../Middleware/isAdmin")

route.get("/allUsers", isAdmin, adminController.getallUsers)
route.get("/user/:id", isAdmin, adminController.getUser)
route.delete("/deleteUser/:id", isAdmin, adminController.deleteUser)
route.post("/addDrug", isAdmin, adminController.addDrug)
route.put("/editDrug/:id", isAdmin, adminController.editDrug)
route.delete("/deleteDrug/:id", isAdmin, adminController.deleteDrug)

module.exports = route
