import React from "react";
import { useNavigate } from "react-router-dom";
import CustomHeader from "./CustomHeader";
import CustomSider from "./CustomSider";

const HomePage = ({children}) => {
  const navigate = useNavigate();


  return (
    <>
      <CustomHeader />
      <CustomSider/>
      <div>

      {children}
      </div>
      {/* <div onClick={() => handleClick()}>Logout</div> */}
    </>
  );
};

export default HomePage;
