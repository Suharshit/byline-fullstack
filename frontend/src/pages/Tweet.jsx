import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import Button from "../components/ui/Button"
import axios from "axios"
import { useForm } from "react-hook-form"
import { HeartIcon, HeartFilledIcon, ChatBubbleIcon } from "@radix-ui/react-icons"
import CommentCard from '../components/ui/CommentCard'

const Tweet = () => {
  const { id } = useParams()
  const [tweetData, setTweetData] = useState({})
  const [comments, setComments] = useState([])
  const { register, handleSubmit } = useForm({
    defaultValues: {
      content: ""
    }
  })
  
  const tweetLike = async() => {
    await axios.get(`/v1/like/toggle-tweet-like/${tweetData?._id}`).then((res) => {
      // console.log(res.data.message);
    })
  }
  const tweetComment = async(data) => {
    await axios.post(`/v1/comment/add-tweet-comment/${tweetData?._id}`, data).then((res) => {
      // console.log(res.data.message);
    })
  }
  
  useEffect(() => {
    axios.get(`/v1/tweet/tweet/${id}`).then((res) => {
      setTweetData(res.data.message)
      // console.log(res.data.message);
    })
    axios.get(`/v1/comment/tweet-comments/${id}`).then((res) => {
      // console.log(res.data.message);
      setComments(res.data.message)
    })
  }, [setTweetData, setComments, tweetComment])

  // console.log(comments);
  return (
    <>
      <div className='flex h-full w-full justify-between'>
        <div className='w-4/6 h-full border-r-2 border-l-2 px-5 border-zinc-700'>

          <div className='w-full h-[120px] flex justify-between space-x-2 px-2 py-2 border-b-2 border-zinc-700'>
            <div className='flex space-x-2'>
              <img src={tweetData?.owner?.avatar} alt={tweetData?.owner?.username} className='h-[14vh] w-[6.5vw] rounded-full'/>
              <div>
                <h1 className='text-white text-3xl font-semibold'>{tweetData?.owner?.fullname}</h1>
                <p className='text-white text-lg'>@{tweetData?.owner?.username}</p>
              </div>
            </div>
            <Button children={"Follow"} className='bg-white text-black px-5 font-semibold shadow-sm shadow-white'/>
          </div>

          <div className='w-[82%] pl-8 pt-3'>
            <p className='text-white text-xl font-semibold'>{tweetData?.content}</p>
          </div>

          <div className='flex space-x-5 pl-6'>
            <div className='flex items-center space-x-2'>
              <Button children={tweetData?.isLiked ? <HeartFilledIcon height={25} width={25}/> : <HeartIcon height={25} width={25}/>} onClick={() => tweetLike()}/>
              <p className='text-xl pt-3 font-semibold'>{tweetData?.likesCount} Like</p>
            </div>
            <div className='flex items-center space-x-2'>
              <Button children={<ChatBubbleIcon height={25} width={25}/>}/>
              <p className='text-white text-lg font-semibold pt-3'>{tweetData?.commentsCount} Comments</p>
            </div>
          </div>

          <div className='border-t-2 border-zinc-700 pt-3'>
            <h1 className='text-2xl font-semibold'>Comments:</h1>
            <form onSubmit={handleSubmit(tweetComment)}>
              <input
                type="text"
                placeholder='Write your thoughts here...'
                className='h-[50px] w-full rounded-xl px-3'
                {...register("content", { required: true })}
              />
              <Button children={"Submit"} className='bg-white text-black px-4 font-semibold text-lg'/>
            </form>
          </div>

          <div>
            {
              comments.map((comment) => {
                return(
                  <div>
                    <CommentCard comment={comment}/>
                  </div>
                )
              })
            }
          </div>

        </div>
        <div className='w-2/6 flex flex-col items-center bg-zinc-900'>
          Don,t know what to do here...
        </div>
      </div>
    </>
  )
}

export default Tweet