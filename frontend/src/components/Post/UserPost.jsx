/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDots } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'
import { BiRepost } from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { Button, useColorMode } from '@chakra-ui/react'
import { useState } from 'react'
import Comment from '../Comments/Comment'

const UserPost = ({
  postImg,
  postTitle,
  postContent,
  likes,
  comments,
  reposts,
}) => {
  const [liked, setLiked] = useState(false)
  const { colorMode } = useColorMode()
  const [showComments, setShowComments] = useState(false)
  return (
    <>
      <Box gap={3} mb={4} py={5} bg="white" color="black" px={4}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2}>
          <Avatar size="md" name="Fiki Aprian" src="/fiki1.jpg" />
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                fikiap23
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
              <Text
                fontSize={'sm'}
                color={'blue.300'}
                ml={2}
                cursor={'pointer'}
                textDecoration={'none'}
                _hover={{ textDecoration: 'underline' }}
              >
                Follow
              </Text>
            </Flex>

            <Flex gap={4} alignItems={'center'}>
              <Text fontStyle={'sm'} color={'gray.light'}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            {postTitle}
          </Text>

          {postImg && (
            <Box
              borderRadius={6}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'gray.light'}
            >
              <Link to={'/fikiap23/post/1'}>
                <Image src={postImg} alt={''} w={'full'} />
              </Link>
            </Box>
          )}
          <Text fontSize={{ base: 'sm', md: 'md' }}>{postContent}</Text>
          <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              bg={'gray.light'}
              color={colorMode === 'dark' ? 'white' : 'white'}
              borderRadius={'full'}
              _hover={{ bg: 'gray.dark' }}
            >
              See more
            </Button>
            <Flex gap={4} alignItems={'center'}>
              {liked ? (
                <AiFillHeart
                  className="w-6 h-6 cursor-pointer"
                  style={{ color: 'red' }}
                  onClick={() => setLiked(false)}
                />
              ) : (
                <AiOutlineHeart
                  className="w-6 h-6 cursor-pointer"
                  onClick={() => setLiked(true)}
                />
              )}

              <FaRegComment
                className="w-6 h-6  cursor-pointer"
                onClick={() => setShowComments(!showComments)}
              />
              <BiRepost className="w-6 h-6  cursor-pointer" />
              <PiShareFat className="w-6 h-6  cursor-pointer" />
            </Flex>
          </Flex>
        </Flex>
        {showComments && (
          <Comment
            userAvatar={'/fiki1.jpg'}
            username={'fikiap23'}
            comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            likes={200}
            createdAt={'27 Jul 2022'}
            key={1}
          />
        )}
      </Box>
    </>
  )
}

export default UserPost
