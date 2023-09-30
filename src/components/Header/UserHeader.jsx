import { Avatar } from '@chakra-ui/avatar'
import { Box, Flex, Link, Text, VStack } from '@chakra-ui/layout'
import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/menu'
import { Portal } from '@chakra-ui/portal'
import { Button, Image, useToast } from '@chakra-ui/react'

import { CgMoreO } from 'react-icons/cg'

const UserHeader = () => {
  const toast = useToast()

  const copyURL = () => {
    const currentURL = window.location.href
    navigator.clipboard.writeText(currentURL).then(() => {
      toast({
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
      <Flex justifyContent={'space-between'} w={'full'}>
        <Box>
          <Text fontSize={'2xl'} fontWeight={'bold'}>
            Fiki Aprian
          </Text>
          <Flex gap={2} alignItems={'center'}>
            <Text fontSize={'sm'}>fikiap23</Text>
            <Text
              fontSize={'xs'}
              bg={'gray.dark'}
              color={'gray.light'}
              p={1}
              borderRadius={'full'}
            >
              posivibes.com
            </Text>
          </Flex>
        </Box>
        <Box>
          <Avatar
            mt={'-10'}
            name="Fiki Aprian"
            src="/fiki1.jpg"
            size={{
              base: 'lg',
              md: 'xl',
            }}
          />
        </Box>
      </Flex>

      <Text>
        Ada saatnya tujuan hidup berubah, menjadi sederhana dan tak lagi rumit.
        Hanya satu yang ingin dicapai Bahagia.
      </Text>
      <Flex w={'full'} justifyContent={'space-between'}>
        <Flex gap={2} alignItems={'center'}>
          <Text color={'gray.light'}>3.2K followers</Text>
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
          <Box className="rounded-[50%] p-2 w-10 h-10 hover:bg-slate-500 ease-in-out duration-300">
            <Menu>
              <MenuButton>
                <CgMoreO size={24} cursor={'pointer'} />
              </MenuButton>
              <Portal>
                <MenuList bg={'gray.dark'}>
                  <MenuItem bg={'gray.dark'} onClick={copyURL}>
                    Copy link
                  </MenuItem>
                </MenuList>
              </Portal>
            </Menu>
          </Box>
        </Flex>
      </Flex>

      <Flex w={'full'} justifyContent={'center'} gap={6}>
        <Button colorScheme={'blue'} borderRadius={'full'}>
          Follow
        </Button>
        <Button colorScheme={'blue'} borderRadius={'full'}>
          Message
        </Button>
        <Button colorScheme={'blue'} borderRadius={'full'}>
          Ask Question
        </Button>
      </Flex>

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
