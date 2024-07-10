import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./components/footer/Footer"
import { useState } from "react"
import UserNavBar from "./components/header/UserNavbar"

function App() {
  return (
    <>
      <div className="min-h-screen flex flex-wrap content-between">
        <div className="h-10 top-0 px-6 my-4 w-full">
          <UserNavBar/>
        </div>
        <div className="top-16 bottom-10 px-6 my-2 w-full">
          <Outlet />
        </div>
        <div className="h-10 bottom-0 items-center justify-center flex w-full bg-[#6528F7] text-[#EDE4FF]">
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App