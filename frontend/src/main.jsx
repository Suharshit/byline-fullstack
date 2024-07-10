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
import Protected from './utils/Protected.jsx'

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
        element: (
          <Protected authentication={true}>
            <Search />
          </Protected>
        ),
      },
      {
        path: "/profile",
        element: (
          <Protected authentication={true}>
            <Profile />
          </Protected>
        ),
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
      {
        path: "/tweets",
        element: (
          <Protected authentication={true}>
            <Tweets />
          </Protected>
        ),
      },
      {
        path: "/settings",
        element: (
          <Protected authentication={true}>
            <Settings />
          </Protected>
        ),
      },
      {
        path: "/create",
        element: (
          <Protected authentication={true}>
            <CreatePost />
          </Protected>
        ),
      },
      {
        path: "/login",
        element: (
          <Protected authentication={false}>
            <Login />
          </Protected>
        ),
      },
      {
        path: "/signup",
        element: (
          <Protected authentication={false}>
            <SignUp />
          </Protected>
        ),
      }
    ]
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
