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
import AuthLayout from './pages/AuthLayout.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import CreateTweet from "./pages/CreateTweet.jsx"
import SearchTweet from "./pages/SearchTweet.jsx"
import Post from "./pages/Post.jsx"
import AuthProtection from './utils/AuthProtection.jsx'
import UserPosts from './components/main/UserPosts.jsx'
import UserTweets from './components/main/UserTweets.jsx'
import UserLikedPosts from './components/main/UserLikedPosts.jsx'
import EditPost from './pages/EditPost.jsx'
import Tweet from './pages/Tweet.jsx'
import EditProfile from './pages/EditProfile.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/tweets",
        element: <Tweets/>
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
      {
        path: "/create-tweet",
        element: (
          <Protected authentication={true}>
            <CreateTweet />
          </Protected>
        ),
      },
      {
        path: "/search-tweet",
        element: (
          <Protected authentication={false}>
            <SearchTweet />
          </Protected>
        ),
      },
      {
        path: "/search",
        element: <Search />
      },
      {
        path: "*",
        element: <ErrorPage/>,
      },
      {
        path: "/settings",
        element: (
          <Protected authentication={true}>
            <Settings />
          </Protected>
        )
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
        path: "/tweet/:id",
        element: (
          <Protected authentication={true}>
            <Tweet/>
          </Protected>
        )
      }
    ]
  },
  {
    path: "/article/:id",
    element: (
      <AuthProtection authentication={true}>
        <Post />
      </AuthProtection>
    )
  },
  {
    path: "/edit-article/:id",
    element: (
      <AuthProtection authentication={true}>
        <EditPost/>
      </AuthProtection>
    )
  },
  {
    path: "/profile/:username",
    element: (
      <AuthProtection authentication={true}>
        <Profile />
      </AuthProtection>
    )
  },
  {
    path: "/edit-profile/:username",
    element: (
      <AuthProtection authentication={true}>
        <EditProfile />
      </AuthProtection>
    )
  },
  {
    path: "/login",
    element: (
      <Protected authentication={false}>
        <AuthLayout>
          <Login />
        </AuthLayout>
      </Protected>
    ),
  },
  {
    path: "/signin",
    element: (
      <Protected authentication={false}>
        <AuthLayout>
          <SignUp />
        </AuthLayout>
      </Protected>
    ),
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>

)
