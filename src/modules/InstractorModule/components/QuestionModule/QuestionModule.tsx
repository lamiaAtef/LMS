import { useForm } from "react-hook-form";
import InstructorInput from "../../../../shared/components/ui/InstructorInput/InstructorInput";

import { toast } from "react-toastify";
import axios from "axios";
import { axiosInstance } from "../../../../config/httpClient";
import { QUESTION_URLS } from "../../../../config/api.endPoint";
import { useEffect } from "react";

interface QuestionProps{
    open:boolean;
    onClose:()=>void;

    onSuccess?: () => void;
     selectedId?:string | null;
     isViewMode:boolean
     titleMode:"create"|"update"|"view"



}
interface QuestionForm{
  title:string;
  description:string;
  options:{
    A:string;
     B:string;
      C:string;
       D:string;
  }
  answer:"A"|"B"|"C"|"D";
difficulty: "hard" | "easy";
  type:"BE"|"FE";
  message:string
}

export default function UpdateQuestionModal({open,onClose,selectedId,onSuccess,isViewMode,titleMode}:QuestionProps) {

const{register,handleSubmit,formState:{errors},reset }=useForm<QuestionForm>();

const onSubmit=async(data:QuestionForm)=>{
  console.log(data);
   if(selectedId){
   try {

     const response=await axiosInstance.put<QuestionForm>(QUESTION_URLS.UPDATE_QUESTION(selectedId),data);
      console.log(response);
 toast.success(response?.data?.message);
  reset();
onClose();


     onSuccess?.();






   } catch (error) {
    console.log(error);


   }
  }
  else{
try {
   const response=await axios.post<QuestionForm>(`https://upskilling-egypt.com:3005/api/question`,data,{

    headers: {
      Authorization: `Bearer ${localStorage?.getItem("token")}`,
      "Content-Type": "application/json",
    },

   });
 console.log(response);
 toast.success(response?.data?.message);
 reset()

 onClose();
onSuccess?.();

} catch (error:any) {
  console.log(error?.response?.data?.message);


}}


}
const getQuestionById=async(selectedId:string)=>{
 try {

   const response=await axiosInstance.get(QUESTION_URLS.GET_BY_ID(selectedId));
   const data = response?.data;
     reset({
      title: data.title,
      description: data.description,
      options: {
        A: data.options.A,
        B: data.options.B,
        C: data.options.C,
        D: data.options.D,
      },
        answer: data.answer,
      difficulty: data.difficulty,
      type: data.type,
    });
 } catch (error) {

  console.log(error);

 }
}
useEffect(() => {
  if (!open) return; // المودال مقفول → لا نفعل أي شيء

  if (selectedId) {
    // Edit mode: جلب البيانات
    getQuestionById(selectedId);
  } else {
    // Create mode: نظف الفورم
    reset({
      title: "",
      description: "",
      options: { A: "", B: "", C: "", D: "" },
      answer: "A",
      difficulty: "easy",
      type: "FE",
    });
  }
}, [open, selectedId]);



  return (
    <>
      {open && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">

          <div className="bg-white w-[90%] md:w-[600px] rounded-lg shadow-lg p-6">

            {/* header */}
            {/* <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">Create Question</h2>
              <div className="flex gap-3">
                <button className="text-green-600 cursor-pointer" onClick={}>✔</button>
                <button
                  onClick={onClose}
                  className="text-red-500 cursor-pointer"
                >
                  ✖
                </button>
              </div>
            </div> */}

            {/* form */}
            <div className="mt-4 space-y-3">

<form onSubmit={handleSubmit(onSubmit)} >
    <div className="flex justify-between items-center border-b pb-3">
              <h2 className="text-lg font-semibold">{titleMode} Question</h2>
              <div className="flex gap-3">
                <button className="text-green-600 cursor-pointer" type="submit">✔</button>
                <button
                  onClick={onClose}
                  className="text-red-500 cursor-pointer"
                >
                  ✖
                </button>
              </div>
            </div>
              <InstructorInput label="Title:">
                    <input
                    type="text"
                      className="w-full p-2 outline-none"
                        disabled={isViewMode}
                      {...register("title",{required:"title is required"})}

                    />

                  </InstructorInput>
                    {errors?.title && (<p className="text-red-500">{errors?.title?.message}</p>)}


              <InstructorInput label="Description:">
                    <textarea
                      disabled={isViewMode}

                className="w-full  p-2"
                 {...register("description",{required:"description is required"})}
              />
                  </InstructorInput>
                   {errors?.description && (<p className="text-red-500">{errors?.description?.message}</p>)}

              {/* answers */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input className="border p-2 rounded-md" placeholder="A"
                  disabled={isViewMode}
{...register(`options.A`,{required:"this field reqired"})}

                />

                <input className="border p-2 rounded-md" placeholder="B"
                  disabled={isViewMode}
                {...register(`options.B`,{required:"this field reqired"})}
                />
                <input className="border p-2 rounded-md" placeholder="C"
                  disabled={isViewMode}
                {...register(`options.C`,{required:"this field reqired"})}/>
                <input className="border p-2 rounded-md" placeholder="D"
                  disabled={isViewMode}
                {...register(`options.D`,{required:"this field reqired"})} />
              </div>

              {/* selects */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <InstructorInput label="Right answer">
                  <select  className="p-5"
                  {...register("answer",{required:"right Answer required"})}   disabled={isViewMode}>
                 <option value="A">A</option>
  <option value="B">B</option>
  <option value="C">C</option>
  <option value="D">D</option>
                </select>
            </InstructorInput>
            {errors?.answer && (<p className="text-red-500">{errors?.answer?.message}</p>)}

            <InstructorInput label="Type">
                  <select className="px-1 py-5"
                    disabled={isViewMode}
                    {...register("type",{required:"type required"})}
                  >

                  <option value="FE">FE</option>
                  <option value="BE">BE</option>
                </select>
            </InstructorInput>
             {errors?.type && (<p className="text-red-500">{errors?.type?.message}</p>)}

              <InstructorInput label="Difficulty">
                  <select className="p-5"  disabled={isViewMode}
                   {...register("difficulty",{required:"difficulty required"})}>

                  <option value="easy">Easy</option>
                  <option value="hard">Hard</option>
                </select>
              </InstructorInput>
                  {errors?.difficulty && (<p className="text-red-500">{errors?.difficulty?.message}</p>)}

              </div>
</form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}