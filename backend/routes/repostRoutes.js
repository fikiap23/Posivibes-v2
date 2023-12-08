import express from 'express'
import {
  repostPost,
  getRepostsByFollowedUsers,
  deleteRepost,
  getRepostsByUsername,
} from '../controllers/repostController.js'

import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk melakukan repost
router.post('/create', protectRoute, repostPost)
router.get('/feed', protectRoute, getRepostsByFollowedUsers)
router.delete('/:id', protectRoute, deleteRepost)
// Get reposts by a specific user ID
router.get('/:username', getRepostsByUsername)

export default router
