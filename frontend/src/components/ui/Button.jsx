import React from 'react'

const Button = ({
  type="Sumbit",
  className="",
  children,
  ...props
}) => {
  return (
    <div>
      <button 
      type={type} 
      className={`${className} bg-[#D65A31] h-[45px] w-[340px] rounded-xl mt-4 text-[#EEEEEE]`} 
      {...props}>
        {children}
      </button>
    </div>
  )
}

export default Button