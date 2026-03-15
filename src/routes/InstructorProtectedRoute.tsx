import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../redux/store"; 

interface InstructorProtectedRouteProps {
  children: ReactNode;
}

const InstructorProtectedRoute: React.FC<InstructorProtectedRouteProps> = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) return <Navigate to="/" />; 
  if (user && user.role !== "Instructor") return <Navigate to="/dashboard" />; 

  return <>{children}</>;
};

export default InstructorProtectedRoute;