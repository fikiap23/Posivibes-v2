import { Container, Flex, Spinner } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import UserHeader from '../components/Header/UserHeader'
import UserPost from '../components/Post/UserPost'
import Rightbar from '../components/Rightbar/Rightbar'
import Sidebar from '../components/Sidebar/Sidebar'
import useShowToast from '../hooks/useShowToast'

const UserPage = () => {
  const [user, seUser] = useState(null)
  const { username } = useParams()
  const showToast = useShowToast()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch(`/v1/api/users/profile/${username}`)
        const data = await res.json()
        // console.log(data)
        if (data.error) {
          showToast('Error', data.error, 'error')
          return
        }
        seUser(data)
      } catch (error) {
        showToast('Error', error, 'error')
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [showToast, username])

  if (!user && loading) {
    return (
      <Flex justifyContent={'center'}>
        <Spinner size={'xl'} />
      </Flex>
    )
  }
  if (!user && !loading) {
    return (
      <Flex justifyContent={'center'}>
        <h1>User not found</h1>
      </Flex>
    )
  }

  return (
    <Flex>
      <Sidebar />
      <Container maxWidth={'620px'}>
        <UserHeader user={user} />
        <UserPost
          likes={1200}
          comments={1200}
          reposts={1200}
          postImg={'/post1.png'}
          postTitle={'Rutinitas yang harus dilakukan setiap hari'}
        />
        <UserPost
          likes={1200}
          comments={1200}
          reposts={1200}
          postImg={'/post2.jpg'}
          postTitle={'Selalu ada yang melihatmu dari belakang'}
          postContent={` Jangan pernah melupakan, bahwa ada orang yang akan selalu melihatmu dari belakang. Akan ada orang-orang yang kagum dengan apa yang kamu lakukan. Tidak peduli sesederhana atau sekecil apapun itu. Walaupun hanya sekedar membaca buku, tidak merokok, tidak berkumpul dengan orang-orang toxic, menepati janji, tidak mengambil yang bukan milikmu, mengerjakan ibadah, belajar bahasa inggris, memandangi senja, menikmati kopi dan kesendirian. Meski minim motivasi dan kesepian. Meski bukan hal luar biasa. Namun caramu menjadi dirimu sendiri dengan melakukan semua yang kamu sukai benar-benar hidup dimata kami. Andai orang-orang seperti itu dikumpulkan dalam satu tempat. Atau setidaknya dalam satu waktu (satu keadaan)`}
        />
        <UserPost
          likes={1200}
          comments={1200}
          reposts={1200}
          postImg={'/post3.jpg'}
          postTitle={'Biarkan yang lalu berlalu'}
          postContent={` Untukmu yang kini sedang beristirahat, entah beristirahat dari
            mencintai atau memperjuangkan sesuatu, tenangkanlah hati dan jiwa,
            jangan terburu-buru mengambil keputusan. Kuatkan lewat doa dan
            tanyakan pada hati perihal apa yang sebenarnya dicari. Jangan
            terburu-buru, ya!`}
        />
        <UserPost
          likes={1200}
          comments={1200}
          reposts={1200}
          postTitle={'Aku selalu ada untukmu'}
          postContent={` Untuk rasa lelahmu yang berkepanjangan, aku sudah menyediakan rumah yang bisa kamu jadikan sebagai tempatmu pulang di kala semangatmu berkurang`}
        />
      </Container>
      <Rightbar />
    </Flex>
  )
}

export default UserPage
