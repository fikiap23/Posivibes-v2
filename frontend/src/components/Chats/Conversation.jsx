/* eslint-disable react/prop-types */
import {
  Avatar,
  AvatarBadge,
  Flex,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
  Box,
  useColorMode,
} from '@chakra-ui/react'
import { BsCheck2All, BsFillImageFill } from 'react-icons/bs'

import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { selectedConversationAtom } from '../../atoms/messagesAtom'

const Conversation = ({ conversation, setCloseProfile, isOnline }) => {
  const user = conversation.participants[0]

  const currentUser = useRecoilValue(userAtom)
  const lastMessage = conversation.lastMessage
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  )
  const colorMode = useColorMode()
  // console.log(selectedConversation)

  return (
    <Flex
      gap={4}
      alignItems={'center'}
      p={'1'}
      _hover={{
        cursor: 'pointer',
        bg: useColorModeValue('gray.600', 'gray.dark'),
        color: 'white',
      }}
      onClick={() => {
        setCloseProfile(false)
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }}
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === 'light'
            ? 'gray.400'
            : 'gray.400'
          : ''
      }
      borderRadius={'md'}
      justifyContent={'space-between'}
    >
      <Flex gap={3}>
        <WrapItem>
          <Avatar
            size={{
              base: 'md',
              sm: 'md',
              md: 'md',
            }}
            src={user.profilePic}
          >
            {isOnline ? <AvatarBadge boxSize="1em" bg="green.500" /> : ''}
          </Avatar>
        </WrapItem>

        <Stack direction={'column'} fontSize={'sm'}>
          <Text fontWeight="700" display={'flex'} alignItems={'center'}>
            {user.username}
          </Text>
          <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
            {currentUser._id === lastMessage.sender ? (
              <Box color={lastMessage.seen ? 'blue.400' : ''}>
                <BsCheck2All size={16} />
              </Box>
            ) : (
              ''
            )}
            {lastMessage.text.length > 18
              ? lastMessage.text.substring(0, 18) + '...'
              : lastMessage.text || <BsFillImageFill size={16} />}
          </Text>
        </Stack>
      </Flex>
      <Text fontSize={{ base: 'xs', md: '10px' }}>12:05 PM</Text>
    </Flex>
  )
}

export default Conversation
