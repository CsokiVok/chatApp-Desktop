import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Profile from "./pages/profile";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";
import {Toaster} from "react-hot-toast";


function App() {
  const { authUser, checkAuth, checkingAuth, onlineUsers } = useAuthStore()
console.log(onlineUsers);


  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  console.log({ authUser });

  //töltés animáció
  if(checkingAuth && !authUser){
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin"/>
      </div>
    )
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/home"/>} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home"/>} />
        <Route path="/setting" element={authUser ? <Settings /> : <Navigate to="/login"/>} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login"/>} />
      </Routes>

      <Toaster/>
    </div>
  )
}

export default App