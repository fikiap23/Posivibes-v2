/* eslint-disable react/prop-types */

import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'

import { Button, useColorMode } from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'
import RepostCardHeader from '../Reactions/RepostCardHeader'
import { formatDistanceToNow } from 'date-fns'
import ShowCardProfile from '../Reactions/ShowCardProfile'

const RepostCard = ({ repost }) => {
  const { colorMode } = useColorMode()
  const navigate = useNavigate()

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
          user={repost.repostedBy}
          originalUser={repost.originalPost.user}
          postDate={formatDistanceToNow(new Date(repost.createdAt))}
          repostText={repost.repostText}
        />

        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2} mt={2}>
          <Avatar
            cursor={'pointer'}
            size="md"
            name={repost.originalPost.user.name}
            src={repost.originalPost.user.profilePic}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${repost.originalPost.user.username}`)
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
                  navigate(`/${repost.originalPost.user.username}`)
                }}
              >
                {repost.originalPost.user.name}
              </Text>
              <ShowCardProfile user={repost.originalPost.user} />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            {repost.originalPost.post.title}
          </Text>

          {repost.originalPost.post.imgPost && (
            <Box
              borderRadius={6}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'gray.light'}
            >
              <Image
                src={repost.originalPost.post.imgPost}
                alt={''}
                w={'full'}
              />
            </Box>
          )}
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            {' '}
            {repost.originalPost.post.text}
          </Text>

          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Link
              to={`/${repost.originalPost.user.username}/post/${repost.originalPost.post.postId}`}
            >
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
