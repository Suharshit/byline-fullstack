import React, { useState } from 'react'
import ActionButton from './ActionButton'
import {HeartIcon, HeartFilledIcon, BookmarkIcon, BookmarkFilledIcon, Share2Icon} from "@radix-ui/react-icons"
import { useNavigate } from 'react-router-dom'

const PostCard = ({
    id,
    title = "First Article",
    description = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Mollitia pariatur velit, exercitationem ab quidem nulla recusandae modi voluptates! Totam provident distinctio, maxime deleniti dolor saepe.",
    image = "https://i.pinimg.com/236x/fb/55/02/fb55023d9d7c9b95fb3501ad1b2051cc.jpg"
}) => {
    const [isPostLiked, setIsPostLiked] = useState(false)
    const [postLikeCount, setPostLikeCount] = useState(0)
    const [isPostSaved, setIsPostSaved] = useState(false)
    const [postSaveCount, setPostSaveCount] = useState(0)
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    const UserLike = () => {
        if(isAuth){
            navigate("/")
        } else {
            navigate("/login")
        }
        setIsPostLiked(!isPostLiked)
        isPostLiked ? setPostLikeCount(postLikeCount - 1) : setPostLikeCount(postLikeCount + 1)
    }
    
    const UserSave = () => {
        if(isAuth){
            navigate("/")
        } else {
            navigate("/login")
        }
        setIsPostSaved(!isPostSaved)
        isPostSaved ? setPostSaveCount(postSaveCount - 1) : setPostSaveCount(postSaveCount + 1)
    }
  return (
    <div className='h-[90%] w-full flex space-x-8 mx-2'>
        <img src={image} alt={title} className='rounded-lg h-[350px] w-[350px]'/>
        <div className='space-y-2'>
            <h1 className='text-3xl font-semibold'>{title}</h1>
            <p className='text-md font-normal'>{description}</p>
            <div className='flex space-x-2'>
                <div className='flex'>
                    <ActionButton children={!isPostLiked ? (<HeartIcon height={27} width={27}/>) : (<HeartFilledIcon height={27} width={27}/>)} onClick={() => UserLike()}/>
                    <p>{postLikeCount}</p>
                </div>
                <div className='flex'>
                    <ActionButton children={!isPostSaved ? (<BookmarkIcon height={27} width={27}/>) : (<BookmarkFilledIcon height={27} width={27}/>)} onClick={() => UserSave()}/>
                    <p>{postSaveCount}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PostCard