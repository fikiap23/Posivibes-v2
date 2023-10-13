import { Box, Container, Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import UserHeader from '../components/Header/UserHeader'
import Post from '../components/Post/Post'

import Rightbar from '../components/Rightbar/Rightbar'
import Sidebar from '../components/Sidebar/Sidebar'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'

const UserPage = () => {
  const { user, loading } = useGetUserProfile()
  const { username } = useParams()
  const showToast = useShowToast()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [fetchingPosts, setFetchingPosts] = useState(true)

  useEffect(() => {
    const getPosts = async () => {
      if (!user) return
      setFetchingPosts(true)
      try {
        const res = await fetch(`/v1/api/posts/user/${username}`)
        const data = await res.json()
        console.log(data)
        setPosts(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
        setPosts([])
      } finally {
        setFetchingPosts(false)
      }
    }

    getPosts()
  }, [username, showToast, setPosts, user])

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  if (!user && !loading) {
    return (
      <Flex justifyContent={'center'}>
        <h1>User not found</h1>
      </Flex>
    )
  }

  return (
    <Flex>
      <Sidebar />
      <Container maxWidth={'620px'}>
        <UserHeader user={user} />
        {!fetchingPosts && posts.length === 0 && (
          <Box w={'full'} textAlign={'center'} mt={12} h={'sm'}>
            <Text fontSize="xl" color="gray.600">
              {` ${username} has no posts.`}
            </Text>
          </Box>
        )}
        {fetchingPosts && (
          <Flex justifyContent={'center'} my={12}>
            <Spinner size={'xl'} />
          </Flex>
        )}

        {posts.map((post) => (
          <Post key={post._id} post={post} postedBy={post.postedBy} />
        ))}
      </Container>
      <Rightbar />
    </Flex>
  )
}

export default UserPage
