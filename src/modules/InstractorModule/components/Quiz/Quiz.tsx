import { LuAlarmClockPlus } from "react-icons/lu";
import { BsFillSafe2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import {  QUIZ_URLS } from "../../../../config/api.endPoint";

import { Link } from "react-router-dom";
import {FaArrowRight } from "react-icons/fa";
// import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import InfoCard from "../../../../shared/components/InfoCard/InfoCard.tsx";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
import type { Quiz } from "../../type.ts";
import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import { useForm } from "react-hook-form";
import InstructorInput from "../../../../shared/components/ui/InstructorInput/InstructorInput.tsx";
import { Textarea } from "flowbite-react";


export default function Quiz() {

    const[showModal,setShowModal] = useState(false);
    // start useForm
          const {
            register,
            formState: { errors },
            handleSubmit,
            
          } = useForm();
    // end useForm
         
    const [upCommingQuiz , setUpCommingQuiz] = useState <Quiz[]>([]);

    const quizzesImgs = [quizImg1,quizImg2];

    const getUpcommingQuiz = async() =>{
        let response = await  axiosInstance.get(QUIZ_URLS.FIRST_INCOMMING);
        console.log(response.data)
        setUpCommingQuiz(response.data)
    }
    const onSubmit = async (data:any) =>{
      console.log(data);
      setShowModal(false)
    }
      // convert data and time to dd/mm/yyy and hh:mm
 
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
        getUpcommingQuiz()
    },[])
  return (
    <>
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
        {/* start left column 2 button new quiz and bank questions */}
            <div  className="flex">
                <button id="new_quiz" className="
                 outline-none bg-[#fff]  cursor-pointer w-50
                 me-4 p-5 border-2 border-[#00000033]  rounded-lg
                 flex items-center justify-center flex-col h-40"

                  onClick={()=>setShowModal(true)}> 
                 <LuAlarmClockPlus size={50} /> new Quiz
                </button>
                <button id="question_bank" className="
                 outline-none bg-[#fff] cursor-pointer w-50
                 me-4 p-5 border-2 border-[#00000033] rounded-lg
                 flex items-center justify-center flex-col h-40"
                 > 
                 <BsFillSafe2Fill size={50} />

                 Question Bank
                 </button>
            </div>
            {/* start right column upcomming quiz and complete quiz */}
            <div >
                {/* start upcomming quiz */}
                <div className="border-[#00000033] border-2 p-2 rounded-lg my-3 h-75 overflow-auto">
                    <h2 className="mb-3">Upcoming quizzes</h2>
                    {upCommingQuiz.length > 0 ?
                    upCommingQuiz.map((quiz,index) =>
                        // <QuizCard quiz={oneQuiz} />
                        {
                                 const {day , time} = formatDate(quiz.schadule);
                                 return(
                                  <InfoCard
                                    key={quiz._id}
                                    image={quizzesImgs[index % quizzesImgs.length]}
                                    title={quiz.title}
                                    subtitle={`${day} | ${time}`}
                                    numberStudents={0}
                                    link={"/"}
                                    linkClassName="text-sm font-semibold hover:text-lime-600"
                                    arrowClassName="text-lime-300"
                                  />
                               
                                 )
                        })            
                    :"No data"
                  }


                </div> 
                {/* end upcomming quiz */}
                {/* start complete quizes Table  */}
                <div className="border-[#00000033] border-2  rounded-lg">
                   <div className="flex justify-between px-3">
                        <h2 className="mb-3">Completed Quizzes</h2>
                        <Link to="" className="flex items-center">
                          <span className="me-3">result</span>
                          <FaArrowRight color="#C5D86D" />
                        </Link>
                   </div>
                    


                </div> 
                {/* end complete quizes Table */}
            </div>
      </div>

      <CustomDialog title="Set up a new quiz" isOpen={showModal} onClose={()=>setShowModal(false)} onSubmit={handleSubmit(onSubmit)} >
                <h2>Details</h2>
                {/* title */}
               <InstructorInput label="Title:">
                    <input
                      className="w-full border rounded-lg pl-28 pr-3 py-2"
                      {...register("title")}
                    />
                  </InstructorInput>
                  {/* Description input */}
                   <InstructorInput label="Description:">
                    <Textarea
                      className="w-full border rounded-lg pl-40 pr-3 py-0 border-[#000]"
                      {...register("description")}
                    />
                    </InstructorInput>
                  {/* end Description */}

                  {/* Difficulty level  */}
                  <InstructorInput label="Difficulty level">
                      <select
                        className="w-full border rounded-lg pl-45 pr-3 py-2"
                        {...register("duration")}
                      > 
                        <option value="easy">easy</option>
                        <option value="medium">medium</option>
                        <option value="hard">hard</option>
                      </select>
                    </InstructorInput>



      </CustomDialog>
    </>
  )
}

