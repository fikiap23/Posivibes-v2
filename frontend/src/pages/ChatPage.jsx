import { Box, Flex, Text } from '@chakra-ui/react'

import { GiConversation } from 'react-icons/gi'
import { useRecoilState } from 'recoil'
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../atoms/messagesAtom'

import ListUserChat from '../components/Chats/ListUserChat'

import MessageContainer from '../components/Chats/MessageContainer'
import UserProfileMessage from '../components/Chats/UserProfileMessage'

const ChatPage = () => {
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  )
  const [conversations, setConversations] = useRecoilState(conversationsAtom)
  return (
    <>
      <Box w={{ base: '100%', md: '100%' }} mx={'auto'}>
        <Flex
          gap={4}
          flexDirection={{
            base: 'column',
            md: 'row',
          }}
          maxW={{
            sm: '400px',
            md: 'full',
          }}
          mx={'auto'}
        >
          <Box maxW={'400px'}>
            <ListUserChat />
          </Box>

          {!selectedConversation._id && (
            <Flex
              flex={70}
              borderRadius={'md'}
              p={2}
              flexDir={'column'}
              alignItems={'center'}
              justifyContent={'center'}
              border={'1px solid gray'}
              height={'80vh'}
            >
              <GiConversation size={100} />
              <Text fontSize={20}>
                Select a conversation to start messaging
              </Text>
            </Flex>
          )}
          {selectedConversation._id && (
            <Box w={{ md: '600px', lg: '800px' }} className="hidden md:block">
              <MessageContainer />
            </Box>
          )}

          <Box maxW={'400px'} className="hidden lg:block">
            <UserProfileMessage />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default ChatPage
