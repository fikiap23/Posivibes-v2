import { Box, Container, Flex, Spinner, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useRecoilState } from 'recoil'
import postsAtom from '../atoms/postsAtom'
import repostsAtom from '../atoms/repostAtom'
import UserHeader from '../components/Header/UserHeader'
import Post from '../components/Post/Post'
import RepostCard from '../components/Post/RepostCard'

import Rightbar from '../components/Rightbar/Rightbar'
import Sidebar from '../components/Sidebar/Sidebar'
import useGetUserProfile from '../hooks/useGetUserProfile'
import useShowToast from '../hooks/useShowToast'

const UserPage = () => {
  const { user, loading } = useGetUserProfile()
  const { username } = useParams()
  const showToast = useShowToast()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [reposts, setReposts] = useRecoilState(repostsAtom)
  const [fetchingPosts, setFetchingPosts] = useState(true)
  const [fetchingReposts, setFetchingReposts] = useState(true)
  let [isTabActive, setIsTabActive] = useState('posts')
  // console.log(username)
  const handleTabChange = (tab) => {
    setIsTabActive(tab)
  }
  useEffect(() => {
    const getPosts = async () => {
      if (!user) return
      setFetchingPosts(true)
      try {
        const res = await fetch(`/v1/api/posts/user/${username}`)
        const data = await res.json()
        // console.log(data)
        setPosts(data)
      } catch (error) {
        // showToast('Error', error.message, 'error')
        setPosts([])
      } finally {
        setFetchingPosts(false)
      }
    }

    const getReposts = async () => {
      if (!user) return
      setFetchingReposts(true)
      try {
        const res = await fetch(`/v1/api/reposts/${username}`)
        const data = await res.json()
        // console.log(data)
        setReposts(data)
      } catch (error) {
        // showToast('Error', error.message, 'error')
        setReposts([])
      } finally {
        setFetchingReposts(false)
      }
    }

    if (isTabActive === 'posts') {
      getPosts()
    }

    if (isTabActive === 'reposts') {
      getReposts()
    }
  }, [username, showToast, setPosts, user, isTabActive, setReposts])

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
        <Flex w={'full'} mt={4}>
          <Flex
            flex={1}
            borderBottom={
              isTabActive === 'posts' ? '1.5px solid white' : '1px solid gray'
            }
            justifyContent={'center'}
            pb="3"
            cursor={'pointer'}
            onClick={() => handleTabChange('posts')}
          >
            <Text fontWeight={'bold'}> Post</Text>
          </Flex>
          <Flex
            flex={1}
            borderBottom={
              isTabActive === 'reposts' ? '1.5px solid white' : '1px solid gray'
            }
            justifyContent={'center'}
            color={'gray.light'}
            pb="3"
            cursor={'pointer'}
            onClick={() => handleTabChange('reposts')}
          >
            <Text fontWeight={'bold'}> Repost</Text>
          </Flex>
          <Flex
            flex={1}
            borderBottom={
              isTabActive === 'answers' ? '1.5px solid white' : '1px solid gray'
            }
            justifyContent={'center'}
            color={'gray.light'}
            pb="3"
            cursor={'pointer'}
            onClick={() => handleTabChange('answers')}
          >
            <Text fontWeight={'bold'}> Answer</Text>
          </Flex>
        </Flex>

        {/* Render content based on the active tab */}
        {isTabActive === 'posts' && (
          <>
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
          </>
        )}

        {isTabActive === 'reposts' && (
          <>
            {!fetchingPosts && posts.length === 0 && (
              <Box w={'full'} textAlign={'center'} mt={12} h={'sm'}>
                <Text fontSize="xl" color="gray.600">
                  {` ${username} has no reposts.`}
                </Text>
              </Box>
            )}
            {fetchingReposts && (
              <Flex justifyContent={'center'} my={12}>
                <Spinner size={'xl'} />
              </Flex>
            )}
            {reposts.map((repost) => (
              <RepostCard key={repost._id} repost={repost} />
            ))}
          </>
        )}

        {isTabActive === 'answers' && (
          <>
            <Text>Answer</Text>
          </>
        )}
      </Container>
      <Rightbar />
    </Flex>
  )
}

export default UserPage
