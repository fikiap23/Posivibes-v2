import { Container, Flex } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'
import LogoutButton from './components/Auth/LogoutButton'
import Header from './components/Header/Header'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import UserPage from './pages/UserPage'

function App() {
  const user = useRecoilValue(userAtom)
  console.log(user)
  return (
    <>
      <Header />
      <Flex>
        {/* <Sidebar /> */}
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route
              path="/"
              element={user ? <HomePage /> : <Navigate to={'/auth'} />}
            />
            <Route
              path="/auth"
              element={!user ? <AuthPage /> : <Navigate to={'/'} />}
            />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
          </Routes>
          {user && <LogoutButton />}
        </Container>
        {/* <Rightbar /> */}
      </Flex>
    </>
  )
}

export default App
