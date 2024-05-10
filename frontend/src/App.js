import React from "react";
import { Route, Routes } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import WithAuth from "./routerProtector/WithAuth";
import ChatLayout from "./pages/ChatLayout";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WithAuth Component={<ChatLayout />} />} />
        {/* <Route path="/" element={<HomePage />} /> */}
        <Route path="/login" element={<WithAuth Component={<Login />} />} />
        <Route path="/signup" element={<WithAuth Component={<Signup />} />} />
      </Routes>
    </>
  );
}

export default App;
