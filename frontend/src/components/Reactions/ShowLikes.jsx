/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import ListLikes from './ListLikes'

const ShowLikes = ({ postId }) => {
  const [likes, setLikes] = useState([])

  useEffect(() => {
    const fetchLikes = async () => {
      try {
        const response = await fetch(`/v1/api/posts/${postId}/likes`)
        if (!response.ok) {
          throw new Error('Network response was not ok')
        }
        const data = await response.json()
        setLikes(data.likes)
      } catch (error) {
        console.error('Error fetching likes:', error)
      }
    }

    fetchLikes()
  }, [postId])
  console.log(likes)
  return (
    <>
      {likes.map((like, index) => (
        <ListLikes
          key={index}
          name={like.name}
          img={like.profilePic}
          username={like.username}
        />
      ))}
    </>
  )
}

export default ShowLikes
