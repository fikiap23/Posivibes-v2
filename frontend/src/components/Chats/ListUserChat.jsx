import { SearchIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Flex,
  Input,
  Skeleton,
  SkeletonCircle,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'

import Conversation from './Conversation'

const ListUserChat = () => {
  return (
    <Flex
      gap={2}
      flexDirection={'column'}
      w={{
        sm: 'full',
        md: 'full',
      }}
      mx={'auto'}
      overflowY={'auto'}
      h={'80vh'}
    >
      <Text fontWeight={700} color={useColorModeValue('gray.600', 'gray.400')}>
        Your Conversations
      </Text>
      <form>
        <Flex alignItems={'center'} gap={2}>
          <Input placeholder="Search for a user" />
          <Button size={'sm'}>
            <SearchIcon />
          </Button>
        </Flex>
      </form>

      {false &&
        [0, 1, 2, 3, 4].map((_, i) => (
          <Flex
            key={i}
            gap={4}
            alignItems={'center'}
            p={'1'}
            borderRadius={'md'}
          >
            <Box>
              <SkeletonCircle size={'10'} />
            </Box>
            <Flex w={'full'} flexDirection={'column'} gap={3}>
              <Skeleton h={'10px'} w={'80px'} />
              <Skeleton h={'8px'} w={'90%'} />
            </Flex>
          </Flex>
        ))}

      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
      <Conversation />
    </Flex>
  )
}

export default ListUserChat
