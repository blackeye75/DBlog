import { useDispatch } from "react-redux";
import "./App.css";
import { useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "../src/store/authSlice";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap bg-gray-400">
      <div className="w-full block" >
        <Headers/>
      </div>
    </div>
  ) : null;
}

export default App;
