import  { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { Input } from '../../../../shared/components/ui/Input/Input';
import { FaEye, FaEyeSlash, FaKey } from 'react-icons/fa';
import { CONFIRM_PASSWORD_VALIDATION, PASSWORD_VALIDATION } from '../../../../config/validation';
import { ClipLoader } from 'react-spinners';
import { GrStatusGood } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';
import type { ChangePasswordPayload, FailedResponse, SuccessChangePassword } from '../../type.ts';
import { axiosInstance } from '../../../../config/httpClient';
import { AUTH_URLS } from '../../../../config/api.endPoint';

export default function ChangePassword() {
    const {
      register,
      formState: { errors },
      handleSubmit,
      watch,
    } = useForm<ChangePasswordPayload>();
    const confirmPassword = watch("password_new");

  const navigate = useNavigate();
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const[loading,setLoading]=useState(false);

  const onSubmit = async (data:ChangePasswordPayload) =>{

    setLoading(true)
    const{confirm,...payload} = data;
    try{
      let response = await axiosInstance.post<SuccessChangePassword>(AUTH_URLS.CHANGE_PASSWORD,payload);
      toast.success(response.data.message)
      navigate("/login")
    }
    catch(error:any){
      const errResponse = error.response?.data as FailedResponse ;
      toast.error(errResponse?.message || "Something went wrong")
    }
    finally{
    setLoading(false)

    }
  }
  return (
    <>
      <h1 className='text-[#C5D86D] text-xl font-bold mb-5'>
        Change password
      </h1>
       <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* old password */}
          <Input
          type={showOldPassword ? "text" : "password"}
          placeholder="old Password"
          label='Old Password'
          icon={<FaKey className="h-5 w-5" />}
          endIcon={
            showOldPassword ? (
              <FaEyeSlash  className="h-5 w-5" />

            ) : (
              <FaEye className="h-5 w-5" />
            )
          }
          onEndIconClick={() => setShowOldPassword(!showOldPassword)}
          error={errors.password?.message}
          {...register("password",PASSWORD_VALIDATION)}
        />
        {/* new password */}
              <Input
          type={showNewPassword ? "text" : "password"}
          placeholder="new Password"
          icon={<FaKey className="h-5 w-5" />}
          label='New Password'
          endIcon={
            showNewPassword ? (
              <FaEyeSlash  className="h-5 w-5" />

            ) : (
              <FaEye className="h-5 w-5" />
            )
          }
          onEndIconClick={() => setShowNewPassword(!showNewPassword)}
          error={errors.password_new?.message}
          {...register("password_new",PASSWORD_VALIDATION)}
        />
        {/* confirm password */}
            <Input
          type={showConfirmPassword ? "text" : "password"}
          placeholder="confirm new Password"
          icon={<FaKey className="h-5 w-5" />}
          label='Confirm New Password'
          endIcon={
            showConfirmPassword ? (
              <FaEyeSlash  className="h-5 w-5" />

            ) : (
              <FaEye className="h-5 w-5" />
            )
          }
          onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
          error={errors.confirm?.message}
          {...register("confirm",CONFIRM_PASSWORD_VALIDATION(confirmPassword))}
        />
        {/* end condirm password */}
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
          <span className="px-2">Change</span>

          {loading ? (
            <ClipLoader size={16} color="#000" />
          ) : (
            <GrStatusGood color="#000" size="20px" />
          )}
        </button>

        </div>
      </form>
    </>
  )
}