const route = require("express").Router()
const adminController = require("../Controllers/admin.controllers")
const isAuth = require("../Middleware/isAuth")
const isAdmin = require("../Middleware/isAdmin")

route.get("/allUsers", isAuth, isAdmin, adminController.getallUsers)
route.get("/user/:id", isAuth, isAdmin, adminController.getUser)
route.delete("/deleteUser/:id", isAuth, isAdmin, adminController.deleteUser)
route.post("/addDrug", isAuth, isAdmin, adminController.addDrug)
route.put("/editDrug/:id", isAuth, isAdmin, adminController.editDrug)
route.delete("/deleteDrug/:id", isAuth, isAdmin, adminController.deleteDrug)

module.exports = route
