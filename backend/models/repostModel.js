import mongoose from 'mongoose'

const repostedBySchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
}

const originalPostSchema = {
  postId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // ID pengguna asal yang melakukan post asli
  },
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
