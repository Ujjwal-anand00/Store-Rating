import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export const listStores = async (req, res) => {
  try {
    const stores = await prisma.store.findMany({
      include: { ratings: true }
    })

    const formatted = stores.map(store => {
      const avg =
        store.ratings.reduce((a, b) => a + b.rating, 0) /
        (store.ratings.length || 1)

      const userRating = store.ratings.find(
        r => r.userId === req.user.id
      )

      return {
        id: store.id,
        name: store.name,
        email: store.email,
        address: store.address,
        averageRating: avg,
        userRating: userRating ? userRating.rating : null
      }
    })

    res.json(formatted)
  } catch (error) {
    res.status(500).json({ message: "Error fetching stores" })
  }
}

export const submitRating = async (req, res) => {
  try {
    const { storeId, rating } = req.body

    if (rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Invalid rating" })
    }

    const result = await prisma.rating.upsert({
      where: {
        userId_storeId: {
          userId: req.user.id,
          storeId
        }
      },
      update: { rating },
      create: {
        rating,
        userId: req.user.id,
        storeId
      }
    })

    res.json(result)
  } catch (error) {
    res.status(500).json({ message: "Error submitting rating" })
  }
}