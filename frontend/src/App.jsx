import { Container, Flex } from '@chakra-ui/react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { useRecoilValue } from 'recoil'
import userAtom from './atoms/userAtom'

import Header from './components/Header/Header'

import AuthPage from './pages/AuthPage'
import ChatPage from './pages/ChatPage'
import CreatePostPage from './pages/CreatePostPage'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import { SettingsPage } from './pages/SettingsPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import UserPage from './pages/UserPage'

function App() {
  const user = useRecoilValue(userAtom)
  // console.log(user)
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
            <Route
              path="/update"
              element={user ? <UpdateProfilePage /> : <Navigate to={'/auth'} />}
            />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
            <Route
              path="/chat"
              element={user ? <ChatPage /> : <Navigate to={'/auth'} />}
            />
            <Route path="/create-post" element={<CreatePostPage />} />
            <Route
              path="/settings"
              element={user ? <SettingsPage /> : <Navigate to={'/auth'} />}
            />
          </Routes>
        </Container>
        {/* <Rightbar /> */}
      </Flex>
    </>
  )
}

export default App
