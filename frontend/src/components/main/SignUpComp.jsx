import React, {useState} from 'react'
import Input from "../ui/Input"
import Button from "../ui/Button"
import { useForm } from "react-hook-form"
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

const SignUpComp = () => {
  const { register, handleSubmit } = useForm()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const userRegister = (data) => {
    setIsLoading(true)
    axios.post("/v1/user/register", data).then((res) => {
      console.log(res);
      setIsLoading(false)
    })
    navigate("/login")
  }
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-5">
        <Link to={"/"} className="flex text-5xl items-center">
          <img src="/public/assets/Untitled.png" alt="logo" className="h-[70px] w-[50px] rounded-xl"/>
          <h1 className="logo">Byline</h1>
        </Link>
        <div className="flex flex-col items-center space-y-4 w-full">
          <h1 className="text-3xl logo">Sign In</h1>
          <form className="space-y-4 w-full flex flex-col items-center" onSubmit={handleSubmit(userRegister)}>
            <Input label={"Username"} {...register("username", { required: true, minLength: 2})} placeholder={"@username"} className={"bg-white text-black w-[350px]"}/>
            <Input label={"Fullname"} {...register("fullname", { required: true, minLength: 2})} placeholder={"fullname"} className={"bg-white text-black w-[350px]"}/>
            <Input label={"Email"} {...register("email", { required: true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} placeholder={"user@example.com"} className={"bg-white text-black w-[350px]"}/>
            <Input type={"password"} label={"Password"} {...register("password", { required: true})} placeholder={"password"} className={"bg-white text-black w-[350px]"}/>
            <Button children={`${isLoading ? ("Loading") : ("Submit")}`} className="bg-[#A555EC] hover:bg-[#5d3085] w-[350px]"/>
          </form>
        </div>
      </div>
    </>
  )
}

export default SignUpComp