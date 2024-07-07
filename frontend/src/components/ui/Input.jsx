import React, {useId} from 'react'

const Input = ({
    type = 'text',
    label = "",
    placeholder = "",
    className = "",
    ...props
}, ref) => {
    const id = useId()
  return (
    <div className='flex flex-col h-[80px] w-[340px] mt-1'>
        {
            label && <label className="form-label text-xl font-semibold px-2">{label}</label>
        }
        <input 
          type={type}  
          placeholder={placeholder} 
          className={`${className} h-[45px] rounded-xl px-2 outline-none bg-[#222831] text-[#EEEEEE]`} 
          id={id} 
          ref={ref} 
          {...props}/>
    </div>
  )
}

export default React.forwardRef(Input)