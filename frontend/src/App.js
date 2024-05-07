import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WithoutAuth from './routerProtector/WithoutAuth';
import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<WithoutAuth Component={<Login />} />} />
        <Route path="/signup" element={<WithoutAuth Component={<Signup />} />} />
      </Routes>
    </>
  );
}

export default App;
