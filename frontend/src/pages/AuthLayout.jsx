import React from 'react'
import AuthNavbar from '../components/header/AuthNavbar'

const AuthLayout = ({
    children,
}) => {
  const comp = children.type.name;
  return (
    <div className='min-h-screen flex min-w-[95%] gap-x-6 px-8 py-6'>
      <div className="w-1/2 rounded-xl">
        <AuthNavbar comp={comp}/>
      </div>
      <div className='w-1/2  rounded-xl'>
        {children}
      </div>
    </div>
  )
}

export default AuthLayout