import { Container } from '@chakra-ui/react'
import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import PostPage from './pages/PostPage'
import UserPage from './pages/UserPage'

function App() {
  return (
    <Container maxWidth={'620px'} fontFamily={'arial'}>
      <Header />
      <Routes>
        <Route path="/:username" element={<UserPage />} />
        <Route path="/:username/post/:pid" element={<PostPage />} />
      </Routes>
    </Container>
  )
}

export default App
