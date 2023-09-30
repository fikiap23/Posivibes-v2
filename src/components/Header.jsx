import { Flex, Image, useColorMode } from '@chakra-ui/react'

const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Flex justifyContent={'center'} mt={6} mb={6}>
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
