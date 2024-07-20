import React, { useEffect, useState } from 'react'
import RTE from "../main/editorComp/RTE"
import { set, useForm } from 'react-hook-form'
import Input from "../ui/Input"
import TextArea from '../ui/TextArea'
import Button from '../ui/Button'
import { useSelector } from 'react-redux'
import axios from "axios"
import { login } from '../../store/authSlice'
import Select from '../ui/Select'

const PostForm = ({post}) => {
  const [category, setCategory] = useState([])
  const [image, setImage] = useState({data: "", preveiw: ""})
  const userData = useSelector((state) => state.auth.userData)
  const { register, handleSubmit, getValues, control } = useForm({
      defaultValues: {
        title: post?.title || "",
        content: post?.content || "",
        description: post?.description || "",
        author: post?.author || userData?.resData?._id,
        image: post?.image || image.data,
        category: post?.category || ""
      }
    })
    const postSubmit = (data) => {
      if(!post){
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("description", data.description)
        formData.append("author", data.author)
        formData.append("image", image.data)
        formData.append("category", data.category)
        axios.post('/v1/post/add-post', formData).then((res) => {
          console.log(res)
        })
      } else {
        const formData = new FormData()
        formData.append("title", data.title)
        formData.append("content", data.content)
        formData.append("description", data.description)
        formData.append("image", image.data)
        formData.append("category", data.category)
        axios.patch(`/v1/post/update-post/${post?._id}`, formData).then((res) => {
          console.log(res)
        })
        
      }
    }
    const handleFileChange = (e) => {
      const file = {
        data: e.target.files[0],
        preveiw: URL.createObjectURL(e.target.files[0])
      }
      setImage(file)
    }
    useEffect(() => {
      axios.get('/v1/category/all-category').then((res) => {
        setCategory(res?.data.message)
      })
    }, [setCategory])
    return (
      <>
        <div className='w-full'>
          <form className='flex space-x-5' onSubmit={handleSubmit(postSubmit)} encType="multipart/form-data">
            <div className=' w-2/3'>
              <Input
                label={"Title: "}
                placeholder="Title..."
                className={"text-white bg-zinc-600 w-full"}
                {...register("title", {
                  required: true,
                })}
              />
              <TextArea
                label="Description:"
                placeholder="Description..."
                {...register("description", {required: post})}
                className='outline-none border-zinc-700 bg-zinc-600'
              />
              <RTE
                className={"text-white bg-zinc-600"}
                label={"Content"}
                name={"content"}
                control={control}
                defaultValue={getValues("content")}
              />
            </div>
            <div>
              <Input
                  label="Featured Image: "
                  type="file"
                  accept="image/png, image/jpg, image/jpeg"
                  {...register("image", {required: !post})}
                  className='outline-none bg-none'
                  onChange={handleFileChange}
              />
              {image.preveiw && (
                <img src={image.preveiw} alt="preview" className='w-44 h-44 rounded-lg'/>
              )}
                { post && (
                  <div className='h-[280px] w-[400px] mb-3'>
                    <img src={post?.image} alt={post?.title}
                      className="h-[250px] w-[340px] rounded-xl"/>                    
                  </div>
                )}
                <Select
                  label={"Category: "}
                  {...register("category", {required: !post})}
                  className={'outline-none bg-zinc-600 rounded-xl w-44 px-1 py-2'}
                  options={category}
                />
                <Button children={"Submit"} className='bg-[#6528F7] text-[#EDE4FF] w-full'/>
            </div>
          </form>
        </div>
      </>
    )
}

export default PostForm