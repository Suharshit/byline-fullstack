import React from 'react'
import { useNavigate } from 'react-router-dom'
import {ReactTyped} from "react-typed"
import Card from "../ui/Card"

const GuestHome = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className='flex min-h-screen w-full justify-between pt-20'>
        <div className='space-y-2'>
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
      <div className='min-h-screen w-full space-y-10 flex flex-col items-center'>
        <h1 className='text-center text-3xl font-semibold'>Top Articles</h1>
        <div className='grid grid-cols-2 gap-x-28 gap-y-20 '>
          <Card/>
          <Card/>
          <Card/>
          <Card/>
        </div>
      </div>
    </>
  )
}

export default GuestHome