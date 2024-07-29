import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import PostForm from '../components/main/PostForm'
import axios from "axios"
import Button from '../components/ui/Button'
import { CaretLeftIcon } from "@radix-ui/react-icons"

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
        <div className='px-8 py-5 flex space-x-5'>
          <div className='rounded-full bg-zinc-900 h-fit w-fit p-3'>
            <Link to={"/"} className=''><CaretLeftIcon height={45} width={45}/></Link>
          </div>
          <PostForm post={post} />
        </div>
    </>
  ) : (
    <div>Loading</div>
  )
}

export default EditPost