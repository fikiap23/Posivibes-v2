import { Box, Button, Flex, Icon, Text, useColorMode } from '@chakra-ui/react'
import { BiHome, BiMessageAltDetail } from 'react-icons/bi'
import { SiAzuredataexplorer } from 'react-icons/si'
import { HiOutlineLightningBolt } from 'react-icons/hi'
import { MdOutlineCreate, MdOutlineManageAccounts } from 'react-icons/md'
import { AiOutlineSetting } from 'react-icons/ai'

const Sidebar = () => {
  const { colorMode } = useColorMode()
  return (
    <Box w={'30%'} className="sticky top-0 h-[100vh]">
      <Flex flexDirection={'column'} gap={2} ml={12}>
        <Text
          fontSize={40}
          fontWeight={'bold'}
          bgGradient="linear(to-l,  #FF0000, #0000FF)"
          bgClip="text"
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
          borderRadius={'full'}
          bg={'blue.400'}
          color={'white'}
          _hover={{ bg: 'blue.500' }}
        >
          <Icon as={MdOutlineCreate} />
          <Text>Create Post</Text>
        </Button>
      </Flex>
    </Box>
  )
}

export default Sidebar
