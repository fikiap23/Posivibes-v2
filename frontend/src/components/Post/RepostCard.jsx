/* eslint-disable react/prop-types */

import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'

import { Button, Spinner, useColorMode } from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'
import RepostCardHeader from '../Reactions/RepostCardHeader'
import { formatDistanceToNow } from 'date-fns'
import ShowCardProfile from '../Reactions/ShowCardProfile'
import { useEffect, useState } from 'react'
import useShowToast from '../../hooks/useShowToast'
import { apiUrl } from '../../utils/baseURL'

const RepostCard = ({ repost }) => {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()
  const [user, setUser] = useState(null)
  const [userOrigin, setUserOrigin] = useState(null)
  const [post, setPost] = useState(null)
  const [loading, setLoading] = useState(true)

  const showToast = useShowToast()
  useEffect(() => {
    const getUser = async () => {
      try {
        const resDataUser = await fetch(
          `/v1/api/users/profile/${repost.repostedBy.userId}`
        )

        const resDataUserOrigin = await fetch(
          `/v1/api/users/profile/${repost.originalPost.userId}`
        )

        const res = await fetch(
          `${apiUrl}/v1/api/posts/${repost.originalPost.postId}`
        )
        const data = await res.json()
        if (data.error) {
          return
        }

        const dataUser = await resDataUser.json()
        const dataUserOrigin = await resDataUserOrigin.json()
        if (dataUser.error) {
          return
        }

        setUser(dataUser)
        setUserOrigin(dataUserOrigin)
        setPost(data)
      } catch (error) {
        console.log('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [
    showToast,
    repost.repostedBy.userId,
    repost.originalPost.userId,
    repost.originalPost.postId,
  ])

  if (!user && !userOrigin && !post && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  if (post === null || userOrigin === null) {
    return <div></div>
  }
  return (
    <>
      <Box
        gap={3}
        mb={4}
        py={5}
        color="black"
        px={4}
        borderRadius={6}
        bg="white"
      >
        <RepostCardHeader
          user={user}
          originalUser={userOrigin}
          postDate={formatDistanceToNow(new Date(repost.createdAt))}
          repostText={repost.repostText}
          repostId={repost._id}
        />
        {userOrigin != null}
        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2} mt={2}>
          <Avatar
            cursor={'pointer'}
            size={{ base: 'sm', md: 'md', lg: 'md' }}
            name={userOrigin.name}
            src={userOrigin.profilePic}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/u/${userOrigin.username}`)
            }}
          />
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text
                mr={2}
                cursor={'pointer'}
                fontSize={'sm'}
                fontWeight={'bold'}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/u/${userOrigin.username}`)
                }}
              >
                {userOrigin.name}
              </Text>
              <ShowCardProfile user={userOrigin} />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            {post.title}
          </Text>

          {post.img && (
            <Box
              borderRadius={6}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'gray.light'}
            >
              <Image src={post.img} alt={''} w={'full'} />
            </Box>
          )}
          {!post.isSpecial && (
            <div style={{ whiteSpace: 'pre-line' }}>{post.text}</div>
          )}
          {post.isSpecial && (
            <div dangerouslySetInnerHTML={{ __html: post.text }} />
          )}

          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={`/${userOrigin.username}/post/${post._id}`}>
              <Button
                bg={'gray.light'}
                color={colorMode === 'dark' ? 'white' : 'white'}
                borderRadius={'full'}
                _hover={{ bg: 'gray.dark' }}
              >
                See Orignal Post
              </Button>
            </Link>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default RepostCard
