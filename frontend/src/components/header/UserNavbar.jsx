import React from 'react'
import { Link } from 'react-router-dom'

const UserNavbar = () => {
  const authStatus = true
  const navItems = [
    {
      name: 'Home',
      path: '/',
      active: authStatus
    },
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
    {
      name: 'Tweets',
      path: '/tweets',
      active: authStatus
    },
    {
      name: 'Create',
      path: '/create',
      active: authStatus
    },
    {
      name: 'Profile',
      path: '/profile',
      active: authStatus
    }
  ]
  return (
    <div className='h-full w-full flex items-center justify-between'>
      <Link to={"/"} className='flex items-center'>
        <img src="/public/assets/Untitled.png" alt=""  className='h-12 rounded-lg'/>
        <h1 className='text-4xl logo text-[#EDE4FF]'>Byline</h1>
      </Link>
      <div>
        <ul className="flex space-x-5">
          {navItems.map((item) => item.active ? (
            <li key={item.name} className={`text-xl font-semibold ${!authStatus ? (
              "bg-[#6528F7] px-5 py-2 rounded-lg"
            ) : (
              ""
            )}`}>
              <Link to={item.path}>
                {item.name}
              </Link>
            </li>
          ) : (
            null
          ))}
        </ul>
      </div>
    </div>
  )
}

export default UserNavbar