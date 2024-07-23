import React, { useEffect, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import Footer from '../footer/Footer'
import axios from 'axios'
import { useSelector } from 'react-redux'

const HomeSideNavbar = ({navItems}) => {
  const userData = useSelector((state) => state.auth.userData)
  const [following, setFollowing] = useState()
  useEffect(() => {
    axios.get(`/v1/subscription/user-following/${userData?.resData?._id}`).then((res) => {
      setFollowing(res.data.message)
    })
  }, [userData])
  // console.log(following);
  return (
    <>
      <div className='flex flex-col space-y-2 w-[90%]'>
        {navItems.map((item) => (
          <NavLink key={item.name} to={item.path} className={({isActive}) => {
            return isActive ? "bg-[#505050] py-3 rounded-lg flex items-center text-lg font-semibold gap-x-5 pl-4" : "py-3 flex items-center text-lg font-semibold gap-x-5 pl-4"
          }}>
            {item.icon}{item.name}
          </NavLink>
        ))}
        { following && (
            <div className='flex flex-col space-y-2'>
              <span className='border-[1px] rounded-full border-zinc-600'></span>
              <div className='space-y-3'>
                <h2 className='text-xl font-semibold'>Following</h2>
                {
                  ( following ) ? (
                      following.map((user) => (
                        <Link to={`/profile/${user?.author?.username}`} key={user._id} className=''>
                          <div className='flex items-center pt-2 pb-1 space-x-3'>
                            <img src={user?.author?.avatar} alt={user?.author?.username} className='h-12 rounded-full' />
                            <h1 className='text-lg font-semibold'>{user?.author?.username}</h1>
                            {/* <p>{user?.author}</p> */}
                          </div>
                        </Link>
                    )
                  )): (
                    null
                  )
                }
              </div>
            </div>
          )
        }
        <span className='border-[1px] rounded-full border-zinc-600'></span>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default HomeSideNavbar