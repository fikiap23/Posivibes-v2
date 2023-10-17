import mongoose from 'mongoose'

const repostedBySchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: String, // Nama pengguna yang melakukan repost
  username: String, // Nama pengguna yang melakukan repost
  profilePic: String, // Gambar profil pengguna yang melakukan repost
}

const originalPostSchema = {
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },
  title: String, // Judul postingan asli
  imgPost: String, // Gambar postingan asli
  text: String, // Teks postingan asli
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ID pengguna asal yang melakukan post asli
  },
  name: String, // Nama pengguna asal yang melakukan post asli
  username: String, // Nama pengguna asal yang melakukan post asli
  profilePic: String, // Gambar profil pengguna asal yang melakukan post asli
}

const repostSchema = mongoose.Schema(
  {
    repostedBy: repostedBySchema,
    originalPost: originalPostSchema,
    repostText: {
      type: String, // Teks komentar
    },
  },
  {
    timestamps: true,
  }
)

const Repost = mongoose.model('Repost', repostSchema)

export default Repost
