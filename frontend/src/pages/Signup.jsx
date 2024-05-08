import React from "react";
import CustomInput from "../components/CustomInput";
import { Divider } from "antd";
import CustomButton from "../components/CustomButton";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import { customSignupValidations } from "../utils/loginSignupValidators";
import axios from "axios";
import dayjs from "dayjs";
import notificationProvider from "../utils/notificationProvider";

const BACKEND_URL = process.env.REACT_APP_API_URL || "http://localhost:5000";
// console.log("backend url -->", BACKEND_URL);

const Signup = () => {
  const { openNotification, contextHolder } = notificationProvider();

  const initialValues = {
    email: "",
    name: "",
    username: "",
    password: "",
    cpassword: "",
    phoneNumber: "",
    profilePic: {},
    gender: "",
    countryCode: "",
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
    setValues,
  } = useFormik({
    initialValues: initialValues,
    validationSchema: customSignupValidations,
    onSubmit: async (values) => {
      console.log("values: ", values);
      try {
        // const formData = new FormData();
        const formData = {
          email: values?.email,
          username: values?.username,
          name: values?.name,
          password: values?.password,
          confirmPassword: values?.cpassword,
          phoneNumber: values?.phoneNumber.toString(),
          countryCode: values?.countryCode,
          profilePic: values?.profilePic,
          gender: values?.gender,
          dob: values?.dob,
        };

        // formData.append("email", values?.email);
        // formData.append("username", values?.username);
        // formData.append("name", values?.name);
        // formData.append("password", values?.password);
        // formData.append("phoneNumber", values?.phoneNumber);
        // formData.append("countryCode", values?.countryCode);
        // formData.append("profilePic", values?.profilePic);
        // formData.append("gender", values?.gender);
        // formData.append("dob", values?.dob);
        console.log("formData -->", formData);

        const response = await axios.post(
          `http://localhost:5000/api/user/signup`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response --> ", response);
        if (response.data.status == true) {
          openNotification(response.data.message, "success");
          return;
        }
        if (response.data.status == false) {
          openNotification(response.data.error, "error");
          return;
        }
      } catch (error) {
        console.log("Error in signup -->", error);
        openNotification(error.response.data.message, "error");
        return;
      }
    },
  });

  // console.log("values",values);

  return (
    <>
      {contextHolder}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg"
      >
        <div className="text-center font-bold text-xl text-zinc-500">
          Signup
        </div>
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
          placeholder="Enter the confirm password"
          label="Confirm Password:"
          name="cpassword"
        />

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
    </>
  );
};

export default Signup;
