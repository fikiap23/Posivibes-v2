import { Box, Flex, Image, useColorMode } from '@chakra-ui/react'
import Hamberger from '../Sidebar/Hamberger'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex mt={6} mb={6} justifyContent={{ sm: 'space-between', md: 'center' }}>
      <Box className="md:hidden">
        <Hamberger />
      </Box>

      <Image
        src={colorMode === 'dark' ? '/light-logo.svg' : '/dark-logo.svg'}
        cursor={'pointer'}
        alt={'logo'}
        width={12}
        onClick={toggleColorMode}
      />
    </Flex>
  )
}

export default Header
