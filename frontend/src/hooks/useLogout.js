import userAtom from '../atoms/userAtom'
import { useSetRecoilState } from 'recoil'
import useShowToast from './useShowToast'
import { apiUrl } from '../utils/baseURL'

const useLogout = () => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()

  const logout = async () => {
    try {
      const res = await fetch(`${apiUrl}/v1/api/users/logout`, {
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

      localStorage.removeItem('user-posivibes')
      localStorage.removeItem('token')
      setUser(null)
    } catch (error) {
      showToast('Error', error, 'error')
    }
  }

  return logout
}

export default useLogout
