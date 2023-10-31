import express from 'express'
import dotenv from 'dotenv'
import connectDB from './db/connectDB.js'
import cookieParser from 'cookie-parser'
import userRoutes from './routes/userRoutes.js'
import postRoutes from './routes/postRoutes.js'
import repostRoutes from './routes/repostRoutes.js'
import messageRoutes from './routes/messageRoutes.js'
import { v2 as cloudinary } from 'cloudinary'
import { app, server } from './socket/socket.js'

dotenv.config()

connectDB()

const PORT = process.env.PORT || 5000

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

app.use(express.json({ limit: '50mb' })) // for parsing application/json data in the request body
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded data in the request body
app.use(cookieParser())

// Routes
app.use('/v1/api/users', userRoutes)
app.use('/v1/api/posts', postRoutes)
app.use('/v1/api/reposts', repostRoutes)
app.use('/v1/api/messages', messageRoutes)

server.listen(PORT, () => {
  console.log(`Server started at  http://localhost:${PORT}`)
})
