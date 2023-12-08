/* eslint-disable react/prop-types */
'use client'

import {
  Heading,
  Avatar,
  Box,
  Text,
  Stack,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { Link } from 'react-router-dom'

export default function UserProfileMessage({ selectedConversation }) {
  console.log(selectedConversation)

  return (
    <Box
      maxW={'320px'}
      w={'full'}
      bg={useColorModeValue('white', 'gray.900')}
      boxShadow={'2xl'}
      rounded={'lg'}
      p={6}
      textAlign={'center'}
      className="sticky top-0"
      h={'80vh'}
    >
      <Avatar
        size={'xl'}
        src={`${selectedConversation.profilePic}`}
        mb={4}
        pos={'relative'}
        _after={{
          content: '""',
          w: 4,
          h: 4,
          bg: 'green.300',
          border: '2px solid white',
          rounded: 'full',
          pos: 'absolute',
          bottom: 0,
          right: 3,
        }}
      />
      <Heading fontSize={'2xl'} fontFamily={'body'}>
        {selectedConversation.username}
      </Heading>
      <Link to={`/u/${selectedConversation.username}`}>
        <Text fontWeight={600} color={'gray.500'} mb={4}>
          @{selectedConversation.username}
        </Text>
      </Link>
      <Text
        textAlign={'center'}
        color={useColorModeValue('gray.700', 'gray.400')}
        px={3}
        fontSize={'sm'}
      >
        Mahasiswa yang tertarik di bidang web development dan mobile development
      </Text>

      <Stack align={'center'} justify={'center'} direction={'row'} mt={6}>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        >
          #coding
        </Badge>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        >
          #web
        </Badge>
        <Badge
          px={2}
          py={1}
          bg={useColorModeValue('gray.50', 'gray.800')}
          fontWeight={'400'}
        >
          #mobile
        </Badge>
      </Stack>

      <Stack mt={8} direction={'row'} spacing={4}>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          _focus={{
            bg: 'gray.200',
          }}
        >
          Visit Profile
        </Button>
        <Button
          flex={1}
          fontSize={'sm'}
          rounded={'full'}
          bg={'blue.400'}
          color={'white'}
          boxShadow={
            '0px 1px 25px -5px rgb(66 153 225 / 48%), 0 10px 10px -5px rgb(66 153 225 / 43%)'
          }
          _hover={{
            bg: 'blue.500',
          }}
          _focus={{
            bg: 'blue.500',
          }}
        >
          Follow
        </Button>
      </Stack>
    </Box>
  )
}
