import express from 'express'
import { repostPost } from '../controllers/repostController.js'

import protectRoute from '../middlewares/protectRoute.js'

const router = express.Router()

// Rute untuk melakukan repost
router.post('/create/:id', protectRoute, repostPost)

export default router
