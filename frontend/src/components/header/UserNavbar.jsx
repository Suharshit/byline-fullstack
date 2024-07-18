import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import Button from "../ui/Button"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { logout } from "../../store/authSlice"

const UserNavbar = () => {
  const authStatus = useSelector((state) => state.auth.status)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const navItems = [
    {
      name: 'Login',
      path: '/login',
      active: !authStatus
    },
  ]

  const userLogout = () => {
    try {
      axios.post("/v1/user/logout").then((res) => {
        dispatch(logout())
      })
      navigate('/')
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='h-16 backdrop-blur-lg w-full flex items-center justify-between px-6'>
      <Link to={"/"} className='flex items-center'>
        <img src="/public/assets/Untitled.png" alt=""  className='h-12 rounded-lg'/>
        <h1 className='text-4xl logo text-[#EDE4FF]'>Byline</h1>
      </Link>
      <div className='flex items-center space-x-4'>
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
        {
          authStatus ? (
            <Button children={"Logout"} className='text-xl font-semibold mb-4 px-4 bg-[#6528F7]' onClick={() => userLogout()}/>
          ) : (
            null
          )
        }
      </div>
    </div>
  )
}

export default UserNavbar