import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostForm from '../components/main/PostForm'
import axios from "axios"

const EditPost = () => {
    const { id } = useParams()
    const [post, setPost] = useState({})
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const asyncfn = async() => {
                await axios.get(`/v1/post/post-by-id/${id}`).then((res) => {
                setPost(res.data.message)
                console.log(post);
                setLoading(false)
            })
        }
        asyncfn()
    }, [loading, setPost])
    
  return !loading ? (
    <>
        <div className='px-8 py-5'>
            <PostForm post={post} />
        </div>
    </>
  ) : (
    <div>Loading</div>
  )
}

export default EditPost