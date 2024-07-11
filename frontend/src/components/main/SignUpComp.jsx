import React from 'react'
import Input from "../ui/Input"
import Button from "../ui/Button"

const SignUpComp = () => {
  return (
    <>
      <div className="h-full w-full flex flex-col items-center justify-center space-y-5">
        <div className="flex text-5xl items-center">
          <img src="/public/assets/Untitled.png" alt="logo" className="h-[70px] w-[50px] rounded-xl"/>
          <h1 className="logo">Byline</h1>
        </div>
        <div className="flex flex-col items-center space-y-4">
          <h1 className="text-3xl logo">Sign In</h1>
          <div className="space-y-4">
            <Input label={"Username"} placeholder={"@username"} className={"bg-white text-black"}/>
            <Input label={"Fullmame"} placeholder={"fullname"} className={"bg-white text-black"}/>
            <Input label={"Email"} placeholder={"user@example.com"} className={"bg-white text-black"}/>
            <Input label={"Password"} placeholder={"password"} className={"bg-white text-black"}/>
            <Button children={"Submit"} className="bg-[#A555EC] hover:bg-[#5d3085]"/>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignUpComp