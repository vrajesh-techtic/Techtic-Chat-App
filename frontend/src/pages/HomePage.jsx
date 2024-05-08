import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
    localStorage.clear();
  };
  return (
    <div>
      Home Page
      <div onClick={() => handleClick()}>Logout</div>
    </div>
  );
};

export default HomePage;
