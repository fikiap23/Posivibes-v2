/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsThreeDots } from 'react-icons/bs'
import { AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'
import { BiRepost } from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import { Button } from '@chakra-ui/react'

// import { useState } from 'react'

const UserPost = () => {
  //   const [liked, setLiked] = useState(false)
  return (
    <Link to={'/fikiap23/post/1'}>
      <Flex gap={3} mb={4} py={5} bg="white" color="black" px={4}>
        <Flex flexDirection={'column'} alignItems={'center'}>
          <Avatar size="md" name="Fiki Aprian" src="/fiki1.jpg" />
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                fikiap23
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Text fontStyle={'sm'} color={'gray.light'}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>

          <Text fontSize={'md'} fontWeight={'bold'}>
            Biarkan yang lalu berlalu{' '}
          </Text>

          <Box
            borderRadius={6}
            overflow={'hidden'}
            border={'1px solid'}
            borderColor={'gray.light'}
          >
            <Image src={'/post3.jpg'} alt={''} w={'full'} />
          </Box>
          <Text fontSize={'sm'}>
            Untukmu yang kini sedang beristirahat, entah beristirahat dari
            mencintai atau memperjuangkan sesuatu, tenangkanlah hati dan jiwa,
            jangan terburu-buru mengambil keputusan. Kuatkan lewat doa dan
            tanyakan pada hati perihal apa yang sebenarnya dicari. Jangan
            terburu-buru, ya!
          </Text>
          <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Button
              bg={'gray.light'}
              borderRadius={'full'}
              _hover={{ bg: 'gray.dark' }}
            >
              Save
            </Button>
            <Flex gap={2} alignItems={'center'}>
              <AiOutlineHeart className="w-6 h-6 " />
              <FaRegComment className="w-6 h-6 " />
              <BiRepost className="w-6 h-6 " />
              <PiShareFat className="w-6 h-6 " />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Link>
  )
}

export default UserPost
