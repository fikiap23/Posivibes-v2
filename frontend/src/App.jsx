import { Container, Flex } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import Rightbar from './components/Rightbar/Rightbar'
import Sidebar from './components/Sidebar/Sidebar'
import PostPage from './pages/PostPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <>
      <Header />
      <Flex>
        <Sidebar />
        <Container maxWidth={'620px'} fontFamily={'arial'}>
          <Routes>
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/post/:pid" element={<PostPage />} />
          </Routes>
        </Container>
        <Rightbar />
      </Flex>
    </>
  )
}

export default App
