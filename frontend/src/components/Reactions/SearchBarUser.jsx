/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import {
  Input,
  Button,
  Box,
  Center,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
} from '@chakra-ui/react'
import { SearchIcon } from '@chakra-ui/icons'
import SuggestedUser from '../Rightbar/SuggestedUser'

function SearchBarUser({ isOpen, onClose }) {
  const [searchResults, setSearchResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('') // Misalnya, inisialisasi dengan query awal

  const searchUsers = async (query) => {
    setLoading(true)
    setSearchResults([])
    try {
      const res = await fetch(`v1/api/users/search/${query}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const data = await res.json()
      if (data.error) {
        console.log(data.error)
        return
      }
      setSearchResults(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    searchUsers(searchQuery) // Panggil searchUsers dengan query yang sudah ada
  }, [searchQuery])

  return (
    <Center>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Search Results</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <form>
              <Box display="flex" alignItems="center">
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search..."
                  size="md"
                  variant="filled"
                />
                <Button
                  leftIcon={<SearchIcon />}
                  colorScheme="blue"
                  variant="solid"
                  size="md"
                  ml={2}
                  isLoading={loading}
                  onClick={() => searchUsers(searchQuery)}
                >
                  Search
                </Button>
              </Box>
            </form>
            <br />

            {searchResults.length > 0 &&
              searchResults.map((result, index) => (
                <Box key={index} m={2}>
                  <SuggestedUser key={index} user={result} />
                </Box>
              ))}
          </ModalBody>
        </ModalContent>
      </Modal>
    </Center>
  )
}

export default SearchBarUser
