import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import {
  FaFilm,
  FaEye,
  FaEyeSlash,
  FaGoogle,
  FaGithub
} from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [visible, setVisible] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    setVisible(true);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError('');

    const result = await login(email, password);

    if (result.success) {
      navigate('/home');
    } else {
      setError(result.message);
    }
  };

  return (
    <div className="min-h-screen flex bg-black overflow-hidden">

      {/* LEFT SIDE */}
      <div
        className="hidden lg:flex w-1/2 relative bg-cover bg-center"
        style={{
          backgroundImage:
            "url('/src/assets/wallpaper.jpg')"
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent"></div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col justify-center px-16 text-white">

          <div className="flex items-center gap-3 mb-6">
            <FaFilm className="text-purple-400 text-5xl" />
            <h1 className="text-6xl font-extrabold">
              CineGrid
            </h1>
          </div>

          {/* <h2 className="text-6xl font-bold leading-tight mb-6">
            Discover
            <span className="block text-purple-400">
              Amazing Movies
            </span>
          </h2> */}

          {/* <p className="text-xl text-gray-300 max-w-xl mb-10">
            Browse trending films, create watchlists,
            rate your favorites, and get personalized
            recommendations powered by CineGrid.
          </p> */}

          {/* Stats */}
          {/* <div className="flex gap-5">

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
              <h3 className="text-3xl font-bold">10K+</h3>
              <p className="text-gray-300 text-sm">
                Movies
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
              <h3 className="text-3xl font-bold">50K+</h3>
              <p className="text-gray-300 text-sm">
                Users
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-2xl px-6 py-4">
              <h3 className="text-3xl font-bold">4.9★</h3>
              <p className="text-gray-300 text-sm">
                Rating
              </p>
            </div>

          </div> */}

        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full lg:w-1/2 flex justify-center items-center bg-gradient-to-br from-[#0f0f18] via-[#151528] to-black px-6">

        <div
          className={`w-full max-w-md transition-all duration-1000 ${
            visible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-10'
          }`}
        >

          {/* Login Card */}
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-[0_0_50px_rgba(139,92,246,0.25)]">

            {/* Mobile Logo */}
            <div className="lg:hidden flex justify-center items-center gap-2 mb-6">
              <FaFilm className="text-purple-400 text-3xl" />
              <h1 className="text-3xl font-bold text-white">
                CineGrid
              </h1>
            </div>

            <div className="text-center mb-8">

              <h2 className="text-4xl font-bold text-white mb-2">
                Welcome Back
              </h2>

              <p className="text-gray-400">
                Login to continue exploring movies
              </p>

            </div>

            {error && (
              <div className="bg-red-500/20 border border-red-500/40 text-red-300 p-3 rounded-xl mb-5 text-sm">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Email */}
              <div>
                <label className="block text-gray-300 mb-2 text-sm">
                  Email Address
                </label>

                <input
                  type="email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="john@example.com"
                  required
                  className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                />
              </div>

              {/* Password */}
              <div>

                <label className="block text-gray-300 mb-2 text-sm">
                  Password
                </label>

                <div className="relative">

                  <input
                    type={
                      showPassword
                        ? 'text'
                        : 'password'
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="••••••••"
                    required
                    className="w-full bg-black/40 border border-gray-700 rounded-xl px-4 py-3 pr-12 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? (
                      <FaEyeSlash />
                    ) : (
                      <FaEye />
                    )}
                  </button>

                </div>

              </div>

              {/* Remember & Forgot */}
              {/* <div className="flex justify-between items-center text-sm">

                <label className="flex items-center gap-2 text-gray-400 cursor-pointer">
                  <input
                    type="checkbox"
                    className="accent-purple-500"
                  />
                  Remember me
                </label>

                <Link
                  to="/forgot-password"
                  className="text-purple-400 hover:text-purple-300"
                >
                  Forgot Password?
                </Link>

              </div> */}

              {/* Login Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold hover:scale-[1.02] transition-all duration-300 shadow-lg"
              >
                Login
              </button>

            </form>

            {/* Divider */}
            {/* <div className="flex items-center my-6">

              <div className="flex-1 h-px bg-gray-700"></div>

              <span className="px-4 text-gray-500 text-sm">
                OR CONTINUE WITH
              </span>

              <div className="flex-1 h-px bg-gray-700"></div>

            </div> */}

            {/* Social Buttons */}
            {/* <div className="grid grid-cols-2 gap-3">

              <button
                type="button"
                className="flex justify-center items-center gap-2 bg-white/5 border border-gray-700 rounded-xl py-3 text-gray-300 hover:bg-white/10 transition"
              >
                <FaGoogle />
                Google
              </button>

              <button
                type="button"
                className="flex justify-center items-center gap-2 bg-white/5 border border-gray-700 rounded-xl py-3 text-gray-300 hover:bg-white/10 transition"
              >
                <FaGithub />
                GitHub
              </button>

            </div> */}

            {/* Register */}
            <p className="mt-8 text-center text-gray-400">

              Don't have an account?

              <Link
                to="/register"
                className="ml-2 text-purple-400 hover:text-purple-300 font-semibold"
              >
                Create Account
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Login;