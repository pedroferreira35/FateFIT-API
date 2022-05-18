import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'

const prisma = new PrismaClient()
const app = express()

app.use(express.json())

app.get(`/`, async (req, res) => {
  res.send(`Hello FateFIT`)
})

app.post(`/signup`, async (req, res) => {
  const { name, email, password } = req.body

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password
    },
  })
  res.json(result)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

const server = app.listen(3000, () =>
  console.log(`FateFIT server running. Listening to port 3000.`),
)
