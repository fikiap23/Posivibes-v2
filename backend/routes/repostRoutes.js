import express from 'express'
import {
  repostPost,
  getRepostsByFollowedUsers,
  deleteRepost,
} from '../controllers/repostController.js'

import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk melakukan repost
router.post('/create', protectRoute, repostPost)
router.get('/feed', protectRoute, getRepostsByFollowedUsers)
router.delete('/:id', protectRoute, deleteRepost)

export default router
