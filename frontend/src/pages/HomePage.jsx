import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'

import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import Rightbar from '../components/Rightbar/Rightbar'
import Post from '../components/Post/Post'
import Sidebar from '../components/Sidebar/Sidebar'
import RepostCard from '../components/Post/RepostCard'

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)

  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()
  console.log(posts)

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        // Ambil postingan dari feed pengguna
        const feedRes = await fetch('/v1/api/posts/feed')
        const feedData = await feedRes.json()

        if (feedData.error) {
          showToast('Error', feedData.error, 'error')
          return
        }

        // Ambil postingan yang merupakan repost
        const repostRes = await fetch('/v1/api/reposts/feed')
        const repostData = await repostRes.json()

        if (repostData.error) {
          showToast('Error', repostData.error, 'error')
          return
        }

        // Gabungkan data postingan dari feed dan repost dengan menambahkan properti type
        const combinedPosts = [
          ...feedData.map((post) => ({ ...post, type: 'post' })),
          ...repostData.map((repost) => ({ ...repost, type: 'repost' })),
        ]

        // Urutkan postingan berdasarkan waktu jika postingan memiliki timestamp
        combinedPosts.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return new Date(b.createdAt) - new Date(a.createdAt)
          }
          return 0
        })

        setPosts(combinedPosts)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }

    getFeedPosts()
  }, [showToast, setPosts])

  return (
    <Flex gap="10" alignItems={'flex-start'}>
      <Sidebar />
      <Box maxWidth={'620px'}>
        {!loading && posts.length === 0 && (
          <h1>Follow some users to see the feed</h1>
        )}

        {loading && (
          <Flex justify="center">
            <Spinner size="xl" />
          </Flex>
        )}

        {posts.map((post) => {
          if (post.type === 'repost') {
            return <RepostCard key={post._id} repost={post} />
          } else {
            return <Post key={post._id} post={post} postedBy={post.postedBy} />
          }
        })}
      </Box>

      <Rightbar />
    </Flex>
  )
}

export default HomePage
