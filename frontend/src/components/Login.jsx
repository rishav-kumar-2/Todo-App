import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true }
      );

      toast.success("Login successful");
      localStorage.setItem("jwt", response.data.token); // optional
      navigate("/");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="my-10 bg-gray-100 max-w-md mx-auto rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Login</h1>
      <form onSubmit={handleLogin} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-800 duration-300"
        >
          Login
        </button>
      </form>

      {/* ✅ Signup navigation button */}
      <p className="text-center mt-4 text-gray-700">
        Don’t have an account?{" "}
        <Link
          to="/signup"
          className="text-blue-600 hover:underline font-medium"
        >
          Signup
        </Link>
      </p>
    </div>
  );
}

export default Login;
