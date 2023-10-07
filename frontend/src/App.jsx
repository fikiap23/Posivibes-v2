import { Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import AuthPage from './pages/AuthPage'
import HomePage from './pages/HomePage'
import PostPage from './pages/PostPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <>
      <Header />
      <Flex>
        {/* <Sidebar /> */}
        <Container maxWidth={'full'} fontFamily={'arial'}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
          </Routes>
        </Container>
        {/* <Rightbar /> */}
      </Flex>
    </>
  )
}

export default App
