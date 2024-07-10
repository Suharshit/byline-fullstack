import React, { useState } from 'react'
import UserProfileButton from './UserProfileButton'
import Button from './Button'

const UserCard = ({
    username,
    fullname,
    avatar,
    followers = 0,
}) => {
    const [isFollowing, setIsFollowing] = useState(false)
  return (
    <div className='h-[300px] w-[300px] bg-[#EDE4FF] text-black rounded-xl flex items-center flex-col pt-2'>
        <UserProfileButton/>
        <div className='flex flex-col w-full items-center'>
            <h1 className='text-2xl font-bold'>White Bear</h1>
            <p className='text-sm'>@whitebear</p>
            <p>{followers} Followers</p>
            <Button children={!isFollowing ? ("Follow") : ("Following")} className={`w-[220px] ${!isFollowing ? ("bg-[#6528F7]") : ("bg-[#868686]")}`} onClick={() => setIsFollowing(!isFollowing)}/>

        </div>
    </div>
  )
}

export default UserCard