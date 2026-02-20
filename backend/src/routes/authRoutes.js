import express from "express"
import { register, login ,updatePassword } from "../controllers/authController.js"
import { verifyToken } from "../middleware/auth.js"

const router = express.Router()

router.post("/register", register)
router.post("/login", login)
router.post("/update-password", verifyToken, updatePassword)

export default router