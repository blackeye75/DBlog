import { useDispatch, useSelector } from "react-redux";
import "./App.css";
import { useState,useEffect } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "../src/store/authSlice";
import {Header,Footer} from "../src/components/index"
import { Outlet } from "react-router-dom";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  
  // useSelector((state)=>console.log(state))

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
          console.log(userData);
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap bg-gray-400">
      <div className="w-full block" >
        <Header/>
        <main>
          <Outlet/>
        </main>
        <Footer/>
      </div>
    </div>
  ) : null;
}

export default App;
