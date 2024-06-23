import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import authService from "../appwrite/auth";
import { useForm } from "react-hook-form";
import eye from "../../src/assets/eye.png";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, seterror] = useState("");

  const [type, setType] = useState("password");

  const toggelHandel = () => {
    if (type === "password") {
      setType("text");
    } else {
      setType("password");
    }
  };

  const login = async (data) => {
    seterror("");
    try {
      const session = await authService.login(data);
      if (session) {
        const userData = await authService.getCurrentUser();
        if (userData) dispatch(authLogin(userData));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center w-full p-6">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Signin To your Account!
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Don&apos;t have any account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign Up
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
        <form onSubmit={handleSubmit(login)} className="mt-8">
          <div className="space-y-5">
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid address",
                },
              })}
            />
            <div className="flex items-end">
              <Input
                label="Password"
                type={type}
                placeholder="Enter your Password"
                {...register("password", {
                  required: true,
                })}
              />
              <div onClick={toggelHandel}>
                <img className="w-[3vw] h-[3vw]" src={eye} />
              </div>
            </div>
          </div>
            <Button type="submit" className="w-full mt-3">
              Sign In
            </Button>
        </form>
      </div>
    </div>
  );
}

export default Login;

// import React, {useState} from 'react'
// import {Link, useNavigate} from 'react-router-dom'
// import { login as authLogin } from '../store/authSlice'
// import {Button, Input, Logo} from "./index"
// import {useDispatch} from "react-redux"
// import authService from "../appwrite/auth"
// import {useForm} from "react-hook-form"

// function Login() {
//     const navigate = useNavigate()
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()
//     const [error, setError] = useState("")

//     const login = async(data) => {
//         setError("")
//         try {
//             const session = await authService.login(data)
//             if (session) {
//                 const userData = await authService.getCurrentUser()
//                 if(userData) dispatch(authLogin(userData));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div
//     className='flex items-center justify-center w-full'
//     >
//         <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//         <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//         </div>
//         <h2 className="text-center text-2xl font-bold leading-tight">Sign in to your account</h2>
//         <p className="mt-2 text-center text-base text-black/60">
//                     Don&apos;t have any account?&nbsp;
//                     <Link
//                         to="/signup"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign Up
//                     </Link>
//         </p>
//         {error && <p className="text-red-600 mt-8 text-center">{error}</p>}
//         <form onSubmit={handleSubmit(login)} className='mt-8'>
//             <div className='space-y-5'>
//                 <Input
//                 label="Email: "
//                 placeholder="Enter your email"
//                 type="email"
//                 {...register("email", {
//                     required: true,
//                     validate: {
//                         matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                         "Email address must be a valid address",
//                     }
//                 })}
//                 />
//                 <Input
//                 label="Password: "
//                 type="password"
//                 placeholder="Enter your password"
//                 {...register("password", {
//                     required: true,
//                 })}
//                 />
//                 <Button
//                 type="submit"
//                 className="w-full"
//                 >Sign in</Button>
//             </div>
//         </form>
//         </div>
//     </div>
//   )
// }

// export default Login
