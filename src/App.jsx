import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import MainRouter from './MainRouter'; // Fixed: changed '../' to './' because it's right next to App.jsx!

export default function App() {
  return (
    <BrowserRouter>
      <MainRouter />
    </BrowserRouter>
  );
}