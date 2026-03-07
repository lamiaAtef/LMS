import { useEffect, useState } from "react"
import type { Quiz, Student } from "../../type";
import { axiosInstance } from "../../../../config/httpClient";
import quizImg1 from "../../../../assets/images/QuizImg/QuizImg1.png";
import quizImg2 from "../../../../assets/images/QuizImg/QuizImg2.png";
import { Link } from "react-router-dom";
import { FaArrowCircleRight, FaArrowRight } from "react-icons/fa";

import studentImg1 from "../../../../assets/images/StudentsImgs/studentImg1.jpg";
import studentImg2 from "../../../../assets/images/StudentsImgs/studentImg2.jpg";
import studentImg3 from "../../../../assets/images/StudentsImgs/studentImg3.jpg";
import studentImg4 from "../../../../assets/images/StudentsImgs/studentImg4.jpg";
import studentImg5 from "../../../../assets/images/StudentsImgs/studentImg5.jpg";
import studentImg6 from "../../../../assets/images/StudentsImgs/studentImg6.jpg";
import InfoCard from "../../../../shared/components/InfoCard.tsx/InfoCard";
import { QUIZ_URLS, STUDENT_URLS } from "../../../../config/api.endPoint";



export default function DashBoard() {
  
  const [quizzesIncoming, setQuizzesIncoming] = useState<Quiz[]>([]);
  const [topStudents, setTopStudents] = useState<Student[]>([]);

  const quizzesImgs = [quizImg1,quizImg2];

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
      const response = await axiosInstance.get(QUIZ_URLS.FIRST_INCOMMING);
      console.log(response.data);
      setQuizzesIncoming(response.data);
      
    } catch (error) {
      console.log(error);
    }
   }

   const topFiveStudents = async()=>{
    try {
      const response = await axiosInstance.get(STUDENT_URLS.TOP_FIVE_STUDENTS);
      console.log(response.data)
      setTopStudents(response.data)
      
    } catch (error) {
      console.log(error);
    }
   }

   useEffect(()=>{
    getFiveIncomingQuizzes();
    topFiveStudents();

   },[])

  return (
    <>
   <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mx-3 my-5 items-start">

    {/* // Quizzes upcoming 5 */}
    <div className="border-2 border-gray-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-3">Upcoming 5 quizes</h2>
        <Link to="/" className="flex items-center text-md font-semibold hover:text-lime-600">Quiz directory <FaArrowRight className="text-lime-300 ml-1"/></Link>
      </div>
      {quizzesIncoming.length>0
      ?quizzesIncoming.map((quiz, index)=>{
         const {day , time} = formatDate(quiz.schadule);
         return(
        <div key={quiz._id} className="flex items-center border-2 border-gray-200 rounded-2xl p-2">
          <img src={quizzesImgs[index % quizzesImgs.length]} alt="quizImg" className="w-20 h-20 rounded-lg"/>
          <div className="flex flex-col flex-1 ml-3">
            <h2 className="text-md font-semibold">{quiz.title}</h2>
            <p className="text-sm text-gray-500"> {day} | {time}</p>
            <div className="flex justify-between items-center mt-1">
              <p className="text-sm">No. of students enrolled: 0</p>
              <Link to="/" className="flex items-center text-sm font-semibold hover:text-lime-600">Open <FaArrowCircleRight className="text-lime-300 ml-1"/></Link>
            </div>
          </div>
          
        </div> 
         )
      }) :"nodata"}
      
    </div>
    <div className="border-2 border-gray-200 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold mb-3">Top 5 Students</h2>
        <Link to="/" className="flex items-center text-md font-semibold hover:text-lime-600">All Students<FaArrowRight className="text-lime-300 ml-1"/></Link>
      </div>

      {topStudents.length>0 ?
      topStudents.map((student , index)=>(
        <InfoCard
        key={student._id}
        image={studentsImgs[index % studentsImgs.length]}
        title={`${student.first_name} ${student.last_name}`}
        subtitle={`Group: ${student.group.name} | Avg score: ${Math.round(student.avg_score)}`}
        status={student.status}
        link="/"
        className="hover:bg-gray-50"
      />

      )):"nodata"}

      
    </div>
   </div>
      
    </>
  )
}
