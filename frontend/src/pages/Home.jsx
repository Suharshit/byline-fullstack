import React, { useState } from 'react'
import UserHome from "../components/main/UserHome"
import GuestHome from "../components/main/GuestHome"


const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(true)
  return (
    <>
      <div className=''>
        {
          loggedInUser ? (
            <UserHome/>
          ) : (
            <GuestHome/>
          )
        }
      </div>
    </>
  )
}

export default Home