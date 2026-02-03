import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (adminOnly && user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  return children;
}