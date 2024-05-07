import React from 'react'

const CustomInput = ({
    type,
    name,
    value,
    label,
    placeholder,
    touched,
    errors,
    onChange,
    onBlur,
    accept
}) => {
  return (
    <>
      <div id='label'>
        {label}
      </div>
      <div id='input'>
        <input name={name} value={value} type={type} placeholder={placeholder} />
      </div>
    </>
  )
}

export default CustomInput
