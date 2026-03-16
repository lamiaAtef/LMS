import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash, FaKey, FaUserPlus, FaUserTie } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import  { Input } from '../../../../shared/components/ui/Input/Input.tsx';
import { Link, useNavigate } from 'react-router-dom';
import { GrStatusGood } from 'react-icons/gr';
import { useState } from 'react';
import { axiosInstance } from '../../../../config/httpClient';
import { AUTH_URLS } from '../../../../config/api.endPoint';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../../redux/authSlice';
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from '../../../../config/validation.ts';
import { ClipLoader} from "react-spinners";
import type { FailedResponse, LoginPayload, SuccessLoginResponse } from '../../type.ts';

export default function Login() {
   const {
    register,
    formState: { errors },
    handleSubmit,
    
  } = useForm<LoginPayload>();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const[loading,setLoading]=useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data:LoginPayload) =>{

    setLoading(true)
    try{
        let response = await axiosInstance.post<SuccessLoginResponse>(AUTH_URLS.LOGIN,data)
        localStorage.setItem("token",response.data.data.accessToken);
        dispatch(setCredentials({token: response.data.data.accessToken }));
        navigate("/dashboard")
        toast.success(response?.data?.message)


    }
    catch(error:any){
      const errResponse = error.response?.data as FailedResponse;
        toast.error(errResponse?.message || "Something went wrong")

    }
    finally{
    setLoading(false)

    }
  }

  return (
    <>
      <h1 className='text-[#C5D86D] text-xl font-bold'>
        Continue your learning journey with QuizWiz!
      </h1>
      {/* start sign in && sign up components */}
      <div className='flex gap-8 my-8 '>
        <button className='flex  flex-col items-center justify-center bg-[#333333] py-3 px-12 rounded-xl border-2 border-[#C5D86D] '>
          <FaUserTie size="40px" color=' #C5D86D' />
          <p >sign in</p>
        </button>
        <button
          className={`
            flex flex-col items-center justify-center
            cursor-pointer
            py-3 px-12
            rounded-xl border-2
            transform transition duration-300
            hover:scale-105
         
          `}
          onClick={() => navigate("/register")}
        >
          <FaUserPlus size="50px" />
          <p>sign Up</p>
        </button>

      </div>
      {/* end sign in and sign up component */}
      {/* start Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Registered email address"
        id="email"
        type="email"
        placeholder="Type your email"
        icon={<MdEmail size={18} />}
        error={errors.email?.message}
        {...register("email",EMAIL_VALIDATION)}
        
      />
           <Input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            icon={<FaKey className="h-5 w-5" />}
            endIcon={
              showPassword ? (
                <FaEyeSlash  className="h-5 w-5" />

              ) : (
                <FaEye className="h-5 w-5" />
              )
            }
            onEndIconClick={() => setShowPassword(!showPassword)}
            error={errors.password?.message}
            {...register("password",PASSWORD_VALIDATION)}
          />
        <div className='flex justify-between'>
         <button
              disabled={loading}
              type="submit"
              className={`
                text-black
                font-bold
                py-3 px-7
                rounded-xl
                flex items-center justify-center
                transform transition duration-300
                ${loading 
                  ? 'bg-gray-300 ' 
                  : 'bg-white hover:scale-105 cursor-pointer'}
              `}
>
  <span className="px-2">sign in</span>

  {loading ? (
    <ClipLoader size={16} color="#000" />
  ) : (
    <GrStatusGood color="#000" size="20px" />
  )}
        </button>
          <p>Forgot password? <Link to="/forget-pass" className='text-[#C5D86D]' >click here</Link></p>

        </div>
      </form>
      {/* end Form */}
    </>
  )
}