/* eslint-disable react/prop-types */

import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'

import { PiShareFat } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { Button, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import Comment from '../Reactions/Comment'

import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import useShowToast from '../../hooks/useShowToast'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import postsAtom from '../../atoms/postsAtom'
import CreateComent from '../Reactions/CreateComent'
import ShowCardProfile from '../Reactions/ShowCardProfile'
import CreateRepost from '../Reactions/CreateRepost'

const Post = ({ post, postedBy }) => {
  const { colorMode } = useColorMode()
  const [showComments, setShowComments] = useState(false)
  const [user, setUser] = useState(null)
  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom)
  const navigate = useNavigate()
  const [liked, setLiked] = useState(post.likes?.includes(currentUser?._id))
  const [posts, setPosts] = useRecoilState(postsAtom)
  const [isLiking, setIsLiking] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch('/v1/api/users/profile/' + postedBy)
        const data = await res.json()
        // console.log(postedBy)
        if (data.error) {
          // showToast('Error', data.error, 'error')
          return
        }
        setUser(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
        setUser(null)
      }
    }

    getUser()
  }, [postedBy, showToast])

  const handleDeletePost = async (e) => {
    try {
      e.preventDefault()
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const res = await fetch(`/v1/api/posts/${post._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post deleted', 'success')
      setPosts(posts.filter((p) => p._id !== post._id))
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  const handleLikeAndUnlike = async () => {
    if (!currentUser)
      return showToast('Error', 'You must be logged in to like a post', 'error')
    if (isLiking) return
    setIsLiking(true)
    try {
      const res = await fetch('/v1/api/posts/like/' + post._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.error) return showToast('Error', data.error, 'error')

      if (!liked) {
        // add the id of the current currentUser to post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return { ...p, likes: [...p.likes, currentUser._id] }
          }
          return p
        })
        setPosts(updatedPosts)
      } else {
        // remove the id of the current currentUser from post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === post._id) {
            return {
              ...p,
              likes: p.likes.filter((id) => id !== currentUser._id),
            }
          }
          return p
        })
        setPosts(updatedPosts)
      }

      setLiked(!liked)
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsLiking(false)
    }
  }

  if (!user) return null
  return (
    <>
      <Box
        gap={3}
        mb={4}
        py={5}
        bg="white"
        color="black"
        px={4}
        borderRadius={6}
      >
        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2}>
          <Avatar
            cursor={'pointer'}
            size={{ base: 'sm', md: 'md' }}
            name={user.name}
            src={user?.profilePic}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${user.username}`)
            }}
          />
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'} gap={2}>
              <Text
                cursor={'pointer'}
                fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
                fontWeight={'bold'}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/${user.username}`)
                }}
              >
                {user.name}
              </Text>

              <ShowCardProfile user={user} />
            </Flex>

            <Flex gap={4} alignItems={'center'}>
              <Text
                fontSize={'xs'}
                width={36}
                textAlign={'right'}
                color={'gray.light'}
              >
                {formatDistanceToNow(new Date(post.createdAt))} ago
              </Text>
              {currentUser?._id === user._id && (
                <DeleteIcon size={20} onClick={handleDeletePost} />
              )}
              <BsThreeDots />
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
          <Text fontSize={{ base: 'sm', md: 'md' }}>{post.text}</Text>
          <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Link to={`/${user.username}/post/${post._id}`}>
              <Button
                bg={'gray.light'}
                color={colorMode === 'dark' ? 'white' : 'white'}
                borderRadius={'full'}
                _hover={{ bg: 'gray.dark' }}
              >
                See more
              </Button>
            </Link>
            <Flex gap={4} alignItems={'center'}>
              {liked ? (
                <Flex gap={1}>
                  <AiFillHeart
                    className="w-6 h-6 cursor-pointer"
                    style={{ color: 'red' }}
                    onClick={handleLikeAndUnlike}
                  />
                  <Text>{post.likes.length}</Text>
                </Flex>
              ) : (
                <Flex gap={1}>
                  <AiOutlineHeart
                    className="w-6 h-6 cursor-pointer"
                    onClick={handleLikeAndUnlike}
                  />
                  <Text>{post.likes.length}</Text>
                </Flex>
              )}

              <Flex gap={1}>
                <FaRegComment
                  className="w-6 h-6  cursor-pointer"
                  onClick={() => setShowComments(!showComments)}
                />
                <Text>{post.replies.length}</Text>
              </Flex>
              <CreateRepost post={post} userPost={user} />
              <PiShareFat className="w-6 h-6  cursor-pointer" />
            </Flex>
          </Flex>
        </Flex>
        {showComments && (
          <>
            {currentUser != null && (
              <CreateComent post={post} currentUser={currentUser} />
            )}
            {post.replies.map((reply) => (
              <Comment key={reply._id} reply={reply} currentPost={post} />
            ))}
          </>
        )}
      </Box>
    </>
  )
}

export default Post
