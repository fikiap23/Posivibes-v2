import { Box, Flex, Icon, Image, Link, useColorMode } from '@chakra-ui/react'
import { BsFillChatQuoteFill } from 'react-icons/bs'

import { MdOutlineSettings } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import Hamberger from '../Sidebar/Hamberger'
import { Link as RouterLink } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = useRecoilValue(userAtom)

  return (
    <>
      <Box className="md:hidden">
        <Flex justifyContent={'space-between'}>
          <Hamberger />
          <Image
            src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
            cursor={'pointer'}
            alt={'logo'}
            width={12}
            onClick={toggleColorMode}
          />
          {user && (
            <Link as={RouterLink} to={`/${user.username}`} mt={2}>
              <RxAvatar size={24} />
            </Link>
          )}

          {!user && (
            <Link as={RouterLink} to={`/auth`} mt={2}>
              <Icon as={FiLogIn} />
            </Link>
          )}
        </Flex>
      </Box>
      <Box className="hidden md:block">
        <Flex
          mt={6}
          mb={6}
          justifyContent={{ sm: 'space-between', md: 'space-evenly' }}
        >
          <Image
            src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
            cursor={'pointer'}
            alt={'logo'}
            width={12}
            onClick={toggleColorMode}
          />

          {user && (
            <Flex alignItems={'center'} gap={4}>
              <Link as={RouterLink} to={`/${user.username}`}>
                <RxAvatar size={24} />
              </Link>
              <Link as={RouterLink} to={`/chat`}>
                <BsFillChatQuoteFill size={20} />
              </Link>
              <Link as={RouterLink} to={`/settings`}>
                <MdOutlineSettings size={20} />
              </Link>
            </Flex>
          )}
        </Flex>
      </Box>
    </>
  )
}

export default Header
