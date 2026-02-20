import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { validateEmail, validatePassword } from "../utils/validators.js"

const prisma = new PrismaClient()

export const register = async (req, res) => {
  const { name, email, password, address } = req.body

  if (name.length < 20 || name.length > 60)
    return res.status(400).json({ message: "Invalid name length" })

  if (address.length > 400)
    return res.status(400).json({ message: "Address too long" })

  if (!validateEmail(email))
    return res.status(400).json({ message: "Invalid email" })

  if (!validatePassword(password))
    return res.status(400).json({ message: "Weak password" })

  const existing = await prisma.user.findUnique({ where: { email } })
  if (existing) return res.status(400).json({ message: "Email exists" })

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      address,
      role: "USER"
    }
  })

  res.json(user)
}

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return res.status(404).json({ message: "User not found" })

  const valid = await bcrypt.compare(password, user.password)
  if (!valid) return res.status(400).json({ message: "Invalid password" })

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  )

  res.json({ token, role: user.role })
}

export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body

  const user = await prisma.user.findUnique({
    where: { id: req.user.id }
  })

  const valid = await bcrypt.compare(oldPassword, user.password)
  if (!valid)
    return res.status(400).json({ message: "Wrong password" })

  const hashed = await bcrypt.hash(newPassword, 10)

  await prisma.user.update({
    where: { id: req.user.id },
    data: { password: hashed }
  })

  res.json({ message: "Password updated" })
}