const { Router } = require("express")
const router = Router()
const usersController = require("../controllers/users.controller")

router.post("/register", usersController.validateUser, usersController.register)
router.post("/login", usersController.validateUser, usersController.login)
router.post("/logout", usersController.authorize, usersController.logout)

module.exports = router
