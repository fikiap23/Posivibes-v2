import UserHeader from '../components/Header/UserHeader'
import UserPost from '../components/Post/UserPost'

const UserPage = () => {
  return (
    <>
      <UserHeader />
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
    </>
  )
}

export default UserPage
