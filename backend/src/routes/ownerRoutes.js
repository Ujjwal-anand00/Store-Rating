import express from "express"
import { verifyToken, checkRole } from "../middleware/auth.js"
import { dashboard } from "../controllers/ownerController.js"

const router = express.Router()

router.use(verifyToken, checkRole("OWNER"))

router.get("/dashboard", dashboard)

export default router