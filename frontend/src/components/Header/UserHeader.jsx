/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { Button, Image, Toast, useColorMode } from '@chakra-ui/react'
import { useRecoilValue } from 'recoil'
import { CgMoreO } from 'react-icons/cg'
import userAtom from '../../atoms/userAtom'
import { Link as RouterLink } from 'react-router-dom'
import { useState } from 'react'
import useShowToast from '../../hooks/useShowToast'

const UserHeader = ({ user }) => {
  const showToast = useShowToast()
  const { colorMode } = useColorMode()
  const currentUser = useRecoilValue(userAtom)
  // console.log(currentUser)
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  )
  // console.log(following)

  const [updating, setUpdating] = useState(false)

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'Please login first', 'error')
      return
    }
    if (updating) return
    setUpdating(true)
    try {
      const res = await fetch(`/v1/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      if (following) {
        showToast('Success', `Unfollowed ${user.name}`, 'success')
        user.followers.pop() //simulasi removing user from followers client-side
      } else {
        showToast('Success', 'Followed', 'success')
        user.followers.push(currentUser._id) //simulasi adding user to followers client-side
      }
      setFollowing(!following)
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setUpdating(false)
    }
  }

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
        backgroundImage="url('/post2.jpg')"
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
          <Text
            fontSize={'2xl'}
            fontWeight={'bold'}
            textTransform={'capitalize'}
          >
            {user.name}
          </Text>
        </Box>
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

      {currentUser._id === user._id && (
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
          <Link color={'gray.light'}>posivibes.com</Link>
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

      {currentUser._id !== user._id && (
        <Flex w={'full'} justifyContent={'center'} gap={6}>
          <Button
            colorScheme={'blue'}
            borderRadius={'full'}
            onClick={handleFollowUnfollow}
            isLoading={updating}
          >
            {following ? 'Unfollow' : 'Follow'}
          </Button>
          <Button colorScheme={'blue'} borderRadius={'full'}>
            Message
          </Button>
          <Button colorScheme={'blue'} borderRadius={'full'}>
            Ask Question
          </Button>
        </Flex>
      )}

      <Flex w={'full'}>
        <Flex
          flex={1}
          borderBottom={'1.5px solid white'}
          justifyContent={'center'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}> Post</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          justifyContent={'center'}
          color={'gray.light'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}> Like</Text>
        </Flex>
        <Flex
          flex={1}
          borderBottom={'1px solid gray'}
          justifyContent={'center'}
          color={'gray.light'}
          pb="3"
          cursor={'pointer'}
        >
          <Text fontWeight={'bold'}> Answer</Text>
        </Flex>
      </Flex>
    </VStack>
  )
}

export default UserHeader
