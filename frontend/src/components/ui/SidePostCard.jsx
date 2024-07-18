import React from 'react'
import Button from './Button'
import { Link } from 'react-router-dom'

const SidePostCard = ({
    post,
}) => {
  return (
    <>
        <Link to={`/article/${post._id}`} className='h-[200px] bg-zinc-900 rounded-xl flex px-2 py-2 space-x-2 text-white overflow-hidden'>
            <img src={post.image} alt={post.title} className='w-[55%] rounded-lg' />
            <div className='flex-col'>
                <div className='mb-4'>
                    <h1 className='text-white text-xl font-bold'>{post.title}</h1>
                    <p className='px-3 py-1 bg-[#5041fb]/55 w-fit rounded-full mt-1'>{post.category.name}</p>
                </div>
                <div className='flex items-center space-x-2'>
                    <img src={post.author.avatar} alt={post.author.usename} className='h-12 rounded-full'/>
                    <h1 className='text-lg text-white'>{post.author.username}</h1>
                </div>
            </div>
        </Link>
    </>
  )
}

export default SidePostCard