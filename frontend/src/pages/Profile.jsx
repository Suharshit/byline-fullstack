import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Button from "../components/ui/Button"
import HomePostCard from '../components/ui/HomePostCard'
import HomeTweetCard from '../components/main/HomeTweetCard'

const Profile = () => {
  const { username } = useParams()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [profileData, setProfileData] = useState({})
  const [isFollowing, setIsFollowing] = useState(false)
  const [inProfileData, setInProfileData] = useState([])
  const [userPosts, setUserPosts] = useState(true)
  const [userTweets, setUserTweets] = useState(false)
  const [userLikedPosts, setUserLikedPosts] = useState(false)

  useEffect(() => {
    axios.get("/v1/user/current-user").then((res) => {
      const resData = res.data.data.data
      dispatch(authLogin({resData}))
      setIsLoggedIn(true)
    }).catch((error) => {
      console.log(error);
      setIsLoggedIn(false)
    })
  })
  const userData = useSelector((state) => state.auth.userData)

  useEffect(() => {
    axios.get(`/v1/user/profile/${username}`).then((res) => {
      setProfileData(res.data.data.data)
      // console.log(res.data.data.data);
    })
  }, [setProfileData])

  const onFollow = async() => {
    await axios.get(`/v1/subscription/toggle-subscription/${profileData?._id}`).then((res) => {
      setIsFollowing(true)
      console.log(res.data);
    })
  }

  const userPostsclick = async() => {
    setUserTweets(false)
    setUserLikedPosts(false)
    setUserPosts(true)
    await axios.get(`/v1/post/user-posts/${profileData._id}`).then((res) => {
      setInProfileData(res.data.message)
      // console.log(inProfileData)
    })
  }
  const userTweetsclick = async() => {
    setUserPosts(false)
    setUserLikedPosts(false)
    setUserTweets(true)
    await axios.get(`/v1/tweet/user-tweets/${profileData._id}`).then((res) => {
      setInProfileData(res.data.message)
    })
  }

  useEffect(() => {
    setUserPosts(true)
    if(userPosts){
      axios.get(`/v1/post/user-posts/${profileData?._id}`).then((res) => {
        setInProfileData(res.data.message)
        // console.log(inProfileData);
      })
    }
  }, [profileData, setInProfileData])

  return isLoggedIn ? (
    <>
      <div className='flex w-full px-3 py-2'>
        <Link to={"/"} className='bg-zinc-900 rounded-full p-3 h-fit w-fit'>
          <ChevronLeftIcon height={45} width={45}/>
        </Link>
        <div className='w-full px-20 py-5'>
          {profileData?.coverImage && <div className='w-full h-[280px] overflow-hidden flex items-center rounded-xl relative'>
            <img src={profileData?.coverImage || "https://i.pinimg.com/736x/7c/e7/27/7ce727a4b72ec7131a410a504cd0b8b7.jpg"} alt={profileData?.username} className='w-full'/>
          </div>}
          <div className='flex justify-between items-center'>
            <div className='mt-5 flex space-x-4'>
              <img src={profileData.avatar} alt={profileData.username} className='h-[150px] rounded-full border-2 border-gray-500'/>
              <div className='pt-4'>
                <h1 className='text-3xl font-bold pb-1'>{profileData.fullname}</h1>
                <div className='flex text-zinc-400'>
                  <h2 className='text-xl'>@{profileData.username}</h2>
                  <span className='px-2 text-[7px] py-2'>⚪</span>
                  <p>{profileData.followers} Followers</p>
                  <span className='px-2 text-[7px] py-2'>⚪</span>
                  <p>{profileData.following} Following</p>
                </div>
                <h2 className='text-md text-zinc-400 w-[60%]'>{profileData.bio}</h2>
              </div>
            </div>
            <div className=''>
              {
                userData?.resData._id === profileData?._id ? (
                  null
                ) : (
                  <Button className={`px-4 ${!isFollowing ? "bg-[#6528F7]" : "bg-zinc-500"}`} children={isFollowing ? "Following" : "Follow"} onClick={() => onFollow}/>
                )
              }
            </div>
          </div>
          <div className='mt-5'>
            <div className='flex items-center justify-center'>
              <ul className='flex space-x-6 font-semibold text-lg w-fit'>
                <li>
                  <Button onClick={() => userPostsclick()} className={({isActive}) => {
                    return isActive ? "border-b-2 border-gray-600 px-2" : "border-2 border-white"
                  }}>
                    Posts
                  </Button>
                </li>
                <li>
                  <Button onClick={() => userTweetsclick()} className={({isActive}) => {
                    return isActive ? "border-b-2 border-gray-600 px-2" : "border-2 border-white"
                  }}>
                    Tweets
                  </Button>
                </li>
                <li>
                  <Button>
                    Liked Posts
                  </Button>
                </li>
              </ul>
            </div>
            <div className={`${userPosts ? "grid grid-cols-3 w-full pt-10" : "hidden"}`}>
            {
              (inProfileData.length !== 0 && userPosts) && (
                inProfileData.map((Post) => {
                  return (
                    <HomePostCard id={Post?._id} title={Post?.title} description={Post?.description} image={Post?.image} avatar={Post?.author?.avatar} author={Post?.author?.username} authorId={Post?.author?._id}/>
                  )
                }
              ))
            }
          </div>
          <div className={`${userTweets ? "grid grid-cols-2 w-full pt-10" : "hidden"}`}>
            {
              (inProfileData.length !== 0 && userTweets) && (
                inProfileData.map((tweet) => {
                  return (
                    <div>
                      <HomeTweetCard tweet={tweet}/>
                    </div>
                  )
                }
              ))
            }
          </div>
          </div>
        </div>
      </div>
    </>
  ) : (
    <p className='flex items-center justify-center h-[90vh]'>Loading...</p>
  )
}

export default Profile