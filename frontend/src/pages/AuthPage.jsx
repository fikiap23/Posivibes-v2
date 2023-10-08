import { useRecoilValue } from 'recoil'
import authScreenAtom from '../atoms/authAtom'
import LoginCard from '../components/Auth/LoginCard'
import SignupCard from '../components/Auth/SignupCard'

const AuthPage = () => {
  const authScreenState = useRecoilValue(authScreenAtom)
  // console.log(authScreenState)
  return <>{authScreenState === 'login' ? <LoginCard /> : <SignupCard />}</>
}

export default AuthPage
