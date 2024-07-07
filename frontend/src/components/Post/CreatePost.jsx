import { Icon } from '@chakra-ui/icons'
import {
  Button,
  CloseButton,
  Flex,
  FormControl,
  FormLabel,
  Image,
  Input,
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
import { useRef, useState } from 'react'
import usePreviewImg from '../../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import postsAtom from '../../atoms/postsAtom'
import { useNavigate, useParams } from 'react-router-dom'
import { MdOutlineCreate } from 'react-icons/md'
import { apiUrl } from '../../utils/baseURL'
import auth from '../../utils/auth'

const MAX_CHAR = 100
const CreatePost = () => {
  const token = auth.getToken()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [postText, setPostText] = useState('')
  const [titlePostText, setTitlePostText] = useState('')
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const imageRef = useRef(null)
  const [remainingChar, setRemainingChar] = useState(0)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useRecoilState(postsAtom)
  const { username } = useParams()
  const navigate = useNavigate()

  const handleTextChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'
    setPostText(inputText)
    setRemainingChar(inputText.length)
  }

  const handleTitlePostTextChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setTitlePostText(truncatedText)
    } else {
      setTitlePostText(inputText)
    }
  }

  const handleCreatePost = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${apiUrl}/v1/api/posts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postedBy: user._id,
          title: titlePostText,
          text: postText,
          img: imgUrl,
        }),
      })

      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post created successfully', 'success')
      if (username === user.username) {
        setPosts([data, ...posts])
      }
      onClose()
      setPostText('')
      setImgUrl('')
    } catch (error) {
      console.log('Error', error, 'error')
    } finally {
      setLoading(false)
      window.location.reload()
    }
  }

  return (
    <>
      <Button
        w={'full'}
        borderRadius={'50'}
        bg={'blue.400'}
        color={'white'}
        _hover={{ bg: 'blue.500' }}
        onClick={onOpen}
      >
        <Icon as={MdOutlineCreate} />

        <Text>Create Post</Text>
      </Button>

      <Modal isOpen={isOpen} onClose={onClose} size={'2xl'}>
        <ModalOverlay />

        <ModalContent>
          <ModalHeader>Create Post</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Title (maks 100 charcter)</FormLabel>
              <Textarea
                placeholder="Post title goes here.."
                onChange={handleTitlePostTextChange}
                value={titlePostText}
                style={{
                  minHeight: '0px', // Tinggi awal yang lebih kecil
                  resize: 'none',
                  overflow: 'hidden',
                }}
              />
            </FormControl>
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

              <Input
                type="file"
                hidden
                ref={imageRef}
                onChange={handleImageChange}
              />

              <BsFillImageFill
                style={{ marginLeft: '5px', cursor: 'pointer' }}
                size={16}
                onClick={() => imageRef.current.click()}
              />
            </FormControl>

            {imgUrl && (
              <Flex mt={5} w={'full'} position={'relative'}>
                <Image src={imgUrl} alt="Selected img" />
                <CloseButton
                  onClick={() => {
                    setImgUrl('')
                  }}
                  bg={'gray.800'}
                  position={'absolute'}
                  top={2}
                  right={2}
                />
              </Flex>
            )}
          </ModalBody>

          <ModalFooter display={'flex'} justifyContent={'space-between'}>
            <Button
              colorScheme="yellow"
              mr={3}
              onClick={() => {
                navigate(`/create-post`)
              }}
              isLoading={loading}
            >
              Create Special Post
            </Button>
            <Button
              colorScheme="blue"
              mr={3}
              onClick={handleCreatePost}
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

export default CreatePost
