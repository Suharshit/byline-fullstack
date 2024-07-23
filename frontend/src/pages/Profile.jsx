import React, { useState, useEffect } from 'react'
import { Link, NavLink, Outlet, useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { login as authLogin } from '../store/authSlice'
import { ChevronLeftIcon } from "@radix-ui/react-icons"
import Button from "../components/ui/Button"
import HomePostCard from '../components/ui/HomePostCard'
import HomeTweetCard from '../components/main/HomeTweetCard'
import ActionButton from '../components/ui/ActionButton'
import { HeartIcon, HeartFilledIcon, ChatBubbleIcon} from "@radix-ui/react-icons"

const Profile = () => {
  const [profileData, setProfileData] = useState({})

  useEffect(() => {
    axios.get(`/v1/user/profile/${username}`).then((res) => {
      setProfileData(res.data.data.data)
      // console.log(res.data.data.data);
    })
  }, [setProfileData])

  const { username } = useParams()
  const dispatch = useDispatch()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [inProfileData, setInProfileData] = useState([])
  const [userPosts, setUserPosts] = useState(true)
  const [userTweets, setUserTweets] = useState(false)
  // const [isUserFollowing, setIsUserFollowing] = useState(profileData?.isFollowing)

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


  const onFollow = async() => {
    await axios.get(`/v1/subscription/toggle-subscription/${profileData?._id}`).then((res) => {
      // setIsUserFollowing(true)
      // console.log(res.data);
    })
  }

  const userPostsclick = async() => {
    setUserTweets(false)
    setUserPosts(true)
    await axios.get(`/v1/post/user-posts/${profileData._id}`).then((res) => {
      setInProfileData(res.data.message)
    })
  }
  const userTweetsclick = async() => {
    setUserPosts(false)
    setUserTweets(true)
    await axios.get(`/v1/tweet/user-tweets/${profileData._id}`).then((res) => {
      setInProfileData(res.data.message)
    })
  }

  useEffect(() => {
    setUserPosts(true)
    if(userPosts){
      const getUserPosts = async() => {
          await axios.get(`/v1/post/user-posts/${profileData._id}`).then((res) => {
          setInProfileData(res.data.message)
        })
      }
      getUserPosts()
    }
  }, [profileData, setInProfileData])
  // console.log(profileData);

  return isLoggedIn ? (
    <>
      <div className='flex w-full px-3 py-2'>
        <Link to={"/"} className='bg-zinc-900 rounded-full p-3 h-fit w-fit'>
          <ChevronLeftIcon height={38} width={38}/>
        </Link>
        <div className='w-full px-20 py-5'>
          <div className='flex justify-between items-center'>
            <div className='mt-5 flex space-x-4'>
              {
                profileData?.avatar ? (
                <img src={profileData.avatar} alt={profileData.username} className='h-[35vh] w-[16vw] rounded-full border-2 border-gray-500'/>
                ) : (
                  <img src={"https://i.pinimg.com/236x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg"} alt={profileData.username} className='h-[40vh] w-[16vw] rounded-full border-2 border-gray-500'/>
                )
              }
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
                {userData?.resData?._id === profileData?._id &&
                  <div className='pt-4'>
                  <Link to={`/edit-profile/${profileData?.username}`} className='bg-zinc-900 px-8 py-2 rounded-lg font-semibold'>
                    Edit Profile
                  </Link>
                </div>}
              </div>
            </div>
            <div className=''>
              {
                userData?.resData._id === profileData?._id ? (
                  null
                ) : (
                  <Button className={`px-4 ${!profileData?.isFollowing ? "bg-[#6528F7]" : "bg-zinc-500"}`} children={profileData?.isFollowing ? "Following" : "Follow"} onClick={() => onFollow()}/>
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
              </ul>
            </div>
            <div className={`${userPosts ? "grid grid-cols-3 w-full pt-10" : "hidden"}`}>
            {
              (inProfileData.length !== 0 && userPosts) ? (
                inProfileData.map((Post) => {
                  return (
                    <HomePostCard key={Post?._id} id={Post?._id} title={Post?.title} description={Post?.description} image={Post?.image} avatar={Post?.author?.avatar} author={Post?.author?.username} authorId={Post?.author?._id}/>
                  )
                }
              )) : (
                <div className='flex w-full items-start'>
                  <h1 className='text-2xl text-center'>No Posts</h1>
                </div>
              )
            }
          </div>
          <div className={`${userTweets ? "grid grid-cols-2 w-full pt-10" : "hidden"}`}>
            {
              (inProfileData.length !== 0 && userTweets) ? (
                inProfileData.map((tweet) => {
                    const likeTweet = () => {
                      axios.get(`/v1/like/toggle-tweet-like/${tweet?._id}`).then((res) => {
                        console.log(res.data);
                        setTweetLike(tweet?.likesCount)
                      })
                    } 
                  return (
                    <div key={tweet?._id} className='bg-zinc-600 w-[550px] h-fit rounded-xl py-0 px-2'>
                      <HomeTweetCard tweet={tweet}/>
                      <div className='px-4 flex pb-2 items-center space-x-5'>
                        <div className='flex space-x-2 pt-2 px-2 border-zinc-900'>
                            <ActionButton children={!tweet?.isLiked ? <HeartIcon height={25} width={25}/> : <HeartFilledIcon height={25} width={25}/>} className={""} onClickMethod={() => likeTweet()}/>
                            <p className=''>{tweet?.likesCount}</p>
                        </div>
                        <div className='flex space-x-2 pt-2 px-2 border-zinc-900'>
                            <ActionButton children={<ChatBubbleIcon height={25} width={25}/>}/>
                            <p className=''>{tweet?.commentsCount}</p>
                        </div>
                      </div>
                    </div>
                  )
                }
              )) : (
                <div className='flex w-full items-start'>
                  <h1 className='text-2xl text-center'>No Tweets</h1>
                </div>
              )
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