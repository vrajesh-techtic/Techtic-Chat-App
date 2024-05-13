import React from "react";
import Cookies from "js-cookie";

const WithoutAuth = (Component) => {
  const Auth = (props) => {
    const token = Cookies.get("access_token") || null;
    if (token) {
      window.location.href = "/";
    } else {
      return <Component {...props} />;
    }
  };
  return Auth;
};

export default WithoutAuth;
