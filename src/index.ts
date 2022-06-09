import { Prisma, PrismaClient } from '@prisma/client'
import express from 'express'
import cors from 'cors'

const prisma = new PrismaClient()
const app = express()
const jwt = require('jsonwebtoken')

app.use(cors({origin: '*'}))
app.use(express.json())

app.get(`/`, async (req, res) => {
  res.send(`Hello FateFIT`)
})

app.post(`/user/register`, async (req, res) => {
  const { name, email, password, address, phone } = req.body

  const result = await prisma.user.create({
    data: {
      name,
      email,
      password,
      address,
      phone,
      workout: {
        create: {
          seg: "",
          ter: "",
          qua: "",
          qui: "",
          sex: ""
        }
      },
      checkins: {
        create: []
      }
    },
  })
  res.json(result)
})

app.get('/users', async (req, res) => {
  const users = await prisma.user.findMany()
  res.json(users)
})

app.get('/user/:id', async (req, res) => {
  const id = JSON.parse(req.params.id)
  const result = await prisma.user.findUnique({
    where: { id }
  })
  res.json(result)
})

app.post('/signin', async (req, res) => {
  const { email, password } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })

  if (password == user?.password) {
    let token = jwt.sign({
      email: email
    },
    'chave_secreta',
    {
      expiresIn: `1h`
    })
    return res.status(200).send({message: `Authentication succeeded`, token: token, admin: user?.admin, userId: user?.id})

  } else {
    res.status(401).send({message: `Authentication failed`})
  }
})

app.get('/workout/:userId', async (req, res) => {
  const userId = JSON.parse(req.params.userId)
  const result = await prisma.workout.findUnique({
    where: {userId}
  })
  res.json(result)
})


app.put('/workout/update', async (req, res) => {
  const { userId, seg, ter, qua, qui, sex } = req.body

  const result = await prisma.workout.update({
    where: {
      userId
    },
    data: {
      seg,
      ter,
      qua,
      qui,
      sex
    }
  })
  res.status(200).json(result)
})


const server = app.listen(3000, () =>
  console.log(`FateFIT server running. Listening to port 3000.`),
)
