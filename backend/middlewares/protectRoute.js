import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'

const protectRoute = async (req, res, next) => {
  try {
    // Ambil token dari header Authorization
    const authHeader = req.headers.authorization

    // Pastikan header Authorization tersedia dan berformat sesuai dengan standar bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Unauthorized' })
    }

    // Ambil token dari header, hilangkan 'Bearer ' dari awal string
    const token = authHeader.split(' ')[1]

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    // Dapatkan informasi user dari database berdasarkan decoded.userId
    const user = await User.findById(decoded.userId).select('-password')

    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    // Setel objek user ke req.user untuk digunakan di rute selanjutnya
    req.user = user

    next()
  } catch (err) {
    res.status(500).json({ message: err.message })
    console.error('Error in protectRoute: ', err)
  }
}

export default protectRoute
