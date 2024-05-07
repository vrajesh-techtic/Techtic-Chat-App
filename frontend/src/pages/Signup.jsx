import React from 'react'
import CustomInput from '../components/CustomInput'
import { Divider } from 'antd';
import CustomButton from '../components/CustomButton';
import { Link } from 'react-router-dom';


const Signup = () => {
  return (
    
    <div className="flex flex-col w-[35%] shadow-xl p-[2%] mx-auto my-[4%] rounded-lg">
      <div className="text-center font-bold text-xl text-zinc-500">Signup</div>
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      <CustomInput type='text' placeholder='Enter the email' label='Email:' name='email'/>
      <CustomInput type='text' placeholder='Enter your full name' label='Name:' name='name'/>
      <CustomInput type='text' placeholder='Enter username' label='Username:' name='username'/>
      <CustomInput type='password' placeholder='Enter the password' label='Password:' name='password'/>
      <CustomInput type='number' dropdown_name='country_code' placeholder='Enter the phone number' label='Phone Number:' name='phonenum'/>
      <CustomInput type='file' label='Upload your profile picture' name='image'/>
      <CustomInput type='dropdown' label='Select your gender:' dropdown_name='gender' selectOptionArray={['Male','Female','Others']} default_select_value="Select the gender"/>
      <CustomInput type='date' label='Select your Date of Birth:' name='dob' />

      <CustomButton className="p-[1.5%] shadow-xl my-2 rounded-lg text-center bg-green-400 text-white text-lg font-semibold w-[100%] mx-auto" text="Submit"/>
      <Divider style={{border: "1px solid #e5e7eb"}} className='my-2'/>
      <Link className="p-[1.5%] my-2 rounded-lg text-center shadow-xl bg-red-500 text-white text-lg font-semibold w-[100%] mx-auto" to="/">Already have an account, Click here!</Link>
    </div>
  )
}

export default Signup
