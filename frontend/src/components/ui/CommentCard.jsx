import React from 'react'
import Button from './Button'
import axios from "axios"

const CommentCard = ({comment}) => {
    const deleteComment = async() => {
        await axios.get(`/v1/comment/delete-comment/${comment._id}`)
    }
  return (
    <>
        <div className='py-3 px-2 bg-zinc-900 rounded-xl mt-3 w-[65%]'>
            <div className='flex space-x-2 justify-between'>
                <div className='flex space-x-2'>
                    <img src={comment?.owner.avatar} alt={comment?.owner.username} className='h-[10vh] w-[4.8vw] rounded-full'/>
                    <div className=''>
                        <h1 className='text-xl font-semibold'>{comment?.owner.fullname}</h1>
                        <p className='font-light text-zinc-400'>@{comment?.owner.username}</p>
                        <p className='pt-1'>{comment?.content}</p>
                    </div>
                </div>
                <Button children={"Delete"} className='bg-red-600 px-4' onClick={() => deleteComment()}/>
            </div>
        </div>
    </>
  )
}

export default CommentCard