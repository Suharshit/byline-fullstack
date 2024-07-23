import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import TextArea from '../ui/TextArea'

const ProfileEditForm = (data) => {
  // console.log(data);
  const navigate = useNavigate()
  // const [isCoverImage, setIsCoverImage] = useState(false)
  const [isAavatar, setIsAvatar] = useState(false)
  // const [coverImage, setCoverImage] = useState({data: "", preveiw: ""})
  const [avatar, setAvatar] = useState({data: "", preveiw: ""})
  const { register, handleSubmit} = useForm({
    defaultValues: {
      fullname: data?.data?.fullname || "",
      email: data?.data?.email || "",
      bio: data?.data?.bio || "",
      avatar: data?.data?.avatar || "https://i.pinimg.com/236x/83/bc/8b/83bc8b88cf6bc4b4e04d153a418cde62.jpg",
      // coverImage: data?.data?.coverImage || ""
    }
  })

  // const handleCoverImageChange = (e) => {
  //   setIsCoverImage(true)
  //   const file = {
  //     data: e.target.files[0],
  //     preveiw: URL.createObjectURL(e.target.files[0])
  //   }
  //   setCoverImage(file)
  // }
  
  const handleAvatarChange = (e) => {
    setIsAvatar(true)
    const file = {
      data: e.target.files[0],
      preveiw: URL.createObjectURL(e.target.files[0])
    }
    setAvatar(file)
  }

  // const coverImageUpload = async(data) => {
  //   const formData = new FormData()
  //   formData.append("coverImage", coverImage.data)
  //   setIsCoverImage(false)
  //   const uplaodCoverImage = await axios.patch(`/v1/user/cover-image`, formData )
  //   console.log(uplaodCoverImage);
  // }
  const avatarUpload = async(data) => {
    const formData = new FormData()
    formData.append("avatar", avatar.data)
    setIsAvatar(false)
    const uploadAvatar = await axios.patch(`/v1/user/avatar`, formData)
    console.log(uploadAvatar);
  }
  const userDataSubmit = async(data) => {
    const updateUserData = await axios.patch(`/v1/user/update-account`, data)
    console.log(updateUserData);
    navigate(`/`)
  }

  return (
    <>
      <div className=''>
        <div className=''>
          {/* <form onSubmit={handleSubmit(coverImageUpload)} className={`${data?.data?.coverImage ? "" : "border-2 border-white border-dashed rounded-xl"}`} encType='multipart/form-data'>
            <div onClick={() => document.getElementById("coverImage").click()} className='relative h-[280px] w-[850px] rounded-xl overflow-hidden flex items-center cursor-pointer hover:opacity-80'>
              <p className={`h-full w-full flex-col pl-[33%] pt-[15%] absolute text-xl font-semibold opacity-0 hover:opacity-100 ${data?.data?.coverImage ? "" : " opacity-100"}`}>Click to choose CoverImage</p>
              {
                data?.data?.coverImage ? (
                  <img src={data?.data?.coverImage} alt="coverImage"  className='w-full'/>
                ) : coverImage.preveiw ? (
                  <img src={coverImage.preveiw} alt="coverImage"  className='w-full'/>
                ) : (
                  null
                )
              }
              <Input
                type="file"
                id="coverImage"
                name="coverImage"
                className='hidden'
                {...register("coverImage", {required: true})}
                onChange={handleCoverImageChange}
              />
            </div>
            <Button children={"Save"} className={`${isCoverImage ? "visible" : "hidden"} bg-white text-black font-semibold text-lg px-5`}/>
          </form> */}
          <div className='flex flex-col items-center justify-center'>
            <form onSubmit={handleSubmit(avatarUpload)} className='pt-5 h-fit w-fit rounded-full ml-8' encType='multipart/form-data'>
              <div onClick={() => document.getElementById("avatar").click()} className='flex h-64 w-64 border-2 border-dashed cursor-pointer hover:opacity-80 rounded-full'>
                {
                  data?.data?.avatar ? (
                    <img src={data?.data?.avatar} alt="coverImage" className='h-64 w-64 rounded-full'/>
                  ) : avatar?.preveiw ? (
                    <img src={avatar?.preveiw} alt="coverImage" className='h-64 w-64 rounded-full'/>
                  ) : (
                    null
                  )
                }
                <Input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className='hidden h-0 w-0'
                  {...register("avatar", {required: true})}
                  onChange={handleAvatarChange}
                />
              </div>
              <Button type='Submit' children={"Save"} className={`${isAavatar ? "visible" : "hidden"} bg-white text-black font-semibold text-lg px-5`}/>
            </form>
            <form className='pt-5 pl-20' onSubmit={handleSubmit(userDataSubmit)}>
              <div className='w-[450px]'>
                <Input
                  label={"FullName:"}
                  placeholder="Fullname..."
                  className="bg-white text-black font-semibold"
                  {...register("fullname", {required: true})}
                />
                <Input
                  label={"Email:"}
                  placeholder="Email..."
                  className="bg-white text-black"
                  {...register("email", {required: true})}
                />
                <TextArea
                  label={"Bio:"}
                  placeholder="Bio..."
                  className="bg-white text-black font-light"
                  {...register("bio", {required: true})}
                />
                <Button type='Submit' children={"Submit"} className='w-full bg-white text-black font-bold text-xl'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileEditForm