import React from 'react'

const ActionButton = ({
  children,
  onClickMethod,
  className,
  disabled,
  ...props
}) => {
  return (
    <div>
      <button className={`${className}`} onClick={onClickMethod} disabled={disabled} {...props}>
        {children}
      </button>
    </div>
  )
}

export default ActionButton