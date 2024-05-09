import React from 'react'
import CustomInput from './CustomInput'
import dayjs from 'dayjs'

const StepSignup4 = ({handleChange, handleBlur, errors, touched, values, setValues}) => {
  return (
    <>
    <CustomInput
      onChange={handleChange}
      onBlur={handleBlur}
      errors={errors.gender}
      touched={touched.gender}
      name="gender"
      type="dropdown"
      label="Select your gender:"
      value={values.gender}
      selectOptionArray={["Male", "Female", "Others"]}
      default_select_value="Select the gender"
    />

    <CustomInput
      type="date"
      label="Select your Date of Birth:"
      name="dob"
      value={values.dob ? dayjs(values.dob, "YYYY-MM-DD") : null}
      onChange={(e) =>
        setValues({ ...values, dob: dayjs(e).format("YYYY-MM-DD") })
      }
      onBlur={handleBlur}
      errors={errors.dob}
      touched={touched.dob}
    />
  </>
  )
}

export default StepSignup4
