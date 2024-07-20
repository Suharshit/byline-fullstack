import React from 'react'
import Button from '../ui/Button'
import { useSelector } from 'react-redux'

const HomeTweetCard = ({
    tweet
}) => {
    const userData = useSelector((state) => state.auth.userData)
  return (
    <>
        <div className='bg-zinc-700 w-[80%] h-fit rounded-xl px-3 py-2'>
            <div className='flex items-start justify-between'>
                <div className='flex space-x-2'>
                    <img src={tweet?.owner?.avatar} alt="" className='h-14 w-14 rounded-full'/>
                    <div>
                        <h1 className='text-xl font-bold'>{tweet?.owner?.username}</h1>
                        <p className='text-lg text-zinc-400'>{tweet?.content}</p>
                    </div>
                </div>
                {
                    userData?.resData?._id === tweet?.owner?._id ? (
                        <Button className='bg-red-500 text-white px-3'>Delete</Button>
                    ) : (
                        null
                    )
                }
            </div>
        </div>
    </>
  )
}

export default HomeTweetCard