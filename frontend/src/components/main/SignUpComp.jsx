import React from 'react'
import Input from "../ui/Input"
import Button from "../ui/Button"
import {Link} from "react-router-dom"

const SignUpComp = () => {
  return (
    <div className="h-full flex justify-center w-screen max-sm:bg-[#222831]">
      <div className="flex flex-col items-center justify-center h-[90%] md:h-[100%] w-full bottom-0 bg-[#EEEEEE] absolute rounded-tr-[60px]">
          <p className="text-4xl logo">Register</p>
          <form action="">
            <Input 
              type="text" 
              placeholder="Username"
              label="Username"
              />

            <Input 
              type="text" 
              placeholder="Fullname"
              label="Fullname"
              />

            <Input 
              type="email" 
              placeholder="Email"
              label="Email"
              />
            
            <Input
              type="password"
              placeholder="Password"
              label="Password"
            />

            <Button
              type="submit"
              children="Submit"
              className=" "
            />
          </form>
          <p className="text-lg mt-2">Already have an Account? <Link to={"/login"} className="font-semibold hover:underline">LogIn</Link></p>
      </div>
    </div>
  )
}

export default SignUpComp