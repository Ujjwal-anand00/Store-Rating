import { PrismaClient } from "@prisma/client"
import bcrypt from "bcrypt"

const prisma = new PrismaClient()

export const dashboard = async (req, res) => {
  const users = await prisma.user.count()
  const stores = await prisma.store.count()
  const ratings = await prisma.rating.count()

  res.json({ users, stores, ratings })
}

export const createUser = async (req, res) => {
  const { name, email, password, address, role } = req.body

  const hashed = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: { name, email, password: hashed, address, role }
  })

  res.json(user)
}

export const createStore = async (req, res) => {
  const { name, email, address, ownerId } = req.body

  const store = await prisma.store.create({
    data: { name, email, address, ownerId }
  })

  res.json(store)
}

export const listUsers = async (req, res) => {
  const { name, email, role, sort = "name" } = req.query

  const users = await prisma.user.findMany({
    where: {
      name: name ? { contains: name, mode: "insensitive" } : undefined,
      email: email ? { contains: email } : undefined,
      role: role || undefined
    },
    orderBy: { [sort]: "asc" }
  })

  res.json(users)
}

export const listStores = async (req, res) => {
  const stores = await prisma.store.findMany({
    include: { ratings: true }
  })

  res.json(stores)
}

export const getUserById = async (req, res) => {
  const { id } = req.params

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        store: {
          include: {
            ratings: true
          }
        }
      }
    })

    if (!user) {
      return res.status(404).json({ message: "User not found" })
    }

    let averageRating = null

    if (user.role === "OWNER" && user.store) {
      const ratings = user.store.ratings
      averageRating =
        ratings.length > 0
          ? ratings.reduce((sum, r) => sum + r.rating, 0) / ratings.length
          : 0
    }

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      address: user.address,
      role: user.role,
      store: user.store ? user.store.name : null,
      averageRating
    })

  } catch (err) {
    res.status(500).json({ message: "Error fetching user" })
  }
}
export const getStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: {
        ratings: true
      }
    })

    const formattedStores = stores.map(store => {
      const ratings = store.ratings
      const averageRating =
        ratings.reduce((sum, r) => sum + r.rating, 0) /
        (ratings.length || 1)

      return {
        ...store,
        averageRating
      }
    })

    res.json(formattedStores)

  } catch (err) {
    res.status(500).json({ message: "Failed to fetch stores" })
  }
}