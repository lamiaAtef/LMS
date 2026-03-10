
import  { useEffect } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  //  const user = useSelector((state) => state.auth.user);
  const {user,isAuthenticated} = useSelector((state) => state.auth);
  const navigate = useNavigate()
    useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  return (
    <>
     home
    </>
  )
}