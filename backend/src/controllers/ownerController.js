import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

export const dashboard = async (req, res) => {
  const store = await prisma.store.findFirst({
    where: { ownerId: req.user.id },
    include: { ratings: { include: { user: true } } }
  })

  if (!store) return res.json({ message: "No store found" })

  const avg =
    store.ratings.reduce((a, b) => a + b.rating, 0) /
    (store.ratings.length || 1)

  res.json({
    storeName: store.name,
    averageRating: avg,
    usersRated: store.ratings.map(r => ({
      name: r.user.name,
      email: r.user.email,
      rating: r.rating
    }))
  })
}