import { useEffect, useState } from "react"
import type { Quiz, Student } from "../../type";
import { axiosInstance } from "../../../../config/httpClient";
import { QUIZ_URLS, STUDENT_URLS } from "../../../../config/api.endPoint";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
// import { FaArrowCircleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

import studentImg1 from "../../../../assets/images/StudentsImgs/studentImg1.jpg";
import studentImg2 from "../../../../assets/images/StudentsImgs/studentImg2.jpg";
import studentImg3 from "../../../../assets/images/StudentsImgs/studentImg3.jpg";
import studentImg4 from "../../../../assets/images/StudentsImgs/studentImg4.jpg";
import studentImg5 from "../../../../assets/images/StudentsImgs/studentImg5.jpg";
import studentImg6 from "../../../../assets/images/StudentsImgs/studentImg6.jpg";
import InfoCard from "../../../../shared/components/InfoCard/InfoCard";
import StudentModal from "../Students/StudentModal";
import NoData from "../../../../shared/components/NoData/NoData";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../redux/store";




export default function DashBoard() {
  
  const [quizzesIncoming, setQuizzesIncoming] = useState<Quiz[]>([]);
  const [topStudents, setTopStudents] = useState<Student[]>([]);

  // loading
  const [loadingQuiz, setLoadingQuiz] = useState(true);
  const [loadingStudents, setLoadingStudents] = useState(true);

  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [studentIndex, setStudentIndex] = useState(0);

  const quizzesImgs = [quizImg1,quizImg2];

  const { user } = useSelector((state: RootState) => state.auth);
  

  const studentsImgs = [studentImg1, studentImg2, studentImg3, studentImg4, studentImg5, studentImg6];

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

   const getFiveIncomingQuizzes = async ()=>{
    try {
      setLoadingQuiz(true);
      const response = await axiosInstance.get(QUIZ_URLS.FIRST_INCOMMING);
      console.log(response.data);
      setQuizzesIncoming(response.data);
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingQuiz(false);
    }
   }

   const topFiveStudents = async()=>{
    try {
      setLoadingStudents(true);
      const response = await axiosInstance.get(STUDENT_URLS.TOP_FIVE_STUDENTS);
      console.log(response.data)
      setTopStudents(response.data)
      
    } catch (error) {
      console.log(error);
    }finally{
      setLoadingStudents(false);
    }
   }

   const InfoCardSkeleton = () => {
    return (
      <div className="flex items-center border-2 border-gray-200 rounded-2xl p-2 mb-2 animate-pulse">
        
        <div className="w-20 h-20 bg-gray-300 rounded-lg"></div>
  
        <div className="flex flex-col flex-1 ml-3 space-y-2">
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 bg-gray-300 rounded w-2/3"></div>
  
          <div className="flex justify-between mt-2">
            <div className="h-3 bg-gray-300 rounded w-20"></div>
            <div className="h-3 bg-gray-300 rounded w-10"></div>
          </div>
        </div>
  
      </div>
    );
  };

   useEffect(()=>{
    getFiveIncomingQuizzes();

    { (user && user.role == "Instructor") && topFiveStudents();}

   },[])

  return (
    <>
   <div className="grid  grid-cols-1 lg:grid-cols-2 gap-4 mx-3 my-5 items-start">

    {/* // Quizzes upcoming 5 */}
    <div className="border-2 border-gray-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-3">Upcoming 5 quizes</h2>
        <Link to="/dashboard/quiz" className="flex items-center text-md font-semibold hover:text-lime-600">Quiz directory <FaArrowRight className="text-lime-300 ml-1"/></Link>
      </div>
      {loadingQuiz ?(
        Array.from({length:3}).map((_, i)=>(
          <InfoCardSkeleton key={i}/>
        ))
      )
      :quizzesIncoming.length>0
      ?quizzesIncoming.map((quiz, index)=>{
         const {day , time} = formatDate(quiz.schadule);
         return(
          <InfoCard
            key={quiz._id}
            image={quizzesImgs[index % quizzesImgs.length]}
            title={quiz.title}
            subtitle={`${day} | ${time}`}
            numberStudents={0}
            link={`/dashboard/quiz/${quiz._id}`}
            linkClassName="text-sm font-semibold hover:text-lime-600"
            arrowClassName="text-lime-300"
          />
       
         )
      }) :<NoData/>}
      
    </div>
    {(user && user.role == "Instructor") &&
    <div className="border-2 border-gray-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-3">Top 5 Students</h2>
        <Link to="/dashboard/students" className="flex items-center text-md font-semibold hover:text-lime-600">All Students<FaArrowRight className="text-lime-300 ml-1"/></Link>
      </div>

      {loadingStudents ?(
        Array.from({length:3}).map((_, i)=>(
          <InfoCardSkeleton key={i}/>
        ))
      )
      :topStudents.length>0 ?
      topStudents.map((student , index)=>(
        <InfoCard
        key={student._id}
        image={studentsImgs[index % studentsImgs.length]}
        title={`${student.first_name} ${student.last_name}`}
        subtitle={`Group: ${student.group?.name} | Average score: ${Math.round(Number(student.avg_score) || 0)}`}
        status={student.status}
        link='#'
        arrowClassName="text-xl" onClick={() => {
          setSelectedStudent(student);
          setIsModalOpen(true);
          setStudentIndex(index);
        }}/>

      )):<NoData/>}

      
    </div>
    }
   </div>

   <StudentModal
  student={selectedStudent}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
  studentImgs={studentsImgs}
  studentIndex={studentIndex}/>
      
    </>
  )
}
