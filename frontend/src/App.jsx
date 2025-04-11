import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Profile from "./pages/profile";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore";
import { useEffect } from "react";
import { Loader } from "lucide-react";
import { Toaster } from "react-hot-toast";

function App() {
  const { authUser, checkAuth, checkingAuth } = useAuthStore();
  const navigate = useNavigate();

  // Ellenőrizzük, hogy a felhasználó be van-e jelentkezve, és navigálunk a /home-ra
  useEffect(() => {
    if (authUser) {
      navigate("/home");
    }
  }, [authUser, navigate]);

  // Ellenőrizzük a hitelesítést az alkalmazás betöltésekor
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Betöltési animáció
  if (checkingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/home" element={authUser ? <Home /> : <Navigate to="/login" />} />
        <Route path="/signup" element={!authUser ? <SignUp /> : <Navigate to="/home" />} />
        <Route path="/login" element={!authUser ? <Login /> : <Navigate to="/home" />} />
        <Route path="/profile" element={authUser ? <Profile /> : <Navigate to="/login" />} />
      </Routes>

      <Toaster />
    </div>
  );
}

export default App;