import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Lock, Mail } from 'lucide-react';
import { Link } from 'react-router-dom';


function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { login, isLoggingIn } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(formData);
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("A felhasználó bannolva");
      } else {
        toast.error(error.response?.data?.message || "Hiba történt a bejelentkezés során");
      }
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200">
      <div className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 shadow-lg rounded-lg p-8">
          {/* Email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Email</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Mail className="size-5 text-gray-400 z-10" />
              </div>
              <input
                type="email"
                className="input input-bordered w-full pl-10"
                placeholder="pelda@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Jelszó</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <Lock className="size-5 text-gray-400 z-10" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                className="input input-bordered w-full pl-10"
                placeholder="••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              />
            </div>
          </div>

          {/* Login Link */}
          <div className="text-center mt-4">
            <p>
              <Link to="/signup" className="link text-blue-500 hover:text-blue-700">
                Regisztráció
              </Link>
            </p>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Bejelentkezés
          </button>
        </form>
      </div>
    </div>
  );
}


export default Login