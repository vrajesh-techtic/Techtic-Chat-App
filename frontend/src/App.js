import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import HomePage from './pages/HomePage';
import WithAuth from './routerProtector/WithAuth';

function App() {
  return (
    <>
      <Routes>

        <Route path="/" element={<WithAuth Component={<HomePage />} />} />
        <Route path="/login" element={<WithAuth Component={<Login />} />} />
        <Route path="/signup" element={<WithAuth Component={<Signup />} />} />
      </Routes>
    </>
  );
}

export default App;
