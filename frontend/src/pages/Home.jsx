import React, {useEffect, useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import HomePostCard from '../components/ui/HomePostCard'
import axios from "axios"
import { setPosts as Posts } from '../store/postSlice'

const Home = () => {
  const userLoggedIn = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    axios.get('/v1/post/all-posts').then((res) => {
      dispatch(Posts(res.data.message))
      setPosts(res.data.message)
      setLoading(false)
    })
  }, [setPosts, setLoading])

  return !loading ? (
    <>
      <div className='h-full rounded-xl px-2 py-1 grid grid-cols-3 space-x-5'>
        {
          posts.map((post) => {
            return (
              <HomePostCard key={post._id} id={post._id} title={post.title} description={post.description} image={post.image} author={post.author.username} avatar={post.author.avatar} authorId={post.author._id}/>
            ) 
          })
        }
      </div>
    </>
  ) : (
    <div>
      <div className='min-h-screen flex items-center justify-center rounded-xl px-2 py-1'>
        Loading...
      </div>
    </div>
  )
}

export default Home