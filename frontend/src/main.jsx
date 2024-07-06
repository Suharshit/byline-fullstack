import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter} from "react-router-dom"
import Home from "./pages/Home.jsx"
import Search from "./pages/Search.jsx"
import Profile from "./pages/Profile.jsx"
import './index.css'
import ErrorPage from './pages/ErrorPage.jsx'
import Tweets from "./pages/Tweets.jsx"
import Settings from "./pages/Settings.jsx"
import CreatePost from './pages/CreatePost.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/search",
        element: <Search/>,
      },
      {
        path: "/profile",
        element: <Profile/>,
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
      {
        path: "/tweets",
        element: <Tweets/>,
      },
      {
        path: "/settings",
        element: <Settings/>,
      },
      {
        path: "/create",
        element: <CreatePost/>,
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <SignUp/>,
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
