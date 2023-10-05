import { Avatar, Box, Button, Flex, Link, Text } from '@chakra-ui/react'

const SuggestedUser = () => {
  return (
    <Flex gap={2} justifyContent={'space-between'} alignItems={'center'}>
      <Flex gap={2} as={Link} to={``}>
        <Avatar src={'/fiki1.jpg'} />
        <Box>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            {'Fiki Aprian'}
          </Text>
          <Text color={'gray.light'} fontSize={'sm'}>
            {'@rasa-yang-tak-tersampaikan'}
          </Text>
        </Box>
      </Flex>

      <Flex gap={4} alignItems={'center'} className="align-items-center">
        <Button
          size={'sm'}
          color={'white'}
          bg={'blue.400'}
          _hover={{
            color: 'white',
            opacity: '.8',
          }}
        >
          {'Follow'}
        </Button>
        <Text
          fontSize={'sm'}
          mr={2}
          cursor={'pointer'}
          _hover={{ textDecoration: 'underline', color: 'blue.400' }}
          mb={2}
        >
          {'x'}
        </Text>
      </Flex>
    </Flex>
  )
}

export default SuggestedUser
