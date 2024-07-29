import React, { useEffect, useState } from 'react'
import Button from '../ui/Button'
import { useSelector } from 'react-redux'
import { HeartIcon, HeartFilledIcon, ChatBubbleIcon} from "@radix-ui/react-icons"
import axios from 'axios'
import { Link } from 'react-router-dom'

const HomeTweetCard = ({
    tweet
}) => {
    const date = new Date(tweet?.createdAt)
    const formatedDate = date.toDateString() 
    const userData = useSelector((state) => state.auth.userData)

    const deleteTweet = async() => {
        await axios.get(`/v1/tweet/delete-tweet/${tweet?._id}`).then((res) => {
            console.log(res)
        })
    }

  return (
    <>
        <div className='w-[95%] h-fit pl-3 py-3 flex justify-between'>
            <Link to={`/tweet/${tweet?._id}`} className='flex items-start justify-between'>
                <div className='flex space-x-2'>
                    <img src={tweet?.owner?.avatar} alt="" className='h-14 w-14 rounded-full'/>
                    <div className='space-x-0 space-y-0 gap-y-0'>
                        <h1 className='text-xl font-semibold'>{tweet?.owner?.fullname}</h1>
                        <div className='flex items-center space-x-1'>
                            <h1 className='text-[16px] text-zinc-900'>@{tweet?.owner?.username}</h1>
                            <p className='text-[16px] text-zinc-900'>{formatedDate.slice(4,11)}</p>
                        </div>
                        <p className='text-lg font-light'>{tweet?.content}</p>
                    </div>
                </div>
            </Link>
                {
                    userData?.resData?._id === tweet?.owner?._id ? (
                        <Button className='bg-red-500 text-white px-3' onClick={() => deleteTweet()}>Delete</Button>
                    ) : (
                        null
                    )
                }
        </div>
    </>
  )
}

export default HomeTweetCard