import {
  Box,
  Flex,
  Icon,
  Image,
  Link,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react'
import { BsFillChatQuoteFill } from 'react-icons/bs'

import { MdOutlineSettings } from 'react-icons/md'
import { RxAvatar } from 'react-icons/rx'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import Hamberger from '../Sidebar/Hamberger'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import { FiLogIn } from 'react-icons/fi'
import { BiHome } from 'react-icons/bi'
import { useEffect, useState } from 'react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const user = useRecoilValue(userAtom)
  const navigate = useNavigate()
  // Tambahkan state untuk mengelola tampilan elemen "sticky"
  const [isSticky, setIsSticky] = useState(false)
  console.log(user)

  useEffect(() => {
    // keep track of previous scroll position
    let prevScrollPos = window.pageYOffset

    window.addEventListener('scroll', function () {
      // current scroll position
      const currentScrollPos = window.pageYOffset

      if (prevScrollPos > currentScrollPos) {
        // user has scrolled up
        setIsSticky(true)
      } else {
        // user has scrolled down
        setIsSticky(false)
      }

      // update previous scroll position
      prevScrollPos = currentScrollPos
    })
  }, [])
  return (
    <>
      <Box
        className={`md:hidden ${isSticky ? 'sticky top-0 z-10' : ''}`}
        transition="top 0.3s ease"
        bg={useColorModeValue('white', 'gray.900')}
      >
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
            <Link as={RouterLink} to={`/u/${user.username}`} mt={2}>
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
          <Flex
            onClick={(e) => {
              e.preventDefault()
              navigate(`/`)
            }}
            gap={4}
            alignItems={'center'}
            cursor={'pointer'}
            _hover={
              colorMode === 'light' ? { bg: 'gray.200' } : { bg: 'gray.700' }
            }
            padding={'2'}
          >
            <BiHome size={30} />
          </Flex>
          <Image
            src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
            cursor={'pointer'}
            alt={'logo'}
            width={12}
            onClick={toggleColorMode}
          />

          {user && (
            <Flex alignItems={'center'} gap={4}>
              <Link as={RouterLink} to={`/u/${user.username}`}>
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
