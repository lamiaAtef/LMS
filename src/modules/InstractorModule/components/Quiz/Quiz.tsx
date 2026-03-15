import { LuAlarmClockPlus } from "react-icons/lu";
import { BsFillSafe2Fill } from "react-icons/bs";
import { useEffect, useState } from "react";
import { axiosInstance } from "../../../../config/httpClient";
import {  GROUPS_URLS, QUIZ_URLS } from "../../../../config/api.endPoint";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
import type { COMPLETED_QUIZ, Group, Quiz } from "../../type.ts";
import CustomDialog from "../../../../shared/components/CustomDialog/CustomDialog.tsx";
import { useForm } from "react-hook-form";
import InfoCard from "../../../../shared/components/InfoCard.tsx/InfoCard.tsx";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";
import CodeModal from "../ui/CodeModal/CodeModal.tsx";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import CustomPagination from "../../../../shared/components/CustomPagination/CustomPagination.tsx";
import AddQuizComponent from "../ui/AddQuizComponent/AddQuizComponent.tsx";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store.ts";
import NoData from "../../../../shared/components/NoData/NoData.tsx";
import JoinQuiz from "../JoinQuiz/JoinQuiz.tsx";


type QuizForm = Quiz & { date: string; time: string };

export default function Quiz() {
  const [showModal, setShowModal] = useState(false);
  const [showCodeModal, setShowCodeModal] = useState(false);
  const [codeValue, setCodeValue] = useState("0");
  const [completedQuizes, setCompletedQuizes] = useState<COMPLETED_QUIZ[]>([]);

  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [loadingQuizCompleted, setLoadingQuizCompleted] = useState(false);

  const [upCommingQuiz, setUpCommingQuiz] = useState<Quiz[]>([]);

  const[loading,setLoading] = useState(false);

  const quizzesImgs = [quizImg1, quizImg2];

  const navigate = useNavigate();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<QuizForm>();
 const [allGroups, setAllGroups] = useState<Group[]>([]);

  const {user} = useSelector((state:RootState) => state.auth);

// Join Quiz
let [showJoinModal,setShowJoinModal] = useState(false)
// End Join Quiz


    /////////////////////////start pagination
  const [currentPage, setCurrentPage] = useState(1);
  const QUIZ_PER_PAGE = 5;
  const lastIndex = currentPage * QUIZ_PER_PAGE;
    const firstIndex = lastIndex - QUIZ_PER_PAGE;
    const currentQuizes = completedQuizes.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(completedQuizes.length / QUIZ_PER_PAGE);


  /////////////////////////end pagination


  const getUpcommingQuiz = async () => {
    setLoadingUpcoming(true);
    try {
      const response = await axiosInstance.get<Quiz[]>(QUIZ_URLS.FIRST_INCOMMING);
      setUpCommingQuiz(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Can't show upcoming quizzes");
    } finally {
      setLoadingUpcoming(false);
    }
  };

  

  const getCompletedQuiz = async () => {
    setLoadingQuizCompleted(true);
    try {
      const response = await axiosInstance.get<COMPLETED_QUIZ[]>(QUIZ_URLS.LAST_COMPLETED);
      setCompletedQuizes(response.data);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Can't show completed quizzes");
    } finally {
      setLoadingQuizCompleted(false);
    }
  };

  const goExam = async(data:any) =>{
    try{
      let response = await axiosInstance.post(QUIZ_URLS.JOIN,data)
      console.log(response,"res")
      toast.success("login to Exam successfuly")
      navigate(`/dashboard/quzies/${response?.data?.data?.quiz}`)

    }
    catch{
      toast.error("can't go to Exam ")
    } 
    finally{

    }
    
    
  }

  const onSubmit = async (data: QuizForm) => {
    const schadule = `${data.date}T${data.time}:00`;
    const { date, time, ...rest } = data;
    const finalData = { ...rest, schadule }; 
    setLoading(true)
    try {
      const response = await axiosInstance.post(QUIZ_URLS.CREATE_QUIZ, finalData);
      toast.success(response.data.data.message || "Quiz created successfully");
      setCodeValue(response.data.data.code);
      setShowModal(false)
      setShowCodeModal(true);
      
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to create quiz");
    }
    finally{
      setLoading(false)
    }

    setShowModal(false);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-GB");
    const time = date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true });
    return { day, time };
  };

  const showNewModal = () => {
    reset();
    setShowModal(true);
  };
  const getAllGroups = async () => {
      try {
        const response = await axiosInstance.get<Group[]>(GROUPS_URLS.GET_ALL);
        setAllGroups(response.data);
      } catch (error: any) {
        toast.error("Can't fetch groups");
      }
    };

  useEffect(() => {
    getUpcommingQuiz();
     {user?.role == "Instructor"&&getAllGroups();}
    
    getCompletedQuiz();
  }, []);

  return (
    <>
      <div className="mx-3 grid grid-cols-1 my-5  lg:grid-cols-2 box-border">
        {/* Left column buttons */}
        {user?.role == "Instructor"?
        <div className="flex mb-3">
          <button
            id="new_quiz"
            className="outline-none bg-[#fff] cursor-pointer w-50 me-4 p-5 border-2 border-[#00000033] rounded-lg flex items-center justify-center flex-col h-40"
            onClick={showNewModal}
          >
            <LuAlarmClockPlus size={50} /> new Quiz
          </button>
          <button
            id="question_bank"
            className="outline-none bg-[#fff] cursor-pointer w-50 me-4 p-5 border-2 border-[#00000033] rounded-lg flex items-center justify-center flex-col h-40"
            onClick={()=>navigate("/dashboard/questions")}
            >
            <BsFillSafe2Fill size={50} />
            Question Bank
          </button>
        </div>
        :
         <button
            id="question_bank"
            className="outline-none bg-[#fff] cursor-pointer w-50 me-4 p-5 border-2 border-[#00000033] rounded-lg flex items-center justify-center flex-col h-40 mb-5"
            onClick={()=>setShowJoinModal(true)}
            >
            <BsFillSafe2Fill size={50} />
            Join Quiz
         </button>
         }

        {/* Right column upcoming and completed quizzes */}
        <div>
          {/* Upcoming Quizzes */}
          <div className="border-[#00000033] border-2 p-4 rounded-lg h-60 overflow-auto">
            <h2 className="mb-3 font-bold">Upcoming quizzes</h2>
            {loadingUpcoming ? (
              [...Array(3)].map((_, index) => (
                <div key={index} className="flex items-center gap-4 p-4 border rounded-lg bg-white">
                  <Skeleton width={80} height={80} className="rounded-lg" />
                  <div className="flex-1 space-y-2">
                    <Skeleton width="75%" height={16} />
                    <Skeleton width="50%" height={12} />
                  </div>
                  <Skeleton width={24} height={24} className="rounded-full" />
                </div>
              ))
            ) : upCommingQuiz.length > 0 ? (
              upCommingQuiz.map((quiz, index) => (
                <InfoCard
                  key={quiz._id}
                  image={quizzesImgs[index % quizzesImgs.length]}
                  title={quiz.title}
                  subtitle={`${formatDate(quiz.schadule).day} | ${formatDate(quiz.schadule).time}`}
                  numberStudents={0}
                  link={`/dashboard/quiz/${quiz._id}`}
                  linkClassName="text-sm font-semibold hover:text-lime-600"
                  arrowClassName="text-lime-300"
                />
              ))
            ) : (
              <NoData/>
            )}
          </div>

          {/* Completed Quizzes Table */}
         <div className="border-[#00000033] border-2 mt-5 rounded-lg p-5 flex flex-col">
  {/* Header */}
  <div className="flex justify-between mb-2">
    <h2 className="font-bold">Completed Quizzes</h2>
    <Link to="/dashboard/result" className="flex items-center">
      <span className="me-3">result</span>
      <FaArrowRight color="#C5D86D" />
    </Link>
  </div>

  {/* Table with scroll */}
  <div className="flex-1 mt-5">
    <table className=" text-left border-separate border-spacing-y-2 w-full">
      <thead className="bg-gray-900 text-white  text-sm font-thin">
        
        <tr>
          <th className="px-2 py-4 font-semibold">Title</th>
          <th className="px-2 py-4 font-semibold block ">Group Name</th>
          <th className="px-2 py-4 font-semibold">Persons</th>
          <th className="px-2 py-4 font-semibold">Date</th>
        </tr>
      </thead>
      <tbody className="divide-y">
        {loadingQuizCompleted ? (
          [...Array(4)].map((_id, index) => (
            <tr key={index}>
              <td className="px-2 py-4"><Skeleton width={96} height={16} /></td>
              <td className="px-2 py-4"><Skeleton width={80} height={16} /></td>
              <td className="px-2 py-4"><Skeleton width={40} height={16} /></td>
              <td className="px-2 py-4"><Skeleton width={96} height={16} /></td>
            </tr>
          ))
        ) : currentQuizes.length > 0 ? (
          currentQuizes.map((completedQuiz) => (
            <tr key={completedQuiz._id} className="hover:bg-gray-200 my-2">
              <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg">{completedQuiz.title}</td>
              <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg">{completedQuiz.group}</td>
              <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg">{completedQuiz.participants}</td>
              <td className="px-4 py-1 border border-gray-300  rounded-tl-lg rounded-bl-lg">{new Date(completedQuiz.schadule).toLocaleDateString()}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={4} className="text-center py-6 text-gray-400"><NoData/></td>
          </tr>
        )}
      </tbody>
    </table>
    
  </div>
  {currentQuizes.length > 0 &&
   <CustomPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
      />}
</div>
        </div>
      </div>

      <CustomDialog
        title="Set up a new quiz"
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleSubmit(onSubmit)}
        isLoading={loading}
      >
      <AddQuizComponent 
        register = {register}  
        errors={errors}
        allGroups={allGroups}
      />
      </CustomDialog>
      <CustomDialog 
          title="Join Quiz" 
          isOpen={showJoinModal}
          onClose={() => setShowJoinModal(false)}
          onSubmit={handleSubmit(goExam)} // سيتم استدعاء goExam عند الضغط على زر الصح
          isLoading={loading}
        >
          <JoinQuiz 
            register={register} 
            errors={errors} 
          />
      </CustomDialog>
     
      <CodeModal isOpen={showCodeModal} onClose={() => setShowCodeModal(false)} code={codeValue} />
       
       
      </>
  );
}
