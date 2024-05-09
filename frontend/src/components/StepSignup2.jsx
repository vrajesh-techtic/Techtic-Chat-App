import React from 'react'
import CustomInput from './CustomInput'

const StepSignup2 = ({handleChange, handleBlur, errors, touched, values}) => {
  return (
    <>
            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
              value={values.password}
              type="password"
              placeholder="Enter the password"
              label="Password:"
              name="password"
            />

            <CustomInput
              onChange={handleChange}
              onBlur={handleBlur}
              errors={errors.cpassword}
              touched={touched.cpassword}
              value={values.cpassword}
              type="password"
              placeholder="Enter the confirm password"
              label="Confirm Password:"
              name="cpassword"
            />
          </>
  )
}

export default StepSignup2
