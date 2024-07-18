import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { login as authLogin } from '../store/authSlice'

const AuthProtection = ({children, authentication = true}) => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const isAuth = useSelector((state) => state.auth.status)
    useEffect(() => {
        axios.get("/v1/user/current-user").then((res) => {
            const resData = res.data.data.data
            dispatch(authLogin({resData}))
            setIsAuthenticated(true)
          }).catch((error) => {
            console.log(error);
            setIsAuthenticated(false)
          })
        if (authentication && !isAuth) {
            navigate('/login')
        }
        setIsAuthenticated(true)
    })
  return (isAuthenticated && isAuth) ? (
    <>
      {children}
    </>
  ) : (
    null
  )
}

export default AuthProtection