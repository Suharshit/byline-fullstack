import React, { useEffect, useState } from 'react'
import Input from '../ui/Input'
import Button from '../ui/Button'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { useParams } from "react-router-dom"

const ProfileEditForm = (data) => {
  // console.log(data);
  const [isCoverImage, setIsCoverImage] = useState(false)
  const [isAavatar, setIsAvatar] = useState(false)
  const { register, handleSubmit} = useForm({
    defaultValues: {
      fullname: data?.data?.fullname || "",
      email: data?.data?.email || "",
      bio: data?.data?.bio || "",
      avatar: data?.data?.avatar || "",
      coverImage: data?.data?.coverImage || ""
    }
  })

  const coverImageUpload = () => {
    setIsCoverImage(false)
    console.log("Image Uplaoded");
  }
  const avatarUpload = () => {
    setIsAvatar(false)
    console.log("avatar Uplaoded");
  }
  const userDataSubmit = () => {
    console.log("Data Submitted");
  }

  return (
    <>
      <div className=''>
        <div className=''>
          <form onSubmit={handleSubmit(coverImageUpload)} className={`${data?.data?.coverImage ? "" : "border-2 border-white border-dashed rounded-xl"}`} encType='multipart/form-data'>
            <div onClick={() => document.getElementById("coverImage").click()} className='relative h-[280px] w-[850px] rounded-xl overflow-hidden flex items-center cursor-pointer hover:opacity-80'>
              <p className={`h-full w-full flex-col pl-[33%] pt-[15%] absolute text-xl font-semibold opacity-0 hover:opacity-100 ${data?.data?.coverImage ? "" : " opacity-100"}`}>Click to choose CoverImage</p>
              {
                data?.data?.coverImage && (
                  <img src={data?.data?.coverImage} alt="coverImage"  className='w-full'/>
                )
              }
              <Input
                type="file"
                id="coverImage"
                name="coverImage"
                className='hidden'
                {...register("coverImage", {required: true})}
                onChange={(e) => {
                  setIsCoverImage(true)
                  const file = e.target.files[0]
                  console.log(file);
                }}
              />
            </div>
            <Button children={"Save"} className={`${isCoverImage ? "visible" : "hidden"} bg-white text-black font-semibold text-lg px-5`}/>
          </form>
          <div className='flex'>
            <form onSubmit={handleSubmit(avatarUpload)} className='pt-5 h-fit w-fit rounded-full' encType='multipart/form-data'>
              <div onClick={() => document.getElementById("avatar").click()} className='flex h-fit w-fit cursor-pointer hover:opacity-80 rounded-full'>
                {
                  data?.data?.avatar && (
                    <img src={data?.data?.avatar} alt="coverImage" className='h-64 w-64 rounded-full'/>
                  )
                }
                <Input
                  type="file"
                  id="avatar"
                  name="avatar"
                  className='hidden h-0 w-0'
                  {...register("avatar", {required: true})}
                  onChange={(e) => {
                    setIsAvatar(true)
                    const file = e.target.files[0]
                    console.log(file);
                  }}
                />
              </div>
              <Button children={"Save"} className={`${isAavatar ? "visible" : "hidden"} bg-white text-black font-semibold text-lg px-5`}/>
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
                <Input
                  label={"Bio:"}
                  placeholder="Bio..."
                  className="bg-white text-black font-light"
                  {...register("bio", {required: true})}
                />
                <Button children={"Submit"} className='w-full bg-white text-black font-bold text-xl'/>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default ProfileEditForm