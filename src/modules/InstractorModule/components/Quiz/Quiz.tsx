import { LuAlarmClockPlus } from "react-icons/lu";
import { BsFillSafe2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import {  GROUPS_URLS, QUIZ_URLS } from "../../../../config/api.endPoint";

import { Link } from "react-router-dom";
import {FaArrowRight } from "react-icons/fa";
// import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
import type { GetGroupResponse, Quiz } from "../../type.ts";
import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import { useForm } from "react-hook-form";
import InstructorInput from "../../../../shared/components/ui/InstructorInput/InstructorInput.tsx";
import { Textarea } from "flowbite-react";
import InfoCard from "../../../../shared/components/InfoCard.tsx/InfoCard.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';
import CodeModal from "../ui/CodeModal/CodeModal.tsx";
import { REQUIRED_VALIDATION } from "../../../../config/validation.ts";


export default function Quiz() {

    const[showModal,setShowModal] = useState(false);
    const[showCodeModal,setShowCodeModal] = useState(false);
    const[codeValue,setCodeValue] = useState('0');
    let [completedQuizes,setCompletedQuizes] = useState([])

    
    // const [startDate, setStartDate] = useState(new Date());

    // start useForm
          const {
            register,
            formState: { errors },
            handleSubmit,
            reset,
            
          } = useForm();
    // end useForm
         
    const [upCommingQuiz , setUpCommingQuiz] = useState <Quiz[]>([]);
    const [allGroups , setAllGroups] = useState <GetGroupResponse>([]);

    const quizzesImgs = [quizImg1,quizImg2];

    const getUpcommingQuiz = async() =>{
        let response = await  axiosInstance.get(QUIZ_URLS.FIRST_INCOMMING);
        console.log(response.data)
        setUpCommingQuiz(response.data)
    }
    const getAllGroups = async() =>{
        let response = await axiosInstance.get(GROUPS_URLS.GET_ALL);
        console.log(response.data,"allGroups")
        setAllGroups(response.data)
    }
    const onSubmit = async (data:any) =>{
      const schadule = `${data.date}T${data.time}:00`
       const {date,time,...rest} = data;
       const finalData = {
          ...rest,
          schadule
        }
        console.log(finalData,"finalData")
        try{
             let response = await axiosInstance.post(QUIZ_URLS.CREATE_QUIZ,finalData);
              toast.success(response.data.data.message || "Quiz created successfully")
             console.log(response.data.data.code,"response")
             setCodeValue(response.data.data.code)
             setShowCodeModal(true)
            //  generate code modal


        }
        catch(error:any){
            toast.error(error.response.data.message)
        }
        

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
  const showNewModal = () =>{
    reset();
    setShowModal(true)
  }
  const completedQuiz = async() =>{
      let response = await axiosInstance.get(QUIZ_URLS.LAST_COMPLETED);
      console.log(response.data,"com")
      setCompletedQuizes(response.data)
  }   
    useEffect(()=>{
        getUpcommingQuiz();
        getAllGroups();
        completedQuiz();
    },[])
  return (
    <>
      <div className='container grid grid-cols-1 lg:grid-cols-2 gap-4 h-screen'>
        {/* start left column 2 button new quiz and bank questions */}
            <div  className="flex">
                <button id="new_quiz" className="
                 outline-none bg-[#fff]  cursor-pointer w-50
                 me-4 p-5 border-2 border-[#00000033]  rounded-lg
                 flex items-center justify-center flex-col h-40"

                  onClick={showNewModal}> 
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
                <div className="border-[#00000033] border-2 p-4 rounded-lg my-5 h-75 overflow-auto">
                    <h2 className="mb-3 font-bold">Upcoming quizzes</h2>
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
                                    link={`/instructor/quiz/${quiz._id}`}
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
                <div className="border-[#00000033] border-2  rounded-lg p-5 overflow-auto">
                   <div className="flex justify-between px-3">
                        <h2 className="mb-3 font-bold ">Completed Quizzes</h2>
                        <Link to="" className="flex items-center">
                          <span className="me-3">result</span>
                          <FaArrowRight color="#C5D86D" />
                        </Link>
                   </div>
                   {/* start table */}
                      <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-base border border-default">
            <div className=" shadow-sm">
  <table className="w-full text-sm text-left">
    
    {/* Header */}
    <thead className="bg-black text-white uppercase text-xs">
      <tr>
        <th className="px-6 py-4 font-semibold">Title</th>
        <th className="px-6 py-4 font-semibold">Group Name</th>
        <th className="px-6 py-4 font-semibold">Persons</th>
        <th className="px-6 py-4 font-semibold">Date</th>
      </tr>
    </thead>

    {/* Body */}
    <tbody className="divide-y">
                  
  {completedQuizes.length > 0 ? (
  completedQuizes.map((completedQuiz) => (
    <tr key={completedQuiz?._id} className="hover:bg-gray-50 transition">
      
      <td className="px-6 py-4 font-medium text-gray-900">
        {completedQuiz?.title}
      </td>

      <td className="px-6 py-4">
        {completedQuiz?.group}
      </td>

      <td className="px-6 py-4">
        {completedQuiz?.participants} 
      </td>

      <td className="px-6 py-4">
        {new Date(completedQuiz?.schadule).toLocaleDateString()}
      </td>

    </tr>
  ))
) : (
  <tr>
    <td colSpan="4" className="text-center py-6 text-gray-400">
      No Data
    </td>
  </tr>
)}
    
     

     

    </tbody>
  </table>
</div>


                    {/* end table */}


                </div> 

                   {/* end table */}
                    


                </div> 
                {/* end complete quizes Table */}
            </div>
      </div>

      <CustomDialog title="Set up a new quiz" isOpen={showModal} onClose={()=>setShowModal(false)} onSubmit={handleSubmit(onSubmit)} >
                <h2>Details</h2>
                {/* title */}
               <InstructorInput label="Title:">
                    <input
                      className="w-full p-2 outline-none"
                      {...register("title",REQUIRED_VALIDATION("title"))}
                    />
                    {errors.title && <p className="text-red-500">{errors.title.message}</p>}

                  </InstructorInput>
                  {/* Duration input select option - No question - score */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 ">
                    {/* Duration in minutes */}
                    <div className="">
                          <InstructorInput label="Duration (in minutes)">
                            <select
                              className="w-full p-2 outline-none"
                              {...register("duration",REQUIRED_VALIDATION("duration"))}
                            > 

                               {[1,5,10,15,20,30,45,60].map((min) => (
                                <option key={min} value={min}>
                                  {min} min
                                </option>
                              ))}
                             </select>

                          </InstructorInput>
                    </div>
                    {/*no of questions  */}
                     <div className="">
                          <InstructorInput label="No. of questions">
                            <select
                              className="w-full p-2 outline-none"
                              {...register("questions_number")}
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
                    <div className="">
                          <InstructorInput label="Score per question">
                            <select
                              className="w-full p-2 outline-none"
                              {...register("score_per_question")}
                            > 
                               {Array.from({length:10}, (_, i) => (
                              <option key={i + 1} value={i + 1}>
                                {i + 1} 
                              </option>
                            ))}
                             
                             </select>
                          </InstructorInput>
                    </div>
                  </div>
                  {/* Description input */}
                   <InstructorInput label="Description:">
                    <Textarea
                      className="w-full p-2 outline-none"
                      {...register("description")}
                    />
                    </InstructorInput>
                  {/* end Description */}
                  {/* scheduale */}
                  <div className="w-fit">
                      <InstructorInput label="schadule">
                         <div className="flex items-center gap-2  p-2  ">
                            <label className="flex items-center gap-1 cursor-pointer">
                              <span>📅</span>
                              <input type="date" className="border rounded px-2 py-1" 
                               {...register("date",REQUIRED_VALIDATION("data"))}

                               />
                              {errors.date && <p className="text-red-500">{errors.date.message}</p>}

                            </label>
                            
                            <label className="flex items-center gap-1 cursor-pointer">
                              <span>⏰</span>
                              <input type="time" className="border rounded px-2 py-1"
                               {...register("time",REQUIRED_VALIDATION("time"))} />
                                {errors.time && <p className="text-red-500">{errors.time.message}</p>}

                            </label>
                          </div>
                      </InstructorInput>

                  </div>
                  {/*  Difficulty - Category type - Group name*/}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Difficulty level  */}

                      <InstructorInput label="Difficulty level">
                          <select
                            className="w-full p-2 outline-none"
                            {...register("difficulty")}
                          > 
                            <option value="easy">easy</option>
                            <option value="medium">medium</option>
                            <option value="hard">hard</option>
                          </select>
                        </InstructorInput>
                        {/* Category type  */}

                        <InstructorInput label="Category type">
                          <select
                            className="w-full p-2 outline-none"
                            {...register("type")}
                          > 
                            <option value="FE">FE</option>
                            <option value="BE">BE</option>
                            <option value="DO">DO</option>
                          </select>
                        </InstructorInput>
                         {/* Group name */}

                        <InstructorInput label="group">
                          <select
                            className="w-full p-2 outline-none"
                            {...register("group",REQUIRED_VALIDATION("group"))}
                          > 
                           {errors.group && <p className="text-red-500">{errors.group.message}</p>}

                           {allGroups.length>0 && allGroups.map((group)=>(
                            <option  key={group._id} value={group._id}>{group.name}</option>
                           ))}
                          </select>
                        </InstructorInput>
                  </div>
                
      </CustomDialog>
      <CodeModal isOpen={showCodeModal} onClose={()=>setShowCodeModal(false)} code={codeValue} />
    </>
  )
}

