import User from '../models/userModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import mongoose from 'mongoose'
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
      // generate token
      generateTokenAndSetCookie(newUser._id, res)
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
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body
    const user = await User.findOne({ username })
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    )

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid username or password' })

    generateTokenAndSetCookie(user._id, res)

    res.status(200).json({
      message: 'User logged in successfully',
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
      },
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
    console.log('Error in loginUser: ', error.message)
  }
}

const logoutUser = (req, res) => {
  try {
    res.cookie('jwt', '', { maxAge: 1 })
    res.status(200).json({ message: 'User logged out successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in logout: ', err.message)
  }
}

const followUnFollowUser = async (req, res) => {
  try {
    const { id } = req.params
    const userToModify = await User.findById(id)
    const currentUser = await User.findById(req.user._id)

    if (id === req.user._id.toString())
      return res
        .status(400)
        .json({ error: 'You cannot follow/unfollow yourself' })

    if (!userToModify || !currentUser)
      return res.status(400).json({ error: 'User not found' })

    const isFollowing = currentUser.following.includes(id)

    if (isFollowing) {
      // Unfollow user
      await User.findByIdAndUpdate(id, { $pull: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $pull: { following: id } })
      res.status(200).json({ message: 'User unfollowed successfully' })
    } else {
      // Follow user
      await User.findByIdAndUpdate(id, { $push: { followers: req.user._id } })
      await User.findByIdAndUpdate(req.user._id, { $push: { following: id } })
      res.status(200).json({ message: 'User followed successfully' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in followUnFollowUser: ', err.message)
  }
}

const updateUser = async (req, res) => {
  const { name, email, username, password, bio } = req.body
  let { profilePic } = req.body

  const userId = req.user._id
  try {
    let user = await User.findById(userId)
    if (!user) return res.status(400).json({ error: 'User not found' })

    if (req.params.id !== userId.toString())
      return res
        .status(400)
        .json({ error: "You cannot update other user's profile" })

    if (password) {
      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(password, salt)
      user.password = hashedPassword
    }

    if (profilePic) {
      if (user.profilePic) {
        await cloudinary.uploader.destroy(
          user.profilePic.split('/').pop().split('.')[0]
        )
      }

      const uploadedResponse = await cloudinary.uploader.upload(profilePic)
      profilePic = uploadedResponse.secure_url
    }

    user.name = name || user.name
    user.email = email || user.email
    user.username = username || user.username
    user.profilePic = profilePic || user.profilePic
    user.bio = bio || user.bio

    user = await user.save()

    // password should be null in response
    user.password = null

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in updateUser: ', err.message)
  }
}

const getUserProfile = async (req, res) => {
  // We will fetch user profile either with username or userId
  // query is either username or userId
  const { query } = req.params

  try {
    let user

    // query is userId
    if (mongoose.Types.ObjectId.isValid(query)) {
      user = await User.findOne({ _id: query })
        .select('-password')
        .select('-updatedAt')
    } else {
      // query is username
      user = await User.findOne({ username: query })
        .select('-password')
        .select('-updatedAt')
    }

    if (!user) return res.status(404).json({ error: 'User not found' })

    res.status(200).json(user)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in getUserProfile: ', err.message)
  }
}

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
}
