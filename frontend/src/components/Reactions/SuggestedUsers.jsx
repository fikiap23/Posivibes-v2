import { Box, Flex, Skeleton, SkeletonCircle, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SuggestedUser from '../Rightbar/SuggestedUser'
import useShowToast from '../../hooks/useShowToast'
import { useRecoilValue } from 'recoil'
import userAtom from '../../atoms/userAtom'

const SuggestedUsers = () => {
  const [loading, setLoading] = useState(true)
  const [suggestedUsers, setSuggestedUsers] = useState([])
  const showToast = useShowToast()
  const currentUser = useRecoilValue(userAtom)

  useEffect(() => {
    const getSuggestedUsers = async () => {
      setLoading(true)
      try {
        const res = await fetch('v1/api/users/suggested')
        const data = await res.json()
        if (data.error) {
          // showToast('Error', data.error, 'error')
          return
        }
        setSuggestedUsers(data)
      } catch (error) {
        // showToast('Error', error.message, 'error')
      } finally {
        setLoading(false)
      }
    }

    getSuggestedUsers()
  }, [showToast])

  if (!currentUser) {
    return <Box className="lg:block sticky top-0 h-[100vh]" w={'full'}></Box>
  }

  return (
    <Box className="lg:block sticky top-0 h-[100vh]" w={'full'}>
      <Text mb={4} fontWeight={'bold'}>
        Suggested Users
      </Text>
      <Flex direction={'column'} gap={4}>
        {!loading &&
          suggestedUsers.map((user) => (
            <SuggestedUser key={user._id} user={user} />
          ))}
        {loading &&
          [0, 1, 2, 3, 4].map((_, idx) => (
            <Flex
              key={idx}
              gap={2}
              alignItems={'center'}
              p={'1'}
              borderRadius={'md'}
            >
              {/* avatar skeleton */}
              <Box>
                <SkeletonCircle size={'10'} />
              </Box>
              {/* username and fullname skeleton */}
              <Flex w={'full'} flexDirection={'column'} gap={2}>
                <Skeleton h={'8px'} w={'80px'} />
                <Skeleton h={'8px'} w={'90px'} />
              </Flex>
              {/* follow button skeleton */}
              <Flex>
                <Skeleton h={'20px'} w={'60px'} />
              </Flex>
            </Flex>
          ))}
      </Flex>
    </Box>
  )
}

export default SuggestedUsers
