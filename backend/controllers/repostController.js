import Post from '../models/postModel.js'
import Repost from '../models/repostModel.js'
import User from '../models/userModel.js'

const repostPost = async (req, res) => {
  try {
    const { id, postedBy, text } = req.body // Menambahkan teks komentar

    if (!postedBy || !text) {
      return res.status(400).json({ error: 'postedBy and text are required' })
    }

    // Periksa apakah postingan yang akan direpost ada
    const postToRepost = await Post.findById(id)
    if (!postToRepost) {
      return res.status(404).json({ error: 'Post not found' })
    }

    // Periksa izin untuk melakukan repost (misalnya, hanya pemilik postingan asli yang dapat repost)
    if (postToRepost.postedBy.toString() === postedBy) {
      return res.status(401).json({ error: 'You cannot repost your own post' })
    }

    // Ambil informasi pengguna yang melakukan repost dari database pengguna
    const user = await User.findById(postedBy)
    const OriginPostUser = await User.findById(postToRepost.postedBy)

    // Lakukan operasi repost dengan membuat entri "Repost"
    const newRepost = new Repost({
      repostedBy: {
        userId: user._id,
      },
      originalPost: {
        postId: postToRepost._id,
        userId: OriginPostUser._id,
      },
      repostText: text, // Teks komentar
    })

    // Simpan entri "Repost"
    await newRepost.save()

    res
      .status(201)
      .json({ message: 'Post successfully reposted with a comment', newRepost })
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}

const getRepostsByFollowedUsers = async (req, res) => {
  try {
    const userId = req.user._id // ID pengguna saat ini
    // Ambil daftar pengguna yang diikuti oleh pengguna saat ini
    const currentUser = await User.findById(userId)
    const followedUsers = currentUser.following

    // Cari semua reposts yang dibuat oleh pengguna dalam daftar pengguna yang diikuti,
    // termasuk repost yang dibuat oleh pengguna saat ini
    const reposts = await Repost.find({
      'repostedBy.userId': { $in: [...followedUsers, userId] },
    })

    // Anda dapat mengirimkan daftar reposts ke klien atau melakukan operasi lain sesuai kebutuhan
    res.status(200).json(reposts)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}
const deleteRepost = async (req, res) => {
  try {
    // Find the repost by ID
    const repost = await Repost.findById(req.params.id)

    // Check if the repost exists
    if (!repost) {
      return res.status(404).json({ error: 'Repost not found' })
    }

    // Check if the user is authorized to delete the repost (e.g., only the original poster or an admin)
    if (req.user._id.toString() !== repost.repostedBy.userId.toString()) {
      return res
        .status(401)
        .json({ error: 'You are not authorized to delete this repost' })
    }

    // Delete the repost
    await Repost.findByIdAndDelete(req.params.id)

    res.status(200).json({ message: 'Repost deleted successfully' })
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}

const getRepostsByUsername = async (req, res) => {
  try {
    const username = req.params.username // Get the username from the request parameters

    // Find the user based on the username
    const user = await User.findOne({ username })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Find all reposts made by the specified user
    const reposts = await Repost.find({
      'repostedBy.userId': user._id,
    })

    // You can send the list of reposts to the client or perform other operations as needed
    res.status(200).json(reposts)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}

const getRepostUsersByPostId = async (req, res) => {
  try {
    const postId = req.params.postId // Get the post ID from the request parameters

    // Find all repost entries related to a specific post
    const reposts = await Repost.find({
      'originalPost.postId': postId,
    }).populate('repostedBy.userId', 'username') // Populate user information (username)

    if (!reposts || reposts.length === 0) {
      return res.status(404).json({ error: 'No reposts found for this post' })
    }

    // Extract relevant information about reposted users and their repost content
    const repostData = reposts.map((repost) => ({
      user: {
        userId: repost.repostedBy.userId._id,
        username: repost.repostedBy.userId.username,
      },
      repostText: repost.repostText,
    }))

    res.status(200).json(repostData)
  } catch (err) {
    res.status(500).json({ error: err.message })
    console.log(err)
  }
}

export {
  repostPost,
  getRepostsByFollowedUsers,
  getRepostsByUsername,
  deleteRepost,
  getRepostUsersByPostId,
}
