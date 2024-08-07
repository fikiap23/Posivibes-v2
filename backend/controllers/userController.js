import User from '../models/userModel.js'
import Post from '../models/postModel.js'
import bcrypt from 'bcryptjs'
import generateTokenAndSetCookie from '../utils/helpers/generateTokenAndSetCookie.js'
import mongoose from 'mongoose'
import { v2 as cloudinary } from 'cloudinary'
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
      const token = generateTokenAndSetCookie(newUser._id, res)
      res.status(201).json({
        user: {
          _id: newUser._id,
          name: newUser.name,
          email: newUser.email,
          username: newUser.username,
          bio: newUser.bio,
          profilePic: newUser.profilePic,
        },
        token: token,
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
    let { identifier, password } = req.body // 'identifier' can be either username or email
    identifier = identifier.toLowerCase()
    const user = await User.findOne({
      $or: [{ username: identifier }, { email: identifier }],
    })
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ''
    )

    if (!user || !isPasswordCorrect)
      return res.status(400).json({ error: 'Invalid username or password' })

    if (user.isFrozen) {
      user.isFrozen = false
      await user.save()
    }

    // generate token
    const token = generateTokenAndSetCookie(user._id, res)
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        username: user.username,
        bio: user.bio,
        profilePic: user.profilePic,
      },
      token: token,
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

    // update semua replies jika user mengganti username
    await Post.updateMany(
      { 'replies.userId': userId },
      {
        $set: {
          'replies.$[reply].username': user.username,
          'replies.$[reply].profilePic': user.profilePic,
        },
      },
      {
        arrayFilters: [{ 'reply.userId': userId }],
      }
    )

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

const getSuggestedUsers = async (req, res) => {
  try {
    // exclude the current user from suggested users array and exclude users that current user is already following
    const userId = req.user._id

    const usersFollowedByYou = await User.findById(userId).select('following')

    const users = await User.aggregate([
      {
        $match: {
          _id: { $ne: userId },
        },
      },
      {
        $sample: { size: 10 },
      },
    ])
    const filteredUsers = users.filter(
      (user) => !usersFollowedByYou.following.includes(user._id)
    )
    const suggestedUsers = filteredUsers.slice(0, 6)

    suggestedUsers.forEach((user) => (user.password = null))

    res.status(200).json(suggestedUsers)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const freezeAccount = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (!user) {
      return res.status(400).json({ error: 'User not found' })
    }

    user.isFrozen = true
    await user.save()

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

const searchUsers = async (req, res) => {
  const { query } = req.params

  try {
    const users = await User.find({
      $or: [
        { username: { $regex: `^${query}`, $options: 'i' } }, // Pencarian awalan username case-insensitive
        { name: { $regex: `^${query}`, $options: 'i' } }, // Pencarian awalan nama case-insensitive
      ],
    })
      .select('-password')
      .select('-updatedAt')

    if (users.length === 0) {
      return res.status(404).json({ error: 'No matching users found' })
    }

    res.status(200).json(users)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log('Error in searchUsers: ', err.message)
  }
}

export {
  signupUser,
  loginUser,
  logoutUser,
  followUnFollowUser,
  updateUser,
  getUserProfile,
  getSuggestedUsers,
  freezeAccount,
  searchUsers,
}
