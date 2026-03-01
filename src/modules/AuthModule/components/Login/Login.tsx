import { useForm } from 'react-hook-form';
import { FaKey, FaUserPlus, FaUserTie } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md';
import InputField from '../../../../shared/components/ui/InputField/InputField';
import { Link, useNavigate } from 'react-router-dom';
import { GrStatusGood } from 'react-icons/gr';
import { useState } from 'react';
import { axiosInstance } from '../../../../config/httpClient';
import { AUTH_URLS } from '../../../../config/api.endPoint';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../../../redux/authSlice';

export default function Login() {
   const {
    register,
    formState: { errors },
    handleSubmit,
    
  } = useForm();
  const navigate = useNavigate();
  const[loading,setLoading]=useState(false);
  const dispatch = useDispatch();

  const onSubmit = async (data) =>{

    setLoading(true)
    try{
        let response = await axiosInstance.post(AUTH_URLS.LOGIN,data)
        console.log(response)
        localStorage.setItem("token",response.data.data.accessToken);
        dispatch(setCredentials({ token: response.data.data.accessToken }));
        navigate("/instractor/home")
        console.log(response?.data?.message,"re")
        toast.success(response?.data?.message)
             
        
    }
    catch(error){
        console.log(error)

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
        <button className='flex flex-col items-center justify-center
         cursor-pointer
          bg-[#333333] py-3 px-12 
          rounded-xl   border-2 
          border-[#333333]
          transform transition duration-300 hover:scale-105 hover:bg-[#444444]'
        onClick={()=>navigate("/register")}>
          <FaUserPlus size="50px"/>
           <p >sign Up</p>

        </button>

      </div>
      {/* end sign in and sign up component */}
      {/* start Form */}
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <InputField
        label="Registered email address"
        id="email"
        type="email"
        placeholder="Type your email"
        icon={<MdEmail size={18} />}
        error={errors.email}
        {...register("email", {
          required: "Email is required",
          pattern: {
            value: /^\S+@\S+$/i,
            message: "Invalid email address",
          },
        })}
        
      />
       <InputField
        label="Password"
        id="Password"
        type="text"
        placeholder="Type your Password"
        icon={<FaKey size={18} />}
        error={errors.password}
        {...register("password", {
          required: "Password is required",
          // pattern: {
          //   // value: /^\S+@\S+$/i,
          //   // message: "Invalid Password",
          // },
        })}
        />
        <div className='flex justify-between'>
          <button  type="submit" className='text-black transform transition duration-300 hover:scale-105 font-bold bg-white py-3 px-7 rounded-xl flex items-center justify-center ' ><span className='px-2'>
            sign in</span> <GrStatusGood color='#000' size='20px'/>
            </button>
          <p>Forgot password? <Link to="/forget-pass" className='text-[#C5D86D]' >click here</Link></p>

        </div>
    </form>
      {/* end Form */}
    </>
  )
}
