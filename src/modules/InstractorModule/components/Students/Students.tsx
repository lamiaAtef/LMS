import { useEffect, useState } from "react"
import { axiosInstance } from "../../../../config/httpClient";
import { STUDENT_URLS } from "../../../../config/api.endPoint";
import type { Student } from "../../type";

import studentImg1 from "../../../../assets/images/StudentsImgs/studentImg1.jpg";
import studentImg2 from "../../../../assets/images/StudentsImgs/studentImg2.jpg";
import studentImg3 from "../../../../assets/images/StudentsImgs/studentImg3.jpg";
import studentImg4 from "../../../../assets/images/StudentsImgs/studentImg4.jpg";
import studentImg5 from "../../../../assets/images/StudentsImgs/studentImg5.jpg";
import studentImg6 from "../../../../assets/images/StudentsImgs/studentImg6.jpg";
import InfoCard from "../../../../shared/components/InfoCard/InfoCard";
import { toast } from "react-toastify";
import StudentModal from "./StudentModal";
import CustomPagination from "../../../../shared/components/CustomPagination/CustomPagination";
import NoData from "../../../../shared/components/NoData/NoData";


export default function Students() {
    const [studentsList, setStudentsList] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);

    // Popup to view Student
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [studentIndex, setStudentIndex] = useState(0);

    const studentsImgs = [studentImg1, studentImg2, studentImg3, studentImg4, studentImg5, studentImg6];

    // search and pagination
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const studentsPerPage = 10;

    const filteredStudents = studentsList.filter((student) =>
    student.first_name.toLowerCase().includes(search.toLowerCase())
     );


    const lastIndex = currentPage * studentsPerPage;
    const firstIndex = lastIndex - studentsPerPage;
    const currentStudents = filteredStudents.slice(firstIndex, lastIndex);
    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage);


    const getAllStudents = async()=>{
        try {
            setLoading(true);
            const response = await axiosInstance.get(STUDENT_URLS.GET_ALL);
            console.log(response.data);
            setStudentsList(response.data);
            
        } catch (error:any) {
            toast.error(error.response?.data?.message || "Something went wrong")
            
        }finally{
            setLoading(false);
        }
        
    }

    const StudentsSkeleton = () => {
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
        getAllStudents();
    },[])
  return (
    <>
    <div className="border-2 border-gray-200 rounded-2xl p-4 mx-3 my-5 items-start">
        <h2 className="text-2xl font-bold mb-3">Students List</h2>

        {/* Search Input */}
        <input
        type="text"
        placeholder="Search by first name..."
        value={search}
        onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
        }}
        className="border border-[#cdd3dd] input-placeholder-gray px-3 py-2 rounded-3xl mb-4 w-80 input-focus-gray"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {loading ?(
              Array.from({length:6}).map((_,i)=>(
                  <StudentsSkeleton key={i}/>
              ))

          )
          :currentStudents.length> 0?
          currentStudents.map((student, index)=>(
          <InfoCard key={student._id} 
          image={studentsImgs[index % studentsImgs.length]}
          title={`${student.first_name} ${student.last_name}`}
          subtitle={`Group: ${student.group?.name || "No Group"} | Average score: ${Math.round(Number(student.avg_score) || 0)}`}
          status={student.status}
          link="#"
          arrowClassName="text-xl" onClick={() => {
              setSelectedStudent(student);
              setIsModalOpen(true);
              setStudentIndex(index);
            }}/>

          )):<NoData/>}


        </div>

        {/* pagination */}
        <CustomPagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        />

    </div>


    <StudentModal
    student={selectedStudent}
    isOpen={isModalOpen}
    onClose={() => setIsModalOpen(false)}
    studentImgs={studentsImgs}
    studentIndex={studentIndex}
    />

    
    </>
  )
}
