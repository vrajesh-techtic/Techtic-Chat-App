import { Divider } from 'antd'
import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link, useNavigate } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { useFormik } from 'formik'
import { customLoginValidations } from '../utils/loginSignupValidators'
import notificationProvider from '../utils/notificationProvider'
import axios from 'axios'
import CustomSignupLoginHeader from '../components/CustomSignupLoginHeader'



const Login = () => {
  const { openNotification, contextHolder } = notificationProvider();
  const userData='"user":"{\"user\":{\"id\":\"662f6de52fdad9c147ea79f1\",\"name\":\"levi prescott\",\"email\":\"levi.prescott@yopmail.com\",\"token\":\"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibGV2aS5wcmVzY290dEB5b3BtYWlsLmNvbSIsImlkIjoiNjYyZjZkZTUyZmRhZDljMTQ3ZWE3OWYxIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzE1MTU5MDY3LCJleHAiOjE3MTUxNzcwNjd9.EnPnLSG_Q3VDwEURqV3wEWe5Wl3aezjJCBZ4r_vnUyA\",\"profile_pic\":\"https://app.websitetestingbox.com/h2o-api/uploads/profile_pictures/1714985853333-37259268-662f6de52fdad9c147ea79f1.png\"},\"profile\":{\"id\":\"662f6de52fdad9c147ea79f1\",\"name\":\"levi prescott\",\"email\":\"levi.prescott@yopmail.com\",\"profile_pic\":\"https://app.websitetestingbox.com/h2o-api/uploads/profile_pictures/1714985853333-37259268-662f6de52fdad9c147ea79f1.png\",\"phone_number\":\"9876543210\",\"dob\":\"2001-01-14T00:00:00.000Z\",\"ethnicity\":\"asian\",\"height\":25,\"weight\":25,\"gender\":\"male\",\"health_condition\":\"Good\"}}","_persist":"{\"version\":-1,\"rehydrated\":true}"'
  const initialValues={
    email: "",
    password: ""
  }
  const navigate = useNavigate();
  const {errors,
    values, 
    handleBlur, 
    handleChange, 
    handleSubmit,
    touched,
    resetForm} 
    = useFormik({
   initialValues: initialValues,
   validationSchema: customLoginValidations,
   onSubmit:async(values)=>{

      try {
        // const formData = new FormData();
        const formData = {
          email: values?.email,
          password: values?.password,
        };

        const response = await axios.post(
          `http://localhost:5000/api/user/login`,
          formData,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        console.log("response --> ", response);
        const cookieHeaders = response.headers['Set-Cookie']
        console.log("cookie-->", cookieHeaders);
        if (response.data.status == true) {
          openNotification(response.data.message, "success");
          navigate("/");
          localStorage.setItem("user", userData)
          localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoibGV2aS5wcmVzY290dEB5b3BtYWlsLmNvbSIsImlkIjoiNjYyZjZkZTUyZmRhZDljMTQ3ZWE3OWYxIiwicm9sZSI6InVzZXIifSwiaWF0IjoxNzE1MTU5MDY3LCJleHAiOjE3MTUxNzcwNjd9.EnPnLSG_Q3VDwEURqV3wEWe5Wl3aezjJCBZ4r_vnUyA")
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
   }
 })

  return (
    <>
    <CustomSignupLoginHeader />
    {contextHolder}

    <form onSubmit={handleSubmit} className="flex flex-col mt-[-5%] bg-white w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg">
      <div className="text-center font-bold text-xl text-zinc-500">Login</div>
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      <CustomInput 
        errors={errors.email}
        touched={touched.email}
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type='text' 
        placeholder='Enter the email'
        label='Email:'
        name='email'
        />
      <CustomInput 
      errors={errors.password}
      touched={touched.password}
      value={values.password}
      onChange={handleChange}
      onBlur={handleBlur}
      type='password' 
      placeholder='Enter the password' 
      label='Password:' 
      name='password'/>

      <CustomButton className="p-[1.5%] shadow-xl my-2 rounded-lg text-center bg-green-400 text-white text-lg font-semibold w-[100%] mx-auto" text="Login"/>
      
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      
      <Link className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto" to="/signup">New User, Click here!</Link>
    
    </form>
    </>
  )
}

export default Login
