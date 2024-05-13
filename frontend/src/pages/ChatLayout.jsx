import React from 'react'
import HomePage from '../components/HomePage'
import WithAuth from '../routerProtector/WithAuth'

const ChatLayout = () => {
  return (
        <HomePage/>

        // </HomePage>
  )
}

export default WithAuth(ChatLayout)
