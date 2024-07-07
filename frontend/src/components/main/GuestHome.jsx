import React from 'react'
import { Link } from 'react-router-dom'

const GuestHome = () => {
  return (
    <>
      <div className="h-full w-screen px-2 flex flex-col items-center justify-center sm:visible md:hidden">
        <div className='flex flex-col items-center justify-center'>
          <img src="https://i.pinimg.com/564x/78/4a/8a/784a8a5349eb462ff4e2af22f507fa21.jpg" alt="home-image" className='h-[240px] rounded-xl'/>
          <h1 className='text-lg font-semibold text-center'>
            Byline - A Blog Writting Website
          </h1>
          <p className='text-md text-gray-600 text-center'>
          Find your voice, share your story, <br /> Travel, Growth, and Development 
          </p>
        </div>
        <Link to={"/login"} className='bg-[#D65A31] w-[80%] h-[50px] flex items-center justify-center text-[#EEEEEE] rounded-xl bottom-4 absolute'>
          <h1>Get Started!</h1>
        </Link>
      </div>
    </>
  )
}

export default GuestHome