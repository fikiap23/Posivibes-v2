import { Box, Flex, Text } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser'

const Rightbar = () => {
  return (
    <Box className="hidden lg:block" w={'30%'}>
      <Flex
        gap={4}
        direction={'column'}
        className="sticky top-0 h-[100vh] w-full"
      >
        <Text fontSize={20} fontWeight={'bold'} my={2}>
          Suggested User
        </Text>
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
        <SuggestedUser />
      </Flex>
    </Box>
  )
}

export default Rightbar
