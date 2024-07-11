import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {ReactTyped} from "react-typed"

const AuthNavbar = ({
  comp
}) => {
  const navigate = useNavigate()
  return (
    <>
      <div className='h-full bg-gradient-to-tr rounded-xl from-[#A555EC] from-10% via-[#D09CFA] via-65% to-[#F3CCFF] to-87% text-black flex flex-col items-start justify-center'>
        <div className={`${comp === "Login" ? ("visible") : ("hidden")} pl-10 space-y-2`}>
          <h1 className='text-8xl logo '>Welcome Back!</h1>
          <p className='text-4xl font-semibold pl-2'>Log In to continue</p>
          <div className='flex text-2xl pl-2'>
            <p>Get your daily dose of </p>
            <ReactTyped
                strings={[
                  "News",
                  "Travelling",
                  "Food",
                  "Fashion",
                  "Sports",
                  "Technology"
                ]}
                typeSpeed={40}
                backSpeed={40}
                loop
                className='text-2xl mx-1 font-semibold'
              />
          </div>
        </div>
        <div className={`${comp === "SignUp" ? ("visible") : ("hidden")} pl-10 space-y-2`}>
        <h1 className='text-8xl logo '>Register Here!</h1>
          <p className='text-3xl font-semibold pl-1'>Sign In to Start your journey with <strong><q>Byline</q></strong></p>
          <div className='flex text-2xl pl-1'>
            <p>Get your daily dose of </p>
            <ReactTyped
                strings={[
                  "News",
                  "Travelling",
                  "Food",
                  "Fashion",
                  "Sports",
                  "Technology"
                ]}
                typeSpeed={40}
                backSpeed={40}
                loop
                className='text-2xl mx-1 font-semibold'
              />
          </div>
        </div>
        <div className='w-full flex justify-center pt-20'>
          <button onClick={() => navigate("/signin")} className={`px-10 py-2 border-2 border-black rounded-l-xl ${comp === "SignUp" ? ("bg-[#222831] text-white") : ("")}`}>Sign In</button>
          <button onClick={() => navigate("/login")} className={`px-10 py-2 border-2 border-l-0 border-black rounded-r-xl ${comp === "Login" ? ("bg-[#222831] text-white") : ("")}`}>
            Login
          </button>
        </div>
      </div>
    </>
  )
}

export default AuthNavbar