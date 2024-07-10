import { Outlet, useNavigate } from "react-router-dom"
import Footer from "./components/footer/Footer"
import { useState } from "react"
import UserNavBar from "./components/header/UserNavbar"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  return (
    <>
      <div className="min-h-screen">
        <div className="h-10 top-0 px-6 pt-8 w-full">
          <UserNavBar/>
        </div>
        <div className="top-16 bottom-10 px-6 pt-8 w-full">
          <Outlet />
        </div>
        {
          !isAuthenticated ? (
            null
          ) : (
            <div className="h-10 bottom-0 items-center justify-center flex w-full bg-[#6528F7] text-[#EDE4FF]">
              <Footer/>
            </div>
          )
        }
      </div>
    </>
  )
}

export default App