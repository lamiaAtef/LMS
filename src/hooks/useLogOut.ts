import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import swal from 'sweetalert2';
import { logout } from '../redux/authSlice';


export default function useLogout() {
    const dispatch=useDispatch();
    const navigate = useNavigate();
    console.log("fired logout")

    const logoutUser = () => {
        swal.fire({
          title: 'Are you sure?',
          text: 'You will be logged out of your account.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#ef9b28',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, logout',
          cancelButtonText: 'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {

          dispatch(logout());

            toast.success("You have been successfully logged out!", {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                onClose: ()=> navigate('/')
              });

          }
        });
    };

    return {logoutUser};
}
