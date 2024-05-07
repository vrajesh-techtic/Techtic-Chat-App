import { Divider } from 'antd'
import React from 'react'
import CustomInput from '../components/CustomInput'
import { Link } from 'react-router-dom'
import CustomButton from '../components/CustomButton'

const Login = () => {
  return (
    
    <div className="flex flex-col w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg">
      <div className="text-center font-bold text-xl text-zinc-500">Login</div>
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      <CustomInput type='text' placeholder='Enter the email' label='Email:' name='email'/>
      <CustomInput type='password' placeholder='Enter the password' label='Password:' name='password'/>
      <CustomButton className="p-[1.5%] shadow-xl my-2 rounded-lg text-center bg-green-400 text-white text-lg font-semibold w-[100%] mx-auto" text="Login"/>
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      <Link className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto" to="/signup">New User, Click here!</Link>
    </div>
  )
}

export default Login
