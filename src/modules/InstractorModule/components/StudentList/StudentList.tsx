import { useEffect, useState } from "react"
import { axiosInstance } from "../../../../config/httpClient";
import user_img from "../../../../assets/images/student_img/user img.png"
import { BeatLoader } from "react-spinners";
import Pagination from "../../../../shared/components/Pagination/Pagination";
import "./studenList.css"
import { STUDENT_URLS } from "../../../../config/api.endPoint";


interface StudentPayload{
    _id:string,
    first_name:string,
    last_name:string,
    email:string,
    status:string,
    role:string,
    slice:any,
}
export default function StudentList() {

    const[studentList,setStudentList]=useState<StudentPayload[]>([]);
    const [loading,setLoading]=useState(false);
       /////////////////////////start pagination
   const [currentPage, setCurrentPage] = useState(1);
   const studentPerPage = 6;
     const indexOfLastStudent= currentPage * studentPerPage;
   const indexOfFirstStudent = indexOfLastStudent - studentPerPage;
   const currentStudent = studentList?.slice(indexOfFirstStudent, indexOfLastStudent);

   const handlePagination = (pageNumber:any) => setCurrentPage(pageNumber);
   /////////////////end pagination
    const getAllStudent=async()=>{
      setLoading(true);
       try {

         const response=await axiosInstance.get(STUDENT_URLS.GET_ALL);
        console.log(response?.data);
        setStudentList(response?.data)

       } catch (error) {

        console.log(error);

       }

       finally{
        setLoading(false);
       }

    }
    useEffect(()=>{
        getAllStudent();
    },[])
     if(loading) return<div className=' flex items-center justify-center h-screen '>
   <BeatLoader size={20} color='#288131'  />
 </div>

  return (
    <>
   <div className="bg-white p-6 rounded-xl border border-gray-200  mx-5 my-5">
        <h2 className="text-lg font-bold mb-4">UserList</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
  {/* Card 1 */}
 {currentStudent?.map((student:StudentPayload)=>(
     <div key={student._id} className="flex bg-white shadow rounded   items-center border border-gray-200  ">
    <img
      src={user_img}
      alt="student_img"
      className="w-20 h-20 object-cover rounded mr-4"
    />

    <div >
        <h3 className="text-lg font-semibold mb-1">{student.first_name}</h3>
      <p className="text-gray-600 text-sm">
       passs
      </p>



    </div>
  </div>
 ))}

  {/* Card 2 */}

</div>
   </div>
     <Pagination
          categoryPerPage={studentPerPage}
          length={studentList.length}
          handlePagination={handlePagination}
          currentPage={currentPage}
        />

    </>
  )
}
