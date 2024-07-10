import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ReactTyped} from "react-typed"
import HomeCard from "../ui/HomeCard"
import UserCard from '../ui/UserCard'

const GuestHome = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex min-h-screen w-full justify-between pt-20'>
        <div className='space-y-2 pt-24'>
          <h1 className='text-6xl font-bold logo'>
            Welcome!
          </h1>
          <p className='text-2xl pl-1'>
          What's on your mind? <br /> Let's discuss it here at <strong><q>Byline</q></strong>.
          </p>
          <p>
            <ReactTyped
              strings={[
                "Connected", 
                "Collaborative",
                "Inclusive"
              ]}
              typeSpeed={40}
              backSpeed={40}
              loop
              className='text-2xl mx-1 font-semibold'
            />
          </p>
          <button className='text-lg flex-col flex bg-[#6528F7] text-[#EDE4FF] px-6 py-2 rounded-xl font-semibold w-[155px]' onClick={() => navigate('/login')}>Get Started</button>
        </div>
        <div>
        <img src="https://static.vecteezy.com/system/resources/previews/004/491/051/original/blogging-concept-for-web-banner-man-blogger-writes-article-and-publishes-new-post-in-blog-for-followers-modern-person-scene-illustration-in-flat-cartoon-design-with-people-characters-vector.jpg" alt="" className='w-[700px] rounded-2xl shadow-2xl'/>
        </div>
      </div>
      <div className='min-h-screen w-full space-y-10 flex flex-col items-center mb-10'>
        <h1 className='text-center text-3xl font-semibold'>Top Articles</h1>
        <div className='grid grid-cols-2 gap-x-28 gap-y-20'>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
          <HomeCard/>
        </div>
      </div>
      <div className='min-h-screen w-full space-y-24 flex items-center flex-col mb-10'>
        <h1 className='text-center pt-10 text-3xl font-semibold'>Top Authors</h1>
        <div className='grid grid-cols-4 grid-rows-1 gap-x-16'>
          <UserCard/>
          <UserCard/>
          <UserCard/>
          <UserCard/>
        </div>
      </div>
      <div className='h-screen pt-12 space-y-10'>
        <h1 className='text-center font-semibold text-3xl'>Our Founder</h1>
        <div className='flex w-full justify-between px-40 items-center h-[80%]'>
          <div className='w-1/2 space-y-5'>
            <h1 className='text-5xl logo font-bold'>Suharshit Singh</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio consequuntur, quae recusandae at repellendus modi placeat eveniet laudantium magni asperiores sint magnam temporibus animi? Dolorum non vitae impedit praesentium nemo ipsam, quaerat maxime, minus porro rerum neque, delectus voluptatum saepe.
            </p>
          </div>
          <div className='h-[400px] w-[400px] relative flex items-center justify-center'>
            <div className='h-32 rounded-full backdrop-blur-sm bg-[#F3CCFF]/65 w-32 absolute right-2 top-0 opacity-65 -z-10'></div>
            <img src="https://i.pinimg.com/236x/4e/44/77/4e44778d89df8a2def33a6f1f6cc1eee.jpg" alt="" className='h-[350px] w-[350px] rounded-full'/>
            <div className='h-28 rounded-2xl backdrop-blur-sm bg-[#FFFFD0]/65 w-28 absolute bottom-24 left-0 opacity-65'></div>
            <div className='h-28 rounded-2xl backdrop-blur-sm bg-white/65 w-28 absolute bottom-8 right-5 opacity-65'></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default GuestHome