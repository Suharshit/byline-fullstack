import React, {useId} from 'react'

const TextArea = ({
  label,
  className='',
  placeholder,
  rows,
  cols,
  ...props
}, ref) => {
  const id = useId()
  return (
    <div className='w-full space-y-2'>
      {label && <label htmlFor={id} className='text-lg font-semibold'>{label}</label>}
      <textarea name="description" id={id} rows={rows} cols={cols} placeholder={placeholder} ref={ref} className={`p-2 rounded-lg w-full text-white outline-gray-800 ${className}`} {...props} maxLength={110}></textarea>
    </div>
  )
}

export default React.forwardRef(TextArea)