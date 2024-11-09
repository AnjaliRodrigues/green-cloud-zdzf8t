// src/Auth.js

import React, { useState } from "react";
import { auth } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";

const Auth = ({ onLogin, onLogout }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(true);

  const handleAuth = async () => {
    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        await createUserWithEmailAndPassword(auth, email, password);
      }
      onLogin(auth.currentUser);
    } catch (error) {
      console.error("Error with authentication: ", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onLogout();
  };

  return (
    <div className="flex flex-col items-center p-4 bg-white shadow-lg rounded">
      <h2 className="text-2xl font-bold mb-4">
        {isLogin ? "Login" : "Sign Up"}
      </h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="mb-2 p-2 border border-gray-300 rounded w-full"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="mb-4 p-2 border border-gray-300 rounded w-full"
      />
      <button
        onClick={handleAuth}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-2 w-full"
      >
        {isLogin ? "Login" : "Sign Up"}
      </button>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white px-4 py-2 rounded w-full"
      >
        Logout
      </button>
      <button
        onClick={() => setIsLogin(!isLogin)}
        className="text-blue-500 mt-2"
      >
        {isLogin ? "Create an account" : "Already have an account? Login"}
      </button>
    </div>
  );
};

export default Auth;
