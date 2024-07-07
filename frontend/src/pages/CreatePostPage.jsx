import {
  Box,
  Button,
  Center,
  CloseButton,
  Flex,
  FormControl,
  Image,
  Input,
  Text,
} from '@chakra-ui/react'
import { useRef, useState } from 'react'
import usePreviewImg from '../hooks/usePreviewImg'
import { BsFillImageFill } from 'react-icons/bs'
import { useRecoilState, useRecoilValue } from 'recoil'
import userAtom from '../atoms/userAtom'
import useShowToast from '../hooks/useShowToast'
import postsAtom from '../atoms/postsAtom'
import { useNavigate, useParams } from 'react-router-dom'
import { Editor } from '@tinymce/tinymce-react'
import { apiUrl } from '../utils/baseURL'
import auth from '../utils/auth'

const CreatePostPage = () => {
  const token = auth.getToken()
  const [postText, setPostText] = useState('')

  const { handleImageChange, imgUrl, setImgUrl } = usePreviewImg()
  const imageRef = useRef(null)
  const user = useRecoilValue(userAtom)
  const showToast = useShowToast()
  const [loading, setLoading] = useState(false)
  const [posts, setPosts] = useRecoilState(postsAtom)
  const { username } = useParams()
  const editorRef = useRef(null)
  const navigate = useNavigate()

  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent())
      setPostText(editorRef.current.getContent())
      showToast('Success', 'Tulisan tersimpan', 'success')
    }
  }

  const handleCreatePost = async () => {
    setLoading(true)
    if (editorRef.current) {
      setPostText(editorRef.current.getContent())
    } else {
      return showToast('Error', 'Tuliskan sesuatu', 'error')
    }
    try {
      const res = await fetch(`${apiUrl}/v1/api/posts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          postedBy: user._id,
          title: '',
          text: postText,
          img: imgUrl,
          isSpecial: true,
        }),
      })

      const data = await res.json()
      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }
      showToast('Success', 'Post created successfully', 'success')
      if (username === user.username) {
        setPosts([data, ...posts])
      }

      setPostText('')
      setImgUrl('')
      navigate(`/u/${user.username}`)
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Center>
      <Box maxW={'900px'} w={'full'}>
        <Text fontSize={'2xl'} fontWeight={'bold'} align={'center'}>
          Create Post
        </Text>

        <Box>
          <FormControl>
            <>
              <Editor
                apiKey="4xvcku7hmu0bsqdx1nxec8k8faferlrtrjy7s9x1wdx4iqjd"
                onInit={(evt, editor) => (editorRef.current = editor)}
                initialValue="<p>Tuliskan sesuatu</p>"
                onChange={(e) => {
                  setPostText(e.target.value)
                  console.log(e.target.value)
                }}
                init={{
                  tinydrive_token_provider:
                    '2175c4f70c2f878d2cd8d65f03ca518bcab7e67582e5019741a161808ff7df14',
                  height: 500,
                  menubar: false,
                  plugins:
                    'a11ychecker advcode advlist advtable anchor autocorrect autolink autoresize autosave casechange charmap checklist code codesample directionality editimage emoticons export footnotes formatpainter fullscreen help image importcss inlinecss insertdatetime link linkchecker lists media mediaembed mentions mergetags nonbreaking pagebreak pageembed permanentpen powerpaste preview quickbars save searchreplace table tableofcontents template  tinydrive tinymcespellchecker typography visualblocks visualchars wordcount',
                  toolbar1:
                    'aligncenter alignjustify alignleft alignnone alignright',
                  toolbar2:
                    'fontfamily fontsize forecolor bold italic underline strikethrough subscript superscript removeformat | blocks blockquote hr indent outdent | lineheight | formatpainter',
                  toolbar3:
                    'anchor | copy cut paste pastetext | insertdatetime link unlink | bullist numlist | image emoticons media table | preview code  | visualblocks visualchars | wordcount',

                  content_style:
                    'body { font-family:Helvetica,Arial,sans-serif; font-size:14px;} p {margin: 0;}',
                }}
              />
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
            </>
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
        </Box>

        <Flex mt={5} justifyContent={'end'}>
          <Button onClick={log} colorScheme="green" mr={3}>
            Save
          </Button>
          <Button
            colorScheme="blue"
            onClick={handleCreatePost}
            isLoading={loading}
          >
            Post
          </Button>
        </Flex>
      </Box>
    </Center>
  )
}

export default CreatePostPage
