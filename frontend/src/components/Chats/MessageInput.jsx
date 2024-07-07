/* eslint-disable react/prop-types */
import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  useDisclosure,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { IoSendSharp } from 'react-icons/io5'
import useShowToast from '../../hooks/useShowToast'
import {
  conversationsAtom,
  selectedConversationAtom,
} from '../../atoms/messagesAtom'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { BsFillImageFill } from 'react-icons/bs'
import usePreviewImg from '../../hooks/usePreviewImg'
import { apiUrl } from '../../utils/baseURL'
import auth from '../../utils/auth'

const MessageInput = ({ setMessages }) => {
  const token = auth.getToken()
  const [messageText, setMessageText] = useState('')
  const showToast = useShowToast()
  const selectedConversation = useRecoilValue(selectedConversationAtom)
  const setConversations = useSetRecoilState(conversationsAtom)
  const imageRef = useRef(null)
  const { onClose } = useDisclosure()
  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const [isSending, setIsSending] = useState(false)

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!messageText && !imgUrl) return
    if (isSending) return

    setIsSending(true)

    try {
      const res = await fetch(`${apiUrl}/v1/api/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
          img: imgUrl,
        }),
      })
      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }
      console.log(data)
      setMessages((messages) => [...messages, data])

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            }
          }
          return conversation
        })
        return updatedConversations
      })
      setMessageText('')
      setImgUrl('')
    } catch (error) {
      console.log('Error', error.message, 'error')
    } finally {
      setIsSending(false)
    }
  }
  return (
    <Flex gap={2} alignItems={'center'}>
      <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
        <InputGroup border={'1px solid gray'} w={'full'} borderRadius={'lg'}>
          <Input
            w={'full'}
            placeholder="Type a message"
            onChange={(e) => setMessageText(e.target.value)}
            value={messageText}
          />
          <InputRightElement onClick={handleSendMessage} cursor={'pointer'}>
            <IoSendSharp />
          </InputRightElement>
        </InputGroup>
      </form>
      <Flex flex={5} cursor={'pointer'}>
        <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
        <Input
          type={'file'}
          hidden
          ref={imageRef}
          onChange={handleImageChange}
        />
      </Flex>
      <Modal
        isOpen={imgUrl}
        onClose={() => {
          onClose()
          setImgUrl('')
        }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Flex mt={5} w={'full'}>
              <Image src={imgUrl} />
            </Flex>
            <Flex justifyContent={'flex-end'} my={2}>
              {!isSending ? (
                <IoSendSharp
                  size={24}
                  cursor={'pointer'}
                  onClick={handleSendMessage}
                />
              ) : (
                <Spinner size={'md'} />
              )}
            </Flex>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Flex>
  )
}

export default MessageInput
