import { Button } from '@chakra-ui/button'
import { useSetRecoilState } from 'recoil'

import { FiLogOut } from 'react-icons/fi'
import userAtom from '../../atoms/userAtom'
import useShowToast from '../../hooks/useShowToast'
import { apiUrl } from '../../utils/baseURL'

const LogoutButton = () => {
  const setUser = useSetRecoilState(userAtom)
  const showToast = useShowToast()

  const handleLogout = async () => {
    try {
      const res = await fetch(`${apiUrl}/v1/api/users/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()

      if (data.error) {
        console.log('Error', data.error, 'error')
        return
      }

      localStorage.removeItem('user-posivibes')
      localStorage.removeItem('token')
      setUser(null)
      showToast('Success', 'Logged out successfully', 'success')
    } catch (error) {
      console.log('Error', error, 'error')
    }
  }
  return (
    <Button size={'sm'} onClick={handleLogout}>
      <FiLogOut size={20} />
    </Button>
  )
}

export default LogoutButton
