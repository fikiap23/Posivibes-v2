/* eslint-disable react/prop-types */
import { Avatar, Divider, Flex, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'

import { BsThreeDots } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa6'

const Comment = ({ reply }) => {
  const [liked, setLiked] = useState(false)

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
              <Text fontSize={'sm'} color={'gray.light'}>
                {/* {createdAt} */}
              </Text>
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
