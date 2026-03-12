const express = require("express")
const router = express.Router()

const userController = require("../controllers/userController")
const auth = require("../middleware/authMiddleware")

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/profile", auth, userController.profile)
router.get("/users", auth, userController.getUsers)
router.put("/updateProfile", auth, userController.updateProfile)
router.delete("/users/:id", auth, userController.deleteUser)
module.exports = router