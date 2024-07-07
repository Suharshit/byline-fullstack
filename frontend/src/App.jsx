import { Outlet, useNavigate } from "react-router-dom"
import GuestNavbar from "./components/header/GuestNavbar"
import Footer from "./components/footer/Footer"

function App() {
  return (
    <>
      <div className="h-screen w-screen relative flex">
        <div className="top-0 absolute h-14 max-sm:h-24 w-full bg-gray-800 max-sm:px-0 max-sm:py-0 px-2 py-2">
          <GuestNavbar/>
        </div>
        <div className="max-sm:top-24 md:top-20 top-14 bottom-10 absolute">
          <Outlet/>
        </div>
        <div className="bottom-0 absolute h-10 bg-[#D65A31] w-full flex items-center justify-center">
          <Footer/>
        </div>
      </div>
    </>
  )
}

export default App