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
import WithoutAuth from '../routerProtector/WithoutAuth'



const Login = () => {
  const { openNotification, contextHolder } = notificationProvider();

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
            withCredentials: true
          }
        );

        console.log("response -->", response);

        if (response.data.status == true) {
          openNotification(response.data.message, "success");
          navigate("/");
          localStorage.setItem("user", JSON.stringify(response.data.data));
          resetForm();
          return;
        }
        if (response.data.status == false) {
          console.log("response -->", response);

          openNotification(response.data.message, "error");
          resetForm();
          return;
        }
      } catch (error) {
        console.log("Error in signup -->", error);
        openNotification(error.response.data.message || error.message, "error");
        resetForm();
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
      
      <Link className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto" to="/signup" >New User, Click here!</Link>
    
    </form>
    </>
  )
}

export default WithoutAuth(Login)
