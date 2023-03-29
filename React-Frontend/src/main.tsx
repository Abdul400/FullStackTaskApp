import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignUp from './components/auth/SignUp';
import SignIn from './components/auth/SignIn';
import NotFound from './components/NotFound/NotFound';
import MainDashboard from './components/Dashboard/MainDashboard';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}></Route>
        <Route path="signin" element={<SignIn />} />
        <Route path="signup" element={<SignUp />} />
        <Route path="dashboard" element={<MainDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
