import express from 'express'
import {
  createPost,
  deletePost,
  getPost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
  deleteReply, // Tambahkan import method deleteReply
} from '../controllers/postController.js'
import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

router.get('/feed', protectRoute, getFeedPosts)
router.get('/:id', getPost)
router.get('/user/:username', getUserPosts)
router.post('/create', protectRoute, createPost)
router.delete('/:id', protectRoute, deletePost)
router.put('/like/:id', protectRoute, likeUnlikePost)
router.put('/reply/:id', protectRoute, replyToPost)

// Tambahkan rute DELETE untuk menghapus balasan
router.delete('/reply/:postId/:replyId', protectRoute, deleteReply)

export default router
