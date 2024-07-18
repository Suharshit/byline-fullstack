import React from 'react'
import { useSelector } from 'react-redux'
import HomeSideNavbar from '../components/main/HomeSideNavbar'
import {HomeIcon, MagnifyingGlassIcon, Pencil2Icon, PersonIcon} from "@radix-ui/react-icons"

const Tweets = () => {
  const userLoggedIn = useSelector((state) => state.auth.status)
  return (
    <div>
      Tweets
    </div>
  )
}

export default Tweets