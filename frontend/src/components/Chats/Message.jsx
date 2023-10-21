/* eslint-disable react/prop-types */
import { Avatar, Flex, Text } from '@chakra-ui/react'

const Message = ({ ownMessage }) => {
  return (
    <>
      {ownMessage ? (
        <Flex gap={2} alignSelf={'flex-end'}>
          <Text maxW={'550px'} bg={'blue.400'} borderRadius={'md'} p={2}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
          <Avatar src="" w="7" h={7} />
        </Flex>
      ) : (
        <Flex gap={2}>
          <Avatar src="" w="7" h={7} />

          <Text
            maxW={'550px'}
            bg={'gray.400'}
            p={2}
            borderRadius={'md'}
            color={'black'}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </Text>
        </Flex>
      )}
    </>
  )
}

export default Message
