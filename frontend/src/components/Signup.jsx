import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/user/signup",
        { username, email, password },
        { withCredentials: true }
      );

      toast.success("Signup successful! Please log in.");
      console.log(response.data);
      navigate("/login");
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="my-10 bg-gray-100 max-w-md mx-auto rounded-lg shadow-lg p-6">
      <h1 className="text-2xl font-semibold text-center mb-4">Signup</h1>
      <form onSubmit={handleSignup} className="space-y-4">
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none"
        />
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
          placeholder="Password (min 6 chars)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded-md focus:outline-none"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-800 duration-300"
        >
          Signup
        </button>
      </form>
    </div>
  );
}

export default Signup;
