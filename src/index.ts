import express from 'express'
import cors from 'cors'
import { config as envConfig } from 'dotenv'
import { todoRouter, userRouter } from './routes'

envConfig()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'FoodStyles API v1' })
})

app.use('/api/v1', userRouter)
app.use('/api/v1', todoRouter)

const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
