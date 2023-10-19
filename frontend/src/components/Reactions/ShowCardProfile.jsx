/* eslint-disable react/prop-types */
'use client'

import {
  Heading,
  Avatar,
  Box,
  Center,
  Image,
  Flex,
  Text,
  Stack,
  Button,
  useColorModeValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import useFollowUnfollow from '../../hooks/useFollowUnfollow'
import { ImProfile } from 'react-icons/im'

export default function ShowCardProfile({ user }) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  // console.log('user', user)
  const { handleFollowUnfollow, following, updating } = useFollowUnfollow(user)
  const navigate = useNavigate()
  return (
    <>
      <Text
        fontSize={'sm'}
        color={'blue.300'}
        cursor={'pointer'}
        textDecoration={'none'}
        _hover={{ textDecoration: 'underline' }}
        onClick={onOpen}
      >
        <ImProfile />
      </Text>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{`Profile of ${user.name}`}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Center py={6}>
              <Box
                w={'full'} // Mengatur lebar agar memenuhi modal
                bg={useColorModeValue('white', 'gray.800')}
                boxShadow={'2xl'}
                rounded={'md'}
                overflow={'hidden'}
                display="flex"
                flexDirection="column" // Menggunakan Flexbox untuk tata letak
                justifyContent="space-between"
                height="100%" // Mengatur tinggi agar memenuhi modal
              >
                <Image
                  h={'120px'}
                  w={'full'}
                  src={
                    'https://images.unsplash.com/photo-1612865547334-09cb8cb455da?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=634&q=80'
                  }
                  objectFit="cover"
                  alt="#"
                />
                <Flex justify={'center'} mt={-12}>
                  <Avatar
                    size={'xl'}
                    name={user.name}
                    src={user.profilePic}
                    css={{
                      border: '2px solid white',
                    }}
                  />
                </Flex>

                <Box p={6}>
                  <Stack spacing={0} align={'center'} mb={5}>
                    <Heading
                      fontSize={'2xl'}
                      fontWeight={500}
                      fontFamily={'body'}
                      onClick={(e) => {
                        e.preventDefault()
                        navigate(`/${user.username}`)
                      }}
                      cursor={'pointer'}
                    >
                      {user.name}
                    </Heading>
                    <Text color={'gray.500'} align={'center'}>
                      {user.bio}
                    </Text>
                  </Stack>

                  <Stack direction={'row'} justify={'center'} spacing={6}>
                    <Stack spacing={0} align={'center'}>
                      <Text fontWeight={600}>{user.followers.length}</Text>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        Followers
                      </Text>
                    </Stack>
                    <Stack spacing={0} align={'center'}>
                      <Text fontWeight={600}>{user.following.length}</Text>
                      <Text fontSize={'sm'} color={'gray.500'}>
                        Followers
                      </Text>
                    </Stack>
                  </Stack>

                  <Button
                    w={'full'}
                    mt={8}
                    borderRadius={'50'}
                    bg={'blue.400'}
                    color={'white'}
                    rounded={'full'}
                    _hover={{
                      transform: 'translateY(-2px)',
                      boxShadow: 'lg',
                      bg: 'blue.500',
                    }}
                    onClick={handleFollowUnfollow}
                    isLoading={updating}
                  >
                    {following ? 'Unfollow' : 'Follow'}
                  </Button>
                </Box>
              </Box>
            </Center>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
