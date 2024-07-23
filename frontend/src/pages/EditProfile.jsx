import React, {useEffect, useState} from 'react'
import ProfileEditForm from "../components/main/ProfileEditForm"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { CaretLeftIcon } from "@radix-ui/react-icons"

const EditProfile = () => {
  const { username } = useParams()
  const [userProfileData, setUserProfileData] = useState({})
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(true)
    const asyncfn = async() => {
        await axios.get(`/v1/user/profile/${username}`).then((res) => {
          setUserProfileData(res.data.data.data)
          setIsLoading(false)
      })
    }
    asyncfn()
  }, [username, setUserProfileData, setIsLoading])
  return !isLoading ? (
    <div className='py-5'>
      <div className='flex w-[90vw] justify-center space-x-5'>
        <Link to={`/profile/${userProfileData.username}`} className='bg-zinc-900 p-1 h-fit w-fit rounded-full'><CaretLeftIcon height={50} width={50}/></Link>
        <ProfileEditForm data={userProfileData}/>
      </div>
    </div>
  ) : (
    <div>
      Loading...
    </div>
  )
}

export default EditProfile