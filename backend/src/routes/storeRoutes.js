import express from "express"
import { verifyToken } from "../middleware/auth.js"
import { listStores, submitRating } from "../controllers/storeController.js"

const router = express.Router()

router.get("/", verifyToken, listStores)
router.post("/rate", verifyToken, submitRating)

export default router