import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const InstructorProtectedRoute = ({ children }) => {
  const {user,isAuthenticated} = useSelector((state) => state.auth);
  if (!user) return <Navigate to="/" />; 
  // if (user && user?.role !== "Instructor") return <Navigate to="/notFound" />; 
  return children;
};

export default InstructorProtectedRoute;
