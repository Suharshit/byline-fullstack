import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Button from './Button'
import { useSelector } from 'react-redux'

const AuthorCard = ({Author}) => {
    const userData = useSelector((state) => state.auth.userData)
    const [isfollowing, setIsFollowing] = useState(false)

    const onFollow = async() => {
        
    }
  return (
    <>
        <div className='bg-zinc-900 h-[88px] rounded-2xl px-4 py-2'>
            <Link to={`/profile/${Author?.username}`} className='flex space-x-3'>
                <img src={Author?.avatar} alt={Author.username} className='h-[10vh] w-[4.8vw] rounded-full'/>
                <div>
                    <h1 className='text-2xl font-semibold'>{Author?.fullname}</h1>
                    <p className='text-zinc-400 text-md font-light'>@{Author.username}</p>
                </div>
            </Link> 
        </div>
    </>
  )
}

export default AuthorCard