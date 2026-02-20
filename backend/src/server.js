import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import authRoutes from "./routes/authRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
import storeRoutes from "./routes/storeRoutes.js"
import ownerRoutes from "./routes/ownerRoutes.js"

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.use("/auth", authRoutes)
app.use("/admin", adminRoutes)
app.use("/stores", storeRoutes)
app.use("/owner", ownerRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})