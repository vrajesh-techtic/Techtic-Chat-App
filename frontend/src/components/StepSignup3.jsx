import React from "react";
import CustomInput from "./CustomInput";

const StepSignup3 = ({ handleChange, handleBlur, errors, touched, values }) => {
  return (
    <>
      <CustomInput
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.phoneNumber}
        touched={touched.phoneNumber}
        value={values.phoneNumber}
        dropdown_value={values.countryCode}
        default_select_value="country code"
        type="number"
        dropdown_name="countryCode"
        dropdown_error={errors.countryCode}
        dropdown_touched={touched.countryCode}
        dropdown_onChange={handleChange}
        dropdown_onBlur={handleBlur}
        placeholder="Enter the phone number"
        label="Phone Number:"
        name="phoneNumber"
      />
      <CustomInput
        onChange={handleChange}
        onBlur={handleBlur}
        type="file"
        accept="image/*"
        label="Upload your profile picture"
        name="profilePic"
      />
    </>
  );
};

export default StepSignup3;
