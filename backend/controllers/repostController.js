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
        name: user.name, // Mengambil nama pengguna dari database pengguna
        username: user.username, // Mengambil nama pengguna dari database pengguna
        bio: user.bio,
        profilePic: user.profilePic, // Mengambil URL gambar profil dari database pengguna
        followers: user.followers,
        following: user.following,
      },
      originalPost: {
        post: {
          postId: id,
          title: postToRepost.title,
          imgPost: postToRepost.img,
          text: postToRepost.text,
        },
        user: {
          userId: OriginPostUser,
          name: OriginPostUser.name,
          username: OriginPostUser.username,
          bio: OriginPostUser.bio,
          profilePic: OriginPostUser.profilePic,
          followers: OriginPostUser.followers,
          following: OriginPostUser.following,
        },
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

// Fungsi untuk memperbarui entri "Repost" berdasarkan perubahan profil pengguna yang diikuti
const updateRepostsForFollowedUsers = async (userId) => {
  try {
    // Temukan dan perbarui entri "Repost" yang terkait dengan pengguna yang diikuti.
    const user = await User.findById(userId)
    await Repost.updateMany(
      { 'repostedBy.userId': userId }, // Temukan entri Repost yang terkait dengan pengguna yang diupdate profilnya
      {
        $set: {
          'repostedBy.name': user.name,
          'repostedBy.username': user.username,
          'repostedBy.bio': user.bio,
          'repostedBy.profilePic': user.profilePic,
          'repostedBy.followers': user.followers,
          'repostedBy.following': user.following,
        },
      }
    )
  } catch (err) {
    console.error('Error updating Reposts:', err)
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

    // Memperbarui entri "Repost" untuk semua pengguna yang diikuti
    await updateRepostsForFollowedUsers(userId)

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

export { repostPost, getRepostsByFollowedUsers, deleteRepost }