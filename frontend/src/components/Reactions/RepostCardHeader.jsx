/* eslint-disable react/prop-types */
import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { BiRepost } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'

const RepostCardHeader = ({ user, text, usernameOriginPost }) => {
  return (
    <Box mt={2}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
          <Avatar size="sm" name={user.name} src={user.profilePic} />
          <Text fontSize={'md'} fontWeight={'bold'}>
            {user.name}
          </Text>
          <Icon as={BiRepost} />
          <Text
            color="grey"
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
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Box mt={2}>
        <Text fontSize={'sm'} color="blackAlpha.800">
          {text}
        </Text>
      </Box>

      <Divider orientation="horizontal" bg={'black'} my={2} />
    </Box>
  )
}

export default RepostCardHeader
