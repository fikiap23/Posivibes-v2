/* eslint-disable react/prop-types */
import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'

import { BiRepost } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import ShowCardProfile from './ShowCardProfile'

const RepostCardHeader = ({
  user,
  originalUser,
  postDate,
  repostText,
  repostId,
}) => {
  const navigate = useNavigate()
  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom)

  const handleDeletePost = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this post?')) return

      const res = await fetch(`/v1/api/reposts/${repostId}`, {
        method: 'DELETE',
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post deleted', 'success')
      window.location.reload()
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }
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
          <ShowCardProfile user={user} />
          <Icon as={BiRepost} boxSize={6} />

          <Text
            onClick={(e) => {
              e.preventDefault()
              navigate(`/${originalUser.username}`)
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

        <Flex gap={4} alignItems={'center'}>
          <Text fontStyle={'sm'} color={'gray.light'}>
            {postDate} ago
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

      <Box mt={2}>
        <Text fontSize={'md'} color="blackAlpha.800">
          {repostText}
        </Text>
      </Box>

      <Divider orientation="horizontal" bg={'black'} my={2} />
    </Box>
  )
}

export default RepostCardHeader
