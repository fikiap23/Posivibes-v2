import { Box, Flex, Text } from '@chakra-ui/react'

import { GiConversation } from 'react-icons/gi'
import { useRecoilState } from 'recoil'
import { AiOutlineClose } from 'react-icons/ai'
import { selectedConversationAtom } from '../atoms/messagesAtom'

import ListUserChat from '../components/Chats/ListUserChat'

import MessageContainer from '../components/Chats/MessageContainer'
import UserProfileMessage from '../components/Chats/UserProfileMessage'
import { useState } from 'react'

const ChatPage = () => {
  const [closeProfile, setCloseProfile] = useState(false)
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  )

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
          <Box
            maxW={'400px'}
            className={`${
              selectedConversation._id ? 'hidden' : 'block'
            } md:block`}
          >
            <ListUserChat
              setCloseProfile={setCloseProfile}
              setSelectedConversation={setSelectedConversation}
            />
          </Box>

          {!selectedConversation._id && (
            <Box w={'full'} className="hidden md:block">
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
            </Box>
          )}
          {selectedConversation._id && (
            <Box w={{ md: '600px', lg: '90%' }} maxW={'full'}>
              <MessageContainer />
            </Box>
          )}

          <Box
            maxW={'400px'}
            className="hidden lg:block"
            position={'relative'}
            hidden={closeProfile}
          >
            <Box
              position={'absolute'}
              top={'2'}
              right={'2'}
              zIndex={99}
              cursor={'pointer'}
              onClick={() => setCloseProfile(true)}
            >
              <AiOutlineClose />
            </Box>
            <UserProfileMessage />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default ChatPage
