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
import { useRecoilState, useRecoilValue } from 'recoil'
import { conversationsAtom } from '../../atoms/messagesAtom'
import userAtom from '../../atoms/userAtom'
import { useSocket } from '../../context/SocketContext'

const ListUserChat = ({ setCloseProfile, setSelectedConversation }) => {
  const showToast = useShowToast()
  const [searchingUser, setSearchingUser] = useState(false)
  const [loadingConversations, setLoadingConversations] = useState(true)
  const [conversations, setConversations] = useRecoilState(conversationsAtom)
  const [searchText, setSearchText] = useState('')
  const currentUser = useRecoilValue(userAtom)
  const { socket, onlineUsers } = useSocket()

  useEffect(() => {
    socket?.on('messagesSeen', ({ conversationId }) => {
      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === conversationId) {
            return {
              ...conversation,
              lastMessage: {
                ...conversation.lastMessage,
                seen: true,
              },
            }
          }
          return conversation
        })
        return updatedConversations
      })
    })
  }, [socket, setConversations])

  const handleConversationSearch = async (e) => {
    e.preventDefault()
    setSearchingUser(true)
    try {
      const res = await fetch(`v1/api/users/profile/${searchText}`)
      const searchedUser = await res.json()
      if (searchedUser.error) {
        showToast('Error', searchedUser.error, 'error')
        return
      }

      const messagingYourself = searchedUser._id === currentUser._id
      if (messagingYourself) {
        showToast('Error', 'You cannot message yourself', 'error')
        return
      }

      const conversationAlreadyExists = conversations.find(
        (conversation) => conversation.participants[0]._id === searchedUser._id
      )

      if (conversationAlreadyExists) {
        setSelectedConversation({
          _id: conversationAlreadyExists._id,
          userId: searchedUser._id,
          username: searchedUser.username,
          userProfilePic: searchedUser.profilePic,
        })
        return
      }

      const mockConversation = {
        mock: true,
        lastMessage: {
          text: '',
          sender: '',
        },
        _id: Date.now(),
        participants: [
          {
            _id: searchedUser._id,
            username: searchedUser.username,
            profilePic: searchedUser.profilePic,
          },
        ],
      }
      setConversations((prevConvs) => [...prevConvs, mockConversation])
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setSearchingUser(false)
    }
  }

  useEffect(() => {
    const getConversations = async () => {
      try {
        const res = await fetch('/v1/api/messages/conversations')
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        // console.log(data)
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
      <form onSubmit={handleConversationSearch}>
        <Flex alignItems={'center'} gap={2}>
          <Input
            placeholder="Search for a user"
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Button
            size={'sm'}
            onClick={handleConversationSearch}
            isLoading={searchingUser}
          >
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
            isOnline={onlineUsers.includes(conversation.participants[0]._id)}
            conversation={conversation}
            setCloseProfile={setCloseProfile}
          />
        ))}
    </Flex>
  )
}

export default ListUserChat
