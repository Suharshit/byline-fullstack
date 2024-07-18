import React from 'react'
import { NavLink } from 'react-router-dom'
import Footer from '../footer/Footer'

const HomeSideNavbar = ({navItems}) => {
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
        <span className='border-[1px] rounded-full border-zinc-600'></span>
        <div>
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default HomeSideNavbar