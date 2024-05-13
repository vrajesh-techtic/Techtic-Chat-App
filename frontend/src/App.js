import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WithAuth from "./routerProtector/WithAuth";
import ChatLayout from "./pages/ChatLayout";
import EditUserProfile from "./pages/EditUserProfile";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<ChatLayout />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<Login />}  />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit-user-profile" element={<EditUserProfile />} />
      </Routes>
    </>
  );
}

export default App;
