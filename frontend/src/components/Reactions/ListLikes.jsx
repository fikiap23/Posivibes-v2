/* eslint-disable react/prop-types */
import { Avatar, Box, Flex, Text } from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'

const ListLikes = ({ name, img, username }) => {
  const navigate = useNavigate()
  return (
    <>
      <Box>
        <Flex justifyContent={'space-between'}>
          <Flex alignItems={'center'} gap={2} mt={2}>
            <Avatar
              cursor={'pointer'}
              size={'xs'}
              name={name}
              src={img}
              onClick={() => navigate(`/u/${username}`)}
            />
            <Text
              cursor={'pointer'}
              fontSize={'sm'}
              fontWeight={'bold'}
              onClick={() => navigate(`/u/${username}`)}
            >
              {name}
            </Text>
          </Flex>
        </Flex>
      </Box>
    </>
  )
}

export default ListLikes
