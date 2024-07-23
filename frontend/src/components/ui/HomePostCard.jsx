import React, { useEffect, useState } from 'react'
import Button from "./Button"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import axios from 'axios'

const HomePostCard = ({
    id,
    title = "Default title",
    description = "Default description",
    image = "https://i.pinimg.com/564x/72/45/41/7245411a2341b13ee3cf6b1d9fb7e927.jpg",
    author = "Suharshit Singh",
    avatar = "https://i.pinimg.com/236x/7d/2d/c5/7d2dc513fc506bd9ad6cf3847b7326c2.jpg",
    authorId,
}) => {
  const userData = useSelector((state) => state.auth.userData)
  const [authorData, setAuthorData] = useState({})
  useEffect(() => {
    axios.get(`/v1/user/profile/${author}`).then((res) => {
      setAuthorData(res.data.data.data)
    })
  })

  const onFollow = async() => {
    await axios.get(`/v1/subscription/toggle-subscription/${profileData?._id}`).then((res) => {
      // setIsUserFollowing(true)
      // console.log(res.data);
    })
  }

  // console.log(authorData);
  return (
    <>
      <div className='h-[450px] w-[380px] rounded-xl px-2 py-3 bg-zinc-900 flex-col items-center relative shadow-zinc-900 shadow-xl'>
        <Link to={`/article/${id}`} className=''>
          <div className='w-full flex justify-center pb-2'>
            <img src={image} alt={title} className='rounded-lg h-[250px]'/>
          </div>
          <div className='px-1'>
            <h1 className='text-xl font-bold'>{title}</h1>
            <p>{description}</p>
          </div>
        </Link>
        <div className='bottom-3 absolute flex items-center justify-between pr-4 w-full'>
          <Link to={`/profile/${author}`} className='flex items-center gap-x-2'>
            <img src={avatar} alt={author} className='h-16 rounded-full'/>
            <p className='text-lg'>{author}</p>
          </Link>
          {
            userData?.resData?._id === authorId ? (
                null
              ) : authorData?.isFollowing ? (
                <Button children={"Following"} className='px-4 py-2 mr-2 bg-zinc-600 mb-2' onClick={() => onFollow()}/>
              ) : (
                <Button children={"Follow"} className='px-6 py-2 mr-2 bg-[#6528F7] mb-2' onClick={() => onFollow()}/>
              )
          }
        </div>
      </div>
    </>
  )
}

export default HomePostCard