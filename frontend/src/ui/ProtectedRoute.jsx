// ProtectedRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import LoadingSpinner from "./LoadingSpinner";

const ProtectedRoute = ({ element: Component, ...rest }) => {
  const { user, loading } = useAuth();

  if (loading) return <LoadingSpinner />;

  return user ? Component : <Navigate to="/" />;
};
export default ProtectedRoute;
