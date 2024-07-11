import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const Protected = ({children, authentication = true}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(true)
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if(authentication && isAuthenticated !== authentication){
      navigate("/login")
    } else if (!authentication && isAuthenticated !== authentication){
      navigate("/")
    }
    setLoading(false)
  }, [loading, authentication, navigate])
  return loading ? (
    <div>Loading...</div>
  ) : (
    <div>
      {children}
    </div>
  )
}

export default Protected