import { useState } from 'react'
import useShowToast from './useShowToast'
import userAtom from '../atoms/userAtom'
import { useRecoilValue } from 'recoil'
import auth from '../utils/auth'

const useFollowUnfollow = (user) => {
  const token = auth.getToken()
  const currentUser = useRecoilValue(userAtom)
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  )
  const [updating, setUpdating] = useState(false)
  const showToast = useShowToast()

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      console.log('Error', 'Please login to follow', 'error')
      return
    }
    if (updating) return

    setUpdating(true)
    try {
      const res = await fetch(
        `/v1/api/users/follow/${user._id ? user._id : user.userId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      )
      const data = await res.json()
      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }

      if (following) {
        showToast('Success', `Unfollowed ${user.name}`, 'success')
        user.followers.pop() // simulate removing from followers
      } else {
        showToast('Success', `Followed ${user.name}`, 'success')
        user.followers.push(currentUser?._id) // simulate adding to followers
      }
      setFollowing(!following)

      console.log(data)
    } catch (error) {
      console.log('Error', error, 'error')
    } finally {
      setUpdating(false)
    }
  }

  return { handleFollowUnfollow, updating, following }
}

export default useFollowUnfollow
