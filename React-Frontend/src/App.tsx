import react, { useState } from 'react';
import './styles/App.css';
import illustration from './assets/illustration.png';
import { useNavigate, Router } from 'react-router-dom';

function App() {
  const navigate = useNavigate();
  return (
    <div className="App">
      <div className="innerContainer">
        <div className="header-container">
          <h1 className="t todo">t</h1>
          <h1 className="o1 todo">o</h1>
          <h1 className="d todo">d</h1>
          <h1 className="o2 todo">o</h1>+
        </div>
        <p className="welcomeText">
          Welcome to our to-do app! With this app, you can easily keep track of
          your daily tasks and stay organized. Whether you're at home, at work,
          or on the go, this app will help you stay on top of your to-do list.
        </p>
        <button className="start" onClick={() => navigate('/signup')}>
          Get Started
        </button>
        <img
          className="first-illustration"
          src={illustration}
          alt="illustration"
        />
      </div>
    </div>
  );
}

export default App;
