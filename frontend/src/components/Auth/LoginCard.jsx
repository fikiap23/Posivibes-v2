'use client'

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  useBreakpointValue,
  Icon,
  FormControl,
  InputGroup,
  InputRightElement,
  Link,
} from '@chakra-ui/react'
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons'
import { useState } from 'react'
import { useSetRecoilState } from 'recoil'
import authScreenAtom from '../../atoms/authAtom'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import { apiUrl } from '../../utils/baseURL'

const Blur = (props) => {
  return (
    <Icon
      width={useBreakpointValue({ base: '100%', md: '40vw', lg: '30vw' })}
      zIndex={useBreakpointValue({ base: -1, md: -1, lg: 0 })}
      height="560px"
      viewBox="0 0 528 560"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      {/* <circle cx="71" cy="61" r="111" fill="#F56565" />
      <circle cx="244" cy="106" r="139" fill="#ED64A6" />
      <circle cy="291" r="139" fill="#ED64A6" />
      <circle cx="80.5" cy="189.5" r="101.5" fill="#ED8936" />
      <circle cx="196.5" cy="317.5" r="101.5" fill="#ECC94B" />
      <circle cx="70.5" cy="458.5" r="101.5" fill="#48BB78" />
      <circle cx="426.5" cy="-0.5" r="101.5" fill="#4299E1" /> */}
    </Icon>
  )
}

export default function LoginCard() {
  const [showPassword, setShowPassword] = useState(false)
  const setAuthScreen = useSetRecoilState(authScreenAtom)
  const setUser = useSetRecoilState(userAtom)
  const [loading, setLoading] = useState(false)

  const [inputs, setInputs] = useState({
    identifier: '',
    password: '',
  })
  const showToast = useShowToast()
  const handleLogin = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/v1/api/users/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(inputs),
      })
      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      localStorage.setItem('user-posivibes', JSON.stringify(data.user))
      localStorage.setItem('token', data.token)
      setUser(data.user)
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }
  return (
    <Box position={'relative'}>
      <Container
        as={SimpleGrid}
        maxW={'7xl'}
        columns={{ base: 1, md: 2 }}
        spacing={{ base: 10, lg: 32 }}
        py={{ base: 10, sm: 20, lg: 32 }}
      >
        <Stack spacing={{ base: 10, md: 20 }}>
          <Heading
            lineHeight={1.1}
            fontSize={{ base: '3xl', sm: '4xl', md: '5xl', lg: '6xl' }}
          >
            <Text
              fontSize={40}
              fontWeight={'bold'}
              bgGradient="linear(to-l,  #FF0000, #0000FF)"
              bgClip="text"
            >
              Posivibes
            </Text>{' '}
            Tempatnya Menyebarkan Positivitas dan Kebaikan Bersama!
          </Heading>
        </Stack>
        <Stack
          bg={'gray.50'}
          rounded={'xl'}
          p={{ base: 4, sm: 6, md: 8 }}
          spacing={{ base: 8 }}
          maxW={{ lg: 'lg' }}
        >
          <Stack spacing={4}>
            <Heading
              color={'gray.800'}
              lineHeight={1.1}
              fontSize={{ base: '2xl', sm: '3xl', md: '4xl' }}
            >
              Login
              <Text
                as={'span'}
                bgGradient="linear(to-r, red.400,pink.400)"
                bgClip="text"
              ></Text>
            </Heading>
            <Text color={'gray.500'} fontSize={{ base: 'sm', sm: 'md' }}>
              {/* Informasi uji coba */}
              Bergabunglah bersama kami di Posivibes: Kumpulan Semangat Positif,
              dan sebarkan kebaikan bersama!
            </Text>
          </Stack>
          <Box as={'form'}>
            <Stack spacing={4}>
              <Input
                placeholder="Enter username or email"
                value={inputs.identifier}
                onChange={(e) =>
                  setInputs((inputs) => ({
                    ...inputs,
                    identifier: e.target.value,
                  }))
                }
                bg={'gray.100'}
                border={0}
                color={'gray.500'}
                _placeholder={{
                  color: 'gray.500',
                }}
              />

              <FormControl id="password" isRequired>
                <InputGroup>
                  <Input
                    value={inputs.password}
                    onChange={(e) =>
                      setInputs((inputs) => ({
                        ...inputs,
                        password: e.target.value,
                      }))
                    }
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    bg={'gray.100'}
                    border={0}
                    color={'gray.500'}
                    _placeholder={{
                      color: 'gray.500',
                    }}
                  />
                  <InputRightElement h={'full'}>
                    <Button
                      variant={'ghost'}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? (
                        <ViewIcon color={'black'} />
                      ) : (
                        <ViewOffIcon color={'black'} />
                      )}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
            </Stack>
            <Button
              loadingText="Logging in"
              onClick={handleLogin}
              isLoading={loading}
              fontFamily={'heading'}
              mt={8}
              w={'full'}
              bgGradient="linear(to-r, blue,blue.600)"
              color={'white'}
              _hover={{
                bgGradient: 'linear(to-r, blue.400,blue.200)',
                boxShadow: 'xl',
              }}
            >
              Login
            </Button>
            <Stack pt={6}>
              <Text align={'center'} color={'black'}>
                {"Don't have an account?"}{' '}
                <Link
                  color={'blue.400'}
                  onClick={() => {
                    setAuthScreen('signup')
                  }}
                >
                  Sign Up
                </Link>
              </Text>
            </Stack>
          </Box>
        </Stack>
      </Container>
      <Blur
        position={'absolute'}
        top={-10}
        left={-10}
        style={{ filter: 'blur(70px)' }}
      />
    </Box>
  )
}
