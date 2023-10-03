import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { BiRepost } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'

const Repost = () => {
  return (
    <Box mt={2}>
      <Flex alignItems={'center'} justifyContent={'space-between'}>
        <Flex alignItems={'center'} gap={2}>
          <Avatar size="sm" name="Fiki Aprian" src="/fiki1.jpg" />
          <Text
            fontSize={{
              base: 'sm',
              md: 'md',
              lg: 'lg',
            }}
          >
            Fiki Aprian
          </Text>
          <Icon as={BiRepost} />
          <Text
            color="grey"
            fontFamily={'cursive'}
            fontSize={{
              base: 'sm',
              md: 'md',
              lg: 'lg',
            }}
          >
            @rasa-yang-tak-tersampaikan
          </Text>
        </Flex>

        <Flex gap={4} alignItems={'center'}>
          <Text fontStyle={'sm'} color={'gray.light'}>
            1d
          </Text>
          <BsThreeDots />
        </Flex>
      </Flex>

      <Box mt={2}>
        <Text fontSize={'sm'} color="blackAlpha.800">
          {' '}
          Aku tau perasaanmu kawan
        </Text>
      </Box>

      <Box my={2}>
        <Text cursor={'pointer'} color="grey" fontSize={'sm'} display="inline">
          See Post
        </Text>
      </Box>

      <Divider orientation="horizontal" bg={'black'} my={2} />
    </Box>
  )
}

export default Repost
