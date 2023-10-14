import { Box, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import useShowToast from '../hooks/useShowToast'

import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import Rightbar from '../components/Rightbar/Rightbar'
import Post from '../components/Post/Post'
import Sidebar from '../components/Sidebar/Sidebar'

const HomePage = () => {
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [loading, setLoading] = useState(true)
  const showToast = useShowToast()

  useEffect(() => {
    const getFeedPosts = async () => {
      setLoading(true)
      setPosts([])
      try {
        const res = await fetch('/v1/api/posts/feed')
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        // console.log(data)
        setPosts(data)
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

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Box>

      <Rightbar />
    </Flex>
  )
}

export default HomePage
