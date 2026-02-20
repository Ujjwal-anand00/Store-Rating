import express from "express"
import { verifyToken, checkRole } from "../middleware/auth.js"
import { getUserById } from "../controllers/adminController.js"
import {
  dashboard,
  createUser,
  createStore,
  listUsers,
  listStores
} from "../controllers/adminController.js"

const router = express.Router()

router.use(verifyToken, checkRole("ADMIN"))

router.get("/dashboard", dashboard)
router.post("/users", createUser)
router.post("/stores", createStore)
router.get("/users", listUsers)
router.get("/stores", listStores)
router.get("/users/:id", verifyToken, checkRole("ADMIN"), getUserById)

export default router