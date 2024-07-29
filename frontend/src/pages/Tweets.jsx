import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TextArea from "../components/ui/TextArea"
import Button from "../components/ui/Button"
import { useForm } from "react-hook-form"
import axios from "axios"
import { Link } from "react-router-dom"
import { HeartIcon, HeartFilledIcon, ChatBubbleIcon } from "@radix-ui/react-icons"

const Tweets = () => {
  const { register, handleSubmit } = useForm()
  const [tweets, setTweets] = useState([])
  const userData = useSelector((state) => state.auth.userData)
  const [search, setSearch] = useState("")
  const [searchResults, setSearchResults] = useState([])
  const [isLiked, setIsLiked] = useState(false)

  const createTweet = async(data) => {
    await axios.post(`/v1/tweet/add-tweet`, data)
  }

  useEffect(() => {
    axios.get(`/v1/tweet/all-tweets`).then((res) => {
      setTweets(res.data.message)
    })
    axios.get(`/v1/tweet/search-tweet?search=${search}`).then((res) => {
      setSearchResults(res.data.message)
    })
  }, [setTweets, setSearch, search])

  return (
    <>
      <div className='flex mt-5 h-full'>
        <div className='flex flex-col w-5/6 items-center border-r-2 border-l-2 mr-8 border-zinc-600 h-full'>
          <div className='w-full px-14 pt-2 border-b-2 mb-1 pb-4 border-zinc-700'>
            <form className='space-y-0' onSubmit={handleSubmit(createTweet)}>
              <TextArea
                {...register("content", {required: true})}
                placeholder="What's Happing? Share you throughts here..."
                rows={"3"}
                maxLength={2000}
              />
              <Button
                children={"Create"}
                className='bg-white text-black text-lg font-semibold px-4 h-0'
              />
            </form>
          </div>
          <div className='w-full'>
            {
              tweets.map((tweet) => {
                const likeTweet = async() => {
                  await axios.get(`/v1/like/toggle-tweet-like/${tweet?._id}`).then((res) =>{
                    setIsLiked(!isLiked)
                  })
                }
                const deleteTweet = async() => {
                  await axios.get(`/v1/tweet/delete-tweet/${tweet?._id}`)
                }
                return (
                  <div key={tweet._id} className='min-h-[130px] w-full border-b-2 border-zinc-700 px-3 flex justify-between pt-2'>
                    <div className='space-x-3 w-full'>
                      <div className='flex space-x-2 w-full'>
                        <Link to={`/profile/${tweet?.owner.username}`} className="w-[11%]">
                          <img src={tweet?.owner.avatar} alt={tweet?.owner.username} className='h-[10vh] w-[4.6vw] rounded-full' />
                        </Link>
                        <Link to={`/tweet/${tweet?._id}`} className='w-[85%]'>
                          <h1 className='text-lg font-semibold'>{tweet?.owner.fullname}</h1>
                          <p className='text-sm text-zinc-400'>@{tweet?.owner.username}</p>
                          <p className='text-lg'>{tweet?.content}</p>
                        </Link>
                      </div>
                      <div className='flex items-center space-x-4'>
                        <div className='flex items-center space-x-1'>
                          <Button children={tweet?.isLiked ? <HeartFilledIcon height={25} width={25}/> : <HeartIcon height={25} width={25}/>} onClick={() => likeTweet()}/>
                          <p className='text-lg pt-3'>{tweet?.likesCount}</p>
                        </div>
                        <Link to={`/tweet/${tweet?._id}`} className='flex items-center space-x-1 pt-3'>
                          <ChatBubbleIcon height={25} width={25}/>
                          <p className='text-lg'>{tweet?.commentsCount}</p>
                        </Link>
                      </div>
                    </div>
                    {(userData?.resData._id === tweet?.owner._id) && (
                      <Button
                      children={"Delete"}
                      className='bg-red-500 text-white text-lg font-semibold px-4 h-0'
                      onClick={() => deleteTweet()}
                    />
                    )}
                  </div>
                )
              })
            }
          </div>
        </div>
        <div className='w-3/6 pr-8'>
          <input
            placeholder={"Search..."}
            className="bg-zinc-900 text-white font-normal w-[26.8vw] h-[7vh] rounded-xl px-3"
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className='mt-6'>
            {searchResults.map((tweet) => {
              return (
                <div key={tweet?._id} className='min-h-[100px] w-full bg-zinc-900 mb-5 rounded-2xl px-3 py-2'>
                  <Link to={`/tweet/${tweet?._id}`} className='flex space-x-3'>
                    <img src={tweet?.owner?.avatar} alt={tweet?.owner.username} className='h-[9vh] w-[4.3vw] rounded-full'/>
                    <div>
                      <h1 className='text-lg font-semibold'>{tweet?.owner.fullname}</h1>
                      <p className='text-sm text-zinc-400'>@{tweet?.owner.username}</p>
                      <p className='text-lg'>{tweet?.content}</p>
                    </div>
                  </Link>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Tweets