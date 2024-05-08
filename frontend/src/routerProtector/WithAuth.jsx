import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const WithAuth = ({ Component }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

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
