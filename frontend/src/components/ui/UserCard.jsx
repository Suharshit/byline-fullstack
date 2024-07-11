import React, { useState } from 'react'
import UserProfileButton from './UserProfileButton'
import Button from './Button'
import { useNavigate } from 'react-router-dom'

const UserCard = ({
    username,
    fullname,
    avatar,
    followers = 0,
}) => {
    const [isFollowing, setIsFollowing] = useState(false)
    const [isAuth, setIsAuth] = useState(false)
    const navigate = useNavigate()

    const userFollow = () => {
      if(isAuth){
        navigate("/")
      } else {
        navigate("/login")
      }
      setIsFollowing(!isFollowing)
    }
  return (
    <div className='flex flex-col gap-y-3 w-full h-[90%] rounded-xl bg-[#29282C]/65 items-center justify-center text-white'>
        <UserProfileButton userImage={avatar}/>
        <div className='text-center'>
            <h1 className='text-xl font-bold'>{fullname}</h1>
            <p className='text-lg'>{username}</p>
            <p className='text-lg'>{followers} Followers</p>
        </div>
        <Button children={!isFollowing ? ("Follow") : ("Following")} className={`w-[200px] ${!isFollowing ? ("bg-[#6528F7]") : ("bg-[#868686]")}`} onClick={() => userFollow()}/>
    </div>
  )
}

export default UserCard