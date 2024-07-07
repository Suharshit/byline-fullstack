import React, { useState } from 'react'
import UserHome from "../components/main/UserHome"
import GuestHome from "../components/main/GuestHome"


const Home = () => {
  const [loggedInUser, setLoggedInUser] = useState(false)
  return (
    <>
      {
        loggedInUser ? (
          <UserHome/>
        ) : (
          <GuestHome/>
        )

      }
    </>
  )
}

export default Home