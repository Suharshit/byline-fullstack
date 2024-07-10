import React from 'react'
import { Link } from 'react-router-dom'

const UserProfileButton = ({
    userImage,
    navigateLink,
}) => {
  return (
    <Link to={navigateLink}>
        <img src={`${userImage ? userImage : "https://i.pinimg.com/474x/13/0e/dd/130edd607aca53ec12f1ae65e6d7b5eb.jpg"}`} alt="ProfileImage" className='rounded-full h-[140px] w-[140px]'/>
    </Link>
  )
}

export default UserProfileButton