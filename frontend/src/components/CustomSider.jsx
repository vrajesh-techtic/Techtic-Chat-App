import React from 'react'
import { Layout } from 'antd';
const { Menu, Sider } = Layout;

const CustomSider = () => {
  const items=["user 1", "user 2", "user 3", "user 4"];
  return (
    <>

       <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <div className="demo-logo-vertical" />
        
        {/* <Menu theme="dark" mode="inline" defaultSelectedKeys={['4']} items={items} /> */}
      </Sider>

    </>
  )
}

export default CustomSider
