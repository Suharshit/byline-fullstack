import React, { useState } from 'react'
import ActionButton from "./ActionButton"
import {HeartIcon, HeartFilledIcon, BookmarkIcon, BookmarkFilledIcon, Share2Icon} from "@radix-ui/react-icons"
import ShareCard from './ShareCard'

const HomeCard = () => {
  const [isPostLiked, setIsPostLiked] = useState(false)
  const [postLikeCount, setPostLikeCount] = useState(0)
  const [isPostSaved, setIsPostSaved] = useState(false)
  const [postSaveCount, setPostSaveCount] = useState(0)
  const [isPostShared, setIsPostShared] = useState(false)

  const UserLike = () => {
    setIsPostLiked(!isPostLiked)
    isPostLiked ? setPostLikeCount(postLikeCount - 1) : setPostLikeCount(postLikeCount + 1)
  }

  const UserSave = () => {
    setIsPostSaved(!isPostSaved)
    isPostSaved ? setPostSaveCount(postSaveCount - 1) : setPostSaveCount(postSaveCount + 1)
  }

  const UserShare = () => {
    setIsPostShared(!isPostShared)
  }

  return (
    <>
        <div className='h-[380px] w-[650px] bg-[#EDE4FF] rounded-lg flex gap-y-3 pt-8 pl-4 text-black'>
            <img src="https://i.pinimg.com/736x/7e/ed/99/7eed9926be88cf56e377577574f48e5f.jpg" alt="" className='h-[320px] w-[320px] rounded-lg'/>
            <div className='px-4 '>
              <h1 className='text-2xl font-bold logo'> Article Title</h1>
              <p className='text-lg font-light'>
                <strong>description:</strong> Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate, id accusamus vitae quidem voluptatem quae tenetur iste deserunt fugiat modi magnam exercitationem quas alias eaque. Pariatur iste eius voluptates blanditiis?
              </p>
              <div className='flex pt-5 justify-end w-full space-x-5'>
                <div className='flex'>
                  <ActionButton children={!isPostLiked ? <HeartIcon height={23} width={23}/> : <HeartFilledIcon height={23} width={23} />}  onClick={() => UserLike()}/>
                  <p>{postLikeCount}</p>
                </div>
                <div className='flex'>
                  <ActionButton children={!isPostSaved ? <BookmarkIcon height={23} width={23}/> : <BookmarkFilledIcon height={23} width={23} />}  onClick={() => UserSave()}/>
                  <p>{postSaveCount}</p>
                </div>
              </div>
            </div>
        </div>
    </>
  )
}

export default HomeCard