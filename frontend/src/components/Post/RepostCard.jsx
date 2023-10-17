/* eslint-disable react/prop-types */

import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'

import { Button, useColorMode } from '@chakra-ui/react'

import { Link, useNavigate } from 'react-router-dom'
import RepostCardHeader from '../Reactions/RepostCardHeader'
import { formatDistanceToNow } from 'date-fns'

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
          text={repost.repostText}
          usernameOriginPost={repost.originalPost.username}
          postDate={formatDistanceToNow(new Date(repost.updatedAt))}
        />

        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2} mt={2}>
          <Avatar
            cursor={'pointer'}
            size="md"
            name={repost.originalPost.name}
            src={repost.originalPost.profilePic}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${repost.originalPost.username}`)
            }}
          />
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text
                cursor={'pointer'}
                fontSize={'sm'}
                fontWeight={'bold'}
                onClick={(e) => {
                  e.preventDefault()
                  navigate(`/${repost.originalPost.username}`)
                }}
              >
                {repost.originalPost.name}
              </Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            {repost.originalPost.title}
          </Text>

          {repost.originalPost.imgPost && (
            <Box
              borderRadius={6}
              overflow={'hidden'}
              border={'1px solid'}
              borderColor={'gray.light'}
            >
              <Image src={repost.originalPost.imgPost} alt={''} w={'full'} />
            </Box>
          )}
          <Text fontSize={{ base: 'sm', md: 'md' }}>
            {' '}
            {repost.originalPost.text}
          </Text>

          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Link
              to={`/${repost.originalPost.username}/post/${repost.originalPost.postId}`}
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
