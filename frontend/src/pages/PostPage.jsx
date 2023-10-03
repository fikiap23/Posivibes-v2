/* eslint-disable react/prop-types */
import { Avatar } from '@chakra-ui/avatar'
import { Image } from '@chakra-ui/image'
import { Box, Flex, Text } from '@chakra-ui/layout'
import { BsFilterLeft, BsThreeDots } from 'react-icons/bs'
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'
import { BiRepost } from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import {} from 'react-icons/bs'

import { useState } from 'react'
import Comment from '../components/Reactions/Comment'
import ListLikes from '../components/Reactions/ListLikes'
import Repost from '../components/Reactions/Repost'
import {
  Button,
  Menu,
  MenuButton,
  MenuItemOption,
  MenuList,
  MenuOptionGroup,
  useColorMode,
} from '@chakra-ui/react'

const PostPage = () => {
  const [liked, setLiked] = useState(false)
  const [isTabActive, setIsTabActive] = useState('comments')
  const { colorMode } = useColorMode()

  return (
    <>
      <Box gap={3} mb={4} py={5} bg="white" color="black" px={4}>
        <Flex flexDirection={'row'} alignItems={'center'} gap={4} mb={2}>
          <Avatar size="md" name="Fiki Aprian" src="/fiki1.jpg" />
          <Flex justifyContent={'space-between'} w={'full'}>
            <Flex w={'full'} alignItems={'center'}>
              <Text fontSize={'sm'} fontWeight={'bold'}>
                fikiap23
              </Text>
              <Image src="/verified.png" w={4} h={4} ml={1} />
              <Text
                fontSize={'sm'}
                color={'blue.300'}
                ml={2}
                cursor={'pointer'}
                textDecoration={'none'}
                _hover={{ textDecoration: 'underline' }}
              >
                Follow
              </Text>
            </Flex>

            <Flex gap={4} alignItems={'center'}>
              <Text fontStyle={'sm'} color={'gray.light'}>
                1d
              </Text>
              <BsThreeDots />
            </Flex>
          </Flex>
        </Flex>
        <Flex flex={1} flexDirection={'column'} gap={2}>
          <Text
            fontSize={{ base: 'md', md: 'lg', lg: 'xl' }}
            fontWeight={'bold'}
          >
            {' '}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
          </Text>

          <Box
            borderRadius={6}
            overflow={'hidden'}
            border={'1px solid'}
            borderColor={'gray.light'}
          >
            <Image src={'/post1.png'} alt={''} w={'full'} />
          </Box>
          <Text fontSize={{ base: 'sm', md: 'md' }}>lorem ipsum</Text>
          <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
          <Flex gap={2} alignItems={'center'} justifyContent={'space-between'}>
            <Flex gap={4} alignItems={'center'}>
              {/* likes */}
              {isTabActive === 'likes' ? (
                <Flex
                  onClick={() => {
                    setIsTabActive('likes')
                  }}
                  cursor={'pointer'}
                  color={'red'}
                  textDecoration={'underline'}
                >
                  {liked ? (
                    <AiFillHeart
                      className="w-6 h-6 cursor-pointer"
                      style={{ color: 'red' }}
                      onClick={() => {
                        setLiked(false)
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setLiked(true)
                      }}
                    />
                  )}
                  <Text>{200 + (liked ? 1 : 0)}</Text>
                </Flex>
              ) : (
                <Flex
                  onClick={() => {
                    setIsTabActive('likes')
                  }}
                  cursor={'pointer'}
                >
                  {liked ? (
                    <AiFillHeart
                      className="w-6 h-6 cursor-pointer"
                      style={{ color: 'red' }}
                      onClick={() => {
                        setLiked(false)
                      }}
                    />
                  ) : (
                    <AiOutlineHeart
                      className="w-6 h-6 cursor-pointer"
                      onClick={() => {
                        setLiked(true)
                      }}
                    />
                  )}
                  <Text>200</Text>
                </Flex>
              )}
              {/* end likes */}

              {/* comments */}
              {isTabActive === 'comments' ? (
                <Flex
                  onClick={() => {
                    setIsTabActive('comments')
                  }}
                  cursor={'pointer'}
                  color={'green'}
                  textDecoration={'underline'}
                >
                  <FaRegComment className="w-6 h-6  cursor-pointer" />
                  <Text>200</Text>
                </Flex>
              ) : (
                <Flex
                  onClick={() => {
                    setIsTabActive('comments')
                  }}
                  cursor={'pointer'}
                >
                  <FaRegComment className="w-6 h-6  cursor-pointer" />
                  <Text>200</Text>
                </Flex>
              )}

              {/* end comments */}

              {/* reposts */}
              {isTabActive === 'reposts' ? (
                <Flex
                  onClick={() => {
                    setIsTabActive('reposts')
                  }}
                  cursor={'pointer'}
                  color={'blue'}
                  textDecoration={'underline'}
                >
                  <BiRepost className="w-6 h-6  cursor-pointer" />
                  <Text>200</Text>
                </Flex>
              ) : (
                <Flex
                  onClick={() => {
                    setIsTabActive('reposts')
                  }}
                  cursor={'pointer'}
                >
                  <BiRepost className="w-6 h-6  cursor-pointer" />
                  <Text>200</Text>
                </Flex>
              )}
              {/* end reposts */}
              {/* share */}
              <Flex cursor={'pointer'}>
                <PiShareFat className="w-6 h-6  cursor-pointer" />
              </Flex>
            </Flex>
            <Flex gap={4} alignItems={'center'}>
              <Menu>
                <MenuButton
                  color={colorMode === 'dark' ? 'black' : 'black'}
                  as={Button}
                  rightIcon={<BsFilterLeft />}
                >
                  Filter
                </MenuButton>
                <MenuList color={colorMode === 'dark' ? 'white' : 'black'}>
                  <MenuOptionGroup defaultValue="newest">
                    <MenuItemOption value={'newest'}>Terbaru</MenuItemOption>
                    <MenuItemOption value={'oldest'}>Terlama</MenuItemOption>
                    <MenuItemOption value={'likes'}>Terbaik</MenuItemOption>
                  </MenuOptionGroup>
                </MenuList>
              </Menu>
            </Flex>
          </Flex>
        </Flex>
        <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
        {isTabActive === 'likes' && (
          <>
            <ListLikes name={'fikiap23'} img={'/fiki1.jpg'} />
            <ListLikes name={'fikiap23'} img={'/fiki1.jpg'} />
            <ListLikes name={'fikiap23'} img={'/fiki1.jpg'} />
          </>
        )}
        {isTabActive === 'comments' && (
          <Comment
            userAvatar={'/fiki1.jpg'}
            username={'fikiap23'}
            comment={'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'}
            likes={200}
            key={1}
            createdAt={'27 Jul 2022'}
          />
        )}

        {isTabActive === 'reposts' && (
          <>
            <Repost />
            <Repost />
            <Repost />
          </>
        )}
      </Box>
    </>
  )
}

export default PostPage
