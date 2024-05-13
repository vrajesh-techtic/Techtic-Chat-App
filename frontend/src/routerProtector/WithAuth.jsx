import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const WithAuth = (Component) => {
  const Auth = (props)=>{
    const token = Cookies.get('access_token') || null;
    if(!token){
      window.location.href="/login"
    }
    else{
      return <Component {...props}/>
    }
    
  }
  return Auth;
};

export default WithAuth;
