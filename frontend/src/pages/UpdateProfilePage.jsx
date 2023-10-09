'use client'

import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  Avatar,
  Center,
  Textarea,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import usePreviewImg from '../hooks/usePreviewImg'

export default function UpdateProfilePage() {
  const [user, setUser] = useRecoilState(userAtom)
  const [inputs, setInputs] = useState({
    name: user.data.name,
    username: user.data.username,
    email: user.data.email,
    bio: user.data.bio,
    password: '',
  })
  //   console.log(user)
  const fileRef = useRef(null)
  const [updating, setUpdating] = useState(false)

  const showToast = useShowToast()

  const { handleImageChange, imgUrl } = usePreviewImg()
  return (
    <Flex align={'center'} justify={'center'}>
      <Stack
        spacing={4}
        w={'full'}
        maxW={'md'}
        bg={useColorModeValue('white', 'gray.dark')}
        rounded={'xl'}
        boxShadow={'lg'}
        p={6}
      >
        <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
          Edit Profile
        </Heading>
        <FormControl id="userName">
          <Stack direction={['column', 'row']} spacing={6}>
            <Center>
              <Avatar
                size="xl"
                boxShadow={'md'}
                src={imgUrl || user.data.profilePic}
              />
            </Center>
            <Center w="full">
              <Button w="full" onClick={() => fileRef.current.click()}>
                Change Photo
              </Button>
              <Input
                type={'file'}
                hidden
                ref={fileRef}
                onChange={handleImageChange}
              />
            </Center>
          </Stack>
        </FormControl>
        <FormControl id="userName">
          <FormLabel>Username</FormLabel>
          <Input
            value={inputs.username}
            onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
            placeholder="UserName"
            _placeholder={{ color: 'gray.500' }}
            type="text"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Email address</FormLabel>
          <Input
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            placeholder="your-email@example.com"
            _placeholder={{ color: 'gray.500' }}
            type="email"
          />
        </FormControl>
        <FormControl id="email">
          <FormLabel>Bio</FormLabel>
          <Textarea
            onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
            value={inputs.bio}
            placeholder="your bio"
            _placeholder={{ color: 'gray.500' }}
          />
        </FormControl>
        <FormControl id="password">
          <FormLabel>Password</FormLabel>
          <Input
            value={inputs.password}
            onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            placeholder="password"
            _placeholder={{ color: 'gray.500' }}
            type="password"
          />
        </FormControl>
        <Stack spacing={6} direction={['column', 'row']}>
          <Button
            bg={'red.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'red.500',
            }}
          >
            Cancel
          </Button>
          <Button
            bg={'blue.400'}
            color={'white'}
            w="full"
            _hover={{
              bg: 'blue.500',
            }}
          >
            Submit
          </Button>
        </Stack>
      </Stack>
    </Flex>
  )
}
