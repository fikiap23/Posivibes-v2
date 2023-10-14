/* eslint-disable react/prop-types */
import { DeleteIcon } from '@chakra-ui/icons'
import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'

const Comment = ({ reply, currentPost }) => {
  const [liked, setLiked] = useState(false)
  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom)

  const handleDeleteReply = async () => {
    try {
      if (!window.confirm('Are you sure you want to delete this reply?')) return

      const res = await fetch(
        `/v1/api/posts/reply/${currentPost._id}/${reply._id}`,
        {
          method: 'DELETE',
        }
      )
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Reply deleted', 'success')
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <>
      <Flex gap={4} py={2} my={2} w={'full'}>
        <Avatar src={reply.userProfilePic} name={reply.username} size={'sm'} />
        <Flex
          gap={1}
          w={'full'}
          flexDirection={'column'}
          border={'1px solid gray'}
          padding={2}
        >
          <Flex
            w={'full'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Text fontSize="sm" fontWeight="bold">
              {reply.username}
            </Text>
            <Flex gap={2} alignItems={'center'}>
              {reply.userId === currentUser._id && (
                <DeleteIcon size={20} onClick={handleDeleteReply} />
              )}
              <BsThreeDots />
            </Flex>
          </Flex>
          <Text>{reply.text}</Text>
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

            <FaRegComment className="w-6 h-6  cursor-pointer" />
          </Flex>
          {/* <Text fontSize={'sm'} color={'gray.light'}>
            {likes + (liked ? 1 : 0)} likes
          </Text> */}
        </Flex>
      </Flex>
      <Divider />
    </>
  )
}

export default Comment
