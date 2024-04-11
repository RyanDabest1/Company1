import React from "react";
import { useState } from "react";
import {signUp} from '../functions/funct'
import { handleInputSignUp } from "../functions/funct";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import { useEffect } from "react";
const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [successful, setSuccessful] = useState(false);
  const [fail, setFail] = useState(false);


  async function handleClick(e){
    e.preventDefault();
    await handleInputSignUp(e, signUp, setSuccessful, setFail, setLoading, navigate)
  }

  useEffect(() => {
    if(localStorage.getItem("isLoggedIn")){
      navigate("/")
    }
  }, [])

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 dark:bg-gray-900">
      <div className="w-full max-w-md bg-white  shadow rounded-lg overflow-hidden">
        <div className="flex justify-center items-center bg-gray-50  py-4 px-6">
          <KeyIcon className="h-8 w-8 text-gray-500 " />
          <h2 className="ml-3 text-2xl font-semibold text-gray-700 ">Register</h2>
        </div>
        <form onSubmit={handleClick}>
        <div className="py-5 px-10">
        <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="email"
              placeholder="Email"
              type="text"
              required
            />
          </div>
          <div className="mt-4">
          <label className="block text-gray-700 text-sm font-bold mb-2 " htmlFor="username">
              Username
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="username"
              placeholder="Username"
              type="text"
              required
            />
          </div>
          <div className="mt-4">
            <div className="flex justify-between items-end">
              <label className="block text-gray-600 " htmlFor="password">
                Password
              </label>
            
            </div>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline "
              id="password"
              placeholder="******************"
              type="password"
              required
            />          
            </div>
          <div className="mt-6">
            <button type="submit" className="w-full py-2 px-4 text-center bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 rounded-md text-white text-sm hover:bg-purple-500 focus:outline-none focus:bg-purple-500">
              Register
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center py-4 text-center bg-gray-100 ">
          <span className="text-sm text-gray-600 ">Already registered? </span>
          <a className="text-sm text-blue-500 underline  ml-2" href="Login">
            Login
          </a>
        </div>
        </form>
      </div>
      {loading && (
      <Alert variant="filled" severity="info" className="absolute top-5">
        Registering..
      </Alert>
    )}
    {successful && (
      <Alert variant="filled" severity="success" className="absolute top-5">
        Register successful.
      </Alert>
    )}
    {fail && (
      <Alert variant="filled" severity="error" className="absolute top-5">
        Register failed
      </Alert>
    )}
    </div>
  )
}

function KeyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="7.5" cy="15.5" r="5.5" />
      <path d="m21 2-9.6 9.6" />
      <path d="m15.5 7.5 3 3L22 7l-3-3" />
    </svg>
  )
}

export default Login;