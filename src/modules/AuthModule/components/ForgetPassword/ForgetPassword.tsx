import { toast } from "react-toastify";
import { AUTH_URLS } from "../../../../config/api.endPoint";
import { axiosInstance } from "../../../../config/httpClient";
import type { ForgetPayload } from "../../type";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "../../../../shared/components/ui/Input/Input";
import { EMAIL_VALIDATION } from "../../../../config/validation";
import { MdEmail } from "react-icons/md";
import { GrStatusGood } from "react-icons/gr";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPayload>();

  const onSubmit = async (data:ForgetPayload) => {
    try {
      setLoading(true);

      const response = await axiosInstance.post(
        AUTH_URLS.FORGET_PASSWORD,
        data
      );

      toast.success(
        response?.data?.message || "Check your email to reset password"
      );

      navigate('/reset-pass', {
        state: { email: data.email }
      });

    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1 className='text-[#C5D86D] text-xl font-bold '>
        Forgot password
      </h1>

      <form className="py-12" onSubmit={handleSubmit(onSubmit)}>
       <Input
        label="Email Address"
        id="email"
        type="email"
        placeholder="Type your email"
        icon={<MdEmail size={18} />}
        error={errors.email?.message}
        {...register("email",EMAIL_VALIDATION)}
        
      />

        <div className='flex justify-between mt-4'>
          <button
            type="submit"
            disabled={loading}
            className='text-black transform transition duration-300 hover:scale-105 font-bold bg-white py-3 px-7 rounded-xl flex items-center justify-center'
          >
            <span className='px-2'>
              {loading ? "Sending..." : "Send email"}
            </span>
            <GrStatusGood color='#000' size='20px'/>
          </button>
        </div>
      </form>
    </>
  );
}