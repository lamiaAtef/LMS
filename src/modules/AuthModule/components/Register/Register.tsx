import { useForm } from "react-hook-form"
import { FaEye, FaEyeSlash, FaKey, FaUserPlus, FaUserTie } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { GrStatusGood } from "react-icons/gr";
import { MdEmail } from "react-icons/md";

import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../config/api.endPoint";
import { axiosInstance } from "../../../../config/httpClient";
import type { RegisterPayload } from "../../type";
import { Input } from "../../../../shared/components/ui/Input/Input";
import { NAME_VALIDATION,EMAIL_VALIDATION, ROLE_VALIDATION, PASSWORD_VALIDATION } from "../../../../config/validation";
import { useState } from "react";
import { ClipLoader } from "react-spinners";



export default function Register() {

  const {register,handleSubmit,formState:{errors,isSubmitting}}=useForm<RegisterPayload>();
   const [showPassword, setShowPassword] = useState(false);
  const navigate=useNavigate();
  const onSubmit=async(data:RegisterPayload)=>{
    console.log(data);

try {
const response= await axiosInstance.post(AUTH_URLS.REGISTER,data);
console.log(response);
toast.success(response?.data?.message);
navigate("/login")

} catch (error) {

console.log(error);

}

  }
  return (
    <>
  <h1 className='text-[#C5D86D] text-xl font-bold'>
   Create your account and start using QuizWiz!
      </h1>
           {/* start sign in && sign up components */}
            <div className='flex gap-8 my-8 '>
              <button className='flex  flex-col items-center justify-center bg-[#333333] py-3 px-12 rounded-xl
               border-[#333333]
               transform transition duration-300 hover:scale-105 hover:bg-[#444444]
                 cursor-pointer'
                   onClick={()=>navigate("/login")}>
                <FaUserTie size="40px"  />
                <p >sign in</p>
              </button>
              <button className='flex flex-col items-center justify-center

                border-2 border-[#C5D86D]
                bg-[#333333] py-3 px-12
                rounded-xl   border-2

               '
              onClick={()=>navigate("/register")}>
                <FaUserPlus size="50px" color=' #C5D86D'/>
                 <p >sign Up</p>

              </button>

            </div>
            {/* end sign in and sign up component */}
             <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="flex  gap-1">
                 <Input
                  label="your first name"
                  id="firstname"
                  type="text"
                  placeholder="Type your first name"
                  icon={<MdEmail size={18} />}
                  error={errors?.first_name?.message}
                  {...register("first_name",NAME_VALIDATION)}

      />
       <Input
        label="your last name"
        id="lastname"
        type="text"
        placeholder="Type your last name"
        icon={<MdEmail size={18} />}
        error={errors.last_name?.message}

        {...register("last_name",NAME_VALIDATION)}

      />
              </div>
      <Input
        label="your email address"
        id="email"
        type="email"
        placeholder="Type your email"
        icon={<MdEmail size={18} />}
        error={errors.email?.message}
        {...register("email",EMAIL_VALIDATION)}

      />
    <div>
  <label
    htmlFor="role"
    className="block mb-2 text-sm font-medium text-gray-200"
  >
  your role
  </label>
  <select
    id="role"
      className="w-full bg-transparent outline-none text-gray-200
               rounded-xl border px-3 py-2 border-gray-600
               focus:border-gray-400"
    {...register("role",ROLE_VALIDATION)}
  >

    <option value="" className="bg-black text-gray-400" >
    choose your role
    </option>
    <option value="Instructor" className="bg-black text-gray-300">
      Instructor
    </option>
    <option value="Student" className="bg-black text-gray-300">
      Student
    </option>
  </select>
  {errors.role && <p className="mt-1 text-sm text-red-500">{errors.role.message}</p>}
</div>
<div className="mb-3">
  {/* select هنا */}
</div>

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
              disabled={isSubmitting}
              type="submit"
              className={`
                text-black
                font-bold
                py-3 px-7
                rounded-xl
                flex items-center justify-center
                transform transition duration-300
                ${isSubmitting 
                  ? 'bg-gray-300 ' 
                  : 'bg-white hover:scale-105 cursor-pointer'}
              `}
          >
          <span className="px-2">sign Up</span>

          {isSubmitting ? (
            <ClipLoader size={16} color="#000" />
          ) : (
            <GrStatusGood color="#000" size="20px" />
          )}
        </button>
          <p>Forgot password? <Link to="/forget-pass" className='text-[#C5D86D]' >click here</Link></p>

        </div>
    </form>
    </>
  )
}