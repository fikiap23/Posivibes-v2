import {
  Avatar,
  Divider,
  Flex,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { IoArrowBackOutline } from 'react-icons/io5'
import { Link } from 'react-router-dom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../../atoms/messagesAtom'
import userAtom from '../../atoms/userAtom'
import { useSocket } from '../../context/SocketContext'
import useShowToast from '../../hooks/useShowToast'
import Message from './Message'
import MessageInput from './MessageInput'

const MessageContainer = () => {
  const showToast = useShowToast()
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const [loadingMessages, setLoadingMessages] = useState(true)
  const [messages, setMessages] = useState([])
  const currentUser = useRecoilValue(userAtom)
  const setConversations = useSetRecoilState(conversationsAtom)
  const messageEndRef = useRef(null)
  const { socket } = useSocket()

  useEffect(() => {
    socket.on('newMessage', (message) => {
      if (selectedConversation._id === message.conversationId) {
        setMessages((prev) => [...prev, message])
      }

      setConversations((prev) => {
        const updatedConversations = prev.map((conversation) => {
          if (conversation._id === message.conversationId) {
            return {
              ...conversation,
              lastMessage: {
                text: message.text,
                sender: message.sender,
              },
            }
          }
          return conversation
        })
        return updatedConversations
      })
    })

    return () => socket.off('newMessage')
  }, [socket, selectedConversation, setConversations])

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    const getMessages = async () => {
      setLoadingMessages(true)
      setMessages([])
      try {
        if (selectedConversation.mock) return
        const res = await fetch(
          `/v1/api/messages/${selectedConversation.userId}`
        )
        const data = await res.json()
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        setMessages(data)
      } catch (error) {
        showToast('Error', error.message, 'error')
      } finally {
        setLoadingMessages(false)
      }
    }

    getMessages()
  }, [showToast, selectedConversation.userId, selectedConversation.mock])
  return (
    <Flex
      bg={useColorModeValue('gray.200', 'gray.dark')}
      borderRadius={'md'}
      p={2}
      flexDirection={'column'}
    >
      {/* Message header */}
      <Flex w={'full'} h={8} alignItems={'center'} gap={2}>
        <Link to={'/chat'}>
          <IoArrowBackOutline />
        </Link>
        <Avatar
          src={selectedConversation.userProfilePic}
          name={selectedConversation.username}
          size={'sm'}
        />
        <Text display={'flex'} alignItems={'center'}>
          {selectedConversation.username}
        </Text>
      </Flex>

      <Divider />

      <Flex
        flexDir={'column'}
        gap={4}
        my={4}
        p={2}
        height={'400px'}
        overflowY={'auto'}
      >
        {loadingMessages &&
          [...Array(5)].map((_, i) => (
            <Flex
              key={i}
              gap={2}
              alignItems={'center'}
              p={1}
              borderRadius={'md'}
              alignSelf={i % 2 === 0 ? 'flex-start' : 'flex-end'}
            >
              {i % 2 === 0 && <SkeletonCircle size={7} />}
              <Flex flexDir={'column'} gap={2}>
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
                <Skeleton h="8px" w="250px" />
              </Flex>
              {i % 2 !== 0 && <SkeletonCircle size={7} />}
            </Flex>
          ))}

        {!loadingMessages &&
          messages.map((message) => (
            <Flex
              key={message._id}
              direction={'column'}
              ref={
                messages.length - 1 === messages.indexOf(message)
                  ? messageEndRef
                  : null
              }
            >
              <Message
                message={message}
                ownMessage={currentUser._id === message.sender}
              />
            </Flex>
          ))}
      </Flex>

      <MessageInput setMessages={setMessages} />
    </Flex>
  )
}

export default MessageContainer
