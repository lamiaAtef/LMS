import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import type { ReactNode } from "react";
import type { RootState } from "../redux/store";


interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute :  React.FC<ProtectedRouteProps>= ({ children}) => {
  const { user } = useSelector((state: RootState) => state.auth);

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;