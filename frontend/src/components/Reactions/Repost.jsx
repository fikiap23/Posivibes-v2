/* eslint-disable react/prop-types */
import { Avatar, Box, Divider, Flex, Icon, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { BiRepost } from 'react-icons/bi'
import { BsThreeDots } from 'react-icons/bs'
import { Link } from 'react-router-dom'

const Repost = ({ repost, nameWhoPost }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  console.log(repost)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(
          `${apiUrl}/v1/api/users/profile/${repost.user.userId}`
        )
        const data = await res.json()
        if (data.error) {
          // console.log('Error', data.error, 'error')
          return
        }
        if (data.isFrozen) {
          setUser(null)
          return
        }
        setUser(data)
      } catch (error) {
        // console.log('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }
    getUser()
  }, [repost.user.userId])
  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <Box mt={2}>
          <Flex alignItems={'center'} justifyContent={'space-between'}>
            <Flex alignItems={'center'} gap={2}>
              <Avatar size="sm" name={user?.name} src={user?.profilePic} />
              <Link to={`/u/${user.username}`}>
                <Text
                  fontSize={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                  }}
                >
                  {user.name}
                </Text>
              </Link>
              <Icon as={BiRepost} />
              <Link to={`/u/${nameWhoPost}`}>
                <Text
                  color="grey"
                  fontFamily={'cursive'}
                  fontSize={{
                    base: 'sm',
                    md: 'md',
                    lg: 'lg',
                  }}
                >
                  @{nameWhoPost}
                </Text>
              </Link>
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
              {repost.repostText}
            </Text>
          </Box>

          {/* <Box my={2}>
            <Link to={`/${user.username}/post/${postId}`}>
              <Text
                cursor={'pointer'}
                color="grey"
                fontSize={'sm'}
                display="inline"
              >
                See Post
              </Text>
            </Link>
          </Box> */}

          <Divider orientation="horizontal" bg={'black'} my={2} />
        </Box>
      )}
    </>
  )
}

export default Repost
