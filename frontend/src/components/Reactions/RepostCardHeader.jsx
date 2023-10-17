/* eslint-disable react/prop-types */
import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'

import { BiRepost } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

const RepostCardHeader = ({ user, text, usernameOriginPost, postDate }) => {
  const navigate = useNavigate()
  return (
    <Box mt={2}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
          <Avatar size="sm" name={user.name} src={user.profilePic} />
          <Text
            cursor={'pointer'}
            fontSize={'md'}
            fontWeight={'bold'}
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${user.username}`)
            }}
          >
            {user.name}
          </Text>
          <Icon as={BiRepost} />
          <Text>Repost</Text>
          <Text
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${usernameOriginPost}`)
            }}
            cursor={'pointer'}
            mb={1}
            color="blue"
            fontFamily={'cursive'}
            fontSize={{
              base: 'sm',
              md: 'md',
              lg: 'lg',
            }}
          >
            @{usernameOriginPost}
          </Text>
        </Flex>

        <Flex gap={4} alignItems={'center'}>
          <Text fontStyle={'sm'} color={'gray.light'}>
            {postDate} ago
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Box mt={2}>
        <Text fontSize={'md'} color="blackAlpha.800">
          {text}
        </Text>
      </Box>

      <Divider orientation="horizontal" bg={'black'} my={2} />
    </Box>
  )
}

export default RepostCardHeader
