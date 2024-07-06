import { Outlet, useNavigate } from "react-router-dom"

function App() {
  const navigate = useNavigate()
  const routes = [
    {
      path: "/",
      label: "home"
    },
    {
      path: "/search",
      label: "Search"
    },
    {
      path: "/Settings",
      label: "Settings"
    },
    {
      path: "/err",
      label: "Error Page"
    },
    {
      path: "/tweets",
      label: "Tweets"
    },
    {
      path: "/profile",
      label: "Profile"
    },
    {
      path: "/create",
      label: "Create Post"
    },
    {
      path: "/login",
      label: "Login"
    },
    {
      path: "/signup",
      label: "Register"
    }
  ]
  return (
    <>
      <div className="flex  gap-x-5 mx-10">
        {
          routes.map((route) => {
            return (
              <div key={route.path} className="">
              <button onClick={() => navigate(route.path)} className="bg-blue-500 hover:bg-blue-800 p-2 rounded-md text-white">{route.label}</button>
              </div>
            )
          })
        }
      </div>
      <div className="h-[50vh] w-[50vw] flex items-center justify-center text-3xl bg-gray-600 mt-10 ml-10 text-white rounded-xl">
        <Outlet/>
      </div>
    </>
  )
}

export default App

// home, search, tweet, create, profile, settings