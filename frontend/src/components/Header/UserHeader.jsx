/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { Button, Image, Toast, useColorMode } from '@chakra-ui/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CgMoreO } from 'react-icons/cg'
import userAtom from '../../atoms/userAtom'
import { Link as RouterLink, useNavigate } from 'react-router-dom'

import useFollowUnfollow from '../../hooks/useFollowUnfollow'
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../../atoms/messagesAtom'

const UserHeader = ({ user }) => {
  const { colorMode } = useColorMode()
  const currentUser = useRecoilValue(userAtom)
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  )
  const [conversations, setConversations] = useRecoilState(conversationsAtom)
  const navigate = useNavigate()

  const handleSelectConversation = (conversation) => {
    const mockConversation = {
      mock: true,
      lastMessage: {
        text: '',
        sender: '',
      },
      _id: Date.now(),
      participants: [
        {
          _id: user._id,
          username: user.username,
          profilePic: user.profilePic,
        },
      ],
    }

    setConversations((prevConvs) => [...prevConvs, mockConversation])

    setSelectedConversation({
      _id: mockConversation._id,
      userId: user._id,
      username: user.username,
      userProfilePic: user.profilePic,
    })
    navigate('/chat')
  }

  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user)
  const copyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(() => {
      Toast({
        title: 'Success.',
        status: 'success',
        description: 'Profile link copied.',
        duration: 3000,
        isClosable: true,
      })
    })
  }

  return (
    <VStack gap={4} alignItems={'start'}>
      <Box
        className="md:h-[300px] lg:h-[400px] h-[250px]"
        w={'full'}
        backgroundImage="url('/post3.jpg')"
        backgroundPosition="center"
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
      ></Box>
      <Flex justifyContent={'center'} w={'full'}>
        <Box>
          <Avatar
            mt={'-20'}
            name={user.name}
            src={user.profilePic}
            border={'2px solid white'}
            size={{
              base: 'xl',
              md: '2xl',
            }}
          />
        </Box>
      </Flex>

      <Flex justifyContent={'center'} w={'full'} mt={-4}>
        <Text fontSize={'2xl'} fontWeight={'bold'} textTransform={'capitalize'}>
          {user.name}
        </Text>
      </Flex>

      <Flex justifyContent={'center'} w={'full'}>
        <Box mt={-4}>
          <Flex alignItems={'center'}>
            <Text
              fontSize={'sm'}
              bg={'gray.300'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              {`@${user.username} `}
            </Text>
          </Flex>
        </Box>
      </Flex>

      <Flex w={'full'} justifyContent={'center'} gap={6} px={4}>
        <Text align={'center'}>{user.bio}</Text>
      </Flex>

      {currentUser && user && currentUser._id === user._id && (
        <Link as={RouterLink} to={'/update'}>
          <Button size={'sm'}>Edit Profile</Button>
        </Link>
      )}

      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text
            color={'gray.light'}
          >{`${user.followers.length} followers`}</Text>
          <Box w="1" h="1" bg={'gray.light'} borderRadius={'full'}></Box>
          <Link color={'gray.light'} href={'https://posivibes.site'}>
            posivibes.site
          </Link>
        </Flex>
        <Flex>
          <Box className="rounded-[50%] p-2 w-10 h-10 hover:bg-slate-500 ease-in-out duration-300">
            <Flex>
              {' '}
              <Image src={'/dark-logo.svg'} width={24} mt={1} />
            </Flex>
          </Box>
          <Box
            className="rounded-[50%] p-2 w-10 h-10  ease-in-out duration-300"
            _hover={{ bg: 'gray.200' }}
          >
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={'pointer'} />
              </MenuButton>
              <Portal>
                <MenuList
                  bg={`${colorMode === 'dark' ? 'gray.dark' : 'gray.dark'}`}
                  color={`${colorMode === 'dark' ? 'white' : 'white'}`}
                >
                  <MenuItem
                    bg={`${colorMode === 'dark' ? 'gray.dark' : 'gray.dark'}`}
                    onClick={copyURL}
                  >
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      {currentUser && currentUser._id !== user._id && (
        <Flex w={'full'} justifyContent={'center'} gap={6}>
          <Button
            colorScheme={'blue'}
            borderRadius={'full'}
            onClick={handleFollowUnfollow}
            isLoading={updating}
          >
            {following ? 'Unfollow' : 'Follow'}
          </Button>
          <Button
            colorScheme={'blue'}
            borderRadius={'full'}
            onClick={handleSelectConversation}
          >
            Message
          </Button>
          <Button colorScheme={'blue'} borderRadius={'full'}>
            Ask Question
          </Button>
        </Flex>
      )}
    </VStack>
  )
}

export default UserHeader
