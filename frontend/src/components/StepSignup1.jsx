import React from 'react'
import CustomInput from './CustomInput'

const StepSignup1 = ({handleChange, handleBlur, errors, touched, values}) => {
  return (
<>
            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
              value={values.email}
              type="text"
              placeholder="Enter the email"
              label="Email:"
              name="email"
            />

            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.name}
              touched={touched.name}
              value={values.name}
              type="text"
              placeholder="Enter your full name"
              label="Name:"
              name="name"
            />
            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.username}
              touched={touched.username}
              value={values.username}
              type="text"
              placeholder="Enter the username"
              label="Username:"
              name="username"
            />
          </>
  )
}

export default StepSignup1
