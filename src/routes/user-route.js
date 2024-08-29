const express = require('express')
const userController = require('../controllers/user-controller')
const router = express.Router()

router.post("/registerUser", userController.registerUser)
router.get("/getAllUsers", userController.getAllUsers)

module.exports = router