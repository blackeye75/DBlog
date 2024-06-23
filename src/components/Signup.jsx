import React, { useState } from "react";
import authService from "../appwrite/auth";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../store/authSlice";
import { Button, Input, Logo } from "./index";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import eye from "../../src/assets/eye.png";

function Signup() {
  const navigate = useNavigate();
  const [error, seterror] = useState("");
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [type, setType] = useState("password")

  const toggelHandel=()=>{
    if(type==="password"){
      setType("text");
    }else{
      setType("password")
    }
  }

  const create = async (data) => {
    seterror("");
    try {
      const userdata = await authService.createAccount(data);
      if (userdata) {
        await authService.getCurrentUser();
        if (userdata) dispatch(login(userdata));
        navigate("/");
      }
    } catch (error) {
      seterror(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div
        className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}
      >
        <div className="mb-2 flex justify-center">
          <span className="inline-block w-full max-w-[100px]">
            <Logo width="100%" />
          </span>
        </div>
        <h2 className="text-center text-2xl font-bold leading-tight">
          Sign up to create account
        </h2>
        <p className="mt-2 text-center text-base text-black/60">
          Already have an account?&nbsp;
          <Link
            to="/login"
            className="font-medium text-primary transition-all duration-200 hover:underline"
          >
            Sign In
          </Link>
        </p>
        {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

        <form onSubmit={handleSubmit(create)}>
          <div className="space-y-5">
            <Input
              label="Full Name"
              placeholder="Enter Your Full Name"
              {...register("name", {
                required: true,
              })}
            />
            <Input
              label="Email: "
              placeholder="Enter Your Email"
              type="email"
              {...register("email", {
                required: true,
                validate: {
                  matchPatern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Email address must be a valid",
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
              <div onClick={toggelHandel} >
                <img className="w-[3vw] h-[3vw]" src={eye} />
              </div>
            </div>
            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
