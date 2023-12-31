import { Button, Text } from '@chakra-ui/react'
import useShowToast from '../hooks/useShowToast'
import useLogout from '../hooks/useLogout'

export const SettingsPage = () => {
  const showToast = useShowToast()
  const logout = useLogout()

  const DeactivationAccount = async () => {
    if (!window.confirm('Are you sure you want to Deactivation your account?'))
      return

    try {
      const res = await fetch('/v1/api/users/deactivation', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      })
      const data = await res.json()

      if (data.error) {
        return showToast('Error', data.error, 'error')
      }
      if (data.success) {
        await logout()
        showToast('Success', 'Your account has been deactivation', 'success')
      }
    } catch (error) {
      showToast('Error', error.message, 'error')
    }
  }

  return (
    <>
      <Text my={1} fontWeight={'bold'}>
        Deactivation Your Account
      </Text>
      <Text my={1}>You can Activation your account anytime by logging in.</Text>
      <Button size={'sm'} colorScheme="red" onClick={DeactivationAccount}>
        Deactivation
      </Button>
    </>
  )
}
