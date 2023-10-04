import {
  Box,
  Button,
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
import { MdOutlineCreate, MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'

const Hamberger = () => {
  const { colorMode } = useColorMode()
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
          <Flex flexDirection={'column'} gap={2} ml={12}>
            <Text
              fontSize={40}
              fontWeight={'bold'}
              bgGradient="linear(to-l,  #FF0000, #0000FF)"
              bgClip="text"
              ml={10}
            >
              PS
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
              <Text>Home</Text>
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
              <Text>Explor</Text>
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
              <Text>Activity</Text>
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
              <Text>Message</Text>
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
              <Text>Account</Text>
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
              <Text>Settings</Text>
            </Flex>
            <Button
              w={'full'}
              borderRadius={'50'}
              bg={'blue.400'}
              color={'white'}
              _hover={{ bg: 'blue.500' }}
            >
              <Icon as={MdOutlineCreate} />
              <Text>Create Post</Text>
            </Button>
          </Flex>
        </Box>
      </MenuList>
    </Menu>
  )
}

export default Hamberger
