import React from "react";
import { useNavigate } from "react-router-dom";
import CustomHeader from "../components/CustomHeader";
import CustomSider from "../components/CustomSider";
const HomePage = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/login");
    localStorage.clear();
  };

  return (
    <>
      <CustomHeader />
      <CustomSider/>
      {/* <div onClick={() => handleClick()}>Logout</div> */}
    </>
  );
};

export default HomePage;
