import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Protected = ({children, authentication = true}) => {
  const isAuth = useSelector((state) => state.auth.status)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(authentication && isAuth !== authentication){
      navigate("/login")
    } else if (!authentication && isAuth !== authentication){
      navigate("/")
    }
    setLoading(false)
  }, [setLoading, isAuth])
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {children}
    </div>
  )
}

export default Protected