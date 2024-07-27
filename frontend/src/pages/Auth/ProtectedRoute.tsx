import { Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../redux/hooks";
import * as React from "react";

export default function ProtectedRoute() {
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
