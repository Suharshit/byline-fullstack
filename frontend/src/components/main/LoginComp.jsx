import Input from "../ui/Input"
import Button from "../ui/Button"
import { Link, useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { useState } from "react"
import axios from "axios"
import { useDispatch } from "react-redux"
import {login as authLogin} from "../../store/authSlice"

const LoginComp = () => {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const Submit = (data) => {
    setIsLoading(true)
    try {
      axios.post("/v1/user/login", data).then((res) => {
        const resData = res.data.data.data;
        dispatch(authLogin({resData}))
        console.log(resData);
        setIsLoading(false)
        navigate("/")
      })
    } catch (error) {
      console.log(error);
      setIsLoading(false)
    }
  }
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-5">
        <Link to={"/"} className="flex text-5xl items-center">
          <img src="/public/assets/Untitled.png" alt="logo" className="h-[70px] w-[50px] rounded-xl"/>
          <h1 className="logo">Byline</h1>
        </Link>
        <div className="flex flex-col items-center space-y-4 w-full">
          <h1 className="text-3xl logo">Login</h1>
          <form className="space-y-4 w-full flex flex-col justify-center items-center" onSubmit={handleSubmit(Submit)}>
            <Input type={"email"} label={"Email"} {...register("email", {  required:true, pattern: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/ })} placeholder={"user@example.com"} className={"bg-white text-black w-[350px]"}/>
            <Input type={"password"} label={"Password"} {...register("password", {required:true})} placeholder={"password"} className={"bg-white text-black w-[350px]"}/>
            <Button children={`${isLoading ? ("Loading") : ("Submit")}`} className="bg-[#A555EC] hover:bg-[#5d3085] w-[350px]"/>
          </form>
        </div>
      </div>
    </>
  )
}

export default LoginComp