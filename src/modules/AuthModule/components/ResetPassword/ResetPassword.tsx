import  { useState } from 'react'
import { useForm } from 'react-hook-form'
import type { ResetPayload } from '../../type'
import { axiosInstance } from '../../../../config/httpClient'
import { AUTH_URLS } from '../../../../config/api.endPoint'
import { toast } from 'react-toastify'
import { useLocation, useNavigate } from 'react-router-dom'
import { Input } from '../../../../shared/components/ui/Input/Input'
import { MdEmail } from 'react-icons/md'
import { CONFIRM_PASSWORD_VALIDATION, EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from '../../../../config/validation'
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa'
import { GrStatusGood } from 'react-icons/gr'

export default function ResetPassword() {
  const location = useLocation();
const emailFromState = location.state?.email;
  const navigate=useNavigate()
  const { register,handleSubmit, watch,
    formState:{errors}}=useForm<ResetPayload>({
  defaultValues: {
    email: emailFromState || ""
  }
});
  const[loading,setLoading]=useState(false)
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
      const passwordValue = watch("password");


  const onSubmit=async(data:ResetPayload)=>{
    setLoading(true)
    let {confirmPassword,...payload} = data;
    try {
      const response= await axiosInstance.post(AUTH_URLS.RESET_PASSWORD,payload)
      toast.success( response?.data?.message||"your password reset successfully")
      navigate("/login")
    } catch (error:any) {
      toast.error(error.response?.data?.message || "Something went wrong")
    }
    setLoading(false)
    navigate("/login")
  }
  return (
  <>
      <h1 className='text-[#C5D86D] text-xl font-bold '>
        Reset password
      </h1>

      <form className="py-12" onSubmit={handleSubmit(onSubmit)}>
       <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Type your email"
        icon={<MdEmail size={18} />}
      error={errors.email?.message}
  readOnly
  {...register("email", EMAIL_VALIDATION)}
        
      />
      <Input
        label="Otp"
        id="Otp"
        type="text"
        placeholder="Choose your otp"
        icon={<MdEmail size={18} />}
        error={errors.otp?.message}
       {...register("otp",OTP_VALIDATION)}
       
        
      />
         <Input
                label='Password'
                  type={showPassword ? "text" : "password"}
                  placeholder="Type your password"
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
                
                   <Input
                   label='Confirm Password'
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Type your confirm password"
                  icon={<FaKey className="h-5 w-5" />}
                  endIcon={
                    showConfirmPassword ? (
                      <FaEyeSlash  className="h-5 w-5" />
      
                    ) : (
                      <FaEye className="h-5 w-5" />
                    )
                  }
                  onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  error={errors.confirmPassword?.message}
                  {...register("confirmPassword",CONFIRM_PASSWORD_VALIDATION(passwordValue))}
                />

        <div className='flex justify-between mt-4'>
          <button
            type="submit"
            disabled={loading}
            className='text-black transform transition duration-300 hover:scale-105 font-bold bg-white py-3 px-7 rounded-xl flex items-center justify-center'
          >
            <span className='px-2'>
              {loading ? "Confirming..." : "reset "}
            </span>
            <GrStatusGood color='#000' size='20px'/>
          </button>
        </div>
      </form>
    </>
  )
}
