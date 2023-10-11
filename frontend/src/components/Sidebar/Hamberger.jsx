import {
  Box,
  Flex,
  Icon,
  IconButton,
  Menu,
  MenuButton,
  MenuList,
  Text,
  useColorMode,
} from '@chakra-ui/react'
import { RxHamburgerMenu } from 'react-icons/rx'
import { BiHome, BiMessageAltDetail } from 'react-icons/bi'
import { SiAzuredataexplorer } from 'react-icons/si'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'

import CreatePost from '../Post/CreatePost'

import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import { Link } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import useLogout from '../../hooks/useLogout'
import { FiLogOut } from 'react-icons/fi'

const Hamberger = () => {
  const user = useRecoilValue(userAtom)
  const { colorMode } = useColorMode()
  const logout = useLogout()
  const { toggleColorMode } = useColorMode()
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<RxHamburgerMenu />}
        variant="outline"
      />
      <MenuList>
        <Box className="w-[100%]  sticky top-0 h-[100vh] ">
          {user && (
            <Flex flexDirection={'column'} gap={2} ml={12}>
              <Text
                cursor={'pointer'}
                fontSize={40}
                fontWeight={'bold'}
                bgGradient="linear(to-l,  #FF0000, #0000FF)"
                bgClip="text"
                ml={10}
                onClick={toggleColorMode}
              >
                PS
              </Text>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={BiHome} />
                <Text>Home</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={SiAzuredataexplorer} />
                <Text>Explor</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={HiOutlineLightningBolt} />
                <Text>Activity</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={BiMessageAltDetail} />
                <Text>Message</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={MdOutlineManageAccounts} />
                <Text>Account</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
              >
                <Icon as={AiOutlineSetting} />
                <Text>Settings</Text>
              </Flex>
              <Flex
                gap={4}
                alignItems={'center'}
                cursor={'pointer'}
                _hover={
                  colorMode === 'light'
                    ? { bg: 'gray.200' }
                    : { bg: 'gray.700' }
                }
                padding={'2'}
                onClick={logout}
              >
                <Icon as={FiLogOut} />
                <Text>Logout</Text>
              </Flex>
              <CreatePost />
            </Flex>
          )}
          {!user && (
            <Flex flexDirection={'column'} gap={2} ml={12}>
              <Text
                fontSize={{ base: 'sm', md: 'md' }}
                fontWeight={'bold'}
                bgGradient="linear(to-l,  #FF0000, #0000FF)"
                bgClip="text"
              >
                Posivibes
              </Text>
              <Link to={'/auth'}>
                <Flex
                  gap={4}
                  alignItems={'center'}
                  cursor={'pointer'}
                  _hover={
                    colorMode === 'light'
                      ? { bg: 'gray.200' }
                      : { bg: 'gray.700' }
                  }
                  padding={'2'}
                >
                  <Icon as={FiLogIn} />
                  <Text>Login</Text>
                </Flex>
              </Link>
            </Flex>
          )}
        </Box>
      </MenuList>
    </Menu>
  )
}

export default Hamberger
