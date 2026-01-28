/* eslint-disable react/prop-types */
import { Avatar, Image, Box, Flex, Text } from '@chakra-ui/react'
import { BsFilterLeft, BsThreeDots } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'
import { BiRepost } from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import {} from 'react-icons/bs'

import { useEffect, useState } from 'react'
import Comment from '../components/Reactions/Comment'

import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
  Spinner,
} from '@chakra-ui/react'
import Rightbar from '../components/Rightbar/Rightbar'
import Sidebar from '../components/Sidebar/Sidebar'
import { useRecoilState, useRecoilValue } from 'recoil'
import useShowToast from '../hooks/useShowToast'
import { useNavigate, useParams } from 'react-router-dom'
import postsAtom from '../atoms/postsAtom'
import userAtom from '../atoms/userAtom'
import useGetUserProfile from '../hooks/useGetUserProfile'
import { formatDistanceToNow } from 'date-fns'
import { DeleteIcon } from '@chakra-ui/icons'
import CreateComent from '../components/Reactions/CreateComent'
import ShowLikes from '../components/Reactions/ShowLikes'
import ShowCardProfile from '../components/Reactions/ShowCardProfile'
import Repost from '../components/Reactions/Repost'
import { apiUrl } from '../utils/baseURL'
import auth from '../utils/auth'

const PostPage = () => {
  const token = auth.getToken()
  const [isLiking, setIsLiking] = useState(false)
  const [isTabActive, setIsTabActive] = useState('comments')
  const { colorMode } = useColorMode()
  const { user, loading } = useGetUserProfile()
  const [posts, setPosts] = useRecoilState(postsAtom)
  const showToast = useShowToast()
  const { pid } = useParams()
  const currentUser = useRecoilValue(userAtom)
  const navigate = useNavigate()
  const [reposts, setReposts] = useState([])

  const currentPost = posts[0]
  // console.log(currentPost)
  const [liked, setLiked] = useState(null)
  useEffect(() => {
    const getPost = async () => {
      setPosts([])
      try {
        const res = await fetch(`${apiUrl}/v1/api/posts/${pid}`)
        const data = await res.json()
        if (data.error) {
          console.log('Error', data.error, 'error')
          return
        }
        setPosts([data])
        // Perbarui state liked sesuai dengan data post yang diterima
        setLiked(data.likes.includes(currentUser?._id))
      } catch (error) {
        console.log('Error', error.message, 'error')
      }
    }
    getPost()

    const getReposts = async () => {
      if (!user) return
      //  setFetchingReposts(true)
      try {
        const res = await fetch(`${apiUrl}/v1/api/reposts/post/${pid}`)
        const data = await res.json()
        console.log(data)
        setReposts(data)
      } catch (error) {
        // console.log('Error', error.message, 'error')
        setReposts([])
      } finally {
        //  setFetchingReposts(false)
      }
    }

    getReposts()
  }, [showToast, pid, setPosts, currentUser?._id, isTabActive, user])

  const handleDeletePost = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const res = await fetch(`${apiUrl}/v1/api/posts/${currentPost._id}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post deleted', 'success')
      navigate(`/${user.username}`)
    } catch (error) {
      console.log('Error', error.message, 'error')
    }
  }
  const handleLikeAndUnlike = async () => {
    if (!currentUser)
      return console.log(
        'Error',
        'You must be logged in to like a post',
        'error',
      )
    if (isLiking) return
    setIsLiking(true)
    try {
      const res = await fetch(
        '${apiUrl}/v1/api/posts/like/' + currentPost._id,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      const data = await res.json()
      if (data.error) return console.log('Error', data.error, 'error')

      if (!liked) {
        // add the id of the current currentUser to post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === currentPost._id) {
            return { ...p, likes: [...p.likes, currentUser._id] }
          }
          return p
        })
        setPosts(updatedPosts)
      } else {
        // remove the id of the current currentUser from post.likes array
        const updatedPosts = posts.map((p) => {
          if (p._id === currentPost._id) {
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
      console.log('Error', error.message, 'error')
    } finally {
      setIsLiking(false)
    }
  }

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }

  if (!currentPost) return null
  // console.log('currentPost', currentPost)

  return (
    <Flex>
      <Sidebar />
      <Box maxWidth={{ base: 'full', md: '620px' }} w={'full'}>
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
              size="md"
              name={user.name}
              src={user.profilePic}
              onClick={(e) => {
                e.preventDefault()
                navigate(`/u/${user.username}`)
              }}
            />
            <Flex justifyContent={'space-between'} w={'full'}>
              <Flex w={'full'} alignItems={'center'} gap={2}>
                <Text
                  cursor={'pointer'}
                  fontSize={'sm'}
                  fontWeight={'bold'}
                  onClick={(e) => {
                    e.preventDefault()
                    navigate(`/u/${user.username}`)
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
                  {formatDistanceToNow(new Date(currentPost.createdAt))} ago
                </Text>
                {currentUser?._id === user._id && (
                  <DeleteIcon
                    size={20}
                    cursor={'pointer'}
                    onClick={handleDeletePost}
                  />
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
              {currentPost.title}
            </Text>

            {currentPost.img && (
              <Box
                borderRadius={6}
                overflow={'hidden'}
                border={'1px solid'}
                borderColor={'gray.light'}
              >
                <Image src={currentPost.img} alt={''} w={'full'} />
              </Box>
            )}
            {!currentPost.isSpecial && (
              <div style={{ whiteSpace: 'pre-line' }}>{currentPost.text}</div>
            )}
            {currentPost.isSpecial && (
              <div dangerouslySetInnerHTML={{ __html: currentPost.text }} />
            )}
            <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
            <Flex
              gap={2}
              alignItems={'center'}
              justifyContent={'space-between'}
            >
              <Flex gap={4} alignItems={'center'}>
                {/* likes */}
                {isTabActive === 'likes' ? (
                  <Flex
                    onClick={() => {
                      setIsTabActive('likes')
                    }}
                    cursor={'pointer'}
                    color={'red'}
                    textDecoration={'underline'}
                  >
                    {liked ? (
                      <Flex gap={1}>
                        <AiFillHeart
                          className="w-6 h-6 cursor-pointer"
                          style={{ color: 'red' }}
                          onClick={handleLikeAndUnlike}
                        />
                        <Text>{currentPost.likes.length}</Text>
                      </Flex>
                    ) : (
                      <Flex gap={1}>
                        <AiOutlineHeart
                          className="w-6 h-6 cursor-pointer"
                          onClick={handleLikeAndUnlike}
                        />
                        <Text>{currentPost.likes.length}</Text>
                      </Flex>
                    )}
                  </Flex>
                ) : (
                  <Flex
                    gap={1}
                    onClick={() => {
                      setIsTabActive('likes')
                    }}
                    cursor={'pointer'}
                  >
                    {liked ? (
                      <AiFillHeart
                        className="w-6 h-6 cursor-pointer"
                        style={{ color: 'red' }}
                        // onClick={handleLikeAndUnlike}
                      />
                    ) : (
                      <AiOutlineHeart
                        className="w-6 h-6 cursor-pointer"
                        // onClick={handleLikeAndUnlike}
                      />
                    )}
                    <Text>{currentPost.likes.length}</Text>
                  </Flex>
                )}
                {/* end likes */}

                {/* comments */}
                {isTabActive === 'comments' ? (
                  <Flex
                    gap={1}
                    onClick={() => {
                      setIsTabActive('comments')
                    }}
                    cursor={'pointer'}
                    color={'green'}
                    textDecoration={'underline'}
                  >
                    <FaRegComment className="w-6 h-6  cursor-pointer" />
                    <Text>{currentPost.replies.length}</Text>
                  </Flex>
                ) : (
                  <Flex
                    gap={1}
                    onClick={() => {
                      setIsTabActive('comments')
                    }}
                    cursor={'pointer'}
                  >
                    <FaRegComment className="w-6 h-6  cursor-pointer" />
                    <Text>{currentPost.replies.length}</Text>
                  </Flex>
                )}

                {/* end comments */}

                {/* reposts */}
                {isTabActive === 'reposts' ? (
                  <Flex
                    gap={1}
                    onClick={() => {
                      setIsTabActive('reposts')
                    }}
                    cursor={'pointer'}
                    color={'blue'}
                    textDecoration={'underline'}
                  >
                    <BiRepost className="w-6 h-6  cursor-pointer" />
                    <Text>{reposts.length}</Text>
                  </Flex>
                ) : (
                  <Flex
                    gap={1}
                    onClick={() => {
                      setIsTabActive('reposts')
                    }}
                    cursor={'pointer'}
                  >
                    <BiRepost className="w-6 h-6  cursor-pointer" />
                    <Text>{reposts.length}</Text>
                  </Flex>
                )}
                {/* end reposts */}
                {/* share */}
                <Flex cursor={'pointer'}>
                  <PiShareFat className="w-6 h-6  cursor-pointer" />
                </Flex>
              </Flex>
              <Flex gap={4} alignItems={'center'}>
                <Menu>
                  <MenuButton
                    color={colorMode === 'dark' ? 'black' : 'black'}
                    as={Button}
                    rightIcon={<BsFilterLeft />}
                  >
                    Filter
                  </MenuButton>
                  <MenuList color={colorMode === 'dark' ? 'white' : 'black'}>
                    <MenuOptionGroup defaultValue="newest">
                      <MenuItemOption value={'newest'}>Terbaru</MenuItemOption>
                      <MenuItemOption value={'oldest'}>Terlama</MenuItemOption>
                      <MenuItemOption value={'likes'}>Terbaik</MenuItemOption>
                    </MenuOptionGroup>
                  </MenuList>
                </Menu>
              </Flex>
            </Flex>
          </Flex>
          <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
          {isTabActive === 'likes' && <ShowLikes postId={currentPost._id} />}
          {isTabActive === 'comments' && currentUser != null && (
            <CreateComent post={currentPost} currentUser={currentUser} />
          )}
          {isTabActive === 'comments' &&
            currentPost.replies.map((reply) => (
              <Comment
                key={reply._id}
                reply={reply}
                currentPost={currentPost}
              />
            ))}

          {isTabActive === 'reposts' && (
            <>
              {reposts.length > 0 ? (
                reposts.map((repost) => (
                  <Repost
                    key={repost._id}
                    repost={repost}
                    nameWhoPost={user.username}
                  />
                ))
              ) : (
                <Text>Tidak ada repost</Text>
              )}
            </>
          )}
        </Box>
      </Box>
      <Rightbar />
    </Flex>
  )
}

export default PostPage
