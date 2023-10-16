/* eslint-disable react/prop-types */

import {
  Avatar,
  Box,
  Button,
  Flex,
  FormControl,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react'
import { useState } from 'react'

import { BsThreeDots } from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'

import { useParams } from 'react-router-dom'

import { BiRepost } from 'react-icons/bi'
import { formatDistanceToNow } from 'date-fns'
import repostsAtom from '../../atoms/repostAtom'

const CreateRepost = ({ post, userPost }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postText, setPostText] = useState('')

  const [remainingChar, setRemainingChar] = useState(0)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useRecoilState(repostsAtom)
  const { username } = useParams()

  console.log(posts)

  const handleTextChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
    setPostText(inputText)
    setRemainingChar(inputText.length)
  }

  const handleCreateRepost = async () => {
    setLoading(true)
    try {
      const res = await fetch('/v1/api/reposts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          postedBy: user._id,
          id: post._id, // Ganti dengan ID postingan yang ingin direpost
          text: postText,
        }),
      })

      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Repost created successfully', 'success')
      if (username === user.username) {
        // Jika ingin menambahkan repost ke daftar postingan
        setPosts([data, ...posts])
      }
      onClose()
      setPostText('')
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
      // Jika ingin me-refresh halaman
      // window.location.reload()
    }
  }

  return (
    <>
      <BiRepost onClick={onOpen} className="w-6 h-6  cursor-pointer" />

      <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Repost</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box
              gap={3}
              mb={4}
              py={5}
              bg="white"
              color="black"
              px={4}
              borderRadius={6}
            >
              <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2}>
                <Avatar
                  size="md"
                  name={userPost.name}
                  src={userPost.profilePic}
                />
                <Flex justifyContent={'space-between'} w={'full'}>
                  <Flex w={'full'} alignItems={'center'}>
                    <Text fontSize={'sm'} fontWeight={'bold'}>
                      {userPost.name}
                    </Text>
                    <Image src="/verified.png" w={4} h={4} ml={1} />
                  </Flex>

                  <Flex gap={4} alignItems={'center'}>
                    <Text fontStyle={'sm'} color={'gray.light'}>
                      {formatDistanceToNow(new Date(post.createdAt))} ago
                    </Text>
                    <BsThreeDots />
                  </Flex>
                </Flex>
              </Flex>
              <Flex flex={1} flexDirection={'column'} gap={2}>
                <Text
                  fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
                  fontWeight={'bold'}
                >
                  {post.title}
                </Text>

                {post.img && (
                  <Box
                    borderRadius={6}
                    overflow={'hidden'}
                    border={'1px solid'}
                    borderColor={'gray.light'}
                  >
                    <Image src={post.img} alt={''} w={'full'} />
                  </Box>
                )}

                <Text fontSize={{ base: 'sm', md: 'md' }}>{post.text}</Text>

                <Flex
                  gap={2}
                  alignItems={'center'}
                  justifyContent={'space-between'}
                ></Flex>
              </Flex>
            </Box>

            <FormControl>
              <Textarea
                placeholder="Post content goes here.."
                onChange={handleTextChange}
                value={postText}
                style={{ resize: 'none', overflow: 'hidden' }}
              />
              <Text
                fontSize="xs"
                fontWeight="bold"
                textAlign={'right'}
                m={'1'}
                color={'gray.800'}
              >
                {remainingChar}
              </Text>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreateRepost}
              isLoading={loading}
            >
              Post
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default CreateRepost
