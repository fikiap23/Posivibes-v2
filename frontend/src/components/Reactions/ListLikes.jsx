/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'

const ListLikes = ({ name, img }) => {
  return (
    <>
      <Box>
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
      </Box>
    </>
  )
}

export default ListLikes
