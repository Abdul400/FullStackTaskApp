import React, { useState } from 'react';
import '../../styles/signup.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import signUpImage from '../../assets/singup.png';
import { calcLength } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface myForm {
  username: string;
  email: string;
  password: string;
  confirm: string;
}

const SignUp = () => {
  let [signUpData, setSignUpData] = useState<myForm>({
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const navigate = useNavigate();
  //submit document
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const { username, email, password, confirm } = signUpData;
    console.log(username, email, password, confirm);
    console.log(confirm);
    if (username === '') {
      toast.error('please enter name field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (email === '') {
      toast.error('please enter email field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (password === '') {
      toast.error('please enter password field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (confirm === '') {
      toast.error('please enter confirm password field', {
        position: 'top-right',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: 'colored',
      });
    } else if (password !== confirm) {
      toast.error('passwords must be the same', {
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
    // interface ApiResponse {
    //   token: string;
    //   username: string;
    //   success: boolean;
    // }
    else {
      try {
        const response = await axios.post(
          'https://full-stack-task-app.vercel.app/api/v1/auth/signup',
          signUpData
        );
        if (response.data.success) {
          //set token in local storage
          localStorage.setItem('userToken', response.data.token);
          localStorage.setItem('user', response.data.user);
          toast.success('signed up successfully!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
          });
          setTimeout(() => {
            navigate('/dashboard');
          }, 2000);
        }
      } catch (error: any) {
        let {
          response: {
            data: { msg: errorMessage },
          },
        } = error;
        toast.error(errorMessage, {
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
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setSignUpData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="signUp">
      <ToastContainer />
      <div className="innerContainer">
        <img
          src={signUpImage}
          alt="sign up illustration"
          className="signUpImage"
        />
        <form className="inputForm" onSubmit={handleSubmit} method="post">
          <input
            className="singUpInput"
            type="text"
            name="username"
            id="username"
            placeholder="Enter username here..."
            onChange={handleChange}
          />

          <input
            className="singUpInput"
            type="text"
            name="email"
            id="email"
            placeholder="Enter email here..."
            onChange={handleChange}
          />

          <input
            className="singUpInput"
            type="password"
            name="password"
            id="password"
            placeholder="Enter password here..."
            onChange={handleChange}
          />

          <input
            className="singUpInput"
            type="password"
            name="confirm"
            id="confirm"
            placeholder="Enter password again..."
            onChange={handleChange}
          />
          <button className="submitBtn" type="submit">
            Sign Up
          </button>
        </form>
        <p className="signIn">
          Already have an account? <Link to={'/signin'}>sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
