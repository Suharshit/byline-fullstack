import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { login as authLogin } from '../store/authSlice'

const Profile = () => {
  const { id } = useParams()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect(() => {
    axios.get("/v1/user/current-user").then((res) => {
      const resData = res.data.data.data
      dispatch(authLogin({resData}))
      setIsLoggedIn(true)
    }).catch((error) => {
      console.log(error);
      setIsLoggedIn(false)
    })
  })

  return isLoggedIn ? (
    <>
      <h1>Profile</h1>
      <p>Author ID: {id}</p>
    </>
  ) : (
    <p>Log In / sign Up to continue</p>
  )
}

export default Profile