import { Box, Flex } from '@chakra-ui/react'
import { GiConversation } from 'react-icons/gi'

import ListUserChat from '../components/Chats/ListUserChat'

import MessageContainer from '../components/Chats/MessageContainer'
import UserProfileMessage from '../components/Chats/UserProfileMessage'

const ChatPage = () => {
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

          {/* <Flex
            flex={70}
            borderRadius={'md'}
            p={2}
            flexDir={'column'}
            alignItems={'center'}
            justifyContent={'center'}
            height={'400px'}
          >
            <GiConversation size={100} />
            <Text fontSize={20}>Select a conversation to start messaging</Text>
          </Flex> */}
          <Box w={'800px'} className="hidden md:block">
            <MessageContainer />
          </Box>
          <Box maxW={'400px'} className="hidden lg:block">
            <UserProfileMessage />
          </Box>
        </Flex>
      </Box>
    </>
  )
}

export default ChatPage
