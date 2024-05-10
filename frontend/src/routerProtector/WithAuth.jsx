import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const WithAuth = ({ Component }) => {

  const navigate = useNavigate();

  const token = Cookies.get('TokenId') || null;

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
    else{
        navigate("/")
    }
  }, []);
  return <div>{Component}</div>;
};

export default WithAuth;
