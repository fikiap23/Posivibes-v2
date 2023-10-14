import Post from '../models/postModel.js'
import User from '../models/userModel.js'
import { v2 as cloudinary } from 'cloudinary'

const createPost = async (req, res) => {
  try {
    const { postedBy, title = null, text } = req.body
    let { img } = req.body

    if (!postedBy || !text) {
      return res
        .status(400)
        .json({ error: 'Postedby and text fields are required' })
    }

    const user = await User.findById(postedBy)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    if (user._id.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized to create post' })
    }

    if (img) {
      const uploadedResponse = await cloudinary.uploader.upload(img)
      img = uploadedResponse.secure_url
    }

    const newPost = new Post({ postedBy, text, title, img })
    await newPost.save()

    res.status(201).json(newPost)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}

const getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    res.status(200).json(post)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    if (post.postedBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ error: 'Unauthorized to delete post' })
    }

    if (post.img) {
      const imgId = post.img.split('/').pop().split('.')[0]
      await cloudinary.uploader.destroy(imgId)
    }

    await Post.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Post deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const likeUnlikePost = async (req, res) => {
  try {
    const { id: postId } = req.params
    const userId = req.user._id

    const post = await Post.findById(postId)

    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const userLikedPost = post.likes.includes(userId)

    if (userLikedPost) {
      // Unlike post
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId } })
      res.status(200).json({ message: 'Post unliked successfully' })
    } else {
      // Like post
      post.likes.push(userId)
      await post.save()
      res.status(200).json({ message: 'Post liked successfully' })
    }
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const replyToPost = async (req, res) => {
  try {
    const { text } = req.body
    const postId = req.params.id
    const userId = req.user._id
    const userProfilePic = req.user.profilePic
    const username = req.user.username

    if (!text) {
      return res.status(400).json({ error: 'Text field is required' })
    }

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const reply = { userId, text, userProfilePic, username }

    post.replies.push(reply)
    await post.save()

    // Setelah menyimpan post, reply akan memiliki _id yang baru saja di-generate oleh MongoDB.
    const savedReply = post.replies[post.replies.length - 1]

    res.status(200).json(savedReply)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getFeedPosts = async (req, res) => {
  try {
    const userId = req.user._id
    const user = await User.findById(userId)

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const following = user.following

    // Menggunakan $in untuk mencakup postingan dari orang yang diikuti dan postingan sendiri
    const feedPosts = await Post.find({
      $or: [{ postedBy: { $in: following } }, { postedBy: userId }],
    }).sort({ createdAt: -1 })

    res.status(200).json(feedPosts)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getUserPosts = async (req, res) => {
  const { username } = req.params
  try {
    const user = await User.findOne({ username })
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const posts = await Post.find({ postedBy: user._id }).sort({
      createdAt: -1,
    })

    res.status(200).json(posts)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

// replyToPost
const deleteReply = async (req, res) => {
  try {
    const postId = req.params.postId // Ganti dengan parameter yang sesuai
    const replyId = req.params.replyId // Ganti dengan parameter yang sesuai
    const userId = req.user._id

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Temukan indeks balasan yang ingin dihapus
    const replyIndex = post.replies.findIndex((reply) => reply._id == replyId)

    // Pastikan balasan ditemukan dan bahwa pengguna yang mencoba menghapus balasan adalah pemiliknya
    if (replyIndex === -1) {
      return res.status(404).json({ error: 'Reply not found' })
    }

    const reply = post.replies[replyIndex]

    if (reply.userId.toString() != userId.toString()) {
      return res
        .status(403)
        .json({ error: 'You are not authorized to delete this reply' })
    }

    // Hapus balasan dari array replies
    post.replies.splice(replyIndex, 1)

    // Simpan perubahan ke dalam database
    await post.save()

    res.status(200).json({ message: 'Reply deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

const getReplies = async (req, res) => {
  try {
    const postId = req.params.postId // Ganti dengan parameter yang sesuai

    const post = await Post.findById(postId)
    if (!post) {
      return res.status(404).json({ error: 'Post not found' })
    }

    const replies = post.replies

    res.status(200).json({ replies })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}

export {
  createPost,
  getPost,
  deletePost,
  likeUnlikePost,
  replyToPost,
  getFeedPosts,
  getUserPosts,
  deleteReply,
  getReplies,
}
