import mongoose from 'mongoose'

const repostedBySchema = {
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
  }, // Nama pengguna yang melakukan repost
  username: {
    type: String,
  }, // Nama pengguna yang melakukan repost
  profilePic: {
    type: String,
  }, // Gambar profil pengguna yang melakukan repost
  followers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  following: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
}

const originalPostSchema = {
  post: {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post',
    },
    title: {
      type: String,
    }, // Judul postingan asli
    imgPost: {
      type: String,
    }, // Gambar postingan asli
    text: {
      type: String,
    }, // Teks postingan asli
  },
  user: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // ID pengguna asal yang melakukan post asli
    },
    name: {
      type: String,
    }, // Nama pengguna asal yang melakukan post asli
    username: {
      type: String,
    }, // Nama pengguna asal yang melakukan post asli
    profilePic: {
      type: String,
    }, // Gambar profil pengguna asal yang melakukan post asli
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
  },
}

const repostSchema = mongoose.Schema(
  {
    repostedBy: repostedBySchema,
    originalPost: originalPostSchema,
    repostText: {
      type: {
        type: String,
      }, // Teks komentar
    },
  },
  {
    timestamps: true,
  }
)

const Repost = mongoose.model('Repost', repostSchema)

export default Repost
