import { useState } from 'react'
import useShowToast from './useShowToast'

const useFollowUnfollow = (currentUser, user) => {
  const [updating, setUpdating] = useState(false)
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser._id)
  )
  const [followers, setFollowers] = useState(user.followers.length)
  const showToast = useShowToast()

  const handleFollowUnfollow = async () => {
    if (!currentUser) {
      showToast('Error', 'Please login first', 'error')
      return
    }
    if (updating) return
    setUpdating(true)

    try {
      const res = await fetch(`/v1/api/users/follow/${user._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (data.error) {
        showToast('Error', data.error, 'error')
        return
      }

      if (following) {
        showToast('Success', `Unfollowed ${user.name}`, 'success')
        setFollowers(followers - 1) // Mengurangi jumlah pengikut
      } else {
        showToast('Success', 'Followed', 'success')
        setFollowers(followers + 1) // Menambah jumlah pengikut
      }

      setFollowing(!following)
    } catch (error) {
      showToast('Error', error, 'error')
    } finally {
      setUpdating(false)
    }
  }
  //   console.log(followers)
  return { updating, following, handleFollowUnfollow, followers }
}

export default useFollowUnfollow
