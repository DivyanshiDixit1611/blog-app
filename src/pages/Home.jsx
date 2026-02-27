import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import appwriteService from '../appwrite/config'
import { Container, PostCard } from '../components/index'

function Home() {
  const [posts, setPosts] = useState([])
  const authStatus = useSelector((state) => state.auth.status)

  useEffect(() => {
    appwriteService.getPosts().then((response) => {
      if (response) {
        setPosts(response.documents)
      }
    })
  }, [])

  // If not logged in
  if (!authStatus) {
    return (
      <div className='w-full py-20 text-center'>
        <Container>
          <h1 className='text-3xl font-bold text-gray-700'>
            Please login to read posts
          </h1>
        </Container>
      </div>
    )
  }

  // If logged in but no posts
  if (posts.length === 0) {
    return (
      <div className='w-full py-20 text-center'>
        <Container>
          <h1 className='text-2xl font-semibold text-gray-600'>
            No posts available
          </h1>
        </Container>
      </div>
    )
  }

  return (
    <div className='w-full py-10'>
      <Container>
        <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
          {posts.map((post) => (
            <PostCard key={post.$id} {...post} />
          ))}
        </div>
      </Container>
    </div>
  )
}

export default Home
