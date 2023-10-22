/* eslint-disable react/prop-types */
import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import Conversation from './Conversation'
import { useEffect, useState } from 'react'
import useShowToast from '../../hooks/useShowToast'
import { useRecoilState } from 'recoil'
import { conversationsAtom } from '../../atoms/messagesAtom'

const ListUserChat = ({ setCloseProfile }) => {
  const showToast = useShowToast()
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [conversations, setConversations] = useRecoilState(conversationsAtom)

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch('/v1/api/messages/conversations')
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        console.log(data)
        setConversations(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setLoadingConversations(false)
      }
    }

    getConversations()
  }, [setConversations, showToast])
  return (
    <Flex
      gap={2}
      flexDirection={'column'}
      w={{
        sm: 'full',
        md: 'full',
      }}
      mx={'auto'}
      overflowY={'auto'}
      h={'80vh'}
    >
      <Text fontWeight={700} color={useColorModeValue('gray.600', 'gray.400')}>
        Your Conversations
      </Text>
      <form>
        <Flex alignItems={'center'} gap={2}>
          <Input placeholder="Search for a user" />
          <Button size={'sm'}>
            <SearchIcon />
          </Button>
        </Flex>
      </form>

      {loadingConversations &&
        [0, 1, 2, 3, 4].map((_, i) => (
          <Flex
            key={i}
            gap={4}
            alignItems={'center'}
            p={'1'}
            borderRadius={'md'}
          >
            <Box>
              <SkeletonCircle size={'10'} />
            </Box>
            <Flex w={'full'} flexDirection={'column'} gap={3}>
              <Skeleton h={'10px'} w={'80px'} />
              <Skeleton h={'8px'} w={'90%'} />
            </Flex>
          </Flex>
        ))}

      {!loadingConversations &&
        conversations.map((conversation) => (
          <Conversation
            key={conversation._id}
            // isOnline={onlineUsers.includes(conversation.participants[0]._id)}
            conversation={conversation}
            setCloseProfile={setCloseProfile}
          />
        ))}
    </Flex>
  )
}

export default ListUserChat
