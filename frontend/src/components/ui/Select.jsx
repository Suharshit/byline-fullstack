import React, {useId} from 'react'

const Select = ({
  label,
  options,
  className = '',
  ...props
}, ref) => {
  const id = useId()

  return (
    <div>
      {
        label && (
          <label
            htmlFor={id}
            className=''
            >
            {label}
          </label>
        )
      }
      <select
        id={id}
        className={`${className}`}
        ref={ref}
        {...props}
        >
          {
            options.map((option) => (
              <option
                key={option._id}
                value={option._id}
                >
                {option.name}
              </option>
            ))
          }
        </select>
    </div>
  )
}

export default React.forwardRef(Select)