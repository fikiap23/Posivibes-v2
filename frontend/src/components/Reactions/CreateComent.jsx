/* eslint-disable react/prop-types */
import {
  Box,
  Textarea,
  Button,
  FormControl,
  Flex,
  Avatar,
} from '@chakra-ui/react'
import { useEffect, useRef, useState } from 'react'
import { useRecoilState } from 'recoil'
import postsAtom from '../../atoms/postsAtom'
import useShowToast from '../../hooks/useShowToast'
const MAX_CHAR = 500
const CreateComent = ({ post, currentUser }) => {
  const textareaRef = useRef(null)
  const [isReplying, setIsReplying] = useState(false)
  const [reply, setReply] = useState('')
  const [posts, setPosts] = useRecoilState(postsAtom)
  const showToast = useShowToast()

  useEffect(() => {
    // Fokus otomatis ke textarea saat komponen dimuat
    if (textareaRef.current) {
      textareaRef.current.focus()
    }
  }, [])
  const handleCommentTextChange = (e) => {
    const inputText = e.target.value
    e.target.style.height = '0px'
    e.target.style.height = e.target.scrollHeight + 'px'

    if (inputText.length > MAX_CHAR) {
      const truncatedText = inputText.slice(0, MAX_CHAR)
      setReply(truncatedText)
    } else {
      setReply(inputText)
    }
  }

  const handleReply = async () => {
    if (!currentUser)
      return showToast(
        'Error',
        'You must be logged in to reply to a post',
        'error'
      )
    if (isReplying) return
    setIsReplying(true)
    try {
      const res = await fetch('/v1/api/posts/reply/' + post._id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: reply }),
      })
      const data = await res.json()
      if (data.error) return showToast('Error', data.error, 'error')

      const updatedPosts = posts.map((p) => {
        if (p._id === post._id) {
          return { ...p, replies: [...p.replies, data] }
        }
        return p
      })
      setPosts(updatedPosts)
      showToast('Success', 'Reply posted successfully', 'success')

      setReply('')
    } catch (error) {
      showToast('Error', error.message, 'error')
    } finally {
      setIsReplying(false)
    }
  }

  return (
    <Box w="100%" mt={2}>
      <FormControl>
        <Flex>
          <Avatar
            src={currentUser?.profilePic}
            name={currentUser?.name}
            mr={2}
            size={'sm'}
          />
          <Textarea
            mr={2}
            _hover={{ borderColor: 'gray' }}
            ref={textareaRef}
            borderColor="gray"
            placeholder="Tulis komentar Anda di sini..."
            onChange={handleCommentTextChange}
            value={reply}
            style={{
              minHeight: '0px', // Tinggi awal yang lebih kecil
              resize: 'none',
              overflow: 'hidden',
            }}
          />
          <Button
            mt={1}
            bg={'blue.400'}
            color={'white'}
            size="sm"
            _hover={{ bg: 'blue.500' }}
            isLoading={isReplying}
            onClick={handleReply}
          >
            Kirim
          </Button>
        </Flex>
      </FormControl>
    </Box>
  )
}

export default CreateComent
