import express from 'express'
import {
  followUnFollowUser,
  loginUser,
  logoutUser,
  signupUser,
  updateUser,
} from '../controllers/userController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.post('/signup', signupUser)
router.post('/login', loginUser)
router.post('/logout', logoutUser)
router.post('/follow/:id', protectRoute, followUnFollowUser) // Toggle state(follow/unfollow)
router.put('/update/:id', protectRoute, updateUser)

export default router
