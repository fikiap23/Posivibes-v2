import express from 'express'
import {
  repostPost,
  getRepostsByFollowedUsers,
  deleteRepost,
  getRepostsByUsername,
  getRepostUsersByPostId,
} from '../controllers/repostController.js'

import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk melakukan repost
router.post('/create', protectRoute, repostPost)

// Rute untuk mendapatkan reposts oleh pengguna yang diikuti
router.get('/feed', protectRoute, getRepostsByFollowedUsers)

// Rute untuk menghapus repost
router.delete('/:id', protectRoute, deleteRepost)

// Rute untuk mendapatkan reposts oleh pengguna tertentu
router.get('/:username', getRepostsByUsername)

// Rute untuk mendapatkan pengguna yang melakukan repost pada suatu postingan
router.get('/post/:postId', getRepostUsersByPostId)

export default router
