/* eslint-disable react/prop-types */
'use client'

import { Box, Heading, Text, Stack, Avatar, Flex } from '@chakra-ui/react'

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai'
import { FaRegComment } from 'react-icons/fa6'
import { BiRepost } from 'react-icons/bi'
import { PiShareFat } from 'react-icons/pi'
import { useState } from 'react'

const AnswerCard = () => {
  const [liked, setLiked] = useState(false)
  //  const { colorMode } = useColorMode()
  const [showComments, setShowComments] = useState(false)
  return (
    <Box>
      <Stack bg="white" color="black" boxShadow={'lg'} p={4} pos={'relative'}>
        <Heading as={'h3'} fontSize={'xl'}>
          <Avatar src={''} name={'Anonim'} mb={2} size={'xs'} /> Anonim{' '}
          <Text as={'span'} color={'blue.400'}>
            Bertanya:
          </Text>
        </Heading>
        <Text color={'gray.500'} fontSize={'sm'}>
          {`Bang kapan fitur ini bisa dipake, udah ga sabar?`}
        </Text>
        <Text my={4}>
          {' '}
          Bagian ini sedang dalam tahap pengembangan. Harap cek kembali nanti
          untuk mendapatkan pembaruan tentang fitur ini. Jadi, sambil nungguin,
          kamu bisa coba fitur lain dulu ya. Intinya, harap bersabar ya, dan
          jangan lupa balik lagi nanti buat dapetin pembaruan seru tentang fitur
          tanya jawab ini yang bakal bikin kamu makin happy! Terimakasih sudah
          setia nungguin, Sobat!
        </Text>
        <Box w={'full'} h={0.1} bg={'gray.light'}></Box>
        <Flex gap={10} alignItems={'center'}>
          {liked ? (
            <AiFillHeart
              className="w-6 h-6 cursor-pointer"
              style={{ color: 'red' }}
              onClick={() => setLiked(false)}
            />
          ) : (
            <AiOutlineHeart
              className="w-6 h-6 cursor-pointer"
              onClick={() => setLiked(true)}
            />
          )}

          <FaRegComment
            className="w-6 h-6  cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          />
          <BiRepost className="w-6 h-6  cursor-pointer" />
          <PiShareFat className="w-6 h-6  cursor-pointer" />
        </Flex>
      </Stack>
    </Box>
  )
}

export default AnswerCard
