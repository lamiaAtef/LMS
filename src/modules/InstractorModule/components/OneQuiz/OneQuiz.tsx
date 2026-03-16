import { FaAngleDoubleRight } from 'react-icons/fa'
import { Link, useNavigate, useParams } from 'react-router-dom'
import InstructorInput from '../../../../shared/components/ui/InstructorInput/InstructorInput'
import { useForm } from 'react-hook-form'
import { Textarea } from 'flowbite-react'
import { useEffect, useState } from 'react'
import { axiosInstance } from '../../../../config/httpClient'
import { QUIZ_URLS } from '../../../../config/api.endPoint'
import { toast } from 'react-toastify'
import { CiClock2 } from "react-icons/ci";
import { SlCalender } from "react-icons/sl";
import type { Quiz } from '../../type'
import Skeleton from 'react-loading-skeleton'
import DeleteConfirmModal from '../../../../shared/components/DeleteConfirm/DeleteConfirm'


export default function OneQuiz() {
    const{id} = useParams()
    const[quiz,setQuiz] = useState <Quiz>()
    const[loading,setLoading] = useState(false);
    const[quizloading,setQuizLoading] = useState(false);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);

    
    const [isEdit, setIsEdit] = useState(false) // this state to know if it's view or update case
    console.log(id)
     const {
                register,
                handleSubmit,
                reset,
                
            } = useForm<Quiz>();
    const getQuizById = async() =>{
       if (!id) return;
        setQuizLoading(true);
       

     try {
        const response = await axiosInstance.get(QUIZ_URLS.GET_BY_ID(id));
        setQuiz(response.data);
        reset(response.data);
      } catch (error:any) {
        toast.error(error?.response?.data?.message || "Error loading quiz");
      }
      finally{
          setQuizLoading(false)
      }
    }
    const onSubmit = (data:any) =>{
      if(!isEdit) setIsEdit(true)
      else{
        editQuiz(data);
    }
        
      }
    const editQuiz = async(data:any) =>{
      setLoading(true)
      console.log(data,"update data")
       if (!id) return;

      try{
          let response = await axiosInstance.put(QUIZ_URLS.UPDATE_QUIZ(id),data)
            toast.success("Quiz update successfully")
            navigate('/dashboard/quiz')
          
          console.log(response,"response")
      }
      catch(error:any){
        console.log(error.response)
        toast.error(error?.response?.data?.message || "sorry! can't update quiz ")
      }
      finally{
        setIsEdit(false)
        setLoading(false)
      }
    }
    const deleteQuiz = async() =>{
      setLoading(true)
       if (!id) return;

      try{
      let response = await axiosInstance.delete(QUIZ_URLS.DELETE_QUIZ(id))
      
      console.log(response,"response")
      toast.success("Quiz deleted successfully")
      navigate('/dashboard/quiz')

      }
      catch(error:any){
          console.log(error.response.data.message,"response")

      }
      finally{
        setLoading(false)
        setOpenModal(false);   
      }
    }
    const formatDate = (dateString:string) => {
      const date = new Date(dateString);
    
      const day = date.toLocaleDateString("en-GB"); // 25/04/2026
    
      const time = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });        
      return { day, time };
    };

      useEffect(()=>{
          getQuizById();
      },[])
  return (
    <div className='ms-2 lg:ms-4 '>
        <div className='flex items-center'> 
            <Link to="/dashboard/quiz" className='px-3  font-bold hover:text-[#C5D86D]'>Quizzes</Link> 
             <FaAngleDoubleRight color='#C5D86D' />
             <span className='mx-3 inline-flex font-semibold'>Data structures {quiz?.title}</span>
        </div>
        <div className='border-1 border-[#0000004D] rounded-3xl w-full md:w-2/3 lg:w-1/3  p-5 my-5 flex flex-col justify-between'>
          {quizloading? (
            <div className="space-y-4 p-6 bg-white rounded-lg shadow-lg">
              <Skeleton height={30} width={250} /> {/* Title */}
              <Skeleton height={20} width={180} /> {/* Date/Time */}
              <Skeleton height={40} width="100%" /> {/* Duration */}
              <Skeleton height={40} width="100%" /> {/* Code */}
              <Skeleton height={40} width="100%" /> {/* No. of questions */}
              <Skeleton height={40} width="100%" /> {/* Score per question */}
              <Skeleton height={100} width="100%" /> {/* Description */}
              <div className="flex gap-4 mt-4">
                <Skeleton height={40} width={100} /> {/* Button */}
                <Skeleton height={40} width={100} /> {/* Button */}
              </div>
            </div>
          ) : (
            <>
          <h2 className='font-bold'>Data Structures  {quiz?.title}</h2>
          
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            {/* Date and time */}
            <p className='dateTime font-bold'>
              {quiz?.schadule && (() => {
                const { day, time } = formatDate(quiz.schadule);
                return (
                  <>
                    <SlCalender className="inline me-1" />
                    <span className="mx-2 inline-block">{day}</span>
                    <CiClock2 className="inline ms-2 me-1" />
                    {time}
                  </>
                );
              })()}
            </p>
            {/* Duration */}
            <div className="my-3">
              <InstructorInput label="Duration (in minutes)">
                <select
                  className="w-full p-2 outline-none"
                  {...register("duration")}
                  disabled={!isEdit}
                > 
                    {[1,5,10,15,20,30,45,60].map((min) => (
                    <option key={min} value={min}>
                      {min} min
                    </option>
                  ))}
                </select>
              </InstructorInput>          
            </div>
            {/*  quiz Code  */}
            <div className='my-3'>
                            <InstructorInput label="Code:">
                            <input
                              className="w-full p-2 outline-none "
                              {...register("code")}
                              disabled
                              
                            />
                            </InstructorInput>
                          </div>
            
              {/*no of questions  */}
                  <div className="my-3">
                      <InstructorInput label="No. of questions">
                        <select
                          className="w-full p-2 outline-none"
                          {...register("questions_number")}
                          disabled={!isEdit}
                        > 
                            {Array.from({length:10}, (_, i) => (
                          <option key={i + 1} value={i + 1}>
                            {i + 1} 
                          </option>
                        ))}
                          
                          </select>
                      </InstructorInput>
                </div>
                   {/* score per question */}
                      <div className="my-3">
                            <InstructorInput label="Score per question">
                              <select
                                className="w-full p-2 outline-none"
                                {...register("score_per_question")}
                                disabled={!isEdit}
                              > 
                                  {Array.from({length:10}, (_, i) => (
                                <option key={i + 1} value={i + 1}>
                                  {i + 1} 
                                </option>
                              ))}
                                
                                </select>
                            </InstructorInput>
                      </div>
                        {/* Description input */}
                        <div className='my-3 flex flex-col'>
                           <h3 className='bg-[#FFEDDF] text-sm px-4 py-2 border-1 border-gray-300'>Description</h3>
                            <Textarea
                              className="w-full p-2 outline-none"
                               rows={4} 
                              {...register("description")}
                              disabled={!isEdit}
                              
                            />
                            
                          </div>
                          {/* Edit and Delete Buttons */}
                          <div className='flex justify-between mt-3'>
                            <button  disabled={loading} onClick={()=>setOpenModal(true)} type="button" className='bg-white-500 text-red-500 rounded-xl border-1 border-[red] hover:bg-red-500 hover:text-white  px-5 py-2'>
                             {loading?"Delete ..." : "Delete"} 
                            </button>
                             <button disabled={loading} type='submit' className='bg-black text-white rounded-xl  border-1 border-[black] hover:bg-white hover:text-black px-7 py-2 '>
                              {isEdit?"Save" : "Edit"}
                              
                            </button>
                          </div>
           </form>
           <DeleteConfirmModal
                 isOpen={openModal}
                 title="Delete this Quiz"
                 message="Are you sure you want to delete this Quiz?"
                 onConfirm={() =>  deleteQuiz()}
                 onCancel={() => setOpenModal(false)}
               />
           </>
       )}


        </div>
    </div>
     
  )
}

