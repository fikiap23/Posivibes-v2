import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
const signupUser = async (req, res) => {
  try {
    // property yg ada di req.body
    const { name, email, username, password } = req.body

    // cek apakah user ada di db
    const user = await User.findOne({ $or: [{ email }, { username }] })
    if (user) {
      return res.status(400).json({ error: 'User already exists' })
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    // buat user baru
    const newUser = new User({
      name,
      email,
      username,
      password: hashedPassword,
    })
    await newUser.save()

    // buat response
    if (newUser) {
      res.status(201).json({
        message: 'User created successfully',
        data: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          bio: newUser.bio,
          profilePic: newUser.profilePic,
        },
      })
    } else {
      res.status(400).json({ error: 'Invalid user data' })
    }
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('error di signup', error.message)
  }
}

export { signupUser }
