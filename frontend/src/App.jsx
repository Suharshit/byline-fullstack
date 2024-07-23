import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./components/footer/Footer"
import { useEffect, useState } from "react"
import UserNavBar from "./components/header/UserNavbar"
import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import {login as authLogin} from "./store/authSlice"
import HomeSideNavbar from "./components/main/HomeSideNavbar"
import { HomeIcon, TwitterLogoIcon, MagnifyingGlassIcon, Pencil2Icon } from "@radix-ui/react-icons"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch()
  useEffect(() => {
    try {
      axios.get("/v1/user/current-user").then((res) => {
        const resData = res.data.data.data
        dispatch(authLogin({resData}))
        setIsAuthenticated(true)
        setIsLoading(false)
      }).catch((error) => {
        setIsAuthenticated(false)
        setIsLoading(false)
        console.log(error);
      })
    } catch (error) {
      console.log(error);
    }
  },[])
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon height={24} width={24}/>
    },
    {
      name: "Explore",
      path: "/search",
      icon: <MagnifyingGlassIcon height={24} width={24}/>
    },
    {
      name: "Tweets",
      path: "/tweets",
      icon: <TwitterLogoIcon height={24} width={24}/>
    },
    {
      name: "Create",
      path: "/create",
      icon: <Pencil2Icon height={24} width={24}/>
    }
  ]
  return (
    <>
      <div className="fixed w-full top-0 z-10">
        <UserNavBar/>
      </div>
      <div className="flex w-full h-full mt-20 px-6">
        <div className="w-1/6 fixed">
          <HomeSideNavbar navItems={navItems}/>
        </div>
        <div className="w-full min-h-screen pl-[275px] mb-10">
          <Outlet/>
        </div>
      </div>
    </>
  )
}

export default App