/* eslint-disable react/prop-types */
import { Avatar, Flex, Text } from '@chakra-ui/react'

const Like = ({ name, img }) => {
  return (
    <Flex justifyContent={'space-between'}>
      <Flex alignItems={'center'} gap={2} mt={2}>
        <Avatar
          size={{
            sm: 'sm',
            md: 'md',
            lg: 'md',
          }}
          name={name}
          src={img}
        />
        <Text fontSize={'sm'} fontWeight={'bold'}>
          Fiki Aprian
        </Text>
      </Flex>

      <Flex gap={4} alignItems={'center'} mt={3}>
        <Text
          fontSize={'sm'}
          color={'blue'}
          fontWeight={'bold'}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline' }}
        >
          Follow
        </Text>
      </Flex>
    </Flex>
  )
}

export default Like
