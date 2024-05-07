import { Divider } from 'antd'
import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'
import CustomButton from '../components/CustomButton'
import { useFormik } from 'formik'
import { customLoginValidations } from '../utils/loginSignupValidators'



const Login = () => {

  const initialValues={
    email: "",
    password: ""
  }

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
      alert(values);
      resetForm();
   }
 })

  return (
    
    <form onSubmit={handleSubmit} className="flex flex-col w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg">
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
  )
}

export default Login
