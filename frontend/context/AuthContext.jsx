import { useMutation } from "@tanstack/react-query";
import React, { createContext, useState, useEffect, useContext } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser, signupUser } from "../services/authentication";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Load user from localStorage on mount
    const currentUser = localStorage.getItem("user");
    setUser(currentUser ? JSON.parse(currentUser) : null);
    setLoading(false);

    // Event listener for updates
    const handleUpdate = () => {
      const storedUser = localStorage.getItem("user");
      setUser(storedUser ? JSON.parse(storedUser) : null);
    };
    window.addEventListener("userUpdated", handleUpdate);

    // Clean up event listener on unmount
    return () => {
      window.removeEventListener("userUpdated", handleUpdate);
    };
  }, []);

  function logout() {
    localStorage.removeItem("user");
    setUser(null);
  }

  function useSignup() {
    const { mutateAsync: signup, isPending: isSigningUp } = useMutation({
      mutationFn: (data) => signupUser(data),
      onSuccess: (userData) => {
        // console.log(userData);
        localStorage.setItem("jwt", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        setUser(userData);
        navigate("/welcome");
      },
      onError: (error) => {
        toast.error(error);
      },
    });
    return { signup, isSigningUp };
  }

  function useLogin() {
    const { mutateAsync: login, isPending: isLoggingIn } = useMutation({
      mutationFn: (data) => loginUser(data),
      onSuccess: (userData) => {
        // console.log(userData);
        localStorage.setItem("jwt", userData.token);
        localStorage.setItem("user", JSON.stringify(userData.user));
        setUser(userData);
        navigate("/dashboard");
      },
      onError: (error) => {
        toast.error(error.message || error);
      },
    });

    return { login, isLoggingIn };
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        useSignup,
        useLogin,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
