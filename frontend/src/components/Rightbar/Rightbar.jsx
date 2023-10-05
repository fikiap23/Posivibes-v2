import { Flex, Text } from '@chakra-ui/react'
import SuggestedUser from './SuggestedUser'

const Rightbar = () => {
  return (
    <Flex
      w={'30%'}
      gap={4}
      direction={'column'}
      className="sticky top-0 h-[100vh] hidden lg:block"
    >
      <Text fontSize={20} fontWeight={'bold'} my={2}>
        Suggested User
      </Text>
      <SuggestedUser />
      <SuggestedUser />
      <SuggestedUser />
      <SuggestedUser />
    </Flex>
  )
}

export default Rightbar
