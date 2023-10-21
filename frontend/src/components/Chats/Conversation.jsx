import {
  Avatar,
  AvatarBadge,
  Flex,
  Image,
  Stack,
  Text,
  WrapItem,
  useColorModeValue,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const Conversation = () => {
  const navigate = useNavigate()
  return (
    <Flex
      gap={4}
      alignItems={'center'}
      p={'1'}
      _hover={{
        cursor: 'pointer',
        bg: useColorModeValue('gray.600', 'gray.dark'),
        color: 'white',
      }}
      borderRadius={'md'}
      onClick={() => {
        navigate('/message')
      }}
      justifyContent={'space-between'}
    >
      <Flex gap={3}>
        <WrapItem>
          <Avatar
            size={{
              base: 'md',
              sm: 'md',
              md: 'md',
            }}
            src={'/fiki1.jpg'}
          >
            <AvatarBadge boxSize="1em" bg="green.500" />
          </Avatar>
        </WrapItem>

        <Stack direction={'column'} fontSize={'sm'}>
          <Text fontWeight="700" display={'flex'} alignItems={'center'}>
            Fiki Aprian <Image src="/verified.png" w={4} h={4} ml={1} />
          </Text>
          <Text fontSize={'xs'} display={'flex'} alignItems={'center'} gap={1}>
            Hello some message ...
          </Text>
        </Stack>
      </Flex>
      <Text fontSize={{ base: 'xs', md: '10px' }} color={'gray.light'}>
        12:05 PM
      </Text>
    </Flex>
  )
}

export default Conversation
