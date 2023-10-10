import { Box, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import { BiHome, BiMessageAltDetail } from 'react-icons/bi'
import { SiAzuredataexplorer } from 'react-icons/si'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'
import CreatePost from '../Post/CreatePost'
import LogoutButton from '../Auth/LogoutButton'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { FiLogIn } from 'react-icons/fi'
import { Link } from 'react-router-dom'

const Sidebar = () => {
  const user = useRecoilValue(userAtom)
  const { colorMode } = useColorMode()
  return (
    <Box className="w-[10%] md:w-[15%] lg:w-[30%]  sticky top-0 h-[100vh] hidden md:block">
      {user && (
        <Flex flexDirection={'column'} gap={2} ml={12}>
          <Text
            fontSize={40}
            fontWeight={'bold'}
            bgGradient="linear(to-l,  #FF0000, #0000FF)"
            bgClip="text"
            className="hidden lg:block"
          >
            Posivibes
          </Text>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={BiHome} />
            <Text className="hidden lg:block">Home</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={SiAzuredataexplorer} />
            <Text className="hidden lg:block">Explor</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={HiOutlineLightningBolt} />
            <Text className="hidden lg:block">Activity</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={BiMessageAltDetail} />
            <Text className="hidden lg:block">Message</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={MdOutlineManageAccounts} />
            <Text className="hidden lg:block">Account</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <Icon as={AiOutlineSetting} />
            <Text className="hidden lg:block">Settings</Text>
          </Flex>
          <Flex
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <LogoutButton />
            <Text className="hidden lg:block">Logout</Text>
          </Flex>
          <CreatePost />
        </Flex>
      )}
      {!user && (
        <Flex flexDirection={'column'} gap={2} ml={12}>
          <Text
            fontSize={40}
            fontWeight={'bold'}
            bgGradient="linear(to-l,  #FF0000, #0000FF)"
            bgClip="text"
            className="hidden lg:block"
          >
            Posivibes
          </Text>
          <Link to={'/auth'}>
            <Flex
              gap={4}
              alignItems={'center'}
              cursor={'pointer'}
              _hover={
                colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
              }
              padding={'2'}
            >
              <Icon as={FiLogIn} />
              <Text className="hidden lg:block">Login</Text>
            </Flex>
          </Link>
        </Flex>
      )}
    </Box>
  )
}

export default Sidebar
