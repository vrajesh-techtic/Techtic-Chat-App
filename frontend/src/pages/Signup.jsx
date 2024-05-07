import React from "react";
import CustomInput from "../components/CustomInput";
import { Divider } from "antd";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { customSignupValidations } from "../utils/loginSignupValidators";
import { country_code } from "../demoCountryCodePhoneNum";

const Signup = () => {
  const initialValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    cpassword: "",
    phonenum: 0,
    image:{},
    gender: "",
    countryCode:"",
    dob: "",
  };

  const {
    handleBlur,
    handleSubmit,
    handleChange,
    resetForm,
    values,
    errors,
    touched,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: customSignupValidations,
    onSubmit: (values) => {
      alert(values);
    },
  });
  return (
    <form onSubmit={handleSubmit} className="flex flex-col w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg">
      <div className="text-center font-bold text-xl text-zinc-500">Signup</div>
      <Divider style={{ border: "1px solid #e5e7eb" }} className="my-2" />
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
        placeholder="Enter the password"
        label="Confirm Password:"
        name="cpassword"
      />

      <CustomInput
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.phonenum}
        touched={touched.phonenum}
        value={values.phonenum}
        type="number"
        dropdown_name="country_code"
        dropdown_value={}
        placeholder="Enter the phone number"
        label="Phone Number:"
        name="phonenum"
      />
      <CustomInput
        onChange={handleChange}
        onBlur={handleBlur}
        touched={touched.username}
        type="file"
        accept="image/*"
        label="Upload your profile picture"
        name="image"
      />
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
        value={values.dob}
        onChange={handleChange}
        onBlur={handleBlur}
        errors={errors.dob}
        touched={touched.dob}
        
      />

      <CustomButton
        className="p-[1.5%] shadow-xl my-2 rounded-lg text-center bg-green-400 text-white text-lg font-semibold w-[100%] mx-auto"
        text="Submit"
      />
      <Divider style={{ border: "1px solid #e5e7eb" }} className="my-2" />
      <Link
        className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto"
        to="/"
      >
        Already have an account, Click here!
      </Link>
    </form>
  );
};

export default Signup;
