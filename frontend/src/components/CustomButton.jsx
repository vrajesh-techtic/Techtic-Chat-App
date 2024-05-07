import React from 'react'

const CustomButton = ({className, text}) => {
  return (
    <div>
      <button className={className}>{text}</button>
    </div>
  )
}

export default CustomButton
