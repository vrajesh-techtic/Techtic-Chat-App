import React from 'react'
import { Layout } from 'antd';
const { Header } = Layout;

const CustomHeader = () => {
    return (
        <div>

        
        {/* <Layout> */}
          <Header
            style={{
              display: 'flex',
              
            }}
            className='bg-green-500 text-white items-center justify-between'
          >
           <div className='font-bold text-2xl flex flex-col'>
            Techtic Chat App
           </div>
           
           <div className='font-bold text-xl flex flex-col'>
            Profile
           </div>
          </Header>
          </div>
      );
    
}

export default CustomHeader
