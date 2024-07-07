/* eslint-disable react/prop-types */
import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'

import { BiRepost } from 'react-icons/bi'

import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import ShowCardProfile from './ShowCardProfile'
import { apiUrl } from '../../utils/baseURL'
import auth from '../../utils/auth'

const RepostCardHeader = ({
  user,
  originalUser,
  postDate,
  repostText,
  repostId,
}) => {
  const token = auth.getToken()
  const navigate = useNavigate()
  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom)

  const handleDeletePost = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const res = await fetch(`${apiUrl}/v1/api/reposts/${repostId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post deleted', 'success')
      window.location.reload()
    } catch (error) {
      console.log('Error', error.message, 'error')
    }
  }
  return (
    <>
      <Flex
        gap={2}
        alignItems={'center'}
        justifyContent={'center'}
        bg="green.100"
      >
        Repost from
        <Icon as={BiRepost} boxSize={6} />
        <Text
          onClick={(e) => {
            e.preventDefault()
            navigate(`/u/${originalUser.username}`)
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
          @{originalUser.username}
        </Text>
      </Flex>
      <Box mt={2}>
        <Flex alignItems={'center'} justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={2}>
            <Avatar
              size={{ base: 'sm', md: 'md', lg: 'md' }}
              name={user.name}
              src={user.profilePic}
            />
            <Text
              cursor={'pointer'}
              fontSize={{ base: 'sm', md: 'md', lg: 'md' }}
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
              {postDate} ago
            </Text>

            {currentUser?._id === user._id && (
              <DeleteIcon
                size={20}
                cursor={'pointer'}
                onClick={handleDeletePost}
              />
            )}
          </Flex>
        </Flex>

        <Box mt={2}>
          <Text fontSize={'md'} color="blackAlpha.800">
            {repostText}
          </Text>
        </Box>

        <Divider orientation="horizontal" bg={'black'} my={2} />
      </Box>
    </>
  )
}

export default RepostCardHeader
