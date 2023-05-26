import React, { useState } from 'react';
import '../../styles/signin.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom';
import signInImage from '../../assets/singin.png';
import axios from 'axios';

interface singIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const [signInData, setSignInData] = useState<singIn>({
    email: '',
    password: '',
  });
  const [reRoute, setReRoute] = useState<React.SetStateAction<boolean>>(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignInData((prevData) => ({ ...prevData, [name]: value }));
  };

  const navigate = useNavigate();
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { email, password } = signInData;
    console.log(email, password);
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
      toast.error('please enter email field');
    }
    if (!email.match(regex)) {
      toast.error('please provide a valid email address');
    }
    if (password === '') {
      toast.error('please enter password field');
    }
    try {
      const response = await axios.post(
        'https://full-stack-task-app.vercel.app/api/v1/auth/login',
        signInData
      );
      console.log(response);
      if (response.status === 200) {
        console.log('success');
        localStorage.setItem('userToken', response.data.token);
        localStorage.setItem('user', response.data.user);
        toast.success('signed in successfully', {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
        setTimeout(() => navigate('/dashboard'), 2000);
      }
    } catch (error: any) {
      if (error.response.status === 401) {
        console.log('no success');
        toast.error(error.response.data.msg, {
          position: 'top-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'colored',
        });
      }
    }
  };

  return (
    <div className="signInPage">
      <ToastContainer />
      <div className="innerContainer">
        <img
          src={signInImage}
          alt="sign up illustration"
          className="signUpImage"
        />
        <form className="inputForm" onSubmit={handleSubmit} method="post">
          <input
            className="singInInput"
            type="text"
            name="email"
            id="email"
            placeholder="Enter email here..."
            onChange={handleChange}
          />
          <input
            className="singInInput"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password here..."
            onChange={handleChange}
          />
          <button className="submitBtn" type="submit">
            Sign In
          </button>
        </form>
        <p className="signIn">
          Don't have an account? <Link to={'/signup'}>singup in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
