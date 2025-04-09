import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore';
import { Lock, Mail, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      return toast.error("Minden mezőt ki kell tölteni");
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      signup(formData);
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-base-200 items-center">
      <div className="w-full max-w-md p-6">
        <form onSubmit={handleSubmit} className="space-y-6 bg-base-100 shadow-lg rounded-lg p-8">
          {/* Full Name */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Full Name</span>
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center">
                <User className="size-5 text-gray-400 z-10" />
              </div>
              <input
                type="text"
                className="input input-bordered w-full pl-10"
                placeholder="Full Name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
          </div>

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
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          {/* Password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text font-medium">Password</span>
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

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-full">
            Fiók létrehozása
          </button>
        </form>

        {/* Login Link */}
        <div className="text-center mt-4">
          <p>
            <Link to="/login" className="link text-blue-500 hover:text-blue-700">
              Bejelentkezés
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
