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

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../../atoms/messagesAtom'
import userAtom from '../../atoms/userAtom'
import { useSocket } from '../../context/SocketContext'
import useShowToast from '../../hooks/useShowToast'
import Message from './Message'
import MessageInput from './MessageInput'
import messageSound from '../../assets/sounds/newMessage.mp3'
import { Link } from 'react-router-dom'
import auth from '../../utils/auth'

const MessageContainer = () => {
  const token = auth.getToken()
  const showToast = useShowToast()
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  )
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

      // make a sound if the window is not focused
      if (!document.hasFocus()) {
        const sound = new Audio(messageSound)
        sound.play()
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
    const lastMessageIsFromOtherUser =
      messages.length &&
      messages[messages.length - 1].sender !== currentUser._id
    if (lastMessageIsFromOtherUser) {
      socket.emit('markMessagesAsSeen', {
        conversationId: selectedConversation._id,
        userId: selectedConversation.userId,
      })
    }

    socket.on('messagesSeen', ({ conversationId }) => {
      if (selectedConversation._id === conversationId) {
        setMessages((prev) => {
          const updatedMessages = prev.map((message) => {
            if (!message.seen) {
              return {
                ...message,
                seen: true,
              }
            }
            return message
          })
          return updatedMessages
        })
      }
    })
  }, [socket, currentUser._id, messages, selectedConversation])

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
          `/v1/api/messages/${selectedConversation.userId}`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        const data = await res.json()
        if (data.error) {
          console.log('Error', data.error, 'error')
          return
        }
        setMessages(data)
      } catch (error) {
        console.log('Error', error.message, 'error')
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
        <IoArrowBackOutline
          onClick={() =>
            setSelectedConversation({
              _id: '',
              userId: '',
              username: '',
              userProfilePic: '',
            })
          }
        />
        <Link to={`/u/${selectedConversation.username}`}>
          <Flex gap={2}>
            <Avatar src={selectedConversation.userProfilePic} size={'sm'} />
            <Text display={'flex'} alignItems={'center'}>
              {selectedConversation.username}
            </Text>
          </Flex>
        </Link>
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
