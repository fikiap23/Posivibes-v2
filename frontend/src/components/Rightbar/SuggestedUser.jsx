/* eslint-disable react/prop-types */
import { Avatar, Box, Button, Flex, Text } from '@chakra-ui/react'
import { useEffect } from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import useFollowUnfollow from '../../hooks/useFollowUnfollow'

const SuggestedUser = ({ user }) => {
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user)
  const navigate = useNavigate()
  const [close, setClose] = useState(false)

  useEffect(() => {
    setClose(false)
  }, [])
  return (
    <Flex
      gap={2}
      justifyContent={'space-between'}
      alignItems={'center'}
      hidden={close}
    >
      <Flex
        gap={2}
        cursor={'pointer'}
        onClick={(e) => {
          e.preventDefault()
          navigate(`/${user.username}`)
        }}
        _hover={{ textDecoration: 'underline', color: 'blue.400' }}
      >
        <Avatar src={user.profilePic} />
        <Box>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {user.name}
          </Text>
          <Text color={'gray.light'} fontSize={'sm'}>
            {`@${user.username}`}
          </Text>
        </Box>
      </Flex>

      <Flex gap={4} alignItems={'center'} className="align-items-center">
        <Button
          size={'sm'}
          color={following ? 'black' : 'white'}
          bg={following ? 'white' : 'blue.400'}
          onClick={handleFollowUnfollow}
          isLoading={updating}
          _hover={{
            color: following ? 'black' : 'white',
            opacity: '.8',
          }}
        >
          {following ? 'Unfollow' : 'Follow'}
        </Button>
        <Text
          fontSize={'sm'}
          mr={2}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline', color: 'blue.400' }}
          mb={2}
          onClick={() => setClose(true)}
        >
          {'x'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default SuggestedUser
