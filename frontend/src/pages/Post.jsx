import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import parse from "html-react-parser"
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Button from '../components/ui/Button'
import TextArea from "../components/ui/TextArea"
import { useForm } from "react-hook-form"
import SidePostCard from '../components/ui/SidePostCard'

const Post = () => {
  const {id} = useParams()
  const [userLoggedIn, setUserLoggedIn] = useState(false)
  const [post, setPost] = useState()
  const [realtedPosts, setRelatedPosts] = useState([])
  const [comments, setComments] = useState([])
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const addComment = (data) => {
    axios.post(`/v1/comment/add-comment/${id}`, data).then((res) => {
      console.log(res.data);
    })
  }
  const deleteComment = (id) => {
    axios.get(`/v1/comment/delete-comment/${id}`).then((res) => {
      console.log(res.data);
    })
  }
  useEffect(() => {
    axios.get("/v1/user/current-user").then((res) => {
      const resData = res.data.data.data
      dispatch(authLogin({resData}))
      setUserLoggedIn(true)
    }).catch((error) => {
      console.log(error);
      setUserLoggedIn(false)
    })
  }, [])
  useEffect(() => {
    axios.get(`/v1/post/post-by-id/${id}`).then((res) => {
      setPost(res.data.message)
    })
    axios.get(`/v1/comment/post-comments/${id}`).then((res) => {
      setComments(res.data.message)
    })
  }, [setPost, comments])
  useEffect(() => {
    axios.get(`/v1/post/posts/${post?.category?._id}`).then((res) => {
      setRelatedPosts(res.data.message)
    })
  }, [post])
  const userData = useSelector((state) => state.auth.userData)
  // console.log(userData);

  return userLoggedIn ? (
    <>
      <div className='h-full w-full flex'>
        <div className=''>
          <Link to={"/"}><ChevronLeftIcon height={55} width={55} className='bg-zinc-900 mt-3 ml-5 rounded-full p-3' /></Link>
        </div>
        <div className='pr-32 pl-12 pt-10 w-full flex'>
          <div className='w-2/3'>
            <div className='px-3 py-1 space-y-3'>
              <h1 className='text-5xl font-bold px-2 border-b-2 border-zinc-600 pb-2'>{post?.title}</h1>
              <img src={post?.image} alt={post?.title} className='h-[470px] rounded-xl border-2 shadow-lg shadow-black'/>
            </div>
            <div className='pt-3 px-3'>
              <div className='flex justify-between pr-4'>
                <p className='text-lg font-semibold pr-3 px-2 py-2 bg-zinc-900 rounded-lg'>{post?.description}</p>
                <p className='bg-[#6528F7]/45 w-fit px-4 py-2 rounded-full ml-3 '>{post?.category.name}</p>
              </div>
              <span>
                {parse(`${post?.content}`)}
              </span>
            </div>
            <Link to={`/profile/${post?.author.username}`} className='h-20 w-full flex justify-between pr-5 mb-6'>
              <div className='flex h-auto items-center space-x-3'>
                <img src={post?.author.avatar} alt={post?.author.username} className='h-16 rounded-full'/>
                <h1 className='text-xl font-bold'>
                  {post?.author.username}
                </h1>
              </div>
              {
                userData?.id === post?.author.id ? (
                  null
                ) : (
                  <Button children={"Follow"} className='px-8 bg-[#6528F7] text-white text-lg py-1'/>
                )
              }
            </Link>
            { userData?.id === post?.author.id ? (
              <div className='mb-3'>
              <Link to={`/edit-article/${post?._id}`} className='bg-[#6528F7] px-6 py-2 text-xl font-bold rounded-lg'>
                Edit
              </Link>
            </div>) : (null)
            }
            <div>
              <h1 className='text-2xl font-bold border-t-2 border-zinc-700'>Comments:</h1>
              <div className='mt-2 w-full pr-5'>
                <form className='space-y-0' onSubmit={handleSubmit(addComment)}>
                  <TextArea {...register("content", {
                    required: true
                  })} placeholder={"Comments what's in you mind..."} className="bg-zinc-900 text-white"/>
                  <Button children={"Comment"} className='bg-white text-black font-bold px-3' type="Submit"/>
                </form>
              </div>
            </div>
            <div className='border-t-2 border-zinc-700 mt-5'>
              <h1>Comments</h1>
              {
                comments.map((comment) => (
                  <div className='h-[100px] w-full px-2' key={comment?._id}>
                    <div className='flex items-center space-x-3'>
                      <img src={comment?.owner.avatar} alt="" className='h-16 rounded-full'/>
                      <div className='w-full pr-10'>
                        <h1 className='text-xl font-semibold'>{comment?.owner.username}</h1>
                        <p className='text-md text-zinc-400 w-[80%]'>{comment?.content}</p>
                      </div>
                      {
                        userData?.id === comment?.owner.id ? (
                          <Button children={"Delete"} className='bg-[#ff3535] px-3' onClick={() => deleteComment(comment?._id)}/>
                        ) : (
                          null
                        )
                      }
                    </div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className='w-1/3 text-white'>
            {
              realtedPosts.map((post) => {
                return (
                  <span key={post._id}>
                    <h1 className='text-2xl font-semibold'>Related Articles:</h1>
                    <SidePostCard post={post}/>
                  </span>
                )
              })
            }
          </div>
        </div>
      </div>
    </>
  ) : (
    <div>
      Log In to veiw the post
    </div>
  )
}

export default Post